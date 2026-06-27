import type { FastifyPluginAsync } from "fastify";
import { Queue } from "bullmq";
import { UserProfileSchema } from "@earlybirds/contracts";
import type { RankRecomputeJob } from "@earlybirds/contracts";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import { db } from "@earlybirds/db";
import { REDIS_URL } from "../config.js";

const rankQueue = new Queue<RankRecomputeJob>(QUEUE_NAMES.RANK_RECOMPUTE, {
  connection: { url: REDIS_URL },
});

export const profileRoutes: FastifyPluginAsync = async (server) => {
  // PUT /profile — upsert user profile; triggers rank.recompute for that user
  server.put<{ Body: unknown }>("/", {
    handler: async (req, reply) => {
      const result = UserProfileSchema.safeParse(req.body);
      if (!result.success) {
        reply.status(400);
        return { error: result.error.flatten() };
      }
      const p = result.data;

      await db.userProfile.upsert({
        where: { id: p.id },
        create: {
          id: p.id,
          name: p.name,
          email: p.email,
          school: p.school,
          resumeUrl: p.resumeUrl,
          skills: p.skills,
          interests: p.interests,
          locationCity: p.locationBase?.city,
          locationCountry: p.locationBase?.country,
          willingToTravel: p.willingToTravel,
          travelRegions: p.travelRegions ?? [],
          formAnswers: p.formAnswers,
        },
        update: {
          name: p.name,
          email: p.email,
          school: p.school,
          resumeUrl: p.resumeUrl,
          skills: p.skills,
          interests: p.interests,
          locationCity: p.locationBase?.city,
          locationCountry: p.locationBase?.country,
          willingToTravel: p.willingToTravel,
          travelRegions: p.travelRegions ?? [],
          formAnswers: p.formAnswers,
        },
      });

      await rankQueue.add("recompute", { kind: "user", userId: p.id });

      return { profile: p };
    },
  });

  // GET /profile/:id
  server.get<{ Params: { id: string } }>("/:id", {
    handler: async (req, reply) => {
      const user = await db.userProfile.findUnique({ where: { id: req.params.id } });
      if (!user) {
        reply.status(404);
        return { profile: null };
      }
      return {
        profile: {
          id: user.id,
          name: user.name,
          email: user.email,
          school: user.school ?? undefined,
          resumeUrl: user.resumeUrl ?? undefined,
          skills: user.skills,
          interests: user.interests,
          locationBase:
            user.locationCity && user.locationCountry
              ? { city: user.locationCity, country: user.locationCountry }
              : undefined,
          willingToTravel: user.willingToTravel,
          travelRegions: user.travelRegions,
          formAnswers: user.formAnswers as Record<string, string>,
        },
      };
    },
  });
};
