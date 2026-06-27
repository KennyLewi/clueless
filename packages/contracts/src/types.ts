// ─── Core domain types ────────────────────────────────────────────────────────
// These are the canonical contracts. Schema changes require team agreement.

export type RegistrationProvider =
  | "devpost"
  | "luma"
  | "google_form"
  | "custom"
  | "unknown";

export interface ExaGrounding {
  field: string;
  citations: Array<{ url: string; title: string }>;
  confidence: "high" | "medium" | "low";
}

export interface SourceRef {
  source: "exa" | "devpost" | "luma" | "web";
  externalId?: string;
  rawUrl: string;
  scrapedAt: string; // ISO
  rawPayloadRef?: string;
  exaGrounding?: ExaGrounding[];
}

export interface FormFieldSpec {
  canonicalName: string;
  label: string;
  selector?: string;
  a11ySelector?: string;
  type: "text" | "email" | "select" | "checkbox" | "radio" | "file" | "textarea" | "oauth";
  required: boolean;
  options?: string[];
  confidence: number; // 0..1
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  organizer?: string;
  url: string;
  location: {
    mode: "online" | "in_person" | "hybrid";
    city?: string;
    country?: string;
    tz?: string;
  };
  dates: {
    startsAt?: string;
    endsAt?: string;
    registrationOpensAt?: string;
    registrationClosesAt?: string;
  };
  prizes?: { total?: string; raw?: string };
  themes: string[];
  eligibility?: string;
  registration: {
    provider: RegistrationProvider;
    formUrl?: string;
    requiresTeam?: boolean;
    requiresAuth?: boolean;
    knownFields?: FormFieldSpec[];
  };
  sources: SourceRef[];
  contentHash: string;
  createdAt: string;
  updatedAt: string;
}

// Raw listing emitted by discovery before normalization/dedup.
export interface RawListing {
  source: SourceRef["source"];
  rawUrl: string;
  title: string;
  fields: Record<string, unknown>; // Exa structured output; normalizer maps these
  rawPayloadRef: string;
  scrapedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  school?: string;
  resumeUrl?: string;
  skills: string[];
  interests: string[];
  locationBase?: { city: string; country: string };
  willingToTravel: boolean;
  travelRegions?: string[];
  formAnswers: Record<string, string>;
}

export interface RankedEvent {
  hackathonId: string;
  userId: string;
  score: number; // 0..1
  reasons: string[];
  matchedThemes: string[];
}

export type RegistrationStatus =
  | "queued"
  | "introspecting"
  | "filling"
  | "awaiting_approval"
  | "submitting"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface PlannedAction {
  field: string; // canonicalName
  value: string;
  source: "profile" | "default" | "llm_inferred";
}

export interface RegistrationRun {
  id: string;
  userId: string;
  hackathonId: string;
  runner: "playwright" | "simulang";
  status: RegistrationStatus;
  plannedActions: PlannedAction[];
  artifacts: { screenshots: string[]; finalScreenshot?: string };
  error?: { stage: string; message: string };
  createdAt: string;
  updatedAt: string;
}

// ─── Service interfaces (frozen Day 0) ────────────────────────────────────────

export interface SourceAdapter {
  source: SourceRef["source"];
  discover(cursor?: string): Promise<{ listings: RawListing[]; nextCursor?: string }>;
}

export interface RegistrationRunner {
  kind: "playwright" | "simulang";
  introspect(formUrl: string): Promise<FormFieldSpec[]>;
  fill(run: RegistrationRun): Promise<{ screenshots: string[] }>;
  submit(run: RegistrationRun): Promise<{ finalScreenshot: string }>;
}
