import { z } from "zod";

// ─── Zod schemas mirroring types.ts (source of truth for runtime validation) ──

export const ExaGroundingSchema = z.object({
  field: z.string(),
  citations: z.array(z.object({ url: z.string(), title: z.string() })),
  confidence: z.enum(["high", "medium", "low"]),
});

export const SourceRefSchema = z.object({
  source: z.enum(["exa", "devpost", "luma", "web"]),
  externalId: z.string().optional(),
  rawUrl: z.string().url(),
  scrapedAt: z.string().datetime(),
  rawPayloadRef: z.string().optional(),
  exaGrounding: z.array(ExaGroundingSchema).optional(),
});

export const FormFieldSpecSchema = z.object({
  canonicalName: z.string(),
  label: z.string(),
  selector: z.string().optional(),
  a11ySelector: z.string().optional(),
  type: z.enum(["text", "email", "select", "checkbox", "radio", "file", "textarea", "oauth"]),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
  confidence: z.number().min(0).max(1),
});

export const HackathonSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  organizer: z.string().optional(),
  url: z.string().url(),
  location: z.object({
    mode: z.enum(["online", "in_person", "hybrid"]),
    city: z.string().optional(),
    country: z.string().optional(),
    tz: z.string().optional(),
  }),
  dates: z.object({
    startsAt: z.string().optional(),
    endsAt: z.string().optional(),
    registrationOpensAt: z.string().optional(),
    registrationClosesAt: z.string().optional(),
  }),
  prizes: z.object({ total: z.string().optional(), raw: z.string().optional() }).optional(),
  themes: z.array(z.string()),
  eligibility: z.string().optional(),
  registration: z.object({
    provider: z.enum(["devpost", "luma", "google_form", "custom", "unknown"]),
    formUrl: z.string().optional(),
    requiresTeam: z.boolean().optional(),
    requiresAuth: z.boolean().optional(),
    knownFields: z.array(FormFieldSpecSchema).optional(),
  }),
  sources: z.array(SourceRefSchema),
  contentHash: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const RawListingSchema = z.object({
  source: z.enum(["exa", "devpost", "luma", "web"]),
  rawUrl: z.string().url(),
  title: z.string(),
  fields: z.record(z.unknown()),
  rawPayloadRef: z.string(),
  scrapedAt: z.string().datetime(),
});

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  school: z.string().optional(),
  resumeUrl: z.string().optional(),
  skills: z.array(z.string()),
  interests: z.array(z.string()),
  locationBase: z.object({ city: z.string(), country: z.string() }).optional(),
  willingToTravel: z.boolean(),
  travelRegions: z.array(z.string()).optional(),
  formAnswers: z.record(z.string()),
});

export const RankedEventSchema = z.object({
  hackathonId: z.string(),
  userId: z.string(),
  score: z.number().min(0).max(1),
  reasons: z.array(z.string()),
  matchedThemes: z.array(z.string()),
});

export const PlannedActionSchema = z.object({
  field: z.string(),
  value: z.string(),
  source: z.enum(["profile", "default", "llm_inferred"]),
});

export const RegistrationRunSchema = z.object({
  id: z.string(),
  userId: z.string(),
  hackathonId: z.string(),
  runner: z.enum(["playwright", "simulang"]),
  status: z.enum([
    "queued",
    "introspecting",
    "filling",
    "awaiting_approval",
    "submitting",
    "succeeded",
    "failed",
    "cancelled",
  ]),
  plannedActions: z.array(PlannedActionSchema),
  artifacts: z.object({
    screenshots: z.array(z.string()),
    finalScreenshot: z.string().optional(),
  }),
  error: z.object({ stage: z.string(), message: z.string() }).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Exa outputSchema — sent verbatim in the Exa API request body.
// Docs: max nesting depth 2, max total properties 10. Do NOT add citation/confidence
// fields — Exa returns grounding data automatically alongside output.content.
export const EXA_OUTPUT_SCHEMA = {
  type: "object",
  description: "Hackathon events extracted from search results",
  required: ["events"],
  properties: {
    events: {
      type: "array",
      description: "List of hackathon events found",
      items: {
        type: "object",
        required: ["title", "url"],
        properties: {
          title: { type: "string", description: "Full name of the hackathon" },
          url: { type: "string", description: "Canonical landing page URL" },
          registrationUrl: { type: "string", description: "Direct registration form URL if different from url" },
          startsAt: { type: "string", description: "Event start date/time in ISO 8601" },
          registrationClosesAt: { type: "string", description: "Registration deadline in ISO 8601" },
          location: { type: "string", description: "City/country or 'Online'" },
          themes: { type: "array", items: { type: "string" }, description: "Topic tags e.g. ai, fintech, web3" },
          description: { type: "string", description: "Brief event description including prizes" },
          organizer: { type: "string", description: "Organizing entity or company" },
        },
      },
    },
  },
} as const;
