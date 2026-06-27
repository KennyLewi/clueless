import type { Job } from "bullmq";
import type { NotifyEnqueueJob } from "@earlybirds/contracts";

// Writes a pending_notifications row (actual delivery is handled by Zo Automation).
// Zo reads this row and fires Telegram/SMS/email delivery.
export async function handleNotify(job: Job<NotifyEnqueueJob>) {
  const { userId, kind, payloadRef } = job.data;
  console.log(`[notify] user=${userId} kind=${kind} ref=${payloadRef}`);

  // TODO(M1): insert into pending_notifications table
  // Zo automation polls /internal/cron/discover and reads the digest from there.
  return { userId, kind, queued: true };
}
