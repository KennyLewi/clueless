import type { FastifyPluginAsync } from "fastify";
import { UserProfileSchema } from "@earlybirds/contracts";
import type { UserProfile } from "@earlybirds/contracts";

// PUT /profile — upsert user profile; triggers rank.recompute
export const profileRoutes: FastifyPluginAsync = async (server) => {
  server.put<{ Body: UserProfile }>("/", {
    handler: async (req, reply) => {
      const result = UserProfileSchema.safeParse(req.body);
      if (!result.success) {
        reply.status(400);
        return { error: result.error.flatten() };
      }
      // TODO(M1): persist to DB, enqueue rank.recompute
      return { profile: result.data };
    },
  });

  server.get<{ Params: { id: string } }>("/:id", {
    handler: async (req) => {
      const { id } = req.params;
      // TODO(M1): fetch from DB
      return { userId: id, profile: null };
    },
  });
};
