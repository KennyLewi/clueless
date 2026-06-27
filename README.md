# EarlyBirds

AI agent that discovers hackathons and auto-fills registration forms — with a mandatory human confirm gate.

- **Design spec:** [`DESIGN.md`](DESIGN.md)
- **Clickable prototype:** [`prototype/index.html`](prototype/index.html) — open in browser, no build
- **Prototype delta prompt:** [`MOCK_PROMPT.md`](MOCK_PROMPT.md)

## Architecture

TypeScript monorepo (npm workspaces).

| Path | What it is |
|---|---|
| `packages/contracts` | Frozen types + Zod schemas + BullMQ job payloads — the one coupling point |
| `packages/db` | Prisma client + schema (Postgres) |
| `services/gateway` | Fastify API + SSE (port 3001) |
| `services/worker` | BullMQ workers: discovery, normalize, rank, registration runners |
| `services/web` | Next.js frontend (port 3000) |

## Prerequisites

- Node ≥ 22.18
- Docker (for Postgres + Redis + MinIO)
- A `.env` at the repo root with `DATABASE_URL`, `REDIS_URL`, and sponsor keys
  (`EXA_API_KEY`, `OPENAI_API_KEY`). **Never commit `.env`.**

## Local dev — full stack

Run each in its own terminal from the repo root:

```bash
npm install              # once
npm run infra:up         # Postgres + Redis + MinIO via docker compose
npm run db:push          # apply the Prisma schema
npm run db:seed          # demo user "demo-user" + 2 hackathons + ranked events

npm run dev:gateway      # API on :3001
npm run dev:worker       # queue workers
npm run dev:web          # frontend on :3000
```

Then open <http://localhost:3000>.

### Mock vs. real backend

The frontend defaults to **mock data** so it runs with no backend. To hit the real
gateway, create `services/web/.env.local`:

```
NEXT_PUBLIC_USE_MOCKS=0
NEXT_PUBLIC_GATEWAY_URL=http://localhost:3001
```

With mocks off:
- **Sign up / sign in** on `/welcome` calls `POST /auth/{signup,login}` and stores the
  `userId` in `localStorage` (`earlybirds.session`). All API calls thread that id.
- **Onboarding** (`/onboarding/basics`, `/onboarding/voice`) saves to `PUT /profile`.
- **Discover / event detail** read `GET /feed?userId=` and `GET /events/:id`.
- **Registrations** reads `GET /registrations?userId=`.
- **Auto-register** (`/register/[eventId]`) creates a run (`POST /registrations`),
  streams progress over SSE (`GET /registrations/:id/stream`), persists confirm-gate
  edits (`PUT /registrations/:id/plan`), then approves (`POST /registrations/:id/approve`).

Leave `NEXT_PUBLIC_USE_MOCKS` unset (or `1`) to demo the UI with seeded mock data and the
`?step=` DEMO STATES picker on the register screen.

### Registration runners

The worker uses **SimulangRunner** (macOS accessibility-tree automation, drives the user's
real Chrome). Probe a form's a11y tree or dry-run the runner:

```bash
simulang run scripts/probe-form.ts <url>                       # inspect fields/buttons
cd services/worker && npx tsx ../../scripts/test-simulang-runner.ts <url>  # introspect + fill, no submit
```

PlaywrightRunner remains available as the headless fallback for Google Forms.

## Useful scripts

| Command | What it does |
|---|---|
| `npm run typecheck` | Type-check the whole monorepo |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Re-seed the demo dataset (idempotent upserts) |
| `npm run infra:down` | Stop docker services |
