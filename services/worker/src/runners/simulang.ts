import {
  App,
  FocusPolicy,
  Visibility,
  AccessibilityTree,
  AccessibilityNode,
  TraversalOrder,
  AriaRole,
  Screen,
  screenshotFull,
  type Instance,
} from "@simular-ai/simulang-js";
import type {
  FormFieldSpec,
  RegistrationRun,
  RegistrationProgressEvent,
  PlannedAction,
} from "@earlybirds/contracts";

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function toCanonical(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function openChrome(url: string): Instance {
  const chrome = App.exactName("Google Chrome");
  const instance = chrome.open(url, FocusPolicy.Steal, Visibility.Show, true);
  instance.enableAccessibility();
  return instance;
}

export class SimulangRunner {
  readonly kind = "simulang" as const;

  async introspect(formUrl: string): Promise<FormFieldSpec[]> {
    const instance = openChrome(formUrl);
    await sleep(4000);

    const tree = AccessibilityTree.fromPid(instance.pid);
    const fields: FormFieldSpec[] = [];
    const seen = new Set<string>();

    const add = (nodes: ReturnType<typeof tree.find>, type: FormFieldSpec["type"]) => {
      for (const n of nodes) {
        if (!n.name) continue;
        const canon = toCanonical(n.name);
        if (!canon || seen.has(canon)) continue;
        seen.add(canon);
        fields.push({
          canonicalName: canon,
          label: n.name,
          a11ySelector: n.name,
          type,
          required: false,
          confidence: 0.75,
        });
      }
    };

    add(tree.find(TraversalOrder.DepthFirst, AriaRole.Textbox, null, false, 50, true), "text");
    add(tree.find(TraversalOrder.DepthFirst, AriaRole.Checkbox, null, false, 20, true), "checkbox");
    add(tree.find(TraversalOrder.DepthFirst, AriaRole.Combobox, null, false, 20, true), "select");

    return fields;
  }

  async fill(
    run: RegistrationRun,
    formUrl: string,
    knownFields: FormFieldSpec[],
    onEvent: (e: RegistrationProgressEvent) => void,
  ): Promise<{ screenshots: string[] }> {
    const instance = openChrome(formUrl);
    await sleep(4000);

    await this._fillTree(instance, run.plannedActions, knownFields, onEvent);

    const shot = screenshotFull(false, Screen.mainScreen()).base64();
    return { screenshots: [shot] };
  }

  async submit(
    run: RegistrationRun,
    formUrl: string,
    knownFields: FormFieldSpec[],
    onEvent: (e: RegistrationProgressEvent) => void,
  ): Promise<{ finalScreenshot: string; confirmationCode?: string }> {
    const instance = openChrome(formUrl);
    await sleep(4000);

    await this._fillTree(instance, run.plannedActions, knownFields, onEvent);

    // Click the submit button — try known CTA labels in order.
    const submitLabels = ["Submit", "Register", "RSVP", "Sign up", "Sign Up", "Apply", "Continue", "Join"];
    let submitted = false;

    for (const label of submitLabels) {
      const tree = AccessibilityTree.fromPid(instance.pid);
      const buttons = tree.find(TraversalOrder.DepthFirst, AriaRole.Button, label, false, 1, true);
      const btn = buttons[0];
      if (btn?.refId != null) {
        tree.activate(btn.refId);
        submitted = true;
        break;
      }
    }

    if (!submitted) {
      // Fallback: scan all buttons for a submit-like label.
      const tree = AccessibilityTree.fromPid(instance.pid);
      const allButtons = tree.find(TraversalOrder.DepthFirst, AriaRole.Button, null, false, 30, true);
      const cta = allButtons.find((b) => /submit|register|apply|rsvp|sign.?up|continue|join/i.test(b.name ?? ""));
      if (cta?.refId != null) {
        tree.activate(cta.refId);
        submitted = true;
      }
    }

    if (!submitted) {
      console.warn("[simulang] submit: no submit button found");
    }

    await sleep(3000);

    const finalShot = screenshotFull(false, Screen.mainScreen()).base64();

    // Extract confirmation code from the post-submit accessibility snapshot.
    let confirmationCode: string | undefined;
    try {
      const snap = AccessibilityNode.fromPid(instance.pid).snapshot();
      const m = snap.match(
        /(?:confirmation|reference|registration|booking|order)\s*(?:code|number|id|#|no\.?)?\s*[:\-–]?\s*([A-Z0-9][A-Z0-9\-]{2,})/i,
      );
      confirmationCode = m?.[1];
    } catch (err) {
      console.warn("[simulang] confirmation code extraction failed:", err);
    }

    return { finalScreenshot: finalShot, confirmationCode };
  }

  // Navigate to the form URL and fill each planned action via accessibility tree.
  private async _fillTree(
    instance: Instance,
    actions: PlannedAction[],
    knownFields: FormFieldSpec[],
    onEvent: (e: RegistrationProgressEvent) => void,
  ): Promise<void> {
    for (const action of actions) {
      const spec = knownFields.find((f) => f.canonicalName === action.field);
      if (!spec) continue;

      onEvent({ type: "field_filling", field: action.field, label: spec.label });

      try {
        // Re-query tree before every action — refIds invalidate on tree rebuild.
        const tree = AccessibilityTree.fromPid(instance.pid);

        // Find by exact label first; fall back to role-based scan filtered by canonical name.
        let nodes = tree.find(TraversalOrder.DepthFirst, null, spec.label, false, 3, true);

        if (nodes.length === 0) {
          const role =
            spec.type === "checkbox"
              ? AriaRole.Checkbox
              : spec.type === "select"
                ? AriaRole.Combobox
                : AriaRole.Textbox;
          const candidates = tree.find(TraversalOrder.DepthFirst, role, null, false, 50, true);
          const canon = toCanonical(spec.label);
          nodes = candidates.filter((n) => {
            const nc = toCanonical(n.name);
            return nc.includes(canon) || canon.includes(nc);
          });
        }

        const first = nodes[0];
        if (first == null || first.refId == null) {
          console.warn(`[simulang] could not locate field: ${action.field} (${spec.label})`);
          continue;
        }

        const refId = first.refId;

        if (spec.type === "checkbox") {
          const isChecked =
            first.value === "true" ||
            first.value === "1" ||
            first.value.toLowerCase() === "checked";
          const wantChecked = action.value === "true";
          if (isChecked !== wantChecked) tree.toggle(refId);
        } else if (spec.type === "select") {
          tree.expandCollapse(refId);
          await sleep(300);
          const tree2 = AccessibilityTree.fromPid(instance.pid);
          const options = tree2.find(TraversalOrder.DepthFirst, AriaRole.Option, action.value, false, 5, true);
          const firstOpt = options[0];
          if (firstOpt?.refId != null) {
            tree2.activate(firstOpt.refId);
          }
        } else {
          tree.setValue(refId, action.value);
        }

        onEvent({ type: "field_filled", field: action.field, value: action.value, source: action.source });
        await sleep(150);
      } catch (err) {
        console.warn(`[simulang] error filling ${action.field}:`, err);
      }
    }
  }
}
