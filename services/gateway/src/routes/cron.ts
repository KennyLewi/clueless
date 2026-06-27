import type { FastifyPluginAsync } from "fastify";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { DiscoveryRunJob } from "@earlybirds/contracts";
import { REDIS_URL, CRON_SECRET } from "../config.js";

// Internal endpoints called by Zo Automations on schedule.
// Protected by X-Cron-Secret preHandler — all routes in this plugin require it.
export const cronRoutes: FastifyPluginAsync = async (server) => {
  const discoveryQueue = new Queue<DiscoveryRunJob>(QUEUE_NAMES.DISCOVERY_RUN, {
    connection: { url: REDIS_URL },
  });

  // Registered once at the plugin level — every route added to this plugin
  // automatically requires a valid X-Cron-Secret header. No per-handler discipline needed.
  server.addHook("preHandler", async (req, reply) => {
    const secret = req.headers["x-cron-secret"];
    if (secret !== CRON_SECRET) {
      reply.status(401);
      return reply.send({ error: "Unauthorized" });
    }
  });

  // POST /internal/cron/discover
  // Zo Automation fires this every 6h. Kicks discovery pipeline and returns a digest.
  server.post("/discover", {
    handler: async () => {
      await discoveryQueue.add("run", { adapter: "exa" });
      // TODO(M1): wait briefly for results, return real digest
      return { newMatches: 0, digest: "Discovery run enqueued." };
    },
  });

  // POST /internal/cron/deadlines
  // Checks for upcoming deadlines and enqueues notify jobs.
  server.post("/deadlines", {
    handler: async () => {
      // TODO(M1): query DB for deadlines at T-7d / T-2d / T-12h
      return { checked: 0, notified: 0 };
    },
  });
};
