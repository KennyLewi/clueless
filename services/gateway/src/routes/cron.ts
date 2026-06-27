import type { FastifyPluginAsync } from "fastify";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { DiscoveryRunJob } from "@earlybirds/contracts";

const REDIS_URL = process.env["REDIS_URL"] ?? "redis://localhost:6379";
const CRON_SECRET = process.env["CRON_SECRET"] ?? "dev-cron-secret";

// Internal endpoints called by Zo Automations on schedule.
// Protected by X-Cron-Secret header.
export const cronRoutes: FastifyPluginAsync = async (server) => {
  const discoveryQueue = new Queue<DiscoveryRunJob>(QUEUE_NAMES.DISCOVERY_RUN, {
    connection: { url: REDIS_URL },
  });

  const verifyCronSecret = (req: { headers: Record<string, string | string[] | undefined> }) => {
    const secret = req.headers["x-cron-secret"];
    return secret === CRON_SECRET;
  };

  // POST /internal/cron/discover
  // Zo Automation fires this every 6h. Kicks discovery pipeline and returns a digest.
  server.post("/discover", {
    handler: async (req, reply) => {
      if (!verifyCronSecret(req)) {
        reply.status(401);
        return { error: "Unauthorized" };
      }

      await discoveryQueue.add("run", { adapter: "exa" });
      // TODO(M1): wait briefly for results, return real digest
      return { newMatches: 0, digest: "Discovery run enqueued." };
    },
  });

  // POST /internal/cron/deadlines
  // Checks for upcoming deadlines and enqueues notify jobs.
  server.post("/deadlines", {
    handler: async (req, reply) => {
      if (!verifyCronSecret(req)) {
        reply.status(401);
        return { error: "Unauthorized" };
      }
      // TODO(M1): query DB for deadlines at T-7d / T-2d / T-12h
      return { checked: 0, notified: 0 };
    },
  });
};
