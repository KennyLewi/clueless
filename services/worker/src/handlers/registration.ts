import type { Job } from "bullmq";
import { Redis } from "ioredis";
import type {
  RegistrationRunJob,
  RegistrationProgressEvent,
  PlannedAction,
  FormFieldSpec,
} from "@earlybirds/contracts";
import { registrationEventChannel, TERMINAL_STATUSES } from "@earlybirds/contracts";
import { db } from "@earlybirds/db";
import { REDIS_URL } from "../config.js";
import { SimulangRunner } from "../runners/simulang.js";

export async function handleRegistration(job: Job<RegistrationRunJob>) {
  const { runId, phase } = job.data;
  const isSubmitPhase = phase === "submit";
  const redis = new Redis(REDIS_URL);

  // Awaited publish — prevents the finally-disconnect from racing the last message.
  const publish = async (event: RegistrationProgressEvent): Promise<void> => {
    try {
      await redis.publish(registrationEventChannel(runId), JSON.stringify(event));
    } catch {
      // Ignore publish errors (client may have disconnected).
    }
  };

  const fail = async (stage: string, message: string) => {
    await db.registrationRun.update({
      where: { id: runId },
      data: { status: "failed", errorStage: stage, errorMessage: message },
    });
    await publish({ type: "status_changed", status: "failed", error: { stage, message } });
  };

  try {
    const run = await db.registrationRun.findUnique({
      where: { id: runId },
      include: { hackathon: true, user: true },
    });

    if (!run) {
      console.error(`[registration] run ${runId} not found`);
      return { error: "not_found" };
    }

    // Terminal guard: always skip completed runs, even for explicit submit jobs.
    if ((TERMINAL_STATUSES as readonly string[]).includes(run.status)) {
      console.log(`[registration] run ${runId} already terminal (${run.status}), skipping`);
      return { runId, status: run.status, skipped: true };
    }

    // Non-submit jobs (fill phase or BullMQ retries) skip if run is awaiting_approval or
    // already submitting — prevents retried fill jobs from triggering a duplicate submit.
    if (!isSubmitPhase && (run.status === "awaiting_approval" || run.status === "submitting")) {
      console.log(`[registration] run ${runId} status=${run.status}, skipping non-submit job`);
      return { runId, status: run.status, skipped: true };
    }

    console.log(`[registration] run ${runId} status=${run.status} phase=${phase ?? "fill"}`);

    const runner = new SimulangRunner();
    const formUrl = run.hackathon.registrationFormUrl ?? run.hackathon.url;

    // ── Submit path (triggered after human approval via /approve) ─────────────
    if (run.status === "submitting") {
      await publish({ type: "step_started", step: "submitting", runner: "playwright" });

      // Prefer the playwright-derived fields stored at fill time (resolvedFields).
      // Falling back to dbKnownFields (LLM-generated) would cause canonicalName
      // divergence with the plannedActions, resulting in a silent blank submission.
      const storedFields = run.resolvedFields as unknown as FormFieldSpec[];
      let submitFields = storedFields.length > 0 ? storedFields : [];

      // Only re-introspect if we have nothing stored (handles legacy/pre-migration runs).
      if (submitFields.length === 0) {
        try {
          submitFields = await runner.introspect(formUrl);
        } catch {
          // Non-fatal — fall through to hard failure below.
        }
      }

      // Refuse to submit with no fields — avoids silent blank-form submission.
      if (submitFields.length === 0) {
        await fail("submitting", "No form field specs available — please cancel and restart the registration.");
        return { runId, status: "failed" };
      }

      let finalScreenshot = "";
      let confirmationCode: string | undefined;
      try {
        const result = await runner.submit(
          {
            id: run.id,
            userId: run.userId,
            hackathonId: run.hackathonId,
            runner: "simulang",
            status: "submitting",
            plannedActions: run.plannedActions as unknown as PlannedAction[],
            artifacts: { screenshots: run.screenshots, finalScreenshot: run.finalScreenshot ?? undefined },
            error: run.errorStage ? { stage: run.errorStage, message: run.errorMessage ?? "" } : undefined,
            createdAt: run.createdAt.toISOString(),
            updatedAt: run.updatedAt.toISOString(),
          },
          formUrl,
          submitFields,
          publish,
        );
        finalScreenshot = result.finalScreenshot;
        confirmationCode = result.confirmationCode;
      } catch (err) {
        await fail("submitting", String(err));
        return { runId, status: "failed" };
      }

      // Guard on status="submitting" — prevents a concurrent cancel from being overwritten.
      let persistedOk = false;
      try {
        const updated = await db.registrationRun.updateMany({
          where: { id: runId, status: "submitting" },
          data: { status: "succeeded", finalScreenshot, confirmationCode },
        });
        persistedOk = updated.count > 0;
      } catch (err) {
        // DB error: best-effort fail; run may stay in submitting if DB is down.
        await fail("persisting_result", String(err)).catch(() => {});
        return { runId, status: "failed" };
      }

      if (!persistedOk) {
        // Run was cancelled between the terminal guard and here; do not publish succeeded.
        return { runId, status: "cancelled" };
      }

      await publish({ type: "status_changed", status: "succeeded", confirmationCode });
      return { runId, status: "succeeded" };
    }

    // ── Fresh run: introspect → fill → awaiting_approval ─────────────────────

    await db.registrationRun.update({ where: { id: runId }, data: { status: "introspecting" } });
    await publish({ type: "step_started", step: "introspecting", runner: "playwright" });

    const dbKnownFields = run.hackathon.knownFields as unknown as FormFieldSpec[];
    let fields: FormFieldSpec[] = [];
    try {
      fields = await runner.introspect(formUrl);
    } catch {
      // Non-fatal — fall through to DB fields.
    }
    if (fields.length === 0 && dbKnownFields.length > 0) fields = dbKnownFields;
    if (fields.length === 0) {
      await fail("introspecting", "No form fields found at the registration URL.");
      return { runId, status: "failed" };
    }

    await db.registrationRun.update({ where: { id: runId }, data: { status: "filling" } });
    await publish({ type: "step_started", step: "filling", runner: "playwright" });

    const answers = run.user.formAnswers as Record<string, string>;
    const plannedActions: PlannedAction[] = fields
      .map((f): PlannedAction | null => {
        const value = answers[f.canonicalName];
        if (value) return { field: f.canonicalName, value, source: "profile" };
        return null;
      })
      .filter((a): a is PlannedAction => a !== null);

    const contractRun = {
      id: run.id,
      userId: run.userId,
      hackathonId: run.hackathonId,
      runner: "playwright" as const,
      status: "filling" as const,
      plannedActions,
      artifacts: { screenshots: [] as string[] },
      createdAt: run.createdAt.toISOString(),
      updatedAt: run.updatedAt.toISOString(),
    };

    let screenshots: string[] = [];
    try {
      const result = await runner.fill(contractRun, formUrl, fields, publish);
      screenshots = result.screenshots;
    } catch (err) {
      await fail("filling", String(err));
      return { runId, status: "failed" };
    }

    // Persist plan + playwright-introspected fields together — submit phase uses
    // resolvedFields to avoid re-deriving them (and diverging) later.
    await db.registrationRun.update({
      where: { id: runId },
      data: {
        status: "awaiting_approval",
        plannedActions: plannedActions as object[],
        resolvedFields: fields as object[],
        screenshots,
      },
    });
    await publish({ type: "awaiting_approval", plannedActions });

    return { runId, status: "awaiting_approval" };
  } finally {
    redis.disconnect();
  }
}
