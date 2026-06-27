import type { FastifyPluginAsync } from "fastify";
import { Queue } from "bullmq";
import { Redis } from "ioredis";
import { QUEUE_NAMES, registrationEventChannel, TERMINAL_STATUSES } from "@earlybirds/contracts";
import type { RegistrationRunJob, RegistrationRun, PlannedAction } from "@earlybirds/contracts";
import { db } from "@earlybirds/db";
import { REDIS_URL } from "../config.js";
import crypto from "node:crypto";

export const registrationRoutes: FastifyPluginAsync = async (server) => {
  const queue = new Queue<RegistrationRunJob>(QUEUE_NAMES.REGISTRATION_RUN, {
    connection: { url: REDIS_URL },
  });

  // Shared publisher for cancel SSE notifications — one connection, not one per request.
  const pub = new Redis(REDIS_URL);

  // POST /registrations — create a new registration run and enqueue it.
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

      const [user, hackathon] = await Promise.all([
        db.userProfile.findUnique({ where: { id: userId } }),
        db.hackathon.findUnique({ where: { id: hackathonId } }),
      ]);

      if (!user) { reply.status(404); return { error: "User not found" }; }
      if (!hackathon) { reply.status(404); return { error: "Hackathon not found" }; }

      const runId = crypto.randomUUID();
      const now = new Date();

      await db.registrationRun.create({
        data: {
          id: runId,
          userId,
          hackathonId,
          runner: "simulang",
          status: "queued",
          plannedActions: [],
          resolvedFields: [],
          screenshots: [],
        },
      });

      await queue.add("run", { runId });

      reply.status(202);
      return {
        run: {
          id: runId,
          userId,
          hackathonId,
          runner: "simulang",
          status: "queued",
          plannedActions: [],
          artifacts: { screenshots: [] },
          createdAt: now.toISOString(),
          updatedAt: now.toISOString(),
        } satisfies RegistrationRun,
      };
    },
  });

  // POST /registrations/:id/approve
  // Atomically transitions awaiting_approval → submitting to prevent double-submit.
  server.post<{ Params: { id: string } }>("/:id/approve", {
    handler: async (req, reply) => {
      const { id } = req.params;

      const result = await db.registrationRun.updateMany({
        where: { id, status: "awaiting_approval" },
        data: { status: "submitting" },
      });

      if (result.count === 0) {
        const run = await db.registrationRun.findUnique({ where: { id } });
        if (!run) { reply.status(404); return { error: "Run not found" }; }
        reply.status(409);
        return { error: `Cannot approve run in status '${run.status}' — must be 'awaiting_approval'` };
      }

      // Explicit phase tag so the worker distinguishes this submit job from a retried fill job.
      await queue.add("run", { runId: id, phase: "submit" });
      return { runId: id, accepted: true };
    },
  });

  // POST /registrations/:id/cancel
  server.post<{ Params: { id: string } }>("/:id/cancel", {
    handler: async (req, reply) => {
      const { id } = req.params;
      const result = await db.registrationRun.updateMany({
        where: { id, status: { notIn: TERMINAL_STATUSES as unknown as string[] } },
        data: { status: "cancelled" },
      });
      if (result.count === 0) {
        const run = await db.registrationRun.findUnique({ where: { id } });
        if (!run) { reply.status(404); return { error: "Run not found" }; }
        reply.status(409);
        return { error: `Run is already in terminal state '${run.status}'` };
      }
      // Notify any open SSE stream so the client closes immediately.
      await pub
        .publish(
          registrationEventChannel(id),
          JSON.stringify({ type: "status_changed", status: "cancelled" }),
        )
        .catch(() => {});
      return { runId: id, cancelled: true };
    },
  });

  // GET /registrations?userId= — list all runs for a user (feed "Registered" badges).
  server.get<{ Querystring: { userId: string } }>("/", {
    schema: {
      querystring: {
        type: "object",
        required: ["userId"],
        properties: { userId: { type: "string" } },
      },
    },
    handler: async (req) => {
      const { userId } = req.query;
      const runs = await db.registrationRun.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      return {
        runs: runs.map((run) => ({
          id: run.id,
          userId: run.userId,
          hackathonId: run.hackathonId,
          runner: run.runner as RegistrationRun["runner"],
          status: run.status as RegistrationRun["status"],
          plannedActions: run.plannedActions as unknown as PlannedAction[],
          artifacts: {
            screenshots: run.screenshots,
            finalScreenshot: run.finalScreenshot ?? undefined,
          },
          confirmationCode: run.confirmationCode ?? undefined,
          error: run.errorStage
            ? { stage: run.errorStage, message: run.errorMessage ?? "" }
            : undefined,
          createdAt: run.createdAt.toISOString(),
          updatedAt: run.updatedAt.toISOString(),
        })),
      };
    },
  });

  // GET /registrations/:id — fetch current run state.
  server.get<{ Params: { id: string } }>("/:id", {
    handler: async (req, reply) => {
      const run = await db.registrationRun.findUnique({ where: { id: req.params.id } });
      if (!run) { reply.status(404); return { error: "not_found" }; }
      return {
        run: {
          id: run.id,
          userId: run.userId,
          hackathonId: run.hackathonId,
          runner: run.runner as RegistrationRun["runner"],
          status: run.status as RegistrationRun["status"],
          plannedActions: run.plannedActions as unknown as PlannedAction[],
          artifacts: {
            screenshots: run.screenshots,
            finalScreenshot: run.finalScreenshot ?? undefined,
          },
          confirmationCode: run.confirmationCode ?? undefined,
          error: run.errorStage
            ? { stage: run.errorStage, message: run.errorMessage ?? "" }
            : undefined,
          createdAt: run.createdAt.toISOString(),
          updatedAt: run.updatedAt.toISOString(),
        } satisfies RegistrationRun,
      };
    },
  });

  // GET /registrations/:id/stream — SSE stream of RegistrationProgressEvent.
  server.get<{ Params: { id: string } }>("/:id/stream", {
    handler: async (req, reply) => {
      const { id } = req.params;

      reply.hijack();
      reply.raw.setHeader("Content-Type", "text/event-stream");
      reply.raw.setHeader("Cache-Control", "no-cache");
      reply.raw.setHeader("Connection", "keep-alive");
      reply.raw.flushHeaders();

      const send = (event: string, data: unknown) => {
        if (!reply.raw.destroyed) {
          reply.raw.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
        }
      };

      // Subscribe FIRST — prevents the lost-event race where events published between
      // the DB read and the subscribe call would be missed entirely.
      const sub = new Redis(REDIS_URL);
      try {
        await sub.subscribe(registrationEventChannel(id));
      } catch (err) {
        // Disconnect immediately to prevent a dangling open connection.
        sub.disconnect();
        console.error("[registration] SSE Redis subscribe error:", err);
        send("error", { message: "Internal error setting up stream" });
        reply.raw.end();
        return;
      }

      const cleanup = () => {
        sub.unsubscribe(registrationEventChannel(id)).catch(() => {});
        sub.disconnect();
        if (!reply.raw.destroyed) reply.raw.end();
      };

      req.socket.on("close", cleanup);
      req.socket.on("error", cleanup);

      sub.on("message", (_ch, msg) => {
        try {
          const event = JSON.parse(msg) as { type: string; status?: string };
          send(event.type, event);
          // Close the SSE stream once a terminal status_changed arrives so the connection doesn't linger.
          if (
            event.type === "status_changed" &&
            event.status &&
            (TERMINAL_STATUSES as readonly string[]).includes(event.status)
          ) {
            cleanup();
          }
        } catch {
          // Malformed publish — skip.
        }
      });

      // DB read after subscribe — events published in the gap are already buffered
      // by ioredis and will fire via 'message' above.
      try {
        const run = await db.registrationRun.findUnique({ where: { id } });
        if (!run) {
          send("error", { message: "Run not found" });
          cleanup();
          return;
        }

        send("status", {
          runId: id,
          status: run.status,
          plannedActions: run.plannedActions,
          confirmationCode: run.confirmationCode ?? undefined,
          error: run.errorStage
            ? { stage: run.errorStage, message: run.errorMessage ?? "" }
            : undefined,
        });

        // Already terminal: no more Redis events will arrive, so close immediately.
        // This also prevents the double-event race where a buffered status_changed
        // fires after the snapshot is sent, producing two terminal events for the client.
        if ((TERMINAL_STATUSES as readonly string[]).includes(run.status)) {
          cleanup();
          return;
        }
      } catch (err) {
        console.error("[registration] SSE DB error:", err);
        send("error", { message: "Internal error reading run state" });
        cleanup();
      }
    },
  });
};
