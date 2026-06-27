import type { FastifyPluginAsync } from "fastify";
import bcrypt from "bcryptjs";
import { db } from "@earlybirds/db";
import crypto from "node:crypto";

export const authRoutes: FastifyPluginAsync = async (server) => {
  // POST /auth/signup — create account, return userId
  server.post<{ Body: { name: string; email: string; password: string } }>("/signup", {
    schema: {
      body: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string", minLength: 6 },
        },
      },
    },
    handler: async (req, reply) => {
      const { name, email, password } = req.body;

      const existing = await db.userProfile.findUnique({ where: { email } });
      if (existing) {
        reply.status(409);
        return { error: "An account with that email already exists" };
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const id = crypto.randomUUID();

      const user = await db.userProfile.create({
        data: {
          id,
          name,
          email,
          passwordHash,
          skills: [],
          interests: [],
          willingToTravel: false,
          travelRegions: [],
          formAnswers: { full_name: name, email },
        },
      });

      reply.status(201);
      return { userId: user.id, name: user.name, email: user.email };
    },
  });

  // POST /auth/login — verify password, return userId
  server.post<{ Body: { email: string; password: string } }>("/login", {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: async (req, reply) => {
      const { email, password } = req.body;

      const user = await db.userProfile.findUnique({ where: { email } });
      if (!user || !user.passwordHash) {
        reply.status(401);
        return { error: "Invalid email or password" };
      }

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) {
        reply.status(401);
        return { error: "Invalid email or password" };
      }

      return { userId: user.id, name: user.name, email: user.email };
    },
  });
};
