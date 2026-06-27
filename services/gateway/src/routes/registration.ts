import type { FastifyPluginAsync } from "fastify";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { RegistrationRunJob } from "@earlybirds/contracts";
import type { RegistrationRun } from "@earlybirds/contracts";
import crypto from "node:crypto";

const REDIS_URL = process.env["REDIS_URL"] ?? "redis://localhost:6379";

// POST /registrations — kick off a registration run.
// POST /registrations/:id/approve — approve the planned actions and submit.
// GET  /registrations/:id/stream — SSE stream of live run progress.
export const registrationRoutes: FastifyPluginAsync = async (server) => {
  const queue = new Queue<RegistrationRunJob>(QUEUE_NAMES.REGISTRATION_RUN, {
    connection: { url: REDIS_URL },
  });

  server.post<{ Body: { userId: string; hackathonId: string } }>("/", {
    schema: {
      body: {
        type: "object",
        required: ["userId", "hackathonId"],
        properties: {
          userId: { type: "string" },
          hackathonId: { type: "string" },
        },
      },
    },
    handler: async (req, reply) => {
      const { userId, hackathonId } = req.body;
      const runId = crypto.randomUUID();
      const now = new Date().toISOString();

      // Stub: create a skeleton run record (M1: persist to DB)
      const run: RegistrationRun = {
        id: runId,
        userId,
        hackathonId,
        runner: "playwright", // default; registration svc picks based on provider
        status: "queued",
        plannedActions: [],
        artifacts: { screenshots: [] },
        createdAt: now,
        updatedAt: now,
      };

      await queue.add("run", { runId });
      reply.status(202);
      return { run };
    },
  });

  server.post<{ Params: { id: string } }>("/:id/approve", {
    handler: async (req) => {
      const { id } = req.params;
      // TODO(M2): validate run is in awaiting_approval, transition to submitting
      return { runId: id, accepted: true };
    },
  });

  server.get<{ Params: { id: string } }>("/:id/stream", {
    handler: async (req, reply) => {
      const { id } = req.params;
      // SSE for real-time progress
      reply.raw.setHeader("Content-Type", "text/event-stream");
      reply.raw.setHeader("Cache-Control", "no-cache");
      reply.raw.setHeader("Connection", "keep-alive");

      const send = (event: string, data: unknown) => {
        reply.raw.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
      };

      // TODO(M2): subscribe to run status updates from BullMQ / Redis pub-sub
      send("status", { runId: id, status: "queued" });

      req.socket.on("close", () => {
        reply.raw.end();
      });

      await reply;
    },
  });
};
