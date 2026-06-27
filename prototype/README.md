# EarlyBirds clickable prototype

Open [`index.html`](index.html) in a browser (720px+ width). No build step.

## Demo flow

1. Auth → Connect → Profile basics → Voice (Fintech selected) → Discover
2. Register on **Fintech Forward Hackathon** — auto-advances `filling` → `needs_input` → `awaiting_approval`
3. Use the **debug panel** (bottom-right) to jump to any screen or autofill state
4. Registrations **Open** buttons deep-link into autofill states

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
