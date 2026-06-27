import type { Api, RunStreamHandlers } from "./api";
import type { PlannedAction, RegistrationProgressEvent, RegistrationRun } from "./types";
import { AUTOFILL_FIELDS, DEMO_PROFILE, EVENTS, FEED, eventById } from "./mock-data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function makeRun(userId: string, hackathonId: string): RegistrationRun {
  const nowIso = new Date().toISOString();
  return {
    id: `run_${Math.random().toString(36).slice(2, 10)}`,
    userId,
    hackathonId,
    runner: "simulang",
    status: "queued",
    plannedActions: [],
    artifacts: { screenshots: [] },
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}

// Contract PlannedAction.source has no "llm_draft" yet, so map it to "llm_inferred"
// for the streamed plannedActions. The UI's draft styling comes from AUTOFILL_FIELDS.
const plannedActions: PlannedAction[] = AUTOFILL_FIELDS.map((f) => ({
  field: f.key,
  value: f.value,
  source: f.source === "llm_draft" ? "llm_inferred" : f.source,
}));

export const mockApi: Api = {
  async getFeed() {
    await delay(180);
    return FEED;
  },
  async getEvent(id) {
    await delay(120);
    return eventById(id) ?? null;
  },
  async getProfile() {
    await delay(80);
    return DEMO_PROFILE;
  },
  async putProfile(profile) {
    await delay(120);
    return profile;
  },
  async createRegistration(userId, hackathonId) {
    await delay(120);
    return makeRun(userId, hackathonId);
  },
  async getRun(id) {
    await delay(80);
    return { ...makeRun(DEMO_PROFILE.id, EVENTS[0].id), id, status: "filling" };
  },
  async approveRun() {
    await delay(120);
  },
  async cancelRun() {
    await delay(80);
  },
  streamRun(_id, handlers: RunStreamHandlers) {
    let cancelled = false;
    const emit = (e: RegistrationProgressEvent) => {
      if (!cancelled) handlers.onEvent(e);
    };

    (async () => {
      handlers.onStatus?.({ status: "introspecting", plannedActions: [] });
      await delay(500);
      emit({ type: "step_started", step: "Reading form structure", runner: "simulang" });
      await delay(500);
      for (const f of AUTOFILL_FIELDS) {
        if (cancelled) return;
        emit({ type: "field_filling", field: f.key, label: f.label });
        await delay(450);
        emit({
          type: "field_filled",
          field: f.key,
          value: f.value,
          source: f.source === "llm_draft" ? "llm_inferred" : f.source,
        });
        await delay(180);
      }
      await delay(300);
      emit({ type: "awaiting_approval", plannedActions });
    })();

    return () => {
      cancelled = true;
    };
  },
};
