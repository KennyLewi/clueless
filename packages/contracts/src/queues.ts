import type { RawListing } from "./types.js";

// ─── BullMQ queue names + typed payloads ─────────────────────────────────────
// Every cross-service job goes through one of these queues.

export const QUEUE_NAMES = {
  DISCOVERY_RUN: "discovery.run",
  NORMALIZE_LISTING: "normalize.listing",
  RANK_RECOMPUTE: "rank.recompute",
  FORM_INTROSPECT: "form.introspect",
  REGISTRATION_RUN: "registration.run",
  NOTIFY_ENQUEUE: "notify.enqueue",
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];

// ─── Job payload types ────────────────────────────────────────────────────────

export interface DiscoveryRunJob {
  adapter: "exa" | "devpost" | "luma";
  cursor?: string;
}

export type NormalizeListingJob = RawListing;

export type RankRecomputeJob =
  | { kind: "user"; userId: string }
  | { kind: "hackathon"; hackathonId: string };

export interface FormIntrospectJob {
  hackathonId: string;
  formUrl: string;
}

export interface RegistrationRunJob {
  runId: string;
  /** Explicit phase tag added by /approve. Absence means fill phase (fresh run or retry). */
  phase?: "fill" | "submit";
}

export type NotifyKind = "new_match" | "deadline_7d" | "deadline_2d" | "deadline_12h";

// Shared Redis pub/sub channel names — single source of truth for worker + gateway.
export function registrationEventChannel(runId: string): string {
  return `reg:events:${runId}`;
}

// Terminal RegistrationRun statuses — shared so adding a new terminal state stays in one place.
export const TERMINAL_STATUSES = ["succeeded", "failed", "cancelled"] as const satisfies RegistrationStatus[];

type RegistrationStatus =
  | "queued" | "introspecting" | "filling" | "needs_input"
  | "captcha_encountered" | "oauth_redirect" | "awaiting_approval"
  | "submitting" | "succeeded" | "failed" | "cancelled";

export interface NotifyEnqueueJob {
  userId: string;
  kind: NotifyKind;
  payloadRef: string; // pointer to stored context (hackathonId, digest, etc.)
}
