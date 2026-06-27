# EarlyBirds — Technical Design Document

> AI-powered hackathon discovery + auto-registration agent.
> "You will never fill out a hackathon form again."

**Team:** 3 engineers (A / B / C) + a fleet of AI coding agents.
**Constraint:** built on a hackathon timeline, so the architecture is deliberately
**parallelizable** — every subsystem talks through frozen contracts so people and
agents can build behind them simultaneously without blocking each other.

---

## 1. Product summary

EarlyBirds runs a continuous pipeline:

1. **Discover** — scrape/ingest hackathon listings (Devpost first, then open web, LinkedIn last).
2. **Normalize & dedup** — collapse the same event seen across multiple sources into one canonical record.
3. **Rank** — score events against a user profile and surface "why this one."
4. **Notify** — deadline countdowns and reminders before registration closes.
5. **Register** — drive the registration form end-to-end, pausing for **human-in-the-loop** approval before final submit.
6. **Plan (stretch)** — bundle flight/hotel search for overseas events (HCM, HK, Shanghai).

The differentiator is **Register**, not Discover. Everything in this doc is biased
toward making the registration moment reliable and demoable.

---

## 2. Design principles

- **Contract-first.** Every module is defined by a typed interface + JSON schema before
  implementation. This is what makes 3 people + N agents able to work in parallel without
  stepping on each other.
- **Everything is a job.** Discovery, normalization, ranking, registration are all queue-driven
  workers. No long-lived in-process coupling. Workers are independently deployable and testable.
- **Source adapters are pluggable.** Adding LinkedIn shouldn't touch Devpost code.
- **Registration is human-gated by default.** The agent prepares and previews; the human approves the final submit.
- **Demo-driven scope.** If it doesn't help land the 2-minute demo, it's stretch.

---

## 3. High-level architecture

```
                         ┌────────────────────────────────────────────────────┐
                         │                      Frontend (Web)                  │
                         │  Next.js + React + Tailwind                          │
                         │  - Feed / ranked events                              │
                         │  - Event detail + "Register" CTA                     │
                         │  - Registration review & approve modal               │
                         │  - Profile editor                                    │
                         └───────────────┬────────────────────────────────────┘
                                         │ REST / SSE (typed client)
                         ┌───────────────▼────────────────────────────────────┐
                         │                   API Gateway (BFF)                  │
                         │  Fastify/Express + zod-validated routes              │
                         │  Auth, rate limiting, SSE for live reg progress      │
                         └───┬───────────────┬───────────────┬─────────────────┘
                             │               │               │
              ┌──────────────▼───┐  ┌────────▼────────┐  ┌───▼───────────────────┐
              │  Discovery svc    │  │  Ranking svc    │  │  Registration svc      │
              │  (scrapers +      │  │  (profile match │  │  (orchestrates a       │
              │   adapters)       │  │   + LLM reason) │  │   reg run state machine)│
              └──────────┬────────┘  └────────┬────────┘  └───┬───────────────────┘
                         │                    │                │
                         │                    │                │ spawns
                         │                    │        ┌───────▼──────────────────┐
                         │                    │        │  Registration Runners     │
                         │                    │        │  - Playwright runner       │
                         │                    │        │  - Simulang runner (hard   │
                         │                    │        │    forms / visible demo)   │
                         │                    │        └───────────────────────────┘
                         │                    │
            ┌────────────▼────────────────────▼───────────────────────────────┐
            │                     Shared infra                                  │
            │  Postgres (canonical store)  •  Redis/BullMQ (job queues)         │
            │  Object storage (screenshots, form snapshots)  •  Vector index   │
            │  (optional, for semantic ranking)                                 │
            └───────────────────────────────────────────────────────────────────┘
```

All cross-service communication is either (a) a queued job with a typed payload, or
(b) a typed REST call. No service reaches into another's database tables.

---

## 4. Data model (the central contract)

This is the single most important artifact — it's the contract every workstream depends on.
Define it first, freeze it, and let agents generate code against it.

```ts
// The canonical, deduplicated event. One row per real-world hackathon.
interface Hackathon {
  id: string;                       // internal canonical id
  title: string;
  description: string;
  organizer?: string;
  url: string;                      // canonical landing page
  location: {
    mode: "online" | "in_person" | "hybrid";
    city?: string;
    country?: string;
    tz?: string;
  };
  dates: {
    startsAt?: string;              // ISO
    endsAt?: string;
    registrationOpensAt?: string;
    registrationClosesAt?: string;  // drives Notify countdowns
  };
  prizes?: { total?: string; raw?: string };
  themes: string[];                 // normalized tags: ["ai", "fintech", ...]
  eligibility?: string;             // free text (students only, age, region…)
  registration: {
    provider: RegistrationProvider; // "devpost" | "luma" | "custom" | "google_form" | "unknown"
    formUrl?: string;
    requiresTeam?: boolean;
    requiresAuth?: boolean;
    knownFields?: FormFieldSpec[];  // populated by the form-introspection step
  };
  sources: SourceRef[];             // provenance: every place we saw this event
  contentHash: string;              // for change detection
  createdAt: string;
  updatedAt: string;
}

interface SourceRef {
  source: "devpost" | "linkedin" | "luma" | "web";
  externalId?: string;
  rawUrl: string;
  scrapedAt: string;
  rawPayloadRef?: string;           // pointer to stored raw HTML/JSON for re-parsing
}

// What a scraper emits BEFORE normalization/dedup.
interface RawListing {
  source: SourceRef["source"];
  rawUrl: string;
  title: string;
  fields: Record<string, unknown>;  // source-specific; normalizer maps these
  rawPayloadRef: string;
  scrapedAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  school?: string;
  resumeUrl?: string;
  skills: string[];
  interests: string[];             // drives ranking
  locationBase?: { city: string; country: string };
  willingToTravel: boolean;
  travelRegions?: string[];        // ["SEA", "Greater China"]
  // Answers we can reuse to auto-fill forms.
  formAnswers: Record<string, string>;  // keyed by canonical field name
}

interface RankedEvent {
  hackathonId: string;
  userId: string;
  score: number;                   // 0..1
  reasons: string[];               // "Matches your interest in AI", short, human-facing
  matchedThemes: string[];
}

// Registration form abstraction — the bridge between scraping and the runner.
interface FormFieldSpec {
  canonicalName: string;           // "full_name", "email", "team_name", "github"
  label: string;                   // as shown on the page
  selector?: string;               // CSS/xpath for Playwright
  a11ySelector?: string;           // accessibility hint for Simulang
  type: "text" | "email" | "select" | "checkbox" | "radio" | "file" | "textarea" | "oauth";
  required: boolean;
  options?: string[];              // for select/radio
  confidence: number;              // how sure we are this mapping is correct
}

// A single attempt to register a user for an event.
interface RegistrationRun {
  id: string;
  userId: string;
  hackathonId: string;
  runner: "playwright" | "simulang";
  status: "queued" | "introspecting" | "filling" | "awaiting_approval"
        | "submitting" | "succeeded" | "failed" | "cancelled";
  plannedActions: PlannedAction[]; // what it WILL do — shown to the human before submit
  artifacts: { screenshots: string[]; finalScreenshot?: string };
  error?: { stage: string; message: string };
  createdAt: string;
  updatedAt: string;
}

interface PlannedAction {
  field: string;                   // canonicalName
  value: string;                   // what we'll type (redacted for secrets in UI)
  source: "profile" | "default" | "llm_inferred";
}

type RegistrationProvider =
  | "devpost" | "luma" | "google_form" | "custom" | "unknown";
```

These types live in a shared `@earlybirds/contracts` package. **Schema changes require
agreement from all three engineers** — it's the one true coupling point.

---

## 5. Subsystem deep-dives

### 5.1 Discovery service

Responsible for turning the messy web into `RawListing[]`.

**Adapter interface** (every source implements this):

```ts
interface SourceAdapter {
  source: SourceRef["source"];
  // Discover candidate listing URLs (paginated).
  discover(cursor?: string): Promise<{ urls: string[]; nextCursor?: string }>;
  // Fetch + parse a single listing into a RawListing.
  parse(url: string): Promise<RawListing>;
}
```

Adapters (in priority order):

1. **DevpostAdapter** — Devpost has structured, near-API listings. Highest signal, lowest effort. Build first.
2. **LumaAdapter** — many hackathons use lu.ma; predictable structure.
3. **WebAdapter** — generic: a seed list of aggregator pages + an LLM extraction pass
   (`html -> RawListing.fields`) for unstructured pages.
4. **LinkedInAdapter** — last, and flagged risky (auth, ToS, brittle). Behind a feature flag;
   the demo does **not** depend on it.

**Scheduling:** a cron-style producer enqueues `discover` jobs per adapter; `parse` jobs fan out
from discovered URLs. Workers are stateless; concurrency is controlled by the queue.

**Form introspection (key step):** for each event with a `formUrl`, a separate job opens the form
(Playwright headless) and emits `FormFieldSpec[]` into `Hackathon.registration.knownFields`. This is
what lets registration be planned offline before a human ever clicks "Register."

### 5.2 Normalization & dedup service

Consumes `RawListing`, produces/updates canonical `Hackathon`.

- **Field normalization:** dates → ISO+tz, themes → controlled vocabulary, location parsing.
  An LLM pass handles the messy free-text → structured mapping, with deterministic validators on top.
- **Dedup:** blocking key (normalized title + date window + organizer) → candidate pairs →
  similarity score (title embedding cosine + URL host + date overlap). Above threshold → merge,
  appending a `SourceRef` rather than creating a new row.
- **Change detection:** `contentHash` diff triggers re-notify if `registrationClosesAt` changes.

This service is **pure transformation** over the contract, which makes it heavily testable with
fixtures — ideal to hand to an agent with a golden-file test suite.

### 5.3 Ranking service

Produces `RankedEvent[]` per user.

- **Phase 1 (deterministic):** theme overlap, location/travel fit, deadline proximity, eligibility filter.
- **Phase 2 (LLM reasons):** generate short human-facing `reasons[]` ("Matches your interest in AI;
  3-day online event you can join from Singapore").
- **Optional:** embed `interests` + event description into a vector index for semantic match.

Output is cached per (user, event) and invalidated on profile edit or event update.

### 5.4 Registration service + runners

The crown jewel. Modeled as an explicit **state machine** (`RegistrationRun.status`).

```
queued → introspecting → filling → awaiting_approval → submitting → succeeded
                                          │                   │
                                          └── cancelled       └── failed
```

- **introspecting** — confirm/refresh `FormFieldSpec[]` against the live page.
- **filling** — map `UserProfile.formAnswers` + `PlannedAction[]`. Unmapped required fields are
  flagged. LLM may infer values but they're tagged `llm_inferred` and surfaced for review.
- **awaiting_approval** — **hard stop.** Frontend shows `plannedActions` + a screenshot. Nothing is
  submitted without explicit user approval. This is a product feature (trust) and a safety rail.
- **submitting** — execute the final submit; capture confirmation screenshot.

**Two interchangeable runners behind one interface:**

```ts
interface RegistrationRunner {
  kind: "playwright" | "simulang";
  introspect(formUrl: string): Promise<FormFieldSpec[]>;
  fill(run: RegistrationRun): Promise<{ screenshots: string[] }>;
  submit(run: RegistrationRun): Promise<{ finalScreenshot: string }>;
}
```

- **PlaywrightRunner** — default. Fast, scriptable, headless, great for Devpost/Luma/Google Forms.
  Carries the demo.
- **SimulangRunner** — for forms where headless automation gets blocked, or for the **visible
  "agent drives a real browser"** demo beat. Uses `@simular-ai/simulang-js` accessibility tree +
  mouse/keyboard. Note from the Simulang docs: a11y `refId`s invalidate on every tree rebuild, so
  the runner re-resolves selectors per step rather than caching them.

Runner choice is a per-event policy (`Hackathon.registration.provider` → preferred runner), so you
can develop both in parallel and swap without touching the orchestrator.

### 5.5 Notify service

- Computes countdowns from `registrationClosesAt`.
- Emits reminders (in-app + email; Slack/Discord optional) at T-7d / T-2d / T-12h thresholds.
- Re-fires when a dedup/change event moves a deadline.

### 5.6 Trip planning (stretch)

- Triggered on successful registration for an `in_person` event outside `locationBase.country`.
- Calls a flight-search + hotel-search provider (or just deep-links with prefilled dates/airports).
- Demo-friendly minimum: a "Register + here's your flight window" card. No booking, just search.

---

## 6. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | TypeScript everywhere | one contract package, shared by FE/BE/runners |
| Frontend | Next.js + React + Tailwind | fast, demoable, SSR for the feed |
| API | Fastify + zod | schema-validated, generates the typed client |
| Queue | BullMQ on Redis | simple, observable, parallel workers |
| DB | Postgres + Prisma | canonical store, migrations, JSON columns for raw |
| Scraping | Playwright + Cheerio | structured + headless form introspection |
| Desktop automation | simulang-js | hard forms / visible demo |
| LLM | OpenRouter (via Simulang key) + provider SDK | normalization, reasons, field inference |
| Storage | S3-compatible | screenshots, raw HTML snapshots |
| Vector (opt) | pgvector | semantic ranking |

---

## 7. Parallelization strategy

The whole architecture exists to make work **independently shippable**. Three mechanisms:

1. **Frozen contracts (`@earlybirds/contracts`)** — types + zod schemas + JSON fixtures. Once frozen
   on Day 0, every stream codes against them. Mock implementations satisfy the interface until the
   real one lands.
2. **Queue boundaries** — each service consumes/produces typed jobs. You can run, test, and demo a
   service with a hand-seeded queue and a stub upstream.
3. **Fixture-driven dev** — golden files for normalization, recorded HTML for scrapers, recorded
   form DOMs for runners. No stream waits on another stream's live output.

### AI-agent fan-out

Because the contracts are frozen, each engineer can run multiple AI agents in parallel **inside their
stream** without merge chaos:

- One agent per **SourceAdapter** (Devpost / Luma / Web / LinkedIn) — all implement the same interface.
- One agent per **FormFieldSpec mapping heuristic** + a test agent writing golden tests.
- One agent on **PlaywrightRunner**, another on **SimulangRunner**, both behind `RegistrationRunner`.
- One agent on the **frontend review modal**, another on the **feed**, sharing the typed API client.

Rule: **agents only touch files inside their stream's directory**; contract edits go through a human.
This keeps parallel agent output conflict-free.

---

## 8. Work split (3 engineers)

Each engineer owns a vertical slice end-to-end so no one is blocked waiting for "the backend" or
"the frontend." Shared contracts package is co-owned.

### Engineer A — Discovery & Data
- `@earlybirds/contracts` (lead author; others review).
- DevpostAdapter + LumaAdapter + WebAdapter (+ LinkedIn behind a flag, time permitting).
- Normalization & dedup service + golden-file test suite.
- Form introspection job (Playwright headless → `FormFieldSpec[]`).
- Postgres schema + Prisma migrations.

### Engineer B — Registration & Runners (owns the differentiator)
- Registration service + state machine + SSE progress events.
- `RegistrationRunner` interface.
- PlaywrightRunner (Devpost/Luma/Google Forms) — **demo-critical**.
- SimulangRunner (hard forms / visible demo).
- PlannedAction generation + LLM field inference with redaction.

### Engineer C — Frontend, API & Ranking
- API gateway (Fastify + zod) + typed client generation.
- Ranking service (deterministic phase + LLM reasons).
- Frontend: feed, event detail, **registration review/approve modal** (the trust beat), profile editor.
- Notify service (countdowns + reminders).

### Co-owned / glue
- Contracts package (A leads, all review).
- Infra: docker-compose for Postgres + Redis + MinIO, seed scripts, fixtures.
- Demo script + seed data (everyone, day before).

---

## 9. Milestones (hackathon timeline)

**M0 — Foundations (first few hours)**
- Freeze `@earlybirds/contracts`. Stand up docker-compose (Postgres/Redis/MinIO).
- Seed fixtures: 5 real Devpost events (recorded HTML), 1 recorded Google Form DOM.
- Stub services that read/write the contract so every stream compiles end-to-end.

**M1 — Vertical slice (Devpost happy path)**
- DevpostAdapter → normalize → 1 event in DB.
- Ranking returns that event with reasons.
- Frontend feed shows it; event detail has a "Register" button.
- PlaywrightRunner introspects + fills a Google Form, stops at `awaiting_approval`.

**M2 — The registration moment**
- Review/approve modal shows `plannedActions` + screenshot.
- Approve → submit → confirmation screenshot. **This is the demo.**
- Notify countdown on the event card.

**M3 — Depth & polish**
- Luma + Web adapters; dedup across sources demonstrated live.
- SimulangRunner on one nasty non-Devpost form (visible browser drive).
- Trip-planning card on an overseas event.

**M4 — Demo hardening**
- Pre-seed a clean dataset, rehearse the 2-minute run, add failure fallbacks (cached screenshots if a
  live site is flaky during judging).

---

## 10. Demo script (2 minutes)

1. Open the feed → "EarlyBirds found these for you," each with a one-line reason.
2. Show the same hackathon appearing once despite being scraped from Devpost + Luma (dedup beat).
3. Click **Register** → agent introspects + fills → review modal shows exactly what it'll submit.
4. Click **Approve** → watch it submit → confirmation screenshot. ("You never touched the form.")
5. For the overseas event → "Register + here's your flight window" card (stretch).

---

## 11. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Live sites flaky during judging | Recorded fixtures + cached screenshots fallback; demo on pre-tested forms |
| LinkedIn ToS / auth / brittleness | Behind a flag; not on the demo path |
| Form auth (OAuth, team rosters) | Scope demo to forms without hard auth; SimulangRunner handles in-browser session if needed |
| Auto-submitting unwanted registrations | Mandatory `awaiting_approval` human gate — never auto-submit |
| Over-broad scope (all 6 features) | Demo-driven cut: Register is must-have, the rest support it |
| Contract churn breaking parallel work | Contract changes are human-reviewed and batched; agents stay in-stream |
| LLM hallucinating form values | `llm_inferred` values flagged and surfaced for review, never silently submitted |

---

## 12. Open questions

- Which 2–3 registration form providers do we guarantee for the demo? (Devpost + Google Form are the safe bets.)
- Do we need real email sending for Notify, or is in-app enough for the demo?
- How much of trip planning is real vs. deep-linked search?
- Is LinkedIn worth any time at all, or pure distraction?

---

*This doc is the contract. When in doubt, the types in `@earlybirds/contracts` win.*
