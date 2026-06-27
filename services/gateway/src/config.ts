import "dotenv/config";

export const REDIS_URL = process.env["REDIS_URL"] ?? "redis://localhost:6379";
export const PORT = Number(process.env["PORT"] ?? 3001);

// Fail loudly in production if cron secret is not explicitly set.
const rawCronSecret = process.env["CRON_SECRET"];
if (!rawCronSecret && process.env["NODE_ENV"] === "production") {
  throw new Error("CRON_SECRET env var is required in production");
}
export const CRON_SECRET = rawCronSecret ?? "dev-cron-secret";
if (!rawCronSecret) {
  console.warn("[config] CRON_SECRET not set — using insecure default. Set it in production.");
}
