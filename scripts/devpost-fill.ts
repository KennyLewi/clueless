/**
 * Standalone, verbose Devpost registration filler — for debugging the vision flow.
 * Opens the /register page in your real Chrome, then for each form control it:
 *   screenshots → asks the VLM to locate it → logs the coords → moves + clicks.
 * Saves a screenshot at every step to ./simulang-shots/ so you can see what it saw.
 *
 * It does NOT click "Register" unless you pass --submit (so you won't accidentally
 * register for real while debugging).
 *
 * Usage:
 *   simulang run scripts/devpost-fill.ts "https://global-tech-innovation-2026.devpost.com/register"
 *   simulang run scripts/devpost-fill.ts "<url>" --submit      # also clicks Register
 */

import {
  App,
  FocusPolicy,
  Visibility,
  Screen,
  screenshotFull,
  GroundingModel,
  MouseController,
  Button,
  Coordinate,
  Direction,
} from "@simular-ai/simulang-js";
import { mkdirSync } from "node:fs";

const url = process.argv[2];
const doSubmit = process.argv.includes("--submit");
if (!url) {
  console.error('Usage: simulang run scripts/devpost-fill.ts "<register-url>" [--submit]');
  process.exit(1);
}

const OUT = "./simulang-shots";
mkdirSync(OUT, { recursive: true });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const log = (...a: unknown[]) => console.log(...a);
let step = 0;
const snap = (label: string) => {
  const name = `${OUT}/${String(step++).padStart(2, "0")}-${label}.png`;
  try {
    screenshotFull(false, Screen.mainScreen()).save(name);
    log(`   📸 saved ${name}`);
  } catch (e) {
    log(`   (screenshot save failed: ${String(e)})`);
  }
};

// ── 1. open the page ─────────────────────────────────────────────────────────
log(`\n▶ Opening ${url}`);
const inst = App.exactName("Google Chrome").open(url, FocusPolicy.Steal, Visibility.Show, true);
log(`   Chrome pid=${inst.pid}`);
log("   waiting 6s for the page / SPA to render…");
await sleep(6000);

// ── 2. grounding model ───────────────────────────────────────────────────────
let model: GroundingModel;
try {
  log("\n▶ Grounding model");
  log("   aliases:", GroundingModel.availableAliases().join(", ") || "(none)");
  model = GroundingModel.default();
  log("   using:", model.name);
} catch (e) {
  console.error("   GroundingModel.default() failed — no VLM provider configured:", e);
  process.exit(1);
}

const mouse = new MouseController();
const dims = screenshotFull(false, Screen.mainScreen()).dimensions;
log("   screen screenshot dimensions:", dims);
snap("loaded");

// ── 3. ground + click each control ───────────────────────────────────────────
async function clickConcept(concept: string): Promise<boolean> {
  log(`\n▶ Locating: ${concept}`);
  let coords: [number, number];
  try {
    coords = screenshotFull(false, Screen.mainScreen()).ground(model, concept);
  } catch (e) {
    log(`   ❌ ground() threw: ${String(e)}`);
    return false;
  }
  const [x, y] = coords;
  log(`   → VLM says [${x}, ${y}]`);
  snap(`before-${Math.round(x)}-${Math.round(y)}`);
  mouse.moveMouse(x, y, Coordinate.Abs);
  await sleep(400); // pause so you can SEE the cursor land before the click
  mouse.button(Button.Left, Direction.Click);
  log("   ✓ clicked");
  await sleep(600);
  snap("after-click");
  return true;
}

const controls = [
  'the "Working solo" radio button option under the question "Do you have teammates?"',
  'the checkbox to the left of "I have read and agree to the eligibility requirements for this hackathon"',
  'the checkbox to the left of "I have read and agree to be bound by the Official Rules and the Devpost Terms of Service"',
];

for (const c of controls) {
  await clickConcept(c);
}

// ── 4. Register button (only clicked with --submit) ──────────────────────────
const submitConcept = 'the green "Register" submit button at the bottom of the form';
log(`\n▶ Locating Register button: ${submitConcept}`);
try {
  const [sx, sy] = screenshotFull(false, Screen.mainScreen()).ground(model, submitConcept);
  log(`   → VLM says [${sx}, ${sy}]`);
  snap("register-located");
  if (doSubmit) {
    mouse.moveMouse(sx, sy, Coordinate.Abs);
    await sleep(400);
    mouse.button(Button.Left, Direction.Click);
    log("   ✓ clicked Register");
    await sleep(4000);
    snap("after-register");
  } else {
    log("   (skipping click — pass --submit to actually register)");
  }
} catch (e) {
  log(`   ❌ ground() threw: ${String(e)}`);
}

log(`\n✅ Done. Review the screenshots in ${OUT}/ to see exactly where it clicked.`);
