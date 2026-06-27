import crypto from "node:crypto";
import type { Job } from "bullmq";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { NormalizeListingJob, RankRecomputeJob, FormIntrospectJob } from "@earlybirds/contracts";
import { REDIS_URL } from "../config.js";

const rankQueue = new Queue<RankRecomputeJob>(QUEUE_NAMES.RANK_RECOMPUTE, {
  connection: { url: REDIS_URL },
});
const formQueue = new Queue<FormIntrospectJob>(QUEUE_NAMES.FORM_INTROSPECT, {
  connection: { url: REDIS_URL },
});

// Normalizes a RawListing into a canonical Hackathon and upserts it.
// Enqueues rank.recompute for all users (M1: scope to matched users).
// Enqueues form.introspect if a formUrl is found.
export async function handleNormalize(job: Job<NormalizeListingJob>) {
  const listing = job.data;
  console.log(`[normalize] processing: ${listing.title}`);

  // Deterministic ID from the canonical URL — ensures the same event upserts
  // rather than inserting a new row on every discovery pass.
  const hackathonId = crypto
    .createHash("sha256")
    .update(listing.rawUrl)
    .digest("hex")
    .slice(0, 24);

  // TODO(M1): LLM normalization pass + DB upsert + dedup

  await rankQueue.add("recompute", { kind: "hackathon", hackathonId });

  const formUrl = listing.fields["registrationUrl"] as string | undefined;
  if (formUrl) {
    await formQueue.add("introspect", { hackathonId, formUrl });
  }

  return { hackathonId };
}
