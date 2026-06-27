import "./config.js"; // load dotenv + validate env vars at boot
import Fastify from "fastify";
import cors from "@fastify/cors";
import { PORT } from "./config.js";
import { feedRoutes } from "./routes/feed.js";
import { registrationRoutes } from "./routes/registration.js";
import { profileRoutes } from "./routes/profile.js";
import { cronRoutes } from "./routes/cron.js";

const server = Fastify({ logger: true });

// Allow the Next.js dev server and any localhost origin.
await server.register(cors, {
  origin: (origin, cb) => {
    if (!origin || /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
});

await server.register(feedRoutes);
await server.register(registrationRoutes, { prefix: "/registrations" });
await server.register(profileRoutes, { prefix: "/profile" });
await server.register(cronRoutes, { prefix: "/internal/cron" });

server.get("/health", async () => ({ ok: true }));

await server.listen({ port: PORT, host: "0.0.0.0" });
console.log(`Gateway listening on port ${PORT}`);
