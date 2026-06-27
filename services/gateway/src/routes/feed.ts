import type { FastifyPluginAsync } from "fastify";
import { Queue } from "bullmq";
import type { DiscoveryRunJob } from "@earlybirds/contracts";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import { db } from "@earlybirds/db";
import { REDIS_URL } from "../config.js";

const discoveryQueue = new Queue<DiscoveryRunJob>(QUEUE_NAMES.DISCOVERY_RUN, {
  connection: { url: REDIS_URL },
});

// Maps a Prisma Hackathon row to the flat shape the frontend expects.
// Keeping it inline here avoids a shared-util abstraction for what is
// a single call site.
function mapHackathon(h: {
  id: string;
  title: string;
  description: string;
  organizer: string | null;
  url: string;
  contentHash: string;
  locationMode: string;
  locationCity: string | null;
  locationCountry: string | null;
  locationTz: string | null;
  startsAt: Date | null;
  endsAt: Date | null;
  registrationOpensAt: Date | null;
  registrationClosesAt: Date | null;
  prizesTotal: string | null;
  prizesRaw: string | null;
  themes: string[];
  eligibility: string | null;
  registrationProvider: string;
  registrationFormUrl: string | null;
  requiresTeam: boolean | null;
  requiresAuth: boolean | null;
  knownFields: unknown;
  sources: unknown;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: h.id,
    title: h.title,
    description: h.description,
    organizer: h.organizer ?? undefined,
    url: h.url,
    location: {
      mode: h.locationMode as "online" | "in_person" | "hybrid",
      city: h.locationCity ?? undefined,
      country: h.locationCountry ?? undefined,
      tz: h.locationTz ?? undefined,
    },
    dates: {
      startsAt: h.startsAt?.toISOString(),
      endsAt: h.endsAt?.toISOString(),
      registrationOpensAt: h.registrationOpensAt?.toISOString(),
      registrationClosesAt: h.registrationClosesAt?.toISOString(),
    },
    prizes:
      h.prizesTotal || h.prizesRaw
        ? { total: h.prizesTotal ?? undefined, raw: h.prizesRaw ?? undefined }
        : undefined,
    themes: h.themes,
    eligibility: h.eligibility ?? undefined,
    registration: {
      provider: h.registrationProvider as "devpost" | "luma" | "google_form" | "custom" | "unknown",
      formUrl: h.registrationFormUrl ?? undefined,
      requiresTeam: h.requiresTeam ?? undefined,
      requiresAuth: h.requiresAuth ?? undefined,
      knownFields: h.knownFields as unknown[],
    },
    sources: h.sources as unknown[],
    contentHash: h.contentHash,
    createdAt: h.createdAt.toISOString(),
    updatedAt: h.updatedAt.toISOString(),
  };
}

export const feedRoutes: FastifyPluginAsync = async (server) => {
  // GET /feed?userId=<id>
  // Returns ranked events for the given user, sorted by score desc.
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
      const ranked = await db.rankedEvent.findMany({
        where: {
          userId,
          hackathon: {
            OR: [
              { registrationClosesAt: { gte: new Date() } },
              { registrationClosesAt: null },
            ],
          },
        },
        orderBy: { score: "desc" },
        include: { hackathon: true },
      });
      return {
        userId,
        events: ranked.map((r) => ({
          hackathonId: r.hackathonId,
          userId: r.userId,
          score: r.score,
          reasons: r.reasons,
          matchedThemes: r.matchedThemes,
          hackathon: mapHackathon(r.hackathon),
        })),
      };
    },
  });

  // GET /events/:id — full hackathon detail for event page
  server.get<{ Params: { id: string } }>("/events/:id", {
    handler: async (req, reply) => {
      const hackathon = await db.hackathon.findUnique({ where: { id: req.params.id } });
      if (!hackathon) {
        reply.status(404);
        return { error: "not_found" };
      }
      return { hackathon: mapHackathon(hackathon) };
    },
  });

  // POST /internal/cron/discover is in cronRoutes — but we expose a
  // manual trigger here for dev convenience without the secret check.
  // (Dev only; cron routes are the production path.)
  server.post("/discover/trigger", {
    handler: async () => {
      await discoveryQueue.add("run", { adapter: "exa" });
      await discoveryQueue.add("run", { adapter: "luma" });
      return { queued: true };
    },
  });
};
