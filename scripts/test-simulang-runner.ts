/**
 * Exercises the real SimulangRunner: introspect → fill (no submit).
 * Opens Chrome, reads fields, fills them with dummy values, then pauses.
 *
 * Usage (run from repo root):
 *   cd services/worker && npx tsx ../../scripts/test-simulang-runner.ts <url>
 *
 * Examples:
 *   cd services/worker && npx tsx ../../scripts/test-simulang-runner.ts https://lu.ma/<event-slug>
 *   cd services/worker && npx tsx ../../scripts/test-simulang-runner.ts https://forms.gle/<id>
 */

import { SimulangRunner } from "./src/runners/simulang.js";
import type { RegistrationProgressEvent } from "@earlybirds/contracts";

const url = process.argv[2];
if (!url) {
  console.error("Usage: cd services/worker && npx tsx ../../scripts/test-simulang-runner.ts <url>");
  process.exit(1);
}

const runner = new SimulangRunner();

// ── Step 1: introspect ────────────────────────────────────────────────────────
console.log(`\nIntrospecting: ${url}`);
let fields;
try {
  fields = await runner.introspect(url);
} catch (err) {
  console.error("introspect() threw:", err);
  process.exit(1);
}

console.log(`\nFound ${fields.length} field(s):`);
for (const f of fields) {
  console.log(`  [${f.type}] ${f.canonicalName} — "${f.label}" (confidence=${f.confidence})`);
}

if (fields.length === 0) {
  console.log("No fields found — check that Chrome can see the form and accessibility is enabled.");
  process.exit(0);
}

// ── Step 2: fill with dummy values (no submit) ────────────────────────────────
const dummyAnswers: Record<string, string> = {
  // Common profile fields
  full_name: "Test User",
  name: "Test User",
  first_name: "Test",
  last_name: "User",
  email: "test@example.com",
  phone: "+1 555 000 0000",
  school: "Test University",
  github: "https://github.com/testuser",
  linkedin: "https://linkedin.com/in/testuser",
  website: "https://testuser.dev",
  bio: "Test bio for form filling.",
  team_name: "Test Team",
};

const plannedActions = fields
  .map((f) => {
    const value =
      dummyAnswers[f.canonicalName] ??
      (f.type === "checkbox" ? "false" : f.options?.[0] ?? "test value");
    return { field: f.canonicalName, value, source: "profile" as const };
  })
  .filter((a) => a.value !== "");

console.log(`\nFilling ${plannedActions.length} field(s) with dummy values...`);

const dummyRun = {
  id: "test-run-001",
  userId: "test-user",
  hackathonId: "test-hackathon",
  runner: "simulang" as const,
  status: "filling" as const,
  plannedActions,
  artifacts: { screenshots: [] as string[] },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const events: RegistrationProgressEvent[] = [];

try {
  const result = await runner.fill(dummyRun, url, fields, (e) => {
    events.push(e);
    if (e.type === "field_filling") {
      process.stdout.write(`  filling "${e.field}"...`);
    } else if (e.type === "field_filled") {
      console.log(` ✓  value="${e.value}" source=${e.source}`);
    }
  });
  console.log(`\nFill complete. ${result.screenshots.length} screenshot(s) captured.`);
} catch (err) {
  console.error("\nfill() threw:", err);
}

console.log(`\nEvents emitted (${events.length}):`);
for (const e of events) {
  console.log(" ", JSON.stringify(e));
}

console.log("\n--- Done. Browser stays open so you can inspect the result. ---");
console.log("--- To test submit too: modify this script to call runner.submit() ---");
