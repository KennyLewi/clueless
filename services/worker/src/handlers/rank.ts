import type { Job } from "bullmq";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { RankRecomputeJob, NotifyEnqueueJob } from "@earlybirds/contracts";
import { db } from "@earlybirds/db";
import { REDIS_URL } from "../config.js";

export const notifyQueue = new Queue<NotifyEnqueueJob>(QUEUE_NAMES.NOTIFY_ENQUEUE, {
  connection: { url: REDIS_URL },
});

const NOTIFY_THRESHOLD = 0.5;

function computeScore(
  themes: string[],
  userInterests: string[],
  registrationClosesAt: Date | null,
  locationMode: string,
  willingToTravel: boolean,
): { score: number; matchedThemes: string[] } {
  const normalizedInterests = userInterests.map((i) => i.toLowerCase());
  const normalizedThemes = themes.map((t) => t.toLowerCase());
  const matchedThemes = normalizedThemes.filter((t) => normalizedInterests.includes(t));

  const themeScore = Math.min(matchedThemes.length / Math.max(normalizedInterests.length, 1), 1) * 0.6;

  let deadlineScore = 0;
  if (registrationClosesAt) {
    const daysUntil = (registrationClosesAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    if (daysUntil > 0 && daysUntil <= 30) {
      deadlineScore = (1 - daysUntil / 30) * 0.2;
    } else if (daysUntil > 0) {
      deadlineScore = 0.05;
    }
  }

  let locationScore = 0;
  if (locationMode === "online") locationScore = 0.2;
  else if (locationMode === "in_person" && willingToTravel) locationScore = 0.15;
  else if (locationMode === "hybrid") locationScore = 0.1;

  return {
    score: Math.min(themeScore + deadlineScore + locationScore, 1),
    matchedThemes,
  };
}

async function generateReasons(
  title: string,
  matchedThemes: string[],
  locationMode: string,
  registrationClosesAt: Date | null,
): Promise<string[]> {
  const key = process.env["OPENAI_API_KEY"];
  if (!key || matchedThemes.length === 0) {
    const reasons: string[] = [];
    if (matchedThemes.length > 0) reasons.push(`Matches your interest in ${matchedThemes.slice(0, 2).join(" and ")}`);
    if (locationMode === "online") reasons.push("Online — join from anywhere");
    if (registrationClosesAt) {
      const days = Math.ceil((registrationClosesAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (days > 0 && days <= 7) reasons.push(`Registration closes in ${days} day${days === 1 ? "" : "s"}`);
    }
    return reasons;
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 120,
        messages: [
          {
            role: "system",
            content:
              "You produce 2–3 short, specific reasons (max 12 words each) why a hackathon is a good match. Return a JSON array of strings. No preamble.",
          },
          {
            role: "user",
            content: `Hackathon: "${title}". Matched interests: ${matchedThemes.join(", ")}. Location: ${locationMode}.`,
          },
        ],
      }),
    });
    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const json = (await res.json()) as { choices: Array<{ message: { content: string } }> };
    return JSON.parse(json.choices[0]!.message.content) as string[];
  } catch {
    return [`Matches your interest in ${matchedThemes.slice(0, 2).join(" and ")}`];
  }
}

export async function handleRank(job: Job<RankRecomputeJob>) {
  const payload = job.data;
  console.log(`[rank] recompute ${JSON.stringify(payload)}`);

  if (payload.kind === "hackathon") {
    const hackathon = await db.hackathon.findUnique({ where: { id: payload.hackathonId } });
    if (!hackathon) return { skipped: true };

    // Limit to 500 users — full table scan is unbounded in production.
    const users = await db.userProfile.findMany({ take: 500 });
    for (const user of users) {
      const { score, matchedThemes } = computeScore(
        hackathon.themes,
        user.interests,
        hackathon.registrationClosesAt,
        hackathon.locationMode,
        user.willingToTravel,
      );

      if (score < 0.05) continue;

      const reasons = await generateReasons(
        hackathon.title,
        matchedThemes,
        hackathon.locationMode,
        hackathon.registrationClosesAt,
      );

      await db.rankedEvent.upsert({
        where: { hackathonId_userId: { hackathonId: hackathon.id, userId: user.id } },
        create: { hackathonId: hackathon.id, userId: user.id, score, reasons, matchedThemes },
        update: { score, reasons, matchedThemes },
      });

      if (score >= NOTIFY_THRESHOLD) {
        await notifyQueue.add("enqueue", {
          userId: user.id,
          kind: "new_match",
          payloadRef: hackathon.id,
        }, {
          // Dedup key: BullMQ won't add a new job if one with this ID is still waiting.
          jobId: `notify:${user.id}:new_match:${hackathon.id}`,
        });
      }
    }
  } else {
    const user = await db.userProfile.findUnique({ where: { id: payload.userId } });
    if (!user) return { skipped: true };

    // Include events with a future deadline OR no known deadline (Exa often can't
    // extract one) — excluding null-deadline events would hide most discovered events.
    const hackathons = await db.hackathon.findMany({
      where: {
        OR: [{ registrationClosesAt: null }, { registrationClosesAt: { gte: new Date() } }],
      },
    });

    for (const hackathon of hackathons) {
      const { score, matchedThemes } = computeScore(
        hackathon.themes,
        user.interests,
        hackathon.registrationClosesAt,
        hackathon.locationMode,
        user.willingToTravel,
      );

      if (score < 0.05) continue;

      const reasons = await generateReasons(
        hackathon.title,
        matchedThemes,
        hackathon.locationMode,
        hackathon.registrationClosesAt,
      );

      await db.rankedEvent.upsert({
        where: { hackathonId_userId: { hackathonId: hackathon.id, userId: user.id } },
        create: { hackathonId: hackathon.id, userId: user.id, score, reasons, matchedThemes },
        update: { score, reasons, matchedThemes },
      });

      if (score >= NOTIFY_THRESHOLD) {
        await notifyQueue.add("enqueue", {
          userId: user.id,
          kind: "new_match",
          payloadRef: hackathon.id,
        }, {
          jobId: `notify:${user.id}:new_match:${hackathon.id}`,
        });
      }
    }
  }

  return { ok: true };
}
