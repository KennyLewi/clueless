import {
  App,
  FocusPolicy,
  Visibility,
  Screen,
  screenshotFull,
  GroundingModel,
  MouseController,
  KeyboardController,
  Button,
  Coordinate,
  Direction,
  Key,
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

function isDevpost(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith("devpost.com");
  } catch {
    return false;
  }
}

function openChrome(url: string): Instance {
  const chrome = App.exactName("Google Chrome");
  return chrome.open(url, FocusPolicy.Steal, Visibility.Show, true);
}

// Devpost's registration form is radios + required checkboxes + a Register button —
// no text inputs. These are the fields the runner fills (vision-grounded by label).
const DEVPOST_FIELDS: FormFieldSpec[] = [
  {
    canonicalName: "team_status",
    label: "Do you have teammates?",
    type: "radio",
    options: ["Working solo", "Looking for teammates", "Already have a team"],
    required: true,
    confidence: 0.85,
  },
  {
    canonicalName: "eligibility_agree",
    label: "I have read and agree to the eligibility requirements for this hackathon",
    type: "checkbox",
    required: true,
    confidence: 0.85,
  },
  {
    canonicalName: "terms_agree",
    label: "I have read and agree to the Official Rules and the Devpost Terms of Service",
    type: "checkbox",
    required: true,
    confidence: 0.85,
  },
];

// Generic profile fields for non-Devpost forms (e.g. Luma / Google Forms).
const PROFILE_FIELDS: FormFieldSpec[] = [
  { canonicalName: "full_name", label: "Full name", type: "text", required: true, confidence: 0.8 },
  { canonicalName: "first_name", label: "First name", type: "text", required: false, confidence: 0.7 },
  { canonicalName: "last_name", label: "Last name", type: "text", required: false, confidence: 0.7 },
  { canonicalName: "email", label: "Email", type: "email", required: true, confidence: 0.8 },
  { canonicalName: "school", label: "School", type: "text", required: false, confidence: 0.7 },
  { canonicalName: "github", label: "GitHub", type: "text", required: false, confidence: 0.7 },
];

const SUBMIT_CONCEPT =
  "the primary submit button at the bottom of this registration form, labeled Register, Submit, Join, or RSVP";

export class SimulangRunner {
  readonly kind = "simulang" as const;

  // Reuse one Chrome window across introspect → fill within a single job.
  private _instance: Instance | null = null;
  private _instanceUrl: string | null = null;

  private _model: GroundingModel | null = null;
  private _mouse: MouseController | null = null;
  private _keyboard: KeyboardController | null = null;

  private get model(): GroundingModel {
    return (this._model ??= GroundingModel.default());
  }
  private get mouse(): MouseController {
    return (this._mouse ??= new MouseController());
  }
  private get keyboard(): KeyboardController {
    return (this._keyboard ??= new KeyboardController());
  }

  private openOrReuse(url: string): { instance: Instance; reused: boolean } {
    if (this._instance && this._instanceUrl === url) {
      return { instance: this._instance, reused: true };
    }
    const instance = openChrome(url);
    this._instance = instance;
    this._instanceUrl = url;
    return { instance, reused: false };
  }

  private shot() {
    return screenshotFull(false, Screen.mainScreen());
  }

  // Locate a concept on a fresh screenshot and click it. Returns false if grounding throws.
  private async groundClick(concept: string): Promise<boolean> {
    try {
      const [x, y] = this.shot().ground(this.model, concept);
      this.mouse.moveMouse(x, y, Coordinate.Abs);
      await sleep(120);
      this.mouse.button(Button.Left, Direction.Click);
      await sleep(300);
      return true;
    } catch (err) {
      console.warn(`[simulang] ground failed for "${concept}":`, err);
      return false;
    }
  }

  // Click a text field, select-all, and type the value (overwrites any prefill).
  private async fillTextField(label: string, value: string): Promise<boolean> {
    const ok = await this.groundClick(`the "${label}" text input field on the form`);
    if (!ok) return false;
    this.keyboard.key(Key.Meta, Direction.Press);
    this.keyboard.key(Key.A, Direction.Click);
    this.keyboard.key(Key.Meta, Direction.Release);
    await sleep(80);
    this.keyboard.text(value);
    await sleep(200);
    return true;
  }

  // Performs one planned action by field type. Returns true if it acted.
  private async applyAction(spec: FormFieldSpec, action: PlannedAction): Promise<boolean> {
    if (spec.type === "checkbox") {
      // value "false"/"no" means leave unchecked; anything else → check it.
      const want = !/^(false|no|0|off)$/i.test(action.value);
      if (!want) return true;
      return this.groundClick(`the checkbox for "${spec.label}"`);
    }
    if (spec.type === "radio" || spec.type === "select") {
      return this.groundClick(`the "${action.value}" option under the question "${spec.label}"`);
    }
    return this.fillTextField(spec.label, action.value);
  }

  async introspect(formUrl: string): Promise<FormFieldSpec[]> {
    const { reused } = this.openOrReuse(formUrl);
    if (!reused) await sleep(5000); // let the SPA render
    return isDevpost(formUrl) ? DEVPOST_FIELDS : PROFILE_FIELDS;
  }

  async fill(
    run: RegistrationRun,
    formUrl: string,
    knownFields: FormFieldSpec[],
    onEvent: (e: RegistrationProgressEvent) => void,
  ): Promise<{ screenshots: string[] }> {
    const { reused } = this.openOrReuse(formUrl);
    if (!reused) await sleep(5000);

    const screenshots: string[] = [];
    for (const action of run.plannedActions) {
      const spec = knownFields.find((f) => f.canonicalName === action.field);
      if (!spec) continue;
      onEvent({ type: "field_filling", field: action.field, label: spec.label });

      const ok = await this.applyAction(spec, action);
      if (ok) {
        onEvent({ type: "field_filled", field: action.field, value: action.value, source: action.source });
        screenshots.push(this.shot().base64());
      } else {
        console.warn(`[simulang] could not act on ${action.field} (${spec.label})`);
      }
    }

    return { screenshots: screenshots.length ? screenshots : [this.shot().base64()] };
  }

  async submit(
    run: RegistrationRun,
    formUrl: string,
    knownFields: FormFieldSpec[],
    onEvent: (e: RegistrationProgressEvent) => void,
  ): Promise<{ finalScreenshot: string; confirmationCode?: string }> {
    const { reused } = this.openOrReuse(formUrl);
    if (!reused) await sleep(5000);

    // Re-apply every action (fresh window for the submit phase), then click submit.
    for (const action of run.plannedActions) {
      const spec = knownFields.find((f) => f.canonicalName === action.field);
      if (!spec) continue;
      onEvent({ type: "field_filling", field: action.field, label: spec.label });
      const ok = await this.applyAction(spec, action);
      if (ok) onEvent({ type: "field_filled", field: action.field, value: action.value, source: action.source });
    }

    onEvent({ type: "step_started", step: "submitting", runner: "simulang" });
    await this.groundClick(SUBMIT_CONCEPT);
    await sleep(4000); // wait for the confirmation page to render

    const finalScreenshot = this.shot().base64();
    return { finalScreenshot };
  }
}
