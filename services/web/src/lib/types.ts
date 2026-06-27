// Re-export the frozen contract types so the rest of the app imports from one place.
export type {
  Hackathon,
  RankedEvent,
  UserProfile,
  FormFieldSpec,
  RegistrationRun,
  RegistrationStatus,
  PlannedAction,
  RegistrationProgressEvent,
  SourceRef,
  ExaGrounding,
  RegistrationProvider,
} from "@earlybirds/contracts";

import type { Hackathon, RankedEvent, PlannedAction } from "@earlybirds/contracts";

/** Shape returned by `GET /feed` — a ranked event with its hackathon embedded. */
export interface FeedEvent extends RankedEvent {
  hackathon: Hackathon;
}

/**
 * The frozen `PlannedAction.source` union lacks `"llm_draft"` (generative essays).
 * We keep it FE-local until the contract adds it — see DESIGN.md §4 / §6.3.5.
 */
export type UiFieldSource = PlannedAction["source"] | "llm_draft";

/** One row in the autofill form mirror (§6.3.1). */
export interface FieldView {
  key: string;
  label: string;
  value: string;
  source: UiFieldSource;
  /** Editable draft body for `llm_draft` fields. */
  draftText?: string;
}
