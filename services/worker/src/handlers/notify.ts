import type { Job } from "bullmq";
import type { NotifyEnqueueJob } from "@earlybirds/contracts";
import { db } from "@earlybirds/db";

// Writes a pending_notifications row atomically via upsert.
// The @@unique([userId, kind, payloadRef]) constraint prevents duplicates even under concurrent jobs.
// Actual delivery (Telegram/SMS) is handled by Zo Automation reading this table.
export async function handleNotify(job: Job<NotifyEnqueueJob>) {
  const { userId, kind, payloadRef } = job.data;

  await db.pendingNotification.upsert({
    where: { userId_kind_payloadRef: { userId, kind, payloadRef } },
    create: { userId, kind, payloadRef },
    update: {}, // Already exists and unsent — no-op; don't reset sentAt.
  });

  console.log(`[notify] queued: user=${userId} kind=${kind} ref=${payloadRef}`);
  return { userId, kind, queued: true };
}
