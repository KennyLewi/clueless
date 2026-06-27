/**
 * Seeds the local DB with a demo user, a couple of hackathons, and ranked events
 * so the frontend works end-to-end against the real backend (NEXT_PUBLIC_USE_MOCKS=0).
 *
 * Usage (from repo root):
 *   npx tsx scripts/seed.ts
 */

import { db } from "@earlybirds/db";

const DEMO_USER_ID = process.env.SEED_USER_ID ?? "demo-user";

async function main() {
  // ── Demo user ──────────────────────────────────────────────────────────────
  await db.userProfile.upsert({
    where: { id: DEMO_USER_ID },
    update: {},
    create: {
      id: DEMO_USER_ID,
      name: "Maya Chen",
      email: "maya.chen@berkeley.edu",
      school: "UC Berkeley",
      skills: ["React", "TypeScript", "Python"],
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
        oneLiner: "Product-focused builder who ships polished, user-facing tools fast.",
        proudProject: "Built a real-time collaborative editor used by my whole department.",
        outsideLane: "fintech, climate",
      },
    },
  });

  // ── Hackathons ───────────────────────────────────────────────────────────────
  const nowMs = Date.now();
  const days = (n: number) => new Date(nowMs + n * 86_400_000);

  const hackathons = [
    {
      id: "devnetwork-2026",
      title: "DevNetwork [API + Cloud + AI] Hackathon 2026",
      description: "The nation's largest challenge-driven API + Cloud + AI hackathon @ API World 2026.",
      organizer: "DevNetwork",
      url: "https://api-cloud-ai-hackathon-2026.devpost.com/",
      locationMode: "hybrid",
      locationCity: "Santa Clara",
      locationCountry: "USA",
      startsAt: days(40),
      endsAt: days(45),
      registrationClosesAt: days(38),
      themes: ["AI", "Cloud", "API"],
      eligibility: "18+, any country",
      registrationProvider: "devpost",
      registrationFormUrl:
        "https://api-cloud-ai-hackathon-2026.devpost.com/register?flow%5Bdata%5D%5Bchallenge_id%5D=29242&flow%5Bname%5D=register_for_challenge",
      requiresAuth: true,
      reasons: ["Matches your interest in AI", "Remote-friendly", "Cloud + API focus"],
      matchedThemes: ["AI", "Cloud"],
      score: 0.88,
    },
    {
      id: "luma-ai-night",
      title: "AI Builders Night",
      description: "A focused evening hackathon for AI tooling. RSVP only — name + email.",
      organizer: "AI Collective",
      url: "https://lu.ma/ai-builders-night",
      locationMode: "online",
      locationCountry: "USA",
      startsAt: days(10),
      endsAt: days(10),
      registrationClosesAt: days(8),
      themes: ["AI", "DevTools"],
      eligibility: "Open to all",
      registrationProvider: "luma",
      registrationFormUrl: "https://lu.ma/ai-builders-night",
      requiresAuth: false,
      reasons: ["Matches your interest in DevTools", "Low-friction RSVP", "Online"],
      matchedThemes: ["AI", "DevTools"],
      score: 0.81,
    },
  ];

  for (const h of hackathons) {
    const { reasons, matchedThemes, score, ...hk } = h;
    await db.hackathon.upsert({
      where: { id: hk.id },
      update: {},
      create: {
        ...hk,
        contentHash: `seed-${hk.id}`,
        sources: [
          {
            source: "exa",
            rawUrl: hk.url,
            scrapedAt: new Date().toISOString(),
            exaGrounding: [
              { field: "title", citations: [{ url: hk.url, title: hk.title }], confidence: "high" },
              { field: "registrationClosesAt", citations: [{ url: hk.url, title: hk.title }], confidence: "medium" },
            ],
          },
        ],
        knownFields: [],
      },
    });

    await db.rankedEvent.upsert({
      where: { hackathonId_userId: { hackathonId: hk.id, userId: DEMO_USER_ID } },
      update: { score, reasons, matchedThemes },
      create: { hackathonId: hk.id, userId: DEMO_USER_ID, score, reasons, matchedThemes },
    });
  }

  console.log(`Seeded user ${DEMO_USER_ID} + ${hackathons.length} hackathons with ranked events.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
