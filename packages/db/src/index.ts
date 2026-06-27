import { PrismaClient } from "../generated/client/index.js";

// Re-export the generated types for consumers.
export * from "../generated/client/index.js";

// Singleton client — import `db` everywhere instead of newing PrismaClient.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env["NODE_ENV"] === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env["NODE_ENV"] !== "production") globalForPrisma.prisma = db;
