import type { FastifyPluginAsync } from "fastify";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { RegistrationRunJob, RegistrationRun, RegistrationStatus } from "@earlybirds/contracts";
import { REDIS_URL } from "../config.js";
import crypto from "node:crypto";

// In-memory stub store — replaced by DB in M1.
// Key: runId, Value: RegistrationRun
const runStore = new Map<string, RegistrationRun>();

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

      const run: RegistrationRun = {
        id: runId,
        userId,
        hackathonId,
        runner: "playwright", // registration svc picks based on provider in M2
        status: "queued",
        plannedActions: [],
        artifacts: { screenshots: [] },
        createdAt: now,
        updatedAt: now,
      };

      runStore.set(runId, run);
      await queue.add("run", { runId });
      reply.status(202);
      return { run };
    },
  });

  server.post<{ Params: { id: string } }>("/:id/approve", {
    handler: async (req, reply) => {
      const { id } = req.params;

      // State guard: only allow approval when the run is waiting for it.
      // TODO(M1): replace runStore lookup with DB fetch.
      const run = runStore.get(id);
      if (!run) {
        reply.status(404);
        return { error: "Run not found" };
      }
      if (run.status !== "awaiting_approval") {
        reply.status(409);
        return {
          error: `Cannot approve a run in status '${run.status}' — must be 'awaiting_approval'`,
        };
      }

      run.status = "submitting";
      run.updatedAt = new Date().toISOString();
      // TODO(M2): enqueue the actual submit step and stream progress back
      return { runId: id, accepted: true };
    },
  });

  server.get<{ Params: { id: string } }>("/:id/stream", {
    handler: async (req, reply) => {
      const { id } = req.params;

      // Hijack the connection before touching reply.raw — prevents Fastify from
      // terminating the response when this async handler returns.
      reply.hijack();

      reply.raw.setHeader("Content-Type", "text/event-stream");
      reply.raw.setHeader("Cache-Control", "no-cache");
      reply.raw.setHeader("Connection", "keep-alive");
      reply.raw.flushHeaders();

      const send = (event: string, data: unknown) => {
        reply.raw.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
      };

      const run = runStore.get(id);
      send("status", { runId: id, status: run?.status ?? "unknown" });

      // TODO(M2): subscribe to run status updates from BullMQ / Redis pub-sub
      //           and call send() on each transition.

      req.socket.on("close", () => {
        reply.raw.end();
      });
    },
  });
};
