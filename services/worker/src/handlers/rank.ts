import type { Job } from "bullmq";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { RankRecomputeJob, NotifyEnqueueJob } from "@earlybirds/contracts";

const REDIS_URL = process.env["REDIS_URL"] ?? "redis://localhost:6379";

const notifyQueue = new Queue<NotifyEnqueueJob>(QUEUE_NAMES.NOTIFY_ENQUEUE, {
  connection: { url: REDIS_URL },
});

const NOTIFY_THRESHOLD = 0.7;

// Scores a (user, event) or all users for a given event.
// If score >= threshold, enqueues a notify job.
export async function handleRank(job: Job<RankRecomputeJob>) {
  const payload = job.data;
  console.log(`[rank] recompute ${JSON.stringify(payload)}`);

  // TODO(M1): fetch hackathon + user profiles from DB, compute score + reasons
  // Stub: score 0 → no notification
  const score = 0;

  if (score >= NOTIFY_THRESHOLD && payload.kind === "hackathon") {
    // TODO(M1): fan out per matched user
    await notifyQueue.add("enqueue", {
      userId: "stub-user",
      kind: "new_match",
      payloadRef: payload.hackathonId,
    });
  }

  return { score };
}
