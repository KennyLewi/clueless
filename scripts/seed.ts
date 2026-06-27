/**
 * Seeds the local DB with a demo user + the full mock event catalog (same ids the
 * frontend shows) + ranked events, so the UI works end-to-end against the real
 * backend (NEXT_PUBLIC_USE_MOCKS=0) and every event card is actually registerable.
 *
 * Usage (from repo root):
 *   npx tsx scripts/seed.ts      (or: npm run db:seed)
 */

import { db } from "@earlybirds/db";

const DEMO_USER_ID = process.env.SEED_USER_ID ?? "demo-user";

const nowMs = Date.now();
const DAY = 86_400_000;
const at = (days: number) => new Date(nowMs + days * DAY);

interface SeedEvent {
  id: string;
  title: string;
  description: string;
  organizer: string;
  url: string;
  locationMode: string;
  locationCity?: string;
  locationCountry?: string;
  locationTz?: string;
  startsAt: Date;
  endsAt: Date;
  registrationClosesAt: Date;
  prizesTotal?: string;
  prizesRaw?: string;
  themes: string[];
  eligibility?: string;
  registrationProvider: string;
  registrationFormUrl: string;
  requiresTeam?: boolean;
  requiresAuth?: boolean;
  sources: unknown[];
  // ranking
  score: number;
  reasons: string[];
  matchedThemes: string[];
}

const exaSource = (url: string, title: string, fields: string[]) => ({
  source: "exa",
  rawUrl: url,
  scrapedAt: new Date(nowMs - 2 * DAY).toISOString(),
  exaGrounding: fields.map((field) => ({
    field,
    citations: [{ url, title }],
    confidence: "high",
  })),
});

const EVENTS: SeedEvent[] = [
  {
    id: "fintech",
    title: "Fintech Forward",
    description:
      "A weekend building the next generation of payments, lending, and fraud-detection tooling. Beginner-friendly track, travel grants available.",
    organizer: "Fintech Forward Collective",
    url: "https://fintechforward.io",
    locationMode: "in_person",
    locationCity: "Singapore",
    locationCountry: "Singapore",
    locationTz: "Asia/Singapore",
    startsAt: at(9),
    endsAt: at(11),
    registrationClosesAt: at(2),
    prizesTotal: "$25,000",
    prizesRaw: "$25k prize pool + travel grants",
    themes: ["fintech", "payments", "ai"],
    eligibility: "Students and recent grads",
    registrationProvider: "luma",
    registrationFormUrl: "https://lu.ma/fintech-forward/register",
    requiresTeam: false,
    requiresAuth: true,
    sources: [exaSource("https://fintechforward.io/apply", "Apply — Fintech Forward", ["registrationClosesAt", "eligibility"])],
    score: 0.71,
    reasons: ["Outside your usual lane — fintech, 2 days", "Beginner-friendly track", "Travel grant available"],
    matchedThemes: ["fintech"],
  },
  {
    id: "treehacks",
    title: "TreeHacks 2026",
    description: "Stanford's flagship hackathon. ML and hardware tracks, on-site mentors, and a large prize pool.",
    organizer: "Stanford University",
    url: "https://treehacks.com",
    locationMode: "in_person",
    locationCity: "Stanford",
    locationCountry: "USA",
    locationTz: "America/Los_Angeles",
    startsAt: at(20),
    endsAt: at(22),
    registrationClosesAt: at(2),
    prizesTotal: "$50,000",
    prizesRaw: "$50k across tracks",
    themes: ["ml", "hardware", "health"],
    eligibility: "Current students",
    registrationProvider: "custom",
    registrationFormUrl: "https://treehacks.com/apply",
    requiresTeam: false,
    requiresAuth: false,
    sources: [exaSource("https://treehacks.com/apply", "Apply — TreeHacks", ["registrationClosesAt"])],
    score: 0.93,
    reasons: ["Matches your ML + hardware interests", "Travel under 1 hour"],
    matchedThemes: ["ml", "hardware"],
  },
  {
    id: "ethbangkok",
    title: "ETHGlobal Bangkok",
    description: "A global Ethereum hackathon with a dedicated crypto track and travel grants.",
    organizer: "ETHGlobal",
    url: "https://ethglobal.com/events/bangkok",
    locationMode: "in_person",
    locationCity: "Bangkok",
    locationCountry: "Thailand",
    locationTz: "Asia/Bangkok",
    startsAt: at(40),
    endsAt: at(42),
    registrationClosesAt: at(12),
    prizesTotal: "$300,000",
    prizesRaw: "$300k pool",
    themes: ["crypto", "web3", "solidity"],
    registrationProvider: "custom",
    registrationFormUrl: "https://ethglobal.com/events/bangkok/apply",
    requiresTeam: true,
    requiresAuth: true,
    sources: [
      exaSource("https://ethglobal.com/events/bangkok", "ETHGlobal Bangkok", ["registrationClosesAt"]),
      { source: "devpost", rawUrl: "https://devpost.com/ethglobal-bangkok", scrapedAt: new Date(nowMs - 3 * DAY).toISOString() },
    ],
    score: 0.82,
    reasons: ["You starred two Solidity repos last month", "Travel grant available"],
    matchedThemes: ["crypto"],
  },
  {
    id: "calhacks",
    title: "Cal Hacks 12.0",
    description: "UC Berkeley's hackathon — beginner-friendly, local, team sizes 1–4.",
    organizer: "Cal Hacks",
    url: "https://calhacks.io",
    locationMode: "in_person",
    locationCity: "Berkeley",
    locationCountry: "USA",
    locationTz: "America/Los_Angeles",
    startsAt: at(50),
    endsAt: at(52),
    registrationClosesAt: at(5),
    themes: ["general", "ai"],
    registrationProvider: "custom",
    registrationFormUrl: "https://calhacks.io/apply",
    requiresTeam: false,
    requiresAuth: false,
    sources: [{ source: "web", rawUrl: "https://calhacks.io", scrapedAt: new Date(nowMs - 4 * DAY).toISOString() }],
    score: 0.78,
    reasons: ["Travel-free — you're 20 minutes away", "Beginner-friendly"],
    matchedThemes: ["ai"],
  },
  {
    id: "pioneer",
    title: "Pioneer Summer Build",
    description: "Remote, solo-friendly build sprint with async judging.",
    organizer: "Pioneer",
    url: "https://pioneer.app",
    locationMode: "online",
    startsAt: at(60),
    endsAt: at(120),
    registrationClosesAt: at(20),
    themes: ["general", "devtools"],
    registrationProvider: "google_form",
    registrationFormUrl: "https://forms.gle/pioneer",
    requiresTeam: false,
    requiresAuth: false,
    sources: [exaSource("https://pioneer.app", "Pioneer", ["location"])],
    score: 0.6,
    reasons: ["Remote, solo-friendly with async judging"],
    matchedThemes: ["devtools"],
  },
];

async function main() {
  await db.userProfile.upsert({
    where: { id: DEMO_USER_ID },
    update: {},
    create: {
      id: DEMO_USER_ID,
      name: "Maya Chen",
      email: "maya.chen@berkeley.edu",
      school: "UC Berkeley",
      skills: ["React", "TypeScript", "Godot", "Python"],
      interests: ["Fintech", "AI", "DevTools"],
      locationCity: "Berkeley",
      locationCountry: "USA",
      willingToTravel: true,
      travelRegions: ["US West"],
      formAnswers: {
        full_name: "Maya Chen",
        email: "maya.chen@berkeley.edu",
        school: "UC Berkeley",
        github: "github.com/mayac",
      },
      voice: {
        oneLiner: "CS junior who likes shipping playful, polished products fast.",
        proudProject:
          "A 4-player co-op puzzle game built in a weekend with Godot — shipped to 3k plays, learned to cut scope ruthlessly.",
        outsideLane: "Curious about fintech & payments.",
      },
    },
  });

  for (const e of EVENTS) {
    const { score, reasons, matchedThemes, sources, ...hk } = e;
    await db.hackathon.upsert({
      where: { id: hk.id },
      update: {},
      create: {
        ...hk,
        contentHash: `seed-${hk.id}`,
        sources: sources as object[],
        knownFields: [],
      },
    });
    await db.rankedEvent.upsert({
      where: { hackathonId_userId: { hackathonId: hk.id, userId: DEMO_USER_ID } },
      update: { score, reasons, matchedThemes },
      create: { hackathonId: hk.id, userId: DEMO_USER_ID, score, reasons, matchedThemes },
    });
  }

  console.log(`Seeded user ${DEMO_USER_ID} + ${EVENTS.length} hackathons with ranked events.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
