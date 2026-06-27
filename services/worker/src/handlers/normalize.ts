import type { Job } from "bullmq";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { NormalizeListingJob, RankRecomputeJob, FormIntrospectJob } from "@earlybirds/contracts";

const REDIS_URL = process.env["REDIS_URL"] ?? "redis://localhost:6379";

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

  // TODO(M1): LLM normalization pass + DB upsert + dedup
  const hackathonId = `stub-${Date.now()}`;

  await rankQueue.add("recompute", { kind: "hackathon", hackathonId });

  const formUrl = listing.fields["registrationUrl"] as string | undefined;
  if (formUrl) {
    await formQueue.add("introspect", { hackathonId, formUrl });
  }

  return { hackathonId };
}
