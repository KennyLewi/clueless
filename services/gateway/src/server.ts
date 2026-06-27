import "dotenv/config";
import Fastify from "fastify";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type {
  DiscoveryRunJob,
  RegistrationRunJob,
  NotifyEnqueueJob,
} from "@earlybirds/contracts";
import type {
  UserProfile,
  RegistrationRun,
} from "@earlybirds/contracts";
import { feedRoutes } from "./routes/feed.js";
import { registrationRoutes } from "./routes/registration.js";
import { profileRoutes } from "./routes/profile.js";
import { cronRoutes } from "./routes/cron.js";

const PORT = Number(process.env["PORT"] ?? 3001);
const REDIS_URL = process.env["REDIS_URL"] ?? "redis://localhost:6379";

export const discoveryQueue = new Queue<DiscoveryRunJob>(QUEUE_NAMES.DISCOVERY_RUN, {
  connection: { url: REDIS_URL },
});

export const registrationQueue = new Queue<RegistrationRunJob>(QUEUE_NAMES.REGISTRATION_RUN, {
  connection: { url: REDIS_URL },
});

export const notifyQueue = new Queue<NotifyEnqueueJob>(QUEUE_NAMES.NOTIFY_ENQUEUE, {
  connection: { url: REDIS_URL },
});

const server = Fastify({ logger: true });

await server.register(feedRoutes);
await server.register(registrationRoutes, { prefix: "/registrations" });
await server.register(profileRoutes, { prefix: "/profile" });
await server.register(cronRoutes, { prefix: "/internal/cron" });

server.get("/health", async () => ({ ok: true }));

await server.listen({ port: PORT, host: "0.0.0.0" });
console.log(`Gateway listening on port ${PORT}`);
