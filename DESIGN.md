# EarlyBirds — Technical Design Document

> AI-powered hackathon discovery + auto-registration agent.
> "Find hackathons. Register once. Move on."

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

1. **Discover** — find hackathon listings via **Exa neural search** with structured extraction
   (Luma, Devpost, open web — all via Exa domain passes where needed).
2. **Normalize & dedup** — collapse the same event seen across multiple sources into one canonical record.
3. **Rank** — score events against a user profile and surface "why this one."
4. **Notify (deferred post-M2)** — deadline reminders via **Zo Computer** + Telegram; in-app countdowns ship in M2.
5. **Register** — **Simulang** (local, user's Chrome) + **Playwright** (Zo fallback), with **human-in-the-loop**
   approval before final submit.
6. **Plan (stretch)** — flight/hotel search via Exa for overseas events; **Devpost JSON adapter** for discovery.

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
| **Simulang** | Local visible registration runner | **`earlybirds-desktop`** on the user's machine drives their real Chrome via accessibility tree + mouse/keyboard — the "watch the agent fill the form" demo beat. Trust-first: their session, their cookies. |
| **Zo Computer** | Always-on host + delivery | Hosts the continuous pipeline (Exa discovery cron, workers, DB). Notify delivery (Telegram) **deferred post-M2** — see §13. |
| **OpenAI / Codex** | Reasoning layer | Normalization (messy text → structured fields), ranking `reasons[]`, and `llm_inferred` form-field mapping. Codex-style structured output keeps these deterministic and schema-bound. |
| **Cursor** | Build-time agent fan-out | The whole contract-first architecture (§8) exists so many Cursor agents build subsystems in parallel against frozen interfaces. |

**The flagship integration is Exa.** It collapses "scrape + parse + normalize" from a
fragile, multi-adapter effort into a single neural-search-with-schema call — which is
both the most inventive use *and* the biggest timeline win. Simulang and Zo make the
end-to-end story (find → register → remind, 24/7) actually true rather than a mockup.

How the three combine in one sentence: **Zo runs Exa-powered discovery on a schedule,
ranks results, texts you the good ones, and — on your approval — Simulang registers you.**

---

## 3. High-level architecture

```
                                    ┌──────────────────────────────────────────┐
                                    │              Frontend (Web)               │
                                    │  Next.js + React + Tailwind               │
                                    │  - Feed / ranked events                   │
                                    │  - Event detail + Exa citations (§6.3.0)  │
                                    │  - Registration flow (autofill + confirm, §6.3.1) │
                                    │  - Profile basics (§6.3.3) + voice (§6.3.4) │
                                    └────────────┬─────────────────┬─────────────┘
                                                 │ REST / SSE      │ SSE (local runs)
                                    ┌────────────▼─────────────────▼─────────────┐
  Zo Automation ──POST /internal/cron/* ──▶ │           API Gateway (BFF)            │
  (RRULE discover + deadlines)              │  Fastify + zod-validated routes        │
                                            └──┬─────────┬─────────┬──────────┬──────┘
                                               │         │         │          │
                         ┌─────────────────────▼──┐  ┌───▼───┐  ┌──▼────┐  ┌──▼─────────────────┐
                         │  Discovery svc          │  │ Notify│  │Ranking│  │ Registration svc    │
                         │  (Exa adapter)          │  │ svc   │  │ svc   │  │ (reg run state      │
                         └───────────┬─────────────┘  └───┬───┘  └───┬───┘  │  machine)           │
                                     │                    │          │    └──────────┬──────────┘
                                     ▼                    │          │               │
                              ┌─────────────┐             │          │    ┌──────────▼──────────┐
                              │   Exa API   │             │          │    │ PlaywrightRunner (Zo) │
                              │  /search    │             │          │    │  GForm fallback     │
                              │  /contents  │             │          │    └─────────────────────┘
                              │  /answer    │             │          │
                              └─────────────┘             │          │
            ┌──────────────────────────────────────────────▼──────────▼──────────────────────┐
            │                     Shared infra — hosted on Zo Computer                        │
            │  Postgres · Redis/BullMQ · Object storage · Zo Automations · MCP ↔ Cursor      │
            └─────────────────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────── User machine (local) ─────────────────────────┐
  │  earlybirds-desktop  →  SimulangRunner  →  user's Chrome (visible)     │
  │       ▲ SSE / RegistrationProgressEvent back to Frontend               │
  │       └── run commands from Registration svc via Gateway                │
  └───────────────────────────────────────────────────────────────────────┘
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
  // Voice onboarding (§6.3.4) — for drafts + ranking; past work ≠ future topic.
  promptAnswers: Record<string, string>;  // Hinge prompt ids → answers
  writingSamples: { text: string; purpose: "voice" }[];
  exploreOutsideLane?: string;          // optional branching prompt (§6.3.4)
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
  fillTier?: "profile" | "structured" | "generative";  // fill strategy (§6.3.5)
}

// A single attempt to register a user for an event.
interface RegistrationRun {
  id: string;
  userId: string;
  hackathonId: string;
  runner: "playwright" | "simulang";
  status: "queued" | "introspecting" | "filling" | "needs_input"
        | "captcha_encountered" | "oauth_redirect" | "awaiting_approval"
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
  source: "profile" | "default" | "llm_inferred" | "llm_draft";
  // llm_draft = generative essay/long-text; event-themed, voice from writingSamples (§6.3.5)
}

// SSE events streamed to the autofill reveal screen (§6.3.1).
type RegistrationProgressEvent =
  | { type: "step_started"; step: string; runner: RegistrationRun["runner"] }
  | { type: "field_filling"; field: string; label: string }
  | { type: "field_filled"; field: string; value: string; source: PlannedAction["source"] }
  | { type: "paused"; reason: "needs_input" | "captcha_encountered" | "oauth_redirect" }
  | { type: "awaiting_approval"; plannedActions: PlannedAction[] }
  | { type: "screenshot"; url: string };  // debug/fallback; not the primary UI surface

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
   spanning Devpost, Luma, university pages, and the open web in one pass. Domain-scoped passes
   (`includeDomains: ["devpost.com"]`, `["lu.ma"]`) cover Devpost/Luma without a separate adapter.
   Build first; it carries all discovery for the hackathon.
2. **LumaAdapter** — optional thin wrapper: `includeDomains: ["lu.ma"]` Exa pass. Luma is our
   **preferred registration demo target** (verified): RSVP needs only **name + email, no forced login**,
   and the form layout is consistent across events — so the runner is rock-solid on it. *Avoid*
   approval-gated or crypto/token-gated Luma events (some require wallet verification or host approval).

We **drop hand-rolled HTML scraping and the LinkedIn adapter** from the plan. Exa covers the open web
(including Devpost/Luma pages and LinkedIn-surfaced content) without per-site HTML parsers.

**Deferred — DevpostAdapter (post-hackathon):** direct `GET devpost.com/api/hackathons` precision pass
(undocumented JSON endpoint the site uses; no official API). Useful later for Devpost-heavy coverage
without Exa cost; not in M0–M4 scope.

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

- **Phase 1 (deterministic):** theme overlap with `interests[]` + `promptAnswers` (what they want
  *next*, not only past projects), location/travel fit, deadline proximity, eligibility filter.
  Optional **exploration boost** for events outside the user's usual lane when `exploreOutsideLane`
  is set (§6.3.4) — surface stretch matches, don't filter-bubble.
- **Phase 2 (LLM reasons):** short human-facing `reasons[]`. Allow stretch framing ("Outside your
  usual lane — fintech, 2 days") — never pigeonhole ("Perfect for game developers like you").
- **Optional:** embed `interests` + event description into a vector index for semantic match.

Output is cached per (user, event) and invalidated on profile edit or event update.

### 5.4 Registration service + runners

The crown jewel. Modeled as an explicit **state machine** (`RegistrationRun.status`).

```
queued → introspecting → filling ⇄ needs_input / captcha_encountered / oauth_redirect
                              │
                              ▼
                    awaiting_approval → submitting → succeeded
                              │              │
                              └── cancelled  └── failed
```

- **introspecting** — confirm/refresh `FormFieldSpec[]` against the live page.
- **filling** — classify each field into a **fill tier** (§6.3.5): profile fields copy exact;
  structured fields reuse `formAnswers` / prompts; generative fields get an **event-themed draft**
  (voice from `writingSamples`, topic from *this* hackathon — not past project domain). Map to
  `PlannedAction[]`. Unmapped required fields flagged. All generative + inferred values surfaced
  at review — never silently submitted.
- **needs_input** — pause: a required field has no profile mapping. UI prompts the user inline;
  resume → `filling`.
- **captcha_encountered** — pause: runner hit a CAPTCHA. UI tells user to complete it in the
  browser, then Resume → `filling`.
- **oauth_redirect** — pause: form requires in-browser OAuth. UI tells user to sign in, then
  Resume → `filling`.
- **awaiting_approval** — **hard stop.** Frontend shows the confirm gate on the registration
  screen (§6.3.1): diff of `plannedActions`, field values in mono, `llm_inferred` flagged. Nothing
  is submitted without explicit user approval. This is a product feature (trust) and a safety rail.
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

- **SimulangRunner (local, sponsor headline)** — runs on the **user's machine** via a lightweight
  **`earlybirds-desktop`** agent (Engineer B). Drives the user's real Chrome with their cookies/session
  intact — the trust story. Registration svc on Zo assigns `runner: "simulang"` runs to the connected
  desktop agent; `RegistrationProgressEvent` SSE streams back to the web UI (§6.3.1). Demo: projector
  shows web UI + local Chrome window side-by-side. API (pinned `@simular-ai/simulang-js` `6.0.1`):

```ts
import { App, FocusPolicy, Visibility, TraversalOrder, ariaRoleToString } from '@simular-ai/simulang-js'

// 1. Open the registration page in the user's real Chrome window.
const inst = App.exactName('Google Chrome').open(formUrl, FocusPolicy.Steal, Visibility.Show, true);
inst.enableAccessibility();                 // Chrome ships a11y off by default

// 2. For each FormFieldSpec, locate the control by *concept text* (robust to DOM churn).
const [node] = inst.scoredSearch(TraversalOrder.BreadthFirst, 50_000, false, field.label, 0.75);

// 3. Act on it. Calls are SYNCHRONOUS (napi-rs) — try/catch, no await on native calls.
node.setValue(value);                       // text/email/textarea
node.activate();                            // buttons / checkboxes / submit
```

```ts
// Local bridge contract (earlybirds-desktop ↔ Gateway).
interface LocalSimulangBridge {
  connect(userId: string): Promise<{ sessionId: string }>;
  executeRun(runId: string): Promise<void>;
  // Desktop agent pushes events; Gateway relays to GET /registrations/:id/stream
}
```

Correctness notes verified from the shipped `CLAUDE.md` / `index.d.ts`: native calls are
**synchronous** (errors throw, no Promises); re-run `scoredSearch` per step rather than caching
nodes across tree rebuilds; `AriaRole` is numeric (use `ariaRoleToString`); coordinates are physical
pixels; `App.open` focus/visibility are advisory. The **concept-text search** (`scoredSearch`) is the
key win — we match fields by their human label ("Full name", "GitHub URL") instead of brittle
selectors, so the same runner generalizes across unfamiliar forms. Needs `OPENROUTER_API_KEY` only
if it falls back to a VLM for grounding.
- **PlaywrightRunner (server on Zo)** — headless workhorse on Zo for **Google Form fallback**.
  Fast, scriptable, no desktop install. Never used for the primary Luma/Simulang demo path.

Runner choice is a per-event policy (`Hackathon.registration.provider` → preferred runner). For the
demo: **Luma → Simulang (local)**, **GForm → Playwright (Zo)**. Playwright remains the safety net if
a live Simulang run gets flaky during judging.

### 5.5 Notify service — *delivered via Zo Computer*

- Computes countdowns from `registrationClosesAt`.
- Emits reminders at T-7d / T-2d / T-12h thresholds, plus a "new match found" push.
- Maintains a `pending_notifications` table; the service's job is only to *decide what's worth
  sending* and write a row. **Actual delivery is handed to Zo** (Telegram primary — see §13;
  SMS/email also supported). Implementation **deferred post-M2**; infra pattern in §5.7.
- Re-fires when a dedup/change event moves a deadline.

### 5.6 Trip planning (stretch) — *Exa for logistics*

- Triggered on successful registration for an `in_person` event outside `locationBase.country`.
- Uses **Exa `/search` + `/answer`** to pull flight-window options, visa notes, and nearby stays
  (e.g. "cheapest flights SIN→SGN around `{dates}`", grounded with citations), or deep-links a
  booking search with prefilled dates/airports.
- Demo-friendly minimum: a "Register + here's your flight window" card. No booking, just search.

### 5.7 Always-on runtime — *Zo Computer* (verified mechanics)

Zo turns "continuous discovery" from a slide claim into a real system property. Based on Zo's
actual primitives (Services, Sites, Automations, Secrets, MCP), here's exactly how we use each —
and, importantly, the **division of labor**: our code owns deterministic logic; Zo owns
hosting, scheduling, and delivery.

| Zo primitive | What it is | How EarlyBirds uses it |
|---|---|---|
| **Services** | Long-running processes on your Zo Linux box, with permanent HTTPS URLs, auto-restart, custom domains | Hosts the **API gateway + BullMQ workers + Postgres + Redis** as `process`-mode services (`node dist/server.js`, `node dist/worker.js`). This is the always-on backend. |
| **Sites** | Static / app hosting on `*.zo.space` / `zocomputer.io` | Hosts the **Next.js frontend** — the public demo URL. |
| **Automations** | An *AI prompt run on a schedule* (RFC-5545 RRULE) by a Zo instance with all its tools, with an optional `delivery_method` | The **discovery cron** and the **deadline sweep**. The automation doesn't reimplement our logic — it **calls our service endpoint** and lets Zo deliver the result. |
| **Secrets** | `Settings > Advanced`, never shown in chat | `EXA_API_KEY`, `OPENROUTER_API_KEY`, `OPENAI_API_KEY`, DB creds. |
| **MCP server** | Connects Cursor / Codex / Claude Code to the Zo box | Our Cursor agents read/write project files, run shell, and inspect live runtime state while building. Zo can also orchestrate Codex CLI headless. |

**Key design decision — keep logic in our service, not in the automation prompt.** Zo automations
are non-deterministic LLM runs (and metered). So the automation stays dumb and reliable: it just
hits an internal endpoint and conditionally notifies. Example automation we create on Zo:

> **Schedule:** `RRULE:FREQ=HOURLY;INTERVAL=6`
> **Instruction:** "POST `https://earlybirds.{our}.zo.space/internal/cron/discover`. It returns
> JSON `{ newMatches: number, digest: string }`. If `newMatches > 0`, send me the `digest` over
> Telegram. Otherwise do nothing."
> **delivery_method:** `telegram`

This gives us a **conditional-notification** pattern (Zo's recommended idiom — "ping me only when
something's true") with our deterministic Exa+rank+dedup pipeline doing the real work behind the
endpoint. Same pattern for the deadline sweep (`/internal/cron/deadlines`).

So Zo is doing three concrete jobs: **(1) hosting** the whole stack with a real URL, **(2) firing**
the discovery/deadline schedules with no laptop open, and **(3) delivering** notifications to the
user's phone — none of which we'd otherwise get for free on a hackathon timeline.

---

## 5.8 Service integration & end-to-end data flow

The services never call each other's internals — they integrate through **two seams only**:
(1) a **typed job queue** (BullMQ) for async work, and (2) a small set of **typed HTTP endpoints**
on the gateway. This is what keeps the three workstreams independent.

### Queue topology (the async backbone)

Every arrow below is a typed job on a named BullMQ queue. Producer → `queue` → consumer:

| Queue | Payload | Produced by | Consumed by |
|---|---|---|---|
| `discovery.run` | `{ adapter: "exa" \| "luma", cursor? }` | Zo cron endpoint | Discovery svc (Exa) |
| `normalize.listing` | `RawListing` | Discovery svc | Normalize/dedup svc |
| `rank.recompute` | `{ userId }` or `{ hackathonId }` | Normalize svc, Profile edits | Ranking svc |
| `form.introspect` | `{ hackathonId, formUrl }` | Normalize svc | Discovery svc (Exa `/contents`) |
| `registration.run` | `{ runId }` | Gateway (user clicks Register) | Registration svc → runner |
| `notify.enqueue` | `{ userId, kind, payloadRef }` | Ranking svc, deadline sweep | Notify svc (writes row) |

Rule: a service only ever **reads its own tables**; everything else arrives as a job payload or a
REST response. Mock the producer and a stream can be built/tested in total isolation.

### Flow A — continuous discovery → notification (runs on Zo, no user present)

```
Zo Automation (RRULE every 6h)
   │  POST /internal/cron/discover
   ▼
Gateway ──enqueue──▶ discovery.run ──▶ Discovery svc
   │                                      │  Exa /search (deep + outputSchema)
   │                                      ▼
   │                              normalize.listing ──▶ Normalize/dedup svc
   │                                      │  upsert canonical Hackathon (+SourceRef)
   │                                      ▼
   │                              rank.recompute ──▶ Ranking svc
   │                                      │  score + reasons; if score ≥ threshold:
   │                                      ▼
   │                              notify.enqueue ──▶ Notify svc (writes pending row + digest)
   ◀──────────────── returns { newMatches, digest } ──────────────────────────────┘
   ▼
Zo delivers digest via Telegram  (only if newMatches > 0)
```

The endpoint is **synchronous-enough**: it kicks the pipeline and waits (with a short timeout) for
the resulting digest so Zo can deliver it in the same run. If discovery is slow, the endpoint
returns what's already pending and the next run catches up — the queue makes this safe.

### Flow B — user-initiated registration (the demo path)

```
User clicks "Register" (frontend)
   │  POST /registrations { userId, hackathonId }
   ▼
Gateway → Registration svc: create RegistrationRun (status=queued) ──▶ registration.run
   ▼
Registration svc state machine:
   introspecting ─ pick runner: Luma → Simulang (local earlybirds-desktop), GForm → Playwright (Zo)
        │           refresh FormFieldSpec[] (Exa /contents cached + live confirm)
   filling ─────── map UserProfile.formAnswers → PlannedAction[]; flag llm_inferred
        │           Simulang: desktop agent drives user's Chrome; SSE → form mirror in UI
   awaiting_approval ──▶ SSE push to frontend ◀── HARD STOP (confirm gate, §6.3.1)
        │  user clicks Confirm & submit  →  POST /registrations/:id/approve
   submitting ──── runner.submit(); capture confirmation screenshot
   succeeded ────▶ (if in_person & abroad) enqueue trip-planning (Exa)
```

Live progress streams to the UI over **SSE** (`GET /registrations/:id/stream`) as
`RegistrationProgressEvent` payloads (§4) onto the **autofill reveal screen** (§6.3.1):
introspection → fill → confirm gate in one view — not a separate modal overlay. The
**`awaiting_approval` gate is the only human touch-point** and the trust beat.

### The integration contract surface (frozen on Day 0)

- **Queues + payloads** — the table above, as typed job schemas in `@earlybirds/contracts`.
- **Gateway REST** — `POST /registrations`, `POST /registrations/:id/approve`, `GET /registrations/:id/stream` (SSE, `RegistrationProgressEvent`), `GET /feed?userId=`, `PUT /profile`, plus internal `POST /internal/cron/{discover,deadlines}` (called only by Zo automations, shared-secret header).
- **Runner interface** — `RegistrationRunner` (§5.4) + `LocalSimulangBridge` for desktop agent.
- **Source adapter interface** — `SourceAdapter` (§5.1), so Exa/Luma are swappable; Devpost adapter deferred.

If it's not in this surface, services don't know about each other. That's the whole trick that lets
3 people + many agents build simultaneously.

---

## 6. Product & UI design

Engineer C owns implementation. SSE-driven agent activity (§5.8 Flow B) renders on these screens.
Visual spec is frozen here so frontend agents don't improvise typography or color.

### 6.1 Design personality

- **Calm, confident, trustworthy assistant.** Because the product acts on the user's real,
  logged-in accounts, trust is the core job — the design earns it through restraint, not flourish.
- **Reference points:**
  - *Resting state* → Linear: quiet, restrained, one accent.
  - *Agent working* → Perplexity narrating "reading sources": precise, slightly technical, shows its work.
  - *Confirm-before-submit* → Cursor showing a diff before you approve.
- **Avoid the default "AI project" look:** no Inter/Geist, no purple-to-blue gradient, no
  stock-component sameness.

Aligns with §2 principle *Registration is human-gated by default* — personality and architecture
both treat trust as load-bearing.

**Explicit non-goals:** no registration **chatbot** or conversational sidebar — users edit drafts
inline on the confirm gate (§6.3.1). Optional **Regenerate / Shorter** micro-actions on draft fields
only; no open-ended chat thread.

### 6.2 Design tokens

#### Type

- **UI / interface / wordmark:** Hanken Grotesk (weights 400, 500)
- **Agent activity, field values, system status, countdowns, confirmation codes:** IBM Plex Mono
  (weights 400, 500)
- **Core rule:** anything the **human** reads is Hanken; anything the **agent** produces is mono.
  This human/machine type contrast is intentional and load-bearing — do not blur it.

Google Fonts import:

```css
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

#### Color

| Token | Hex | Use |
|---|---|---|
| Accent (primary actions, checks, active states) | `#1D9E75` | Confirm buttons, field-complete checks, "ready" shield |
| Accent dark (button fills, logo mark) | `#0F6E56` | Filled buttons, bird mark |
| Accent tint (pills, light fills) | `#E1F5EE` | Status pills, subtle highlights |
| Success / "registered" **only** | fill `#FBEEDB`, text `#7A4A06`, mark `#C97B14` | Sunrise amber — hero block on `succeeded` (§6.3.2) |
| Everything else | Neutral grays / system defaults | Backgrounds, borders, body text |

No gradients anywhere.

#### Rules

- **Amber appears exactly once** in the entire flow: the instant registration succeeds. Never
  earlier — not on "ready to review." Reserving it is what gives it impact.
- **One accent per screen.** If a screen seems to need a second color, it's probably the success
  state — otherwise reconsider.
- **Logo:** geometric bird **mark**, never a mascot with a face. Must read at 16px.
- **Countdown numerals:** IBM Plex Mono so digits don't jitter as they tick (see §6.3.1 event context).
- **Motion:** reserved for moments that matter (autofill reveal; success beat) — never decoration.
  Success animation plays **once**, never loops.
- **Copy:** carries the "early bird" personality on the success moment only (e.g. "You're in. Worm
  secured."). Stay calm elsewhere — no cheerleading during fill or review.
- **`llm_inferred` at review:** small amber **text** chip on the field row during `awaiting_approval`
  only — distinct from the sunrise hero amber block (§6.3.2).

### 6.3 Key screens

#### 6.3.0 Event detail + Exa citation drawer

Feed card → event detail. Primary CTA: **Register**. Sponsor-visible Exa beat for demo step 2.

**Layout:**
- Event title, location, mono deadline countdown, "why this one" reasons (Hanken)
- **"Via Exa"** badge on cards where `SourceRef.source === "exa"`
- Expandable **"How we found this"** drawer:
  - Exa query snippet used for discovery (mono, truncated)
  - 2–3 `exaGrounding[]` citation URLs with field labels
  - Optional confidence chip per extracted field
- If merged from multiple sources: **"Merged from N sources"** badge (dedup)

Drawer copy stays calm/technical — "Sources" not "AI magic."

#### 6.3.1 Autofill reveal (demo centerpiece)

Calm Linear-style frame at rest — the only motion at idle is a small "auto-registering" status
spinner in the header status pill.

**Layout (top → bottom):**

1. **App header** — bird mark + wordmark (Hanken), status pill (accent tint)
2. **Event context** — event name + location (Hanken); registration deadline countdown (mono)
3. **Two columns**
   - **Left — registration form (form mirror):** in-app mirror fed by SSE + `plannedActions` — not a
     raw browser screenshot. Fields populate live as the agent fills; value text types in (mono);
     each completed field gets a teal (`#1D9E75`) check. **Profile** and **structured** fields show
     a mono source chip (`profile` / `default`). **Generative** (essay) fields show a **Draft —
     tailored to this event** chip (amber text only, §6.2) and render as an editable textarea at
     `awaiting_approval` — never a chat thread. Optional micro-actions on draft fields only:
     **Regenerate** · **Shorter** (re-runs draft LLM with same anti-bias rules, §6.3.5).
     **Simulang runs locally** (`earlybirds-desktop`) driving the user's Chrome beside the UI; form
     mirror reflects what the agent typed. `RegistrationRun.artifacts` screenshots are debug/fallback only.
   - **Right — agent activity feed:** mono step log driven by `RegistrationProgressEvent` (§4),
     Perplexity-style — e.g. "reading form structure → found N fields → matching to your profile →
     filling · {field}"
4. **Footer — confirm gate** — locked/dimmed **Confirm & submit** until fill completes; footer note
   flips from lock icon + "Nothing is submitted until you confirm" → teal shield-check + "Ready —
   review, then confirm"

**Behavior (maps to `RegistrationRun.status`):**

| Phase | Status | UI |
|---|---|---|
| Agent working | `introspecting` → `filling` (incl. pause states) | Feed steps through; form fields populate; Confirm locked |
| Human review | `awaiting_approval` | All fields filled + checked; generative fields editable; Confirm unlocked; user reviews diff |
| Submit | `submitting` → `succeeded` | Confirm shows spinner → navigate to §6.3.2 |

Human-in-the-loop is **mandatory** — the agent never auto-submits (§2, §5.4).

#### 6.3.2 Registered success

The **one amber moment.** Color discipline: amber = emotion (hero only); teal = every action.
They never overlap on this screen.

**Layout (top → bottom):**

1. **Celebratory hero** (sunrise amber block) — bird mark flies in **once** (non-looping); headline
   "You're in. Worm secured." (Hanken) + event name; mono confirmation code
2. **Confirmation details card** (neutral) — when / where / confirmation email or status;
   **Add to calendar** (teal) · **View confirmation**
3. **Next matches strip** (quiet, neutral) — 1–2 upcoming hackathons with mono deadlines and
   understated Register buttons; rides momentum without competing with the celebration

Maps to `RegistrationRun.status === "succeeded"`. Confirmation code: runner-captured reference
from the provider when available, else a short hash of `runId` for display.

#### 6.3.3 Profile basics (Step A — "fill once, never again")

First-run or incomplete profile. Most-used screen in the real product; demo can pre-seed and skip.
Step A of onboarding — factual fields only; voice prompts are Step B (§6.3.4).

**Layout:**
- Headline (Hanken): "Fill once — EarlyBirds reuses these on every form."
- Completeness meter (e.g. "4 of 6 fields")
- Canonical field list mapped to `UserProfile.formAnswers`: name, email, school, skills, GitHub, etc.
- Values the user enters display in Hanken; saved keys shown in mono in a subtle sidebar if helpful
- Primary CTA: **Continue** (teal) → §6.3.4. Secondary: skip for now (returns to feed; generative
  drafts and stretch ranking degraded until voice step complete)

Incomplete profile gates Register with inline prompt linking here.

#### 6.3.4 Your voice (Step B — Hinge-style prompts)

Card-stack onboarding for **how they write** and **what they want next** — not a domain lock-in.
Optional collapsed paste at bottom for users who already have essay drafts.

**Core prompts (3 cards, swipe or tap through):**

| Prompt id | Question (Hanken) | Input | Stored as |
|---|---|---|---|
| `interests_next` | What do you want to hack on next? | Chip multi-select + "Something new to me" | `interests[]` + `promptAnswers.interests_next` |
| `one_liner` | One line about you | Short text | `formAnswers.bio` + `promptAnswers.one_liner` |
| `proud_project` | Something you've built that represents how you work | Voice or text (≥1 sentence) | `writingSamples[]` (`purpose: "voice"`) + `promptAnswers.proud_project` |

**Optional 4th card:**

| `explore_outside_lane` | What would you try outside your usual lane? | Short text | `exploreOutsideLane` + `promptAnswers.explore_outside_lane` |

Feeds ranking exploration boost (§5.3) — surfaces stretch matches with honest reason copy.

**Optional paste (collapsed):** "Already have a bio or project write-up?" → textarea appends to
`writingSamples` — boosts draft quality, **not required** for registration.

**UX:** Perplexity/Hinge calm — one question per card, progress dots, no mascot. Primary CTA on
last card: **Save & find hackathons** (teal). Skip voice step allowed (same degradation as §6.3.3).

#### 6.3.5 Field fill tiers & draft generation policy

Every mapped form field gets a **fill tier** (`FormFieldSpec.fillTier` → drives `PlannedAction.source`).

| Tier | Examples | Behavior | `PlannedAction.source` |
|---|---|---|---|
| **Profile** | name, email, GitHub | Exact copy from `formAnswers` | `profile` |
| **Structured** | school, skills, t-shirt size | Reuse `formAnswers` / prompt answers; sensible `default` if missing | `profile` or `default` |
| **Generative** | "Why this hackathon?", project idea essays | Event-themed **draft** at fill time; user edits at review | `llm_draft` |

**Anti-bias / branching rules (non-negotiable for drafts and ranking):**

1. **Voice ≠ topic.** `writingSamples` and `proud_project` inform *tone, credibility, and sentence
   rhythm* — not the hackathon's theme. A user who built games must still get a fintech- or
   climate-themed draft when *this event* is fintech/climate.
2. **Forward-looking interests.** `interests_next` and event metadata drive draft *subject*; past
   projects must not pigeonhole ("Perfect for game devs").
3. **Ranking honesty.** Stretch matches get explicit reason copy ("Outside your usual lane — …");
   never hide exploration behind false precision.
4. **Draft LLM system rule (Codex):** *"Past work informs voice and credibility; the current
   hackathon informs topic. Never infer project type from history alone."*
5. **Human gate.** All `llm_draft` values appear in the form mirror at `awaiting_approval` as
   editable text — user confirms or edits before submit. No registration chatbot (§6.1).

**Inference vs draft:** Short factual gaps (e.g. t-shirt size unset) may use `llm_inferred` with
review flag; long prose always uses `llm_draft` + **Draft — tailored to this event** chip.

### 6.4 UI state matrix

Frontend states the UI must handle. Copy follows §6.2 type/color rules.

| State / trigger | User sees | Primary action |
|---|---|---|
| `empty_feed` | "No matches yet — searching hackathons." Last query if known (Hanken). | Edit profile |
| `discovery_loading` | Skeleton cards + "Searching via Exa…" | — |
| `queued` / `introspecting` | Agent feed (mono): "Reading form structure…" Status pill: auto-registering. | Cancel run |
| `filling` | §6.3.1 two-column view; fields populate with mono values + teal checks; Confirm locked | Cancel run |
| `needs_input` | "This form asks for **{field}** — we don't have it yet." Inline input in form column. | Provide value → Resume |
| `captcha_encountered` | "Complete the CAPTCHA in your browser, then click Resume." | Resume |
| `oauth_redirect` | "Sign in to **{provider}** in your browser, then click Resume." | Resume |
| `awaiting_approval` | §6.3.1 footer: shield-check "Ready — review, then confirm"; Confirm unlocked; `llm_inferred` flagged (amber **text** chip); `llm_draft` fields show **Draft — tailored to this event** chip + editable textarea + Regenerate · Shorter | Confirm & submit · Cancel |
| `submitting` | Confirm button spinner (teal) | — |
| `succeeded` | §6.3.2 amber hero + details card + next matches | Add to calendar · Back to feed |
| `failed` | Last artifact screenshot + error stage (Hanken message, mono error code if any) | Open form manually · Retry |
| `cancelled` | "Registration cancelled." | Back to event |

---

## 7. Tech stack

| Layer | Choice | Why |
|---|---|---|
| **Discovery (sponsor)** | **Exa** `/search` + `/contents` + `/answer` | neural search with `outputSchema` + domain passes for Luma/Devpost |
| **Always-on host (sponsor)** | **Zo Computer** | persistent Linux server, scheduled tasks, TG/SMS/email delivery, MCP ↔ Cursor |
| **Registration (sponsor)** | **simulang-js** (local) + Playwright (Zo) | Simulang = user's visible Chrome via `earlybirds-desktop`; Playwright = GForm fallback |
| **Reasoning (sponsor)** | **OpenAI / Codex** (OpenRouter for Simulang grounding) | normalization, ranking reasons, form-field inference |
| **Build (sponsor)** | **Cursor** agents | parallel contract-first development |
| Language | TypeScript everywhere | one contract package, shared by FE/BE/runners |
| Frontend | Next.js + React + Tailwind + **Hanken Grotesk** / **IBM Plex Mono** (§6.2) | fast, demoable, SSR; design tokens frozen in §6 |
| API | Fastify + zod | schema-validated, generates the typed client |
| Queue | BullMQ on Redis | simple, observable, parallel workers |
| DB | Postgres + Prisma | canonical store, migrations, JSON columns for raw |
| Form introspection | Playwright + Exa `/contents` | clean page text → `FormFieldSpec[]` |
| Storage | S3-compatible (on Zo) | screenshots, raw payload snapshots |
| Vector (opt) | pgvector | semantic ranking |

---

## 8. Parallelization strategy

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

- One agent on the **Exa query/outputSchema tuning** + one on **Luma domain-scoped pass**.
- One agent per **FormFieldSpec mapping heuristic** + a test agent writing golden tests.
- One agent on **SimulangRunner**, another on **PlaywrightRunner**, both behind `RegistrationRunner`.
- One agent on the **frontend autofill reveal + confirm gate** (§6.3.1), another on the **feed**, sharing the typed API client.
- One agent wiring **Zo scheduled tasks + Telegram/SMS delivery**.

Rule: **agents only touch files inside their stream's directory**; contract edits go through a human.
This keeps parallel agent output conflict-free. Cursor agents can also reach the live Zo box via its
**MCP server** to inspect runtime state while building.

---

## 9. Work split (3 engineers)

Each engineer owns a vertical slice end-to-end so no one is blocked waiting for "the backend" or
"the frontend." Shared contracts package is co-owned.

### Engineer A — Discovery & Data (owns **Exa** + **Zo** runtime)
- `@earlybirds/contracts` (lead author; others review).
- **ExaAdapter**: query design, `outputSchema`, grounding → `RawListing[]` (the discovery engine).
- Luma domain-scoped Exa pass (`includeDomains: ["lu.ma"]`).
- Normalization & dedup service + golden-file test suite.
- Exa `/contents` form-text extraction feeding `FormFieldSpec[]`.
- **Zo Computer** setup: deploy backend as Zo **Services** + frontend as a **Site**; create the
  discovery/deadline **Automations** (RRULE → `/internal/cron/*` → conditional Telegram); store
  sponsor keys as **Secrets**; wire **MCP** for the team.
- `/internal/cron/{discover,deadlines}` endpoints (the seam Zo automations call).
- Postgres schema + Prisma migrations.

### Engineer B — Registration & Runners (owns **Simulang**, the differentiator)
- Registration service + state machine + **`RegistrationProgressEvent` SSE** (§4, §6.3.1).
- `RegistrationRunner` interface + **`earlybirds-desktop`** local agent + `LocalSimulangBridge`.
- **SimulangRunner** — local visible browser demo beat (sponsor headline).
- PlaywrightRunner on Zo (Google Forms) — reliable fallback.
- PlannedAction generation + fill-tier classification (§6.3.5) + Codex/LLM **draft** generation
  (anti-bias rules) + short-field `llm_inferred` with redaction.

### Engineer C — Frontend, API, Ranking & Notify (owns **Zo delivery**)
- API gateway (Fastify + zod) + typed client generation.
- Ranking service (deterministic phase + LLM/Codex reasons).
- Frontend: feed, **event detail + Exa drawer** (§6.3.0), **autofill reveal** (§6.3.1),
  **registered success** (§6.3.2), **profile basics** (§6.3.3), **voice onboarding** (§6.3.4).
- Notify service (Zo **Telegram** delivery — deferred post-M2; see §13).

### Co-owned / glue
- Contracts package (A leads, all review).
- Infra: docker-compose for local dev (Postgres + Redis + MinIO); Zo for the always-on deploy.
- Sponsor API keys: `EXA_API_KEY`, `OPENROUTER_API_KEY` (Simulang), OpenAI key, Zo account.
- Demo script + seed data (everyone, day before).

---

## 10. Milestones (hackathon timeline)

**M0 — Foundations (first few hours)**
- Freeze `@earlybirds/contracts`. Stand up docker-compose (Postgres/Redis/MinIO) for local dev.
- Provision the **Zo Computer** box; get `EXA_API_KEY` working with a first structured `/search`.
- Seed fixtures: cache one real Exa response + 1 recorded Google Form DOM for offline dev.
- Stub services that read/write the contract so every stream compiles end-to-end.

**M1 — Vertical slice (Exa happy path)**
- **ExaAdapter** `deep` search + `outputSchema` → normalize → real events in DB.
- Ranking returns events with reasons.
- Frontend feed + event detail with Exa drawer stub (§6.3.0); "Register" button.
- PlaywrightRunner introspects + fills a Google Form, stops at `awaiting_approval`.

**M2 — The registration moment**
- **`earlybirds-desktop`** connects; SimulangRunner fills Luma locally.
- Autofill reveal screen (§6.3.1): agent feed + form mirror + confirm gate; stops at `awaiting_approval`.
- Confirm & submit → registered success screen (§6.3.2). **This is the demo.**
- Profile basics (§6.3.3) — can pre-seed for demo; voice onboarding (§6.3.4) optional for M2.
- Notify countdown on the event card (mono numerals, §6.2).

**M3 — Sponsor depth & polish**
- **Voice onboarding** (§6.3.4) + field fill tiers / draft policy wired end-to-end (§6.3.5).
- One feed card pre-seeded showing "Merged from 3 sources" (dedup result — not run live).
- Exa citation drawer live on event detail (§6.3.0).
- **Zo Automation** hits `/internal/cron/discover` on schedule (Exa adapter).

**M4 — Demo hardening + deferred beats**
- Pre-seed a clean dataset on Zo, rehearse the 2-minute run, add failure fallbacks (Playwright
  fallback + cached screenshots if a live Simulang/site run is flaky during judging).
- **Telegram notify** via Zo (§13 — deferred): pre-triggered message or live push for **[ZO PAUSE]**.
- **DevpostAdapter** (`devpost.com/api/hackathons`) — post-hackathon if time.

---

## 11. Demo script (2 minutes)

1. Open the feed → ranked events with "why this one" reasons; **Via Exa** badges where applicable.
2. **[EXA PAUSE]** Event detail → expand **"How we found this"** drawer → show grounding citations (§6.3.0).
   Pre-seeded **"Merged from 3 sources"** badge — don't run dedup live.
3. **[ZO PAUSE — deferred, §13]** Show pre-triggered **Telegram** reminder if wired by M4; otherwise skip live.
4. **[SIMULANG PAUSE]** Click **Register** → user's local Chrome opens; autofill reveal (§6.3.1): agent feed +
   form mirror populate with mono values + teal checks.
5. **[TRUST PAUSE]** Confirm gate unlocks → review `llm_inferred` or **`llm_draft`** essay field
   (editable textarea, "Draft — tailored to this event") → "Ready — review, then confirm."
6. **[HERO]** Confirm & submit → registered success (§6.3.2): amber hero, "You're in. Worm secured.", mono confirmation code.

*(Trip planning — backup slide only, not live. See §5.6.)*

---

## 12. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Exa returns noisy / non-hackathon results | Tight `outputSchema` + post-validation; domain-scoped passes for demo-critical sources; cache a known-good response for the demo |
| Exa `deep` latency/cost on live demo | Pre-run discovery so the feed is warm; use `auto`/`fast` for refresh; show cached results live |
| Simulang flaky live (focus/refId/permissions) | Re-resolve refs per step; run `simulang setup` beforehand; ensure `earlybirds-desktop` connected; **Playwright fallback** |
| Live sites flaky during judging | Pre-tested forms + cached screenshots fallback |
| Form auth (OAuth, team rosters) | Scope demo to forms without hard auth; Simulang handles in-browser session if needed |
| Auto-submitting unwanted registrations | Mandatory `awaiting_approval` human gate — never auto-submit |
| Zo scheduled task doesn't fire on time | Trigger one run manually pre-demo; keep the pushed Telegram message as evidence |
| Over-broad scope (all 6 features) | Demo-driven cut: Register is must-have, the rest support it |
| Contract churn breaking parallel work | Contract changes are human-reviewed and batched; agents stay in-stream |
| LLM hallucinating form values | `llm_inferred` values flagged and surfaced for review, never silently submitted |
| Draft essays biased toward past project domain | §6.3.5 anti-bias rules + separate voice/topic inputs; `llm_draft` always editable at review; demo pre-seed a cross-domain event if live draft is risky |

---

## 13. Open questions

**Decided**
- ~~Registration form providers for demo?~~ **Luma** (Simulang local) + **Google Form** (Playwright on Zo).
  Devpost deferred for *registration* (auth friction).
- ~~Simulang placement?~~ **Local agent** (`earlybirds-desktop`) on user's machine — their Chrome, their cookies.
- ~~Discovery sources?~~ **Exa only** for hackathon (domain passes for Luma/Devpost content). Direct Devpost JSON adapter **deferred post-hackathon**.
- ~~Exa citation drawer?~~ **Yes** — specced in §6.3.0.
- ~~Profile setup screen?~~ **Yes** — §6.3.3 (basics) + §6.3.4 (voice prompts).
- ~~Essay / long-text fields?~~ **Event-themed drafts** (`llm_draft`) with anti-bias policy (§6.3.5); no registration chatbot.
- ~~Notification channel?~~ **Telegram** via Zo — **deferred post-M2** (M4 / optional demo beat).

**Deferred (post-hackathon / M4 if time)**
- DevpostAdapter — `GET devpost.com/api/hackathons` (undocumented; no official API)
- Telegram push via Zo (**[ZO PAUSE]** demo beat)

**Still open**
- *(none blocking M2 demo path)*

---

## 14. Judging-criteria fit

| Criterion | Weight | How EarlyBirds scores |
|---|---|---|
| Proof of Work — Functionality | 25% | Live end-to-end: Exa finds a real event → Simulang fills a real form → confirmation screenshot. Primary demo path is **pre-warmed** (cached Exa feed + pre-tested Luma form); live discovery is a secondary beat. |
| Problem fit & Market value | 25% | Real, acutely-felt pain (missed hackathons, form friction) for exactly the people judging/attending; clear path to a broader "auto-register for any event" product. |
| Design, Craft & Taste | 20% | Hanken/mono type system (§6.2), Exa citation drawer (§6.3.0), autofill reveal + amber success hero (§6.3), confirm gate with human-in-the-loop. Restrained Linear-like feed; no generic AI aesthetic. |
| Innovation & Creative use of sponsor tech | 30% | **Three sponsors are load-bearing** (§2.5): Exa *is* discovery (UI citations + API), Simulang *is* the local browser registration moment, Zo hosts always-on pipeline — none are bolted on. |

---

*This doc is the contract. When in doubt, the types in `@earlybirds/contracts` win.*
