import type { FeedEvent, FieldView, Hackathon, UserProfile } from "./types";

export const DEMO_USER_ID = process.env.NEXT_PUBLIC_DEMO_USER_ID ?? "demo-user";

const now = Date.now();
const iso = (mins: number) => new Date(now + mins * 60000).toISOString();
const DAY = 1440;

export const DEMO_PROFILE: UserProfile = {
  id: DEMO_USER_ID,
  name: "Maya Chen",
  email: "maya.chen@berkeley.edu",
  school: "UC Berkeley",
  resumeUrl: "maya-chen-resume.pdf",
  skills: ["React", "TypeScript", "Godot", "Python"],
  interests: ["Fintech", "AI", "DevTools"],
  locationBase: { city: "Berkeley", country: "USA" },
  willingToTravel: true,
  travelRegions: ["US West"],
  formAnswers: {
    full_name: "Maya Chen",
    email: "maya.chen@berkeley.edu",
    school: "UC Berkeley",
    github: "github.com/mayac",
  },
};

const DRAFT_FIN =
  "I'm excited to explore payments infrastructure and fraud detection — areas I haven't built in yet. My experience shipping polished, user-facing products means I can contribute from day one.";

export const EVENTS: Hackathon[] = [
  {
    id: "fintech",
    title: "Fintech Forward",
    description:
      "A weekend building the next generation of payments, lending, and fraud-detection tooling. Beginner-friendly track, travel grants available.",
    organizer: "Fintech Forward Collective",
    url: "https://fintechforward.io",
    location: { mode: "in_person", city: "Singapore", country: "Singapore", tz: "Asia/Singapore" },
    dates: {
      startsAt: iso(9 * DAY),
      endsAt: iso(11 * DAY),
      registrationClosesAt: iso(2 * DAY + 3 * 60),
    },
    prizes: { total: "$25,000", raw: "$25k prize pool + travel grants" },
    themes: ["fintech", "payments", "ai"],
    eligibility: "Students and recent grads",
    registration: {
      provider: "luma",
      formUrl: "https://lu.ma/fintech-forward/register",
      requiresTeam: false,
      requiresAuth: true,
      knownFields: [],
    },
    sources: [
      {
        source: "exa",
        rawUrl: "https://fintechforward.io/apply",
        scrapedAt: iso(-120),
        exaGrounding: [
          {
            field: "registrationClosesAt",
            citations: [{ url: "https://fintechforward.io/apply", title: "Apply — Fintech Forward" }],
            confidence: "high",
          },
          {
            field: "eligibility",
            citations: [{ url: "https://fintechforward.io/faq", title: "FAQ — Fintech Forward" }],
            confidence: "medium",
          },
        ],
      },
    ],
    contentHash: "fin-1",
    createdAt: iso(-600),
    updatedAt: iso(-120),
  },
  {
    id: "treehacks",
    title: "TreeHacks 2026",
    description:
      "Stanford's flagship hackathon. ML and hardware tracks, on-site mentors, and a large prize pool.",
    organizer: "Stanford University",
    url: "https://treehacks.com",
    location: { mode: "in_person", city: "Stanford", country: "USA", tz: "America/Los_Angeles" },
    dates: { startsAt: iso(20 * DAY), endsAt: iso(22 * DAY), registrationClosesAt: iso(2 * DAY + 14 * 60) },
    prizes: { total: "$50,000", raw: "$50k across tracks" },
    themes: ["ml", "hardware", "health"],
    eligibility: "Current students",
    registration: { provider: "custom", formUrl: "https://treehacks.com/apply", requiresTeam: false, requiresAuth: false },
    sources: [
      {
        source: "exa",
        rawUrl: "https://treehacks.com/apply",
        scrapedAt: iso(-200),
        exaGrounding: [
          { field: "registrationClosesAt", citations: [{ url: "https://treehacks.com/apply", title: "Apply — TreeHacks" }], confidence: "high" },
        ],
      },
    ],
    contentHash: "tree-1",
    createdAt: iso(-800),
    updatedAt: iso(-200),
  },
  {
    id: "ethbangkok",
    title: "ETHGlobal Bangkok",
    description: "A global Ethereum hackathon with a dedicated crypto track and travel grants.",
    organizer: "ETHGlobal",
    url: "https://ethglobal.com/events/bangkok",
    location: { mode: "in_person", city: "Bangkok", country: "Thailand", tz: "Asia/Bangkok" },
    dates: { startsAt: iso(40 * DAY), endsAt: iso(42 * DAY), registrationClosesAt: iso(12 * DAY + 6 * 60) },
    prizes: { total: "$300,000", raw: "$300k pool" },
    themes: ["crypto", "web3", "solidity"],
    registration: { provider: "custom", formUrl: "https://ethglobal.com/events/bangkok/apply", requiresTeam: true, requiresAuth: true },
    sources: [
      {
        source: "exa",
        rawUrl: "https://ethglobal.com/events/bangkok",
        scrapedAt: iso(-300),
        exaGrounding: [
          { field: "registrationClosesAt", citations: [{ url: "https://ethglobal.com/events/bangkok", title: "ETHGlobal Bangkok" }], confidence: "high" },
        ],
      },
      { source: "devpost", rawUrl: "https://devpost.com/ethglobal-bangkok", scrapedAt: iso(-280) },
    ],
    contentHash: "eth-1",
    createdAt: iso(-900),
    updatedAt: iso(-280),
  },
  {
    id: "calhacks",
    title: "Cal Hacks 12.0",
    description: "UC Berkeley's hackathon — beginner-friendly, local, team sizes 1–4.",
    organizer: "Cal Hacks",
    url: "https://calhacks.io",
    location: { mode: "in_person", city: "Berkeley", country: "USA", tz: "America/Los_Angeles" },
    dates: { startsAt: iso(50 * DAY), endsAt: iso(52 * DAY), registrationClosesAt: iso(5 * DAY + 18 * 60) },
    themes: ["general", "ai"],
    registration: { provider: "custom", formUrl: "https://calhacks.io/apply", requiresTeam: false, requiresAuth: false },
    sources: [{ source: "web", rawUrl: "https://calhacks.io", scrapedAt: iso(-400) }],
    contentHash: "cal-1",
    createdAt: iso(-1000),
    updatedAt: iso(-400),
  },
  {
    id: "pioneer",
    title: "Pioneer Summer Build",
    description: "Remote, solo-friendly build sprint with async judging.",
    organizer: "Pioneer",
    url: "https://pioneer.app",
    location: { mode: "online" },
    dates: { startsAt: iso(60 * DAY), endsAt: iso(120 * DAY), registrationClosesAt: iso(20 * DAY) },
    themes: ["general", "devtools"],
    registration: { provider: "google_form", formUrl: "https://forms.gle/pioneer", requiresTeam: false, requiresAuth: false },
    sources: [
      {
        source: "exa",
        rawUrl: "https://pioneer.app",
        scrapedAt: iso(-500),
        exaGrounding: [{ field: "location", citations: [{ url: "https://pioneer.app", title: "Pioneer" }], confidence: "high" }],
      },
    ],
    contentHash: "pio-1",
    createdAt: iso(-1100),
    updatedAt: iso(-500),
  },
];

export const eventById = (id: string): Hackathon | undefined => EVENTS.find((e) => e.id === id);

interface FeedMeta {
  hackathonId: string;
  score: number;
  reasons: string[];
  matchedThemes: string[];
  stretch?: boolean;
  viaExa?: boolean;
  merged?: number;
}

const FEED_META: FeedMeta[] = [
  { hackathonId: "fintech", score: 0.71, reasons: ["Outside your usual lane — fintech, 2 days", "Beginner-friendly track", "Travel grant available"], matchedThemes: ["fintech"], stretch: true, viaExa: true },
  { hackathonId: "treehacks", score: 0.93, reasons: ["Matches your ML + hardware interests", "Travel under 1 hour"], matchedThemes: ["ml", "hardware"], viaExa: true },
  { hackathonId: "ethbangkok", score: 0.82, reasons: ["You starred two Solidity repos last month", "Travel grant available"], matchedThemes: ["crypto"], merged: 2 },
  { hackathonId: "calhacks", score: 0.78, reasons: ["Travel-free — you're 20 minutes away", "Beginner-friendly"], matchedThemes: ["ai"] },
  { hackathonId: "pioneer", score: 0.6, reasons: ["Remote, solo-friendly with async judging"], matchedThemes: ["devtools"], viaExa: true },
];

export const FEED: FeedEvent[] = FEED_META.map((m) => ({
  hackathonId: m.hackathonId,
  userId: DEMO_USER_ID,
  score: m.score,
  reasons: m.reasons,
  matchedThemes: m.matchedThemes,
  hackathon: eventById(m.hackathonId)!,
}));

/** Per-event extras the feed cards/badges use but the contract doesn't model. */
export const feedExtras = (id: string): { stretch: boolean; viaExa: boolean; merged: number } => {
  const m = FEED_META.find((x) => x.hackathonId === id);
  return { stretch: !!m?.stretch, viaExa: !!m?.viaExa, merged: m?.merged ?? 0 };
};

/** Demo autofill plan for Fintech Forward (drives the takeover §6.3.1). */
export const AUTOFILL_FIELDS: FieldView[] = [
  { key: "full_name", label: "Full name", value: "Maya Chen", source: "profile" },
  { key: "email", label: "Email", value: "maya.chen@berkeley.edu", source: "profile" },
  { key: "school", label: "School", value: "UC Berkeley", source: "profile" },
  { key: "github", label: "GitHub", value: "github.com/mayac", source: "profile" },
  { key: "team_status", label: "Team status", value: "Looking for teammates", source: "llm_inferred" },
  {
    key: "why_join",
    label: "Why do you want to join?",
    value: DRAFT_FIN,
    source: "llm_draft",
    draftText: DRAFT_FIN,
  },
];

/** Quiet "next matches" strip on the success screen (§6.3.2). */
export const NEXT_MATCHES = ["treehacks", "calhacks"]
  .map(eventById)
  .filter((e): e is Hackathon => !!e);

// ── Onboarding / profile voice ───────────────────────────────────────────────
export const INTERESTS = [
  "AI", "Climate", "Fintech", "DevTools", "Health", "Hardware", "Crypto", "Education", "Something new to me",
];

export const VOICE = {
  oneLiner: "CS junior who likes shipping playful, polished products fast.",
  proudProject: "A 4-player co-op puzzle game built in a weekend with Godot — shipped to 3k plays, learned to cut scope ruthlessly.",
  outsideLane: "Curious about fintech & payments.",
};

export const WRITING_SAMPLES = [
  { name: "Devpost project README", meta: "312 words · pasted" },
  { name: "Scholarship essay", meta: "488 words · pasted" },
];

// ── Registrations dashboard ──────────────────────────────────────────────────
export interface RegRow {
  rowId: string;
  eventId: string;
  status: "registered" | "awaiting" | "needsinput" | "filling" | "paused" | "failed";
  deadlineLabel?: string;
}

export const REGISTRATIONS: RegRow[] = [
  { rowId: "r1", eventId: "treehacks", status: "awaiting" },
  { rowId: "r2", eventId: "fintech", status: "paused" },
  { rowId: "r3", eventId: "pioneer", status: "registered", deadlineLabel: "submitted" },
  { rowId: "r4", eventId: "ethbangkok", status: "needsinput" },
  { rowId: "r5", eventId: "calhacks", status: "filling" },
  { rowId: "r6", eventId: "treehacks", status: "failed" },
];

// ── Notifications ────────────────────────────────────────────────────────────
export const NOTIF_COLOR: Record<string, string> = {
  needs: "#D9920F",
  awaiting: "#D9920F",
  success: "#1D9E75",
  deadline: "#97918A",
  found: "#1D9E75",
};

export const NOTIFS = [
  { time: "2m ago", type: "needs", text: "ETHGlobal Bangkok needs your input — team status." },
  { time: "1h ago", type: "success", text: "You're registered for MLH Spring Kickoff." },
  { time: "3h ago", type: "awaiting", text: "TreeHacks 2026 is filled and ready for your approval." },
  { time: "1d ago", type: "deadline", text: "Cal Hacks 12.0 closes in 5 days." },
  { time: "2d ago", type: "found", text: "3 new events matched your profile." },
];

// ── Settings ─────────────────────────────────────────────────────────────────
export const SETTING_DEFS = [
  { key: "requireApproval", label: "Require my approval before submitting", desc: "The agent fills forms but never submits until you confirm.", on: true },
  { key: "inferAnswers", label: "Let the agent draft open-ended answers", desc: 'Drafts answers like "Why do you want to join?" for your review.', on: true },
  { key: "notifyClosing", label: "Notify me before deadlines", desc: "Heads-up 48 hours before a matched event closes.", on: true },
  { key: "batch", label: "Batch auto-register", desc: "Queue several matched events and register in one run.", on: false },
];

export const CONN_DEFS = [
  { key: "github", name: "GitHub", detail: "github.com/mayac", on: true },
  { key: "google", name: "Google", detail: "Calendar + email sync", on: false },
  { key: "resume", name: "Résumé", detail: "maya-chen-resume.pdf", on: true },
];
