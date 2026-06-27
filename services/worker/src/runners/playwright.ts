/// <reference lib="dom" />
import { chromium } from "playwright";
import type { Browser, Page } from "playwright";
import type { FormFieldSpec, RegistrationRun, RegistrationProgressEvent, PlannedAction } from "@earlybirds/contracts";

export class PlaywrightRunner {
  readonly kind = "playwright" as const;

  // Visits the form page and returns FormFieldSpec[] by reading DOM structure.
  async introspect(formUrl: string): Promise<FormFieldSpec[]> {
    let browser: Browser | null = null;
    try {
      browser = await chromium.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
      const page = await browser.newPage();
      await page.goto(formUrl, { waitUntil: "domcontentloaded", timeout: 20_000 });

      type RawField = { label: string; selector: string; type: string; required: boolean; options?: string[] };

      const fields = await page.evaluate((): RawField[] => {
        const result: Array<{ label: string; selector: string; type: string; required: boolean; options?: string[] }> = [];
        const seen = new Set<string>();

        const inputs = document.querySelectorAll<HTMLElement>(
          "input:not([type=hidden]):not([type=submit]):not([type=button]), textarea, select",
        );

        inputs.forEach((el) => {
          const input = el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
          // Resolve label
          let label = "";
          if (input.id) {
            const lbl = document.querySelector<HTMLLabelElement>(`label[for="${input.id}"]`);
            if (lbl) label = lbl.innerText.trim();
          }
          if (!label) label = input.getAttribute("aria-label")?.trim() ?? "";
          if (!label) label = input.getAttribute("placeholder")?.trim() ?? "";
          // Walk up to a wrapping label
          if (!label) {
            let parent = input.parentElement;
            while (parent && parent !== document.body) {
              if (parent.tagName === "LABEL") {
                label = (parent as HTMLLabelElement).innerText.trim();
                break;
              }
              parent = parent.parentElement;
            }
          }
          if (!label) return;

          // Build a stable selector
          let selector = "";
          if (input.id) selector = `#${CSS.escape(input.id)}`;
          else if (input.name) selector = `[name="${input.name}"]`;
          if (!selector || seen.has(selector)) return;
          seen.add(selector);

          const tag = input.tagName.toLowerCase();
          const rawType = tag === "textarea" ? "textarea" : tag === "select" ? "select" : (input as HTMLInputElement).type || "text";
          const type = ["text", "email", "textarea", "select", "checkbox", "radio", "file"].includes(rawType)
            ? rawType
            : "text";

          const options =
            tag === "select"
              ? Array.from((input as HTMLSelectElement).options)
                  .filter((o) => o.value)
                  .map((o) => o.text.trim())
              : undefined;

          result.push({ label, selector, type, required: input.required, options });
        });

        return result;
      });

      return fields.map((f) => ({
        canonicalName: f.label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_+|_+$/g, ""),
        label: f.label,
        selector: f.selector,
        type: f.type as FormFieldSpec["type"],
        required: f.required,
        options: f.options,
        confidence: 0.7,
      }));
    } catch (err) {
      console.warn("[playwright] introspect failed:", err);
      return [];
    } finally {
      await browser?.close();
    }
  }

  // Fills form fields from run.plannedActions. Emits SSE events per field.
  // Does NOT submit — caller must invoke submit() after human approval.
  async fill(
    run: RegistrationRun,
    formUrl: string,
    knownFields: FormFieldSpec[],
    onEvent: (e: RegistrationProgressEvent) => void,
  ): Promise<{ screenshots: string[] }> {
    let browser: Browser | null = null;
    try {
      browser = await chromium.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
      const page = await browser.newPage();
      await this._fillPage(page, run.plannedActions, formUrl, knownFields, onEvent);
      const shot = await page.screenshot();
      return { screenshots: [`data:image/png;base64,${shot.toString("base64")}`] };
    } finally {
      await browser?.close();
    }
  }

  // Re-fills the form (fresh browser) then submits. Returns confirmation screenshot.
  async submit(
    run: RegistrationRun,
    formUrl: string,
    knownFields: FormFieldSpec[],
    onEvent: (e: RegistrationProgressEvent) => void,
  ): Promise<{ finalScreenshot: string }> {
    let browser: Browser | null = null;
    try {
      browser = await chromium.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
      const page = await browser.newPage();

      await this._fillPage(page, run.plannedActions, formUrl, knownFields, onEvent);

      // Click the submit button. Try the most common patterns in order.
      const submitSelectors = [
        'button[type="submit"]',
        'input[type="submit"]',
        'button:has-text("Submit")',
        'button:has-text("Register")',
        'button:has-text("RSVP")',
        'button:has-text("Sign up")',
        'button:has-text("Sign Up")',
      ];

      let clicked = false;
      for (const sel of submitSelectors) {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 1_000 }).catch(() => false)) {
          await btn.click();
          clicked = true;
          break;
        }
      }

      if (!clicked) {
        // Last resort: submit the first form element programmatically.
        await page.evaluate(() => {
          const form = document.querySelector<HTMLFormElement>("form");
          form?.requestSubmit();
        });
      }

      await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});

      const finalShot = await page.screenshot();
      return { finalScreenshot: `data:image/png;base64,${finalShot.toString("base64")}` };
    } finally {
      await browser?.close();
    }
  }

  // Shared: navigate, fill each planned action, emit SSE events.
  private async _fillPage(
    page: Page,
    actions: PlannedAction[],
    formUrl: string,
    knownFields: FormFieldSpec[],
    onEvent: (e: RegistrationProgressEvent) => void,
  ): Promise<void> {
    await page.goto(formUrl, { waitUntil: "domcontentloaded", timeout: 20_000 });
    await page.waitForTimeout(500);

    for (const action of actions) {
      const spec = knownFields.find((f) => f.canonicalName === action.field);
      if (!spec) continue;

      onEvent({ type: "field_filling", field: action.field, label: spec.label });

      try {
        let filled = false;

        if (spec.selector) {
          const loc = page.locator(spec.selector).first();
          if (await loc.isVisible({ timeout: 2_000 }).catch(() => false)) {
            if (spec.type === "checkbox") {
              if (action.value === "true") await loc.check();
              else await loc.uncheck();
            } else if (spec.type === "select") {
              await loc.selectOption(action.value);
            } else if (spec.type === "radio") {
              await page.locator(`${spec.selector}[value="${action.value}"]`).check();
            } else {
              await loc.clear();
              await loc.fill(action.value);
            }
            filled = true;
          }
        }

        if (!filled) {
          // Fall back to label text matching.
          const loc = page.getByLabel(spec.label, { exact: false }).first();
          if (await loc.isVisible({ timeout: 2_000 }).catch(() => false)) {
            await loc.fill(action.value);
            filled = true;
          }
        }

        if (filled) {
          onEvent({ type: "field_filled", field: action.field, value: action.value, source: action.source });
        } else {
          console.warn(`[playwright] could not locate field: ${action.field} (${spec.label})`);
        }
      } catch (err) {
        console.warn(`[playwright] error filling ${action.field}:`, err);
      }
    }
  }
}
