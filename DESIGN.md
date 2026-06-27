# EarlyBirds — Technical Design Document

> AI-powered hackathon discovery + auto-registration agent.
> "You will never fill out a hackathon form again."

**Team:** 3 engineers (A / B / C) + a fleet of AI coding agents.
**Constraint:** built on a hackathon timeline, so the architecture is deliberately
**parallelizable** — every subsystem talks through frozen contracts so people and
agents can build behind them simultaneously without blocking each other.

**Sponsor tech is load-bearing, not bolted on** (see §2.5). The whole pipeline is
designed around three sponsor primitives:

- **Exa** — neural web search *is* the discovery engine (replaces brittle scraping).
- **Simulang** — desktop automation drives the visible "agent fills your form" moment.
- **Zo Computer** — the always-on cloud host that runs the continuous pipeline and
  delivers notifications, even when the user is offline.

---

## 1. Product summary

EarlyBirds runs a continuous pipeline:

1. **Discover** — find hackathon listings via **Exa neural search** with structured extraction (Devpost / Luma / open web), not hand-rolled scrapers.
2. **Normalize & dedup** — collapse the same event seen across multiple sources into one canonical record.
3. **Rank** — score events against a user profile and surface "why this one."
4. **Notify** — deadline countdowns and reminders delivered through **Zo Computer** (Telegram / SMS / email) before registration closes.
5. **Register** — drive the registration form end-to-end with **Playwright + Simulang**, pausing for **human-in-the-loop** approval before final submit.
6. **Plan (stretch)** — bundle flight/hotel search (via Exa) for overseas events (HCM, HK, Shanghai).

The differentiator is **Register**, not Discover. Everything in this doc is biased
toward making the registration moment reliable and demoable. The continuous pipeline
lives on **Zo Computer** so discovery and reminders keep running 24/7 with no laptop open.

---

## 2. Design principles

- **Contract-first.** Every module is defined by a typed interface + JSON schema before
  implementation. This is what makes 3 people + N agents able to work in parallel without
  stepping on each other.
- **Everything is a job.** Discovery, normalization, ranking, registration are all queue-driven
  workers. No long-lived in-process coupling. Workers are independently deployable and testable.
- **Source adapters are pluggable.** Adding a source shouldn't touch other sources' code.
- **Registration is human-gated by default.** The agent prepares and previews; the human approves the final submit.
- **Sponsor-native, not sponsor-sprinkled.** Each sponsor tool owns a load-bearing role; remove it and the product genuinely degrades.
- **Demo-driven scope.** If it doesn't help land the 2-minute demo, it's stretch.

---

## 2.5 Sponsor technology integration

> Judging weights "Innovation & Creative use of sponsor technology" at **30%** — the
> single largest criterion. This is a deliberate, central design choice, not a veneer.
> The rule we hold ourselves to: *if you delete the sponsor tool, the feature stops working.*

| Sponsor | Role in EarlyBirds | Why it's central (not bolted on) |
|---|---|---|
| **Exa** | The discovery + extraction engine | We don't write per-site scrapers. Exa `/search` (`type: "deep"`) with an `outputSchema` returns **structured hackathon records directly from the open web**, with `grounding[]` citations. `/contents` pulls clean form-page text for field introspection; `/answer` resolves fuzzy questions ("is this hackathon open to students?"). Discovery literally *is* Exa. |
| **Simulang** | Visible registration runner | For forms that block headless automation, the Simulang runner drives a **real browser via the accessibility tree + mouse/keyboard** — this is the "watch the agent fill the form" demo beat. |
| **Zo Computer** | Always-on host + delivery | The continuous pipeline (scheduled Exa discovery, dedup, notify) runs on a **persistent Zo Linux server** so it works 24/7 with no laptop open. Zo's scheduled tasks fire the discovery cron; Zo delivers reminders over **Telegram / SMS / email**. Cursor connects to Zo via its **MCP server** during dev. |
| **OpenAI / Codex** | Reasoning layer | Normalization (messy text → structured fields), ranking `reasons[]`, and `llm_inferred` form-field mapping. Codex-style structured output keeps these deterministic and schema-bound. |
| **Cursor** | Build-time agent fan-out | The whole contract-first architecture (§7) exists so many Cursor agents build subsystems in parallel against frozen interfaces. |

**The flagship integration is Exa.** It collapses "scrape + parse + normalize" from a
fragile, multi-adapter effort into a single neural-search-with-schema call — which is
both the most inventive use *and* the biggest timeline win. Simulang and Zo make the
end-to-end story (find → register → remind, 24/7) actually true rather than a mockup.

How the three combine in one sentence: **Zo runs Exa-powered discovery on a schedule,
ranks results, texts you the good ones, and — on your approval — Simulang registers you.**

---

## 3. High-level architecture

```
   ┌─────────────┐                        ┌────────────────────────────────────────────────────┐
   │   Exa API    │◀───────────────────────│                      Frontend (Web)                  │
   │  /search     │   neural discovery     │  Next.js + React + Tailwind                          │
   │  /contents   │   + structured extract │  - Feed / ranked events                              │
   │  /answer     │                        │  - Event detail + "Register" CTA                     │
   └──────┬───────┘                        │  - Registration review & approve modal               │
          │                                │  - Profile editor                                    │
          │                                └───────────────┬────────────────────────────────────┘
          │                                                │ REST / SSE (typed client)
          │                                ┌───────────────▼────────────────────────────────────┐
          │                                │                   API Gateway (BFF)                  │
          │                                │  Fastify/Express + zod-validated routes              │
          │                                │  Auth, rate limiting, SSE for live reg progress      │
          │                                └───┬───────────────┬───────────────┬─────────────────┘
          │                                    │               │               │
   ┌──────▼───────────────┐      ┌─────────────▼───┐  ┌────────▼────────┐  ┌───▼───────────────────┐
   │  Discovery svc        │      │  Notify svc     │  │  Ranking svc    │  │  Registration svc      │
   │  (Exa adapters,       │      │  (Zo delivery:  │  │  (profile match │  │  (orchestrates a       │
   │   no hand scrapers)   │      │   TG/SMS/email) │  │   + LLM reason) │  │   reg run state machine)│
   └──────────┬────────────┘      └────────┬────────┘  └────────┬────────┘  └───┬───────────────────┘
              │                            │                    │                │ spawns
              │                            │                    │        ┌───────▼──────────────────┐
              │                            │                    │        │  Registration Runners     │
              │                            │                    │        │  - Playwright runner       │
              │                            │                    │        │  - Simulang runner (hard   │
              │                            │                    │        │    forms / visible demo)   │
              │                            │                    │        └───────────────────────────┘
            ┌─▼────────────────────────────▼────────────────────▼───────────────────────────────┐
            │                     Shared infra  —  hosted on Zo Computer                          │
            │  Postgres (canonical store)  •  Redis/BullMQ (job queues)                           │
            │  Object storage (screenshots, form snapshots)  •  Vector index (optional)           │
            │  Zo scheduled tasks → discovery cron  •  Zo always-on workers  •  Zo MCP ↔ Cursor   │
            └───────────────────────────────────────────────────────────────────────────────────┘
```

All cross-service communication is either (a) a queued job with a typed payload, or
(b) a typed REST call. No service reaches into another's database tables. The entire
backend (workers, queues, DB, schedules) is hosted on a **Zo Computer** instance, so the
"continuous" in "continuous discovery" is literally true — it keeps running with no laptop open.

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
  source: "exa" | "devpost" | "luma" | "web";  // "exa" = discovered via Exa neural search
  externalId?: string;
  rawUrl: string;
  scrapedAt: string;
  rawPayloadRef?: string;           // pointer to stored raw payload (Exa result / HTML) for re-parsing
  exaGrounding?: ExaGrounding[];    // citations backing each extracted field (from Exa outputSchema)
}

// Citation/confidence Exa returns alongside structured extraction.
interface ExaGrounding {
  field: string;
  citations: string[];              // source URLs
  confidence: number;               // 0..1
}

// What discovery emits BEFORE normalization/dedup.
// With Exa, most `fields` arrive already structured from `output.content`.
interface RawListing {
  source: SourceRef["source"];
  rawUrl: string;
  title: string;
  fields: Record<string, unknown>;  // Exa structured output (or source-specific); normalizer maps these
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

### 5.1 Discovery service — *Exa-powered*

Responsible for turning the messy web into `RawListing[]`. **The core engine is Exa.**
Instead of writing and babysitting one scraper per site, we issue neural search queries
and let Exa return *structured* hackathon records with citations.

**The Exa pattern (flagship sponsor integration):**

```ts
// One call replaces discover + fetch + parse + extract for the open web.
const res = await exa.search(
  "upcoming hackathons open for registration in Asia, AI/fintech, 2026",
  {
    type: "deep",                       // multi-step search + reasoning + structured output
    category: "news",                   // also run an undated general pass
    numResults: 25,
    contents: { highlights: true },
    outputSchema: {                     // <-- Exa returns data already shaped like our contract
      type: "object",
      required: ["events"],
      properties: {
        events: {
          type: "array",
          items: {
            type: "object",
            required: ["title", "url"],
            properties: {
              title: { type: "string" },
              url: { type: "string" },
              registrationUrl: { type: "string" },
              startsAt: { type: "string" },
              registrationClosesAt: { type: "string" },
              location: { type: "string" },
              themes: { type: "array", items: { type: "string" } },
              eligibility: { type: "string" },
            },
          },
        },
      },
    },
  },
);
// res.output.content.events -> RawListing[]; res.output.grounding -> SourceRef.exaGrounding
```

Implementation notes (verified against Exa docs):
- `POST https://api.exa.ai/search`, auth header **`x-api-key`** (not `Authorization: Bearer`).
- Content fields **must** nest under `contents` (top-level `text`/`highlights` → 400).
- `type: "deep"` / `deep-reasoning` for structured extraction; `auto`/`fast` for cheap refresh passes.
- `contents.maxAgeHours` controls freshness vs. cost on the recurring cron.

**Adapter interface** (Exa is the primary adapter; others are thin and optional):

```ts
interface SourceAdapter {
  source: SourceRef["source"];
  // Returns structured RawListings directly (Exa) or candidate URLs to parse (legacy).
  discover(cursor?: string): Promise<{ listings: RawListing[]; nextCursor?: string }>;
}
```

Adapters (in priority order):

1. **ExaAdapter** — the engine. Broad neural queries + `outputSchema` → structured `RawListing[]`
   spanning Devpost, Luma, university pages, and the open web in one pass. Build first; it carries discovery.
2. **DevpostAdapter** — optional precision pass: query Exa with `includeDomains: ["devpost.com"]`
   (or hit Devpost directly) for high-confidence structured records on the demo-critical source.
3. **LumaAdapter** — `includeDomains: ["lu.ma"]` Exa pass for lu.ma-hosted events.

We **drop hand-rolled scraping and the LinkedIn adapter** from the plan: Exa already crawls the
open web (including content surfaced from LinkedIn posts) without the ToS/auth/brittleness risk,
and it removes a whole class of maintenance from a hackathon timeline.

**Form field extraction (Exa-assisted):** for each event with a `formUrl`, call Exa `/contents`
to pull clean page text, then an LLM/Codex pass proposes `FormFieldSpec[]`. The live runner
(Playwright/Simulang) confirms selectors at registration time. This lets registration be *planned*
offline before a human ever clicks "Register."

**Scheduling:** runs as a **Zo Computer scheduled task** (see §5.7), so discovery happens 24/7
without anyone's machine on. Each run enqueues normalize jobs; workers are stateless.

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

- **SimulangRunner (sponsor headline)** — drives a **real, visible browser** via `@simular-ai/simulang-js`
  (accessibility tree + mouse/keyboard). This is the **demo money shot**: the judge watches the agent
  physically navigate and fill the form. Also our answer to sites that block headless automation.
  Simulang notes that matter for correctness: a11y `refId`s invalidate on every tree rebuild, so the
  runner re-resolves selectors per step (never caches a `refId` across `snapshot()`); `AriaRole` is a
  numeric enum (use `ariaRoleToString`); `App.open` focus/visibility are advisory. Needs
  `OPENROUTER_API_KEY` for grounding when it falls back to vision.
- **PlaywrightRunner** — the reliable workhorse. Fast, scriptable, headless, great for
  Devpost/Luma/Google Forms. Used for the bulk of forms and as the deterministic fallback if a
  live Simulang run gets flaky during judging.

Runner choice is a per-event policy (`Hackathon.registration.provider` → preferred runner). For the
demo we deliberately route at least one event through **Simulang** to show the sponsor capability,
and keep Playwright as the safety net. Both develop in parallel behind the one interface.

### 5.5 Notify service — *delivered via Zo Computer*

- Computes countdowns from `registrationClosesAt`.
- Emits reminders at T-7d / T-2d / T-12h thresholds, plus a "new match found" push.
- **Delivery uses Zo Computer's channels** — Telegram / SMS / email — so the user gets pinged on
  their phone with zero extra infra to build. Notify enqueues a `notify` job; a Zo-hosted task
  delivers it. This is what makes "smart reminders" real rather than an in-app badge nobody sees.
- Re-fires when a dedup/change event moves a deadline.

### 5.6 Trip planning (stretch) — *Exa for logistics*

- Triggered on successful registration for an `in_person` event outside `locationBase.country`.
- Uses **Exa `/search` + `/answer`** to pull flight-window options, visa notes, and nearby stays
  (e.g. "cheapest flights SIN→SGN around <dates>", grounded with citations), or deep-links a
  booking search with prefilled dates/airports.
- Demo-friendly minimum: a "Register + here's your flight window" card. No booking, just search.

### 5.7 Always-on runtime — *Zo Computer*

The whole backend is hosted on a **Zo Computer** instance, which turns "continuous discovery"
from a slide claim into a real system property:

- **Persistent Linux server + storage** hosts Postgres, Redis/BullMQ, the workers, and screenshot artifacts.
- **Scheduled tasks** fire the Exa discovery cron and the deadline-sweep for Notify on an interval —
  running even when every teammate's laptop is closed.
- **Delivery** of reminders over Telegram / SMS / email (see §5.5).
- **MCP server** connects our Cursor agents directly to the Zo box during development, so agents can
  read/write project files, run shell commands, and inspect live state while building.

---

## 6. Tech stack

| Layer | Choice | Why |
|---|---|---|
| **Discovery (sponsor)** | **Exa** `/search` + `/contents` + `/answer` | neural search with `outputSchema` → structured events; replaces scrapers |
| **Always-on host (sponsor)** | **Zo Computer** | persistent Linux server, scheduled tasks, TG/SMS/email delivery, MCP ↔ Cursor |
| **Registration (sponsor)** | **simulang-js** + Playwright | Simulang = visible browser-drive demo; Playwright = reliable fallback |
| **Reasoning (sponsor)** | **OpenAI / Codex** (OpenRouter for Simulang grounding) | normalization, ranking reasons, form-field inference |
| **Build (sponsor)** | **Cursor** agents | parallel contract-first development |
| Language | TypeScript everywhere | one contract package, shared by FE/BE/runners |
| Frontend | Next.js + React + Tailwind | fast, demoable, SSR for the feed |
| API | Fastify + zod | schema-validated, generates the typed client |
| Queue | BullMQ on Redis | simple, observable, parallel workers |
| DB | Postgres + Prisma | canonical store, migrations, JSON columns for raw |
| Form introspection | Playwright + Exa `/contents` | clean page text → `FormFieldSpec[]` |
| Storage | S3-compatible (on Zo) | screenshots, raw payload snapshots |
| Vector (opt) | pgvector | semantic ranking |

---

## 7. Parallelization strategy

The whole architecture exists to make work **independently shippable**. Three mechanisms:

1. **Frozen contracts (`@earlybirds/contracts`)** — types + zod schemas + JSON fixtures. Once frozen
   on Day 0, every stream codes against them. Mock implementations satisfy the interface until the
   real one lands.
2. **Queue boundaries** — each service consumes/produces typed jobs. You can run, test, and demo a
   service with a hand-seeded queue and a stub upstream.
3. **Fixture-driven dev** — golden files for normalization, cached Exa responses for discovery,
   recorded form DOMs for runners. No stream waits on another stream's live output (or on a live API key).

### AI-agent fan-out

Because the contracts are frozen, each engineer can run multiple AI agents in parallel **inside their
stream** without merge chaos:

- One agent on the **Exa query/outputSchema tuning** + one on **Devpost/Luma domain-scoped passes**.
- One agent per **FormFieldSpec mapping heuristic** + a test agent writing golden tests.
- One agent on **SimulangRunner**, another on **PlaywrightRunner**, both behind `RegistrationRunner`.
- One agent on the **frontend review modal**, another on the **feed**, sharing the typed API client.
- One agent wiring **Zo scheduled tasks + Telegram/SMS delivery**.

Rule: **agents only touch files inside their stream's directory**; contract edits go through a human.
This keeps parallel agent output conflict-free. Cursor agents can also reach the live Zo box via its
**MCP server** to inspect runtime state while building.

---

## 8. Work split (3 engineers)

Each engineer owns a vertical slice end-to-end so no one is blocked waiting for "the backend" or
"the frontend." Shared contracts package is co-owned.

### Engineer A — Discovery & Data (owns **Exa** + **Zo** runtime)
- `@earlybirds/contracts` (lead author; others review).
- **ExaAdapter**: query design, `outputSchema`, grounding → `RawListing[]` (the discovery engine).
- Optional Devpost/Luma domain-scoped Exa passes.
- Normalization & dedup service + golden-file test suite.
- Exa `/contents` form-text extraction feeding `FormFieldSpec[]`.
- **Zo Computer** setup: host Postgres/Redis/workers, scheduled discovery task, MCP for the team.
- Postgres schema + Prisma migrations.

### Engineer B — Registration & Runners (owns **Simulang**, the differentiator)
- Registration service + state machine + SSE progress events.
- `RegistrationRunner` interface.
- **SimulangRunner** — the visible browser-drive demo beat (sponsor headline).
- PlaywrightRunner (Devpost/Luma/Google Forms) — reliable fallback.
- PlannedAction generation + Codex/LLM field inference with redaction.

### Engineer C — Frontend, API, Ranking & Notify (owns **Zo delivery**)
- API gateway (Fastify + zod) + typed client generation.
- Ranking service (deterministic phase + LLM/Codex reasons).
- Frontend: feed, event detail, **registration review/approve modal** (the trust beat), profile editor.
- Notify service + **Zo Telegram/SMS/email delivery**.

### Co-owned / glue
- Contracts package (A leads, all review).
- Infra: docker-compose for local dev (Postgres + Redis + MinIO); Zo for the always-on deploy.
- Sponsor API keys: `EXA_API_KEY`, `OPENROUTER_API_KEY` (Simulang), OpenAI key, Zo account.
- Demo script + seed data (everyone, day before).

---

## 9. Milestones (hackathon timeline)

**M0 — Foundations (first few hours)**
- Freeze `@earlybirds/contracts`. Stand up docker-compose (Postgres/Redis/MinIO) for local dev.
- Provision the **Zo Computer** box; get `EXA_API_KEY` working with a first structured `/search`.
- Seed fixtures: cache one real Exa response + 1 recorded Google Form DOM for offline dev.
- Stub services that read/write the contract so every stream compiles end-to-end.

**M1 — Vertical slice (Exa happy path)**
- **ExaAdapter** `deep` search + `outputSchema` → normalize → real events in DB.
- Ranking returns events with reasons.
- Frontend feed shows them; event detail has a "Register" button.
- PlaywrightRunner introspects + fills a Google Form, stops at `awaiting_approval`.

**M2 — The registration moment**
- Review/approve modal shows `plannedActions` + screenshot.
- Approve → submit → confirmation screenshot. **This is the demo.**
- Notify countdown on the event card.

**M3 — Sponsor depth & polish**
- Dedup across multiple Exa sources demonstrated live.
- **SimulangRunner** drives a visible browser on one form (sponsor headline beat).
- **Zo** runs the discovery cron on a schedule and pushes a **Telegram** reminder live.
- Trip-planning card (Exa) on an overseas event.

**M4 — Demo hardening**
- Pre-seed a clean dataset on Zo, rehearse the 2-minute run, add failure fallbacks (Playwright
  fallback + cached screenshots if a live Simulang/site run is flaky during judging).

---

## 10. Demo script (2 minutes)

1. Open the feed → "EarlyBirds found these for you" via **Exa**, each with a one-line reason.
2. Show the same hackathon appearing once despite multiple sources (Exa-powered dedup beat).
3. Show a **Telegram reminder** that **Zo** pushed on a schedule — "this ran while my laptop was closed."
4. Click **Register** → **Simulang drives a real browser**, filling the form live → review modal shows exactly what it'll submit.
5. Click **Approve** → submit → confirmation screenshot. ("You never touched the form.")
6. For the overseas event → "Register + here's your flight window" card (Exa, stretch).

---

## 11. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Exa returns noisy / non-hackathon results | Tight `outputSchema` + post-validation; domain-scoped passes for demo-critical sources; cache a known-good response for the demo |
| Exa `deep` latency/cost on live demo | Pre-run discovery so the feed is warm; use `auto`/`fast` for refresh; show cached results live |
| Simulang flaky live (focus/refId/permissions) | Re-resolve refs per step; run `simulang setup` beforehand; **Playwright fallback** + cached screenshots |
| Live sites flaky during judging | Pre-tested forms + cached screenshots fallback |
| Form auth (OAuth, team rosters) | Scope demo to forms without hard auth; Simulang handles in-browser session if needed |
| Auto-submitting unwanted registrations | Mandatory `awaiting_approval` human gate — never auto-submit |
| Zo scheduled task doesn't fire on time | Trigger one run manually pre-demo; keep the pushed Telegram message as evidence |
| Over-broad scope (all 6 features) | Demo-driven cut: Register is must-have, the rest support it |
| Contract churn breaking parallel work | Contract changes are human-reviewed and batched; agents stay in-stream |
| LLM hallucinating form values | `llm_inferred` values flagged and surfaced for review, never silently submitted |

---

## 12. Open questions

- Which 2–3 registration form providers do we guarantee for the demo? (Devpost + Google Form are the safe bets.)
- Which notification channel do we lead with for the demo — Telegram (most visual) or SMS?
- How much of trip planning is real Exa output vs. deep-linked search?
- Do we run discovery purely through Exa, or keep one direct Devpost call as a precision backup?

---

## 13. Judging-criteria fit

| Criterion | Weight | How EarlyBirds scores |
|---|---|---|
| Proof of Work — Functionality | 25% | Live end-to-end: Exa finds a real event → Simulang fills a real form → confirmation screenshot. Demonstrable, not mocked. |
| Problem fit & Market value | 25% | Real, acutely-felt pain (missed hackathons, form friction) for exactly the people judging/attending; clear path to a broader "auto-register for any event" product. |
| Design, Craft & Taste | 20% | Clean feed, "why this one" reasons, and a trust-building review/approve modal with human-in-the-loop. |
| Innovation & Creative use of sponsor tech | 30% | **Three sponsors are load-bearing** (§2.5): Exa *is* discovery, Simulang *is* the registration moment, Zo makes it run 24/7 and text you — none are bolted on. |

---

*This doc is the contract. When in doubt, the types in `@earlybirds/contracts` win.*
