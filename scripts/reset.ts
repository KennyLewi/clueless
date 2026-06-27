/**
 * Resets the DB for a clean discovery test: wipes all events, ranked events,
 * registration runs, and notifications — leaving the tables empty.
 *
 * By default it keeps a single bare user (demo-user with interests) so that a
 * subsequent discovery run has someone to rank for and the feed actually
 * populates. Pass --wipe-users to also delete every user (truly empty DB).
 *
 * Usage (from repo root):
 *   npx tsx scripts/reset.ts                (empty events, keep demo-user)
 *   npx tsx scripts/reset.ts --wipe-users   (empty everything)
 */

import { db } from "@earlybirds/db";

const DEMO_USER_ID = process.env.SEED_USER_ID ?? "demo-user";
const wipeUsers = process.argv.includes("--wipe-users");

async function main() {
  // Delete children first to respect foreign keys.
  await db.registrationRun.deleteMany({});
  await db.rankedEvent.deleteMany({});
  await db.pendingNotification.deleteMany({});
  await db.hackathon.deleteMany({});

  if (wipeUsers) {
    await db.userProfile.deleteMany({});
    console.log("Wiped all events, ranked events, runs, notifications, AND users. DB is empty.");
    console.log("Note: discovery ranks per existing user — create an account before the feed will populate.");
    return;
  }

  // Keep a single bare user with interests so discovery has a target to rank for.
  await db.userProfile.upsert({
    where: { id: DEMO_USER_ID },
    update: { interests: ["AI", "Fintech", "DevTools"] },
    create: {
      id: DEMO_USER_ID,
      name: "Maya Chen",
      email: "maya.chen@berkeley.edu",
      school: "UC Berkeley",
      skills: ["React", "TypeScript", "Python"],
      interests: ["AI", "Fintech", "DevTools"],
      willingToTravel: true,
      travelRegions: ["US West"],
      formAnswers: {
        full_name: "Maya Chen",
        email: "maya.chen@berkeley.edu",
        school: "UC Berkeley",
        github: "github.com/mayac",
      },
    },
  });

  console.log(`Wiped all events, ranked events, runs, notifications.`);
  console.log(`Kept user "${DEMO_USER_ID}" (empty feed). Trigger discovery to populate it.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
