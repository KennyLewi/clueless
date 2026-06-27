import type { FastifyPluginAsync } from "fastify";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { DiscoveryRunJob, NotifyEnqueueJob, NotifyKind } from "@earlybirds/contracts";
import { db } from "@earlybirds/db";
import { REDIS_URL, CRON_SECRET } from "../config.js";

function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 3_600_000);
}

const DEADLINE_THRESHOLDS: Array<{ hours: number; kind: NotifyKind }> = [
  { hours: 7 * 24, kind: "deadline_7d" },
  { hours: 2 * 24, kind: "deadline_2d" },
  { hours: 12, kind: "deadline_12h" },
];
const WINDOW_HOURS = 1;

export const cronRoutes: FastifyPluginAsync = async (server) => {
  const discoveryQueue = new Queue<DiscoveryRunJob>(QUEUE_NAMES.DISCOVERY_RUN, {
    connection: { url: REDIS_URL },
  });
  const notifyQueue = new Queue<NotifyEnqueueJob>(QUEUE_NAMES.NOTIFY_ENQUEUE, {
    connection: { url: REDIS_URL },
  });

  server.addHook("preHandler", async (req, reply) => {
    if (req.headers["x-cron-secret"] !== CRON_SECRET) {
      reply.status(401);
      return reply.send({ error: "Unauthorized" });
    }
  });

  server.post("/discover", {
    handler: async () => {
      await discoveryQueue.add("run", { adapter: "exa" });
      await discoveryQueue.add("run", { adapter: "luma" });
      const newMatches = await db.pendingNotification.count({ where: { sentAt: null } });
      const digest =
        newMatches > 0
          ? `${newMatches} new hackathon match${newMatches !== 1 ? "es" : ""} ready.`
          : "Discovery run queued — no new matches yet.";
      return { newMatches, digest };
    },
  });

  server.post("/deadlines", {
    handler: async () => {
      const now = new Date();
      let checked = 0;
      let notified = 0;

      for (const threshold of DEADLINE_THRESHOLDS) {
        const windowStart = addHours(now, threshold.hours - WINDOW_HOURS);
        const windowEnd = addHours(now, threshold.hours + WINDOW_HOURS);

        const hackathons = await db.hackathon.findMany({
          where: { registrationClosesAt: { gte: windowStart, lte: windowEnd } },
          select: { id: true },
        });
        checked += hackathons.length;
        if (hackathons.length === 0) continue;

        const hackathonIds = hackathons.map((h) => h.id);

        // One query for all ranked user–hackathon pairs in scope.
        const ranked = await db.rankedEvent.findMany({
          where: { hackathonId: { in: hackathonIds } },
          select: { userId: true, hackathonId: true },
        });
        if (ranked.length === 0) continue;

        // One query to fetch all already-notified pairs — replaces O(H×U) findFirst loop.
        const userIds = [...new Set(ranked.map((r) => r.userId))];
        const existingNotifs = await db.pendingNotification.findMany({
          where: { kind: threshold.kind, payloadRef: { in: hackathonIds }, userId: { in: userIds } },
          select: { userId: true, payloadRef: true },
        });
        const notifiedSet = new Set(existingNotifs.map((n) => `${n.userId}:${n.payloadRef}`));

        for (const { userId, hackathonId } of ranked) {
          if (notifiedSet.has(`${userId}:${hackathonId}`)) continue;
          await notifyQueue.add("enqueue", {
            userId,
            kind: threshold.kind,
            payloadRef: hackathonId,
          }, {
            jobId: `notify:${userId}:${threshold.kind}:${hackathonId}`,
          });
          notified++;
        }
      }

      return { checked, notified };
    },
  });
};
