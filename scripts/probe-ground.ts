/**
 * Checks whether VLM grounding is available on this machine, then tries to
 * locate a concept on a live screenshot of the current screen.
 *
 * Usage:
 *   simulang run scripts/probe-ground.ts "the Chrome address bar"
 */

import { GroundingModel, Screen, screenshotFull } from "@simular-ai/simulang-js";

const concept = process.argv[2] ?? "the Chrome address bar";

console.log("Available grounding aliases:");
try {
  const aliases = GroundingModel.availableAliases();
  console.log("  ", aliases.length ? aliases.join(", ") : "(none)");
} catch (err) {
  console.log("  availableAliases() threw:", err);
}

let model: GroundingModel;
try {
  model = GroundingModel.default();
  console.log("default model:", model.name);
} catch (err) {
  console.error("\nGroundingModel.default() failed — no VLM provider configured.");
  console.error(err);
  process.exit(1);
}

console.log(`\nGrounding concept: "${concept}"`);
const shot = screenshotFull(false, Screen.mainScreen());
console.log("screenshot dimensions:", shot.dimensions);

try {
  const [x, y] = shot.ground(model, concept);
  console.log(`→ located at global pixels [${x}, ${y}]`);
} catch (err) {
  console.error("ground() failed:", err);
  process.exit(1);
}
