# EarlyBirds Prototype Update Prompt

Copy everything below the line into Claude Design (or use the committed [`prototype/index.html`](prototype/index.html) as the updated reference implementation).

---

## Context

You already built a **clickable single-file HTML prototype** for EarlyBirds (app shell, auth, connect onboarding, discover, autofill state machine, registrations dashboard, etc.). **Keep everything that works.** This prompt is a **delta spec** — only what to **add, modify, or fix** so the prototype matches the canonical design doc ([DESIGN.md](DESIGN.md), especially §6).

**Do not rebuild from scratch.** Extend the existing file. Match the established design system (Hanken Grotesk, IBM Plex Mono, teal = action, amber = win + review flags only).

---

## 1. Onboarding — split into two steps (NEW screens)

The current **"Connect once. Autofill everywhere."** screen (GitHub / Résumé / Google) stays, but add **two new screens after auth** (or after connect — your call on order, but both must exist):

### Step A — Profile basics (`§6.3.3`)
- Eyebrow: **STEP 2 OF 3 · PROFILE BASICS**
- Headline: **"Fill once — EarlyBirds reuses these on every form."**
- Completeness meter (mono, e.g. "4 of 5 fields")
- Fields: name, email, school, GitHub URL, skills (tags)
- Primary CTA: **Continue** (teal) → Step B
- Secondary: **Skip for now** (returns to Discover; show a subtle degraded-state hint on feed if voice step also skipped)

### Step B — Your voice (`§6.3.4`) — single scrolling prompt page
- Eyebrow **STEP 3 OF 3 · YOUR VOICE**, headline **"Tell us how you think."**
- **One scrollable column of prompt cards** (not a swipeable stack), calm whitespace, **no mascot**, every field optional
- **Prompt:** "What do you want to hack on next?" — chip multi-select (AI, Climate, Fintech, DevTools, Health, …) + **"Something new to me"** chip
- **Prompt:** "One line about you" — short text input
- **Prompt:** "Something you've built that represents how you work" — textarea ("we learn your voice from this, not your topic")
- **Optional prompt:** "What would you try outside your usual lane?" — short text
- **Emphasized paste card (strongest signal):** teal-accented "Paste an essay or write-up you're proud of" with a **best signal** badge, large textarea, and a mono word-count hint ("0 words · aim for 150+")
- **Sticky footer** pinned while scrolling: **Back** · **Skip voice step** · **Save & find hackathons** (teal)

Mock a user who built **games** but selects **Fintech** interest — this sets up the anti-bias demo below.

---

## 2. Autofill flow — modify `awaiting` state (IMPORTANT)

The prototype currently marks the open-ended field ("Why do you want to join?") with a single amber **"Inferred — review"** chip. **Split field sources into three visual treatments:**

| Source | When | Chip / UI |
|---|---|---|
| `profile` | name, email, GitHub | Small mono chip: **`profile`** (neutral/teal tint, not amber) |
| `default` | t-shirt size, structured defaults | Mono chip: **`default`** |
| `llm_inferred` | short factual guess (e.g. team status if agent guessed) | Amber text chip: **"Inferred — review"** (existing style — keep it) |
| `llm_draft` | essay / long open-ended ("Why do you want to join?") | Amber text chip: **"Draft — tailored to this event"** + **editable textarea** (not read-only mono text) |

**At `awaiting_approval` state:**
- Essay field must be a **textarea the user can edit inline** before confirming
- Add two text micro-actions below the draft field only: **Regenerate** · **Shorter** (teal text links, not buttons — no chat sidebar, no chatbot)
- Mock draft copy that is **themed to the event** (e.g. fintech hackathon) even though the user's proud project was a game — proves voice ≠ topic

**During `filling` state:**
- Show source chips appearing as each field completes
- Essay field fills last with the draft chip visible once done

---

## 3. Autofill flow — add missing pause states (NEW)

Extend the state machine beyond `filling → needsinput → awaiting → submitting → success/failed`:

### `captcha_encountered`
- Same two-column layout; footer stays **locked**
- Banner or inline callout in form column: **"Complete the CAPTCHA in your browser, then click Resume."**
- Primary action: **Resume** (teal outline)

### `oauth_redirect`
- Same layout; footer locked
- Callout: **"Sign in to {provider} in your browser, then click Resume."** (mock provider: Google)
- Primary action: **Resume**

### `needs_input` — change from modal to inline
- **Remove the modal** (or demote to fallback)
- Inline in the **left form column**: "This form asks for **{field label}** — we don't have it yet." + inline input + **Provide & resume** (teal)
- Footer stays locked
- Keep team-status as the demo field, but render inline per spec

Add nav in the prototype debug controls (or a small state picker) so judges can click through all states.

---

## 4. Discover feed — ranking copy (MODIFY)

On at least **one event card**, add a stretch-match reason line:
- Example: **"Outside your usual lane — fintech, 2 days"** (Hanken, muted)
- Do **not** add pigeonhole copy like "Perfect for game developers"

On event detail **"Why you're a match"** pills, include one stretch pill with the same honest framing.

---

## 5. Profile screen — restructure (MODIFY)

Rename/reorganize **Answer Library** to reflect the new data model:

- **Basics** section — same identity fields as Step A
- **Your voice** section — show saved prompt answers:
  - Interests (chips)
  - One-liner
  - Proud project (truncated)
  - Outside your lane (if set)
- **Writing samples** — list of pasted samples the agent uses for voice (not topic)
- Allow inline edit affordance (click to edit → mock save)

Remove any implication that past projects dictate future hackathon topics.

---

## 6. Success screen — add next matches strip (MODIFY)

After the amber hero ("You're in. Worm secured."), add a **quiet neutral strip** below the details card:
- 1–2 upcoming hackathon mini-cards
- Mono deadlines, understated **Register** buttons (teal outline)
- Must **not** compete with the amber hero — no amber on this strip

---

## 7. Registrations dashboard — status vocabulary (MODIFY)

Align status pills with backend enum names where shown:
- `awaiting_approval` → **Awaiting approval**
- `needs_input` → **Needs your input**
- `captcha_encountered` / `oauth_redirect` → **Paused — action needed** (amber)
- Add row actions that deep-link to the new pause states

---

## 8. Explicit non-goals — do NOT add

- No registration **chatbot** or conversational sidebar
- No emoji
- No gradients
- No amber on action buttons (amber = success hero + review chips only)
- No second amber hero anywhere except `success`

---

## 9. Mock data updates

Update the static `events` array and autofill field list:

```js
// Example autofill fields for demo event (Fintech Forward)
[
  { label: "Full name", value: "Maya Chen", source: "profile", status: "done" },
  { label: "Email", value: "maya.chen@berkeley.edu", source: "profile", status: "done" },
  { label: "School", value: "UC Berkeley", source: "profile", status: "done" },
  { label: "GitHub", value: "github.com/mayac", source: "profile", status: "done" },
  { label: "Team status", value: "Looking for teammates", source: "llm_inferred", status: "done" },
  { label: "Why do you want to join?", value: "<draft textarea>", source: "llm_draft", status: "done",
    draftText: "I'm excited to explore payments infrastructure and fraud detection — areas I haven't built in yet. My experience shipping polished, user-facing products means I can contribute from day one." }
]
```

User backstory for demo honesty: Maya's proud project was a **co-op puzzle game** (built in Godot), but the draft is **fintech-themed** because the event is fintech.

---

## 10. Deliverable checklist

When done, the prototype should let a reviewer click through:

1. Auth → Connect sources → **Profile basics** → **Your voice** → Discover
2. Feed card with stretch-match reason + Via Exa badge
3. Event detail with Exa drawer (existing — keep)
4. Autofill: `filling` → `needs_input` (inline) → `awaiting_approval` (draft textarea + Regenerate/Shorter) → `submitting` → `success` (with next matches)
5. Optional: `captcha_encountered` and `oauth_redirect` pause states
6. Profile with voice answers + writing samples
7. Registrations dashboard linking to all states

**Preserve** the existing design tokens, sidebar shell, and copy tone. This is an incremental update, not a redesign.

---

## Reference

Full spec: [DESIGN.md](DESIGN.md) §6.1–6.4, §4 contracts (`PlannedAction.source`, `RegistrationRun.status`).
