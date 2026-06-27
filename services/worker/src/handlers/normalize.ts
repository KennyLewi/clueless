import crypto from "node:crypto";
import type { Job } from "bullmq";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { NormalizeListingJob, RankRecomputeJob, FormIntrospectJob } from "@earlybirds/contracts";
import { db } from "@earlybirds/db";
import { REDIS_URL } from "../config.js";

export const rankQueue = new Queue<RankRecomputeJob>(QUEUE_NAMES.RANK_RECOMPUTE, {
  connection: { url: REDIS_URL },
});
export const formQueue = new Queue<FormIntrospectJob>(QUEUE_NAMES.FORM_INTROSPECT, {
  connection: { url: REDIS_URL },
});

function inferProvider(rawUrl: string, registrationUrl?: string): string {
  const check = (url: string) => {
    if (url.includes("lu.ma")) return "luma";
    if (url.includes("devpost.com")) return "devpost";
    if (url.includes("docs.google.com/forms")) return "google_form";
    return null;
  };
  if (registrationUrl) {
    const result = check(registrationUrl);
    if (result) return result;
  }
  return check(rawUrl) ?? "custom";
}

// Canonical forms for themes Exa commonly returns in hyphenated or multi-word variants.
// Only maps clear synonyms — keeps distinct sub-topics (e.g. nlp, computer-vision) intact.
const THEME_ALIASES: Record<string, string> = {
  "artificial-intelligence": "ai",
  "artificial intelligence": "ai",
  "machine-learning": "ai",
  "machine learning": "ai",
  "generative-ai": "ai",
  "generative ai": "ai",
  "deep-learning": "ai",
  "deep learning": "ai",
  "defi": "web3",
  "decentralized-finance": "web3",
  "financial-technology": "fintech",
  "financial technology": "fintech",
};

function normalizeThemes(themes: string[]): string[] {
  return [...new Set(themes.map((t) => {
    const lower = t.toLowerCase();
    return THEME_ALIASES[lower] ?? lower;
  }))];
}

const DEDUP_THRESHOLD = 0.7;
const DEDUP_DATE_WINDOW_MS = 30 * 24 * 60 * 60 * 1000; // ±30 days

function tokenize(title: string): Set<string> {
  return new Set(
    title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 1),
  );
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  const intersection = [...a].filter((w) => b.has(w)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

function parseLocation(raw: string | undefined): {
  mode: "online" | "in_person" | "hybrid";
  city?: string;
  country?: string;
} {
  if (!raw) return { mode: "online" };
  const lower = raw.toLowerCase();
  if (lower === "online" || lower === "remote" || lower === "virtual") return { mode: "online" };
  const parts = raw.split(",").map((p) => p.trim());
  return { mode: "in_person", city: parts[0], country: parts[1] };
}

export async function handleNormalize(job: Job<NormalizeListingJob>) {
  const listing = job.data;
  const fields = listing.fields;

  console.log(`[normalize] processing: ${listing.title}`);

  const hackathonId = crypto.createHash("sha256").update(listing.rawUrl).digest("hex").slice(0, 24);

  const location = parseLocation(fields["location"] as string | undefined);
  const toDate = (s: unknown) => (typeof s === "string" && s ? new Date(s) : null);

  const contentHash = crypto.createHash("sha256").update(JSON.stringify(fields)).digest("hex").slice(0, 16);

  const source = {
    source: listing.source,
    rawUrl: listing.rawUrl,
    scrapedAt: listing.scrapedAt,
    rawPayloadRef: listing.rawPayloadRef,
    ...(listing.exaGrounding?.length ? { exaGrounding: listing.exaGrounding } : {}),
  };

  type StoredSource = { source: string; rawUrl: string; scrapedAt: string };

  const sharedFields = {
    title: listing.title,
    description: (fields["description"] as string) ?? "",
    organizer: fields["organizer"] as string | undefined,
    contentHash,
    locationMode: location.mode,
    locationCity: location.city,
    locationCountry: location.country,
    startsAt: toDate(fields["startsAt"]),
    registrationClosesAt: toDate(fields["registrationClosesAt"]),
    themes: normalizeThemes((fields["themes"] as string[]) ?? []),
    eligibility: fields["eligibility"] as string | undefined,
    registrationFormUrl: fields["registrationUrl"] as string | undefined,
    registrationProvider: inferProvider(listing.rawUrl, fields["registrationUrl"] as string | undefined),
  };

  // Serializable transaction prevents concurrent normalize jobs for the same hackathon
  // from racing on the findUnique → upsert read-modify-write, which would lose source entries.
  let isNew = false;
  let contentChanged = false;

  let effectiveId = hackathonId;

  await db.$transaction(async (tx) => {
    // Cross-source dedup: find an existing hackathon with a similar title before
    // creating a new row. Uses date window (when available) to bound the candidate
    // set, then Jaccard word similarity to confirm the match.
    const titleTokens = tokenize(listing.title);
    const startsAtDate = sharedFields.startsAt;
    const dedupCandidates = await tx.hackathon.findMany({
      where: startsAtDate ? {
        startsAt: {
          gte: new Date(startsAtDate.getTime() - DEDUP_DATE_WINDOW_MS),
          lte: new Date(startsAtDate.getTime() + DEDUP_DATE_WINDOW_MS),
        },
      } : {},
      select: { id: true, title: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    for (const candidate of dedupCandidates) {
      if (jaccardSimilarity(titleTokens, tokenize(candidate.title)) >= DEDUP_THRESHOLD) {
        effectiveId = candidate.id;
        break;
      }
    }

    if (effectiveId !== hackathonId) {
      console.log(`[normalize] dedup merge: "${listing.title}" → existing ${effectiveId}`);
    }

    const existing = await tx.hackathon.findUnique({
      where: { id: effectiveId },
      select: { contentHash: true, sources: true },
    });

    isNew = !existing;
    contentChanged = existing?.contentHash !== contentHash;

    const existingSources = (existing?.sources as StoredSource[]) ?? [];
    const sourceAlreadyRecorded = existingSources.some(
      (s) => s.rawUrl === listing.rawUrl && s.source === listing.source,
    );
    const mergedSources = sourceAlreadyRecorded ? existingSources : [...existingSources, source];

    await tx.hackathon.upsert({
      where: { id: effectiveId },
      create: {
        id: effectiveId,
        url: listing.rawUrl,
        sources: [source] as object[],
        ...sharedFields,
      },
      update: {
        sources: mergedSources as object[],
        ...sharedFields,
      },
    });
  }, { isolationLevel: "Serializable" });

  // Downstream queue adds happen after commit.
  if (isNew || contentChanged) {
    await rankQueue.add("recompute", { kind: "hackathon", hackathonId: effectiveId });

    const formUrl = fields["registrationUrl"] as string | undefined;
    if (formUrl) {
      await formQueue.add("introspect", { hackathonId: effectiveId, formUrl });
    }
  }

  return { hackathonId: effectiveId, isNew, contentChanged };
}
