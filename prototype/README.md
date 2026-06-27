# EarlyBirds clickable prototype

Open [`index.html`](index.html) in a browser (720px+ width). No build step. Demo persona: **Maya Chen** (UC Berkeley).

## Demo flow

1. **Auth** → **Connect your sources** (Step 1/3) → **Profile basics** (Step 2/3) → **Your voice** (Step 3/3, Fintech preselected) → **Discover**
2. **Auto-register** on **Fintech Forward** (the stretch match) — the takeover auto-advances `filling` → `needs_input`; **Provide & resume** → `awaiting_approval` → **Confirm & submit** → `submitting` → `success`
3. Jump to any of the 8 autofill states with the **DEMO STATES** bar pinned to the bottom of the takeover; switch app screens from the left sidebar
4. **Registrations** row actions (**Open** / **Review**) deep-link straight into the matching autofill state

## Verification vs DESIGN.md §6 (2026-06-27)

| Checklist item | Status |
|---|---|
| Auth → Connect → Profile basics → Your voice → Discover | Pass |
| Feed stretch reason + Via Exa badge | Pass |
| Event detail + Exa citation drawer | Pass |
| Autofill: filling → needs_input (inline) → awaiting_approval | Pass |
| Draft textarea + "Draft — tailored to this event" chip | Pass |
| Regenerate · Shorter micro-actions (no chatbot) | Pass |
| Source chips: profile, llm_inferred, llm_draft | Pass |
| captcha_encountered + oauth_redirect pause states | Pass |
| Success amber hero + next matches strip | Pass |
| Profile: Basics / Your voice / Writing samples | Pass |
| Registrations status vocabulary + deep links | Pass |
| Anti-bias demo (game proud project, fintech draft) | Pass |

Delta spec for future updates: [`../MOCK_PROMPT.md`](../MOCK_PROMPT.md). Canonical spec: [`../DESIGN.md`](../DESIGN.md) §6.
