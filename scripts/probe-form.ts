/**
 * Simulang form probe — reads accessibility tree of a registration page.
 * Opens Chrome, waits for load, prints all fields + buttons found.
 * Does NOT fill or submit anything.
 *
 * Usage:
 *   simulang run scripts/probe-form.ts <url>
 *
 * Examples:
 *   simulang run scripts/probe-form.ts https://steminate-hacks-2026.devpost.com/register
 *   simulang run scripts/probe-form.ts https://lu.ma/<event-slug>
 */

import {
  App,
  FocusPolicy,
  Visibility,
  AccessibilityTree,
  AccessibilityNode,
  TraversalOrder,
  AriaRole,
} from "@simular-ai/simulang-js";

const url = process.argv[2];
if (!url) {
  console.error("Usage: simulang run scripts/probe-form.ts <url>");
  process.exit(1);
}

// Use Chrome — it exposes a richer accessibility tree than Safari for web content.
const chrome = App.exactName("Google Chrome");
if (!App.exists("Google Chrome")) {
  console.error("Chrome not found. Install Chrome or change App.exactName() to match your browser.");
  process.exit(1);
}

console.log(`\nOpening: ${url}`);
const instance = chrome.open(url, FocusPolicy.Steal, Visibility.Show, true);
console.log(`Chrome PID: ${instance.pid}`);

// Enable the accessibility tree (Chrome disables it by default for perf).
instance.enableAccessibility();

// Wait for page load + accessibility tree to populate.
// Devpost and other SPAs can take 10s+ to fully hydrate.
console.log("Waiting for page load (12s)...");
await new Promise((r) => setTimeout(r, 12000));

// Bind tree to this specific Chrome instance by PID.
const tree = AccessibilityTree.fromPid(instance.pid);
console.log(`Window: "${tree.windowTitle}"\n`);

// ── Print raw snapshot (first 3000 chars) so we can see the full structure ──
const raw = AccessibilityNode.fromPid(instance.pid).snapshot();
console.log("=== RAW ACCESSIBILITY SNAPSHOT (first 8000 chars) ===");
console.log(raw.slice(0, 8000));
console.log("...(truncated)\n");

// ── Text inputs ──────────────────────────────────────────────────────────────
const textboxes = tree.find(TraversalOrder.DepthFirst, AriaRole.Textbox, null, false, 50, true);
console.log(`TEXT FIELDS (${textboxes.length}):`);
for (const n of textboxes) {
  console.log(`  name="${n.name}"  value="${n.value}"  refId=${n.refId}`);
}

// ── Checkboxes ───────────────────────────────────────────────────────────────
const checkboxes = tree.find(TraversalOrder.DepthFirst, AriaRole.Checkbox, null, false, 20, true);
console.log(`\nCHECKBOXES (${checkboxes.length}):`);
for (const n of checkboxes) {
  console.log(`  name="${n.name}"  refId=${n.refId}`);
}

// ── Buttons ──────────────────────────────────────────────────────────────────
const buttons = tree.find(TraversalOrder.DepthFirst, AriaRole.Button, null, false, 30, true);
console.log(`\nBUTTONS (${buttons.length}):`);
for (const n of buttons) {
  console.log(`  name="${n.name}"  refId=${n.refId}`);
}

// ── All links (helps find Register button / CTAs) ────────────────────────────
const links = tree.find(TraversalOrder.DepthFirst, AriaRole.Link, null, false, 100, true);
const namedLinks = links.filter((n) => n.name && n.name.trim().length > 0);
console.log(`\nLINKS with names (${namedLinks.length}):`);
for (const n of namedLinks) {
  console.log(`  name="${n.name}"  refId=${n.refId}`);
}

console.log("\n--- Done. Browser stays open. ---");
