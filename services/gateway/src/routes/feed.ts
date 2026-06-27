import type { FastifyPluginAsync } from "fastify";
import type { RankedEvent, Hackathon } from "@earlybirds/contracts";

// GET /feed?userId=<id>
// Returns ranked events for the given user.
// M0 stub: returns seeded fixtures until the ranking service is live.
export const feedRoutes: FastifyPluginAsync = async (server) => {
  server.get<{ Querystring: { userId: string } }>("/feed", {
    schema: {
      querystring: {
        type: "object",
        required: ["userId"],
        properties: { userId: { type: "string" } },
      },
    },
    handler: async (req) => {
      const { userId } = req.query;
      // TODO(M1): query ranking service / DB
      return { userId, events: [] as Array<RankedEvent & { hackathon: Hackathon }> };
    },
  });
};
