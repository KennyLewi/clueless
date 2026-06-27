import type {
  FeedEvent,
  Hackathon,
  PlannedAction,
  RegistrationProgressEvent,
  RegistrationRun,
  RegistrationStatus,
  UserProfile,
} from "./types";
import { mockApi } from "./mock";

export const USE_MOCKS = (process.env.NEXT_PUBLIC_USE_MOCKS ?? "1") !== "0";
const BASE = process.env.NEXT_PUBLIC_GATEWAY_URL ?? "http://localhost:3001";

export interface RunStreamHandlers {
  onStatus?: (s: { status: RegistrationStatus; plannedActions: PlannedAction[] }) => void;
  onEvent: (e: RegistrationProgressEvent) => void;
  onError?: (message: string) => void;
}

export interface Api {
  getFeed(userId: string): Promise<FeedEvent[]>;
  getEvent(id: string): Promise<Hackathon | null>;
  getProfile(id: string): Promise<UserProfile | null>;
  putProfile(profile: UserProfile): Promise<UserProfile>;
  createRegistration(userId: string, hackathonId: string): Promise<RegistrationRun>;
  getRun(id: string): Promise<RegistrationRun | null>;
  approveRun(id: string): Promise<void>;
  cancelRun(id: string): Promise<void>;
  /** Subscribe to a run's SSE stream; returns an unsubscribe fn. */
  streamRun(id: string, handlers: RunStreamHandlers): () => void;
}

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "content-type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`${init?.method ?? "GET"} ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

const SSE_EVENT_TYPES = [
  "step_started",
  "field_filling",
  "field_filled",
  "paused",
  "awaiting_approval",
  "screenshot",
] as const;

const realApi: Api = {
  async getFeed(userId) {
    const { events } = await http<{ events: FeedEvent[] }>(`/feed?userId=${encodeURIComponent(userId)}`);
    return events;
  },
  async getEvent(id) {
    try {
      const { hackathon } = await http<{ hackathon: Hackathon }>(`/events/${id}`);
      return hackathon;
    } catch {
      return null;
    }
  },
  async getProfile(id) {
    const { profile } = await http<{ profile: UserProfile | null }>(`/profile/${id}`);
    return profile;
  },
  async putProfile(profile) {
    const { profile: saved } = await http<{ profile: UserProfile }>(`/profile`, {
      method: "PUT",
      body: JSON.stringify(profile),
    });
    return saved;
  },
  async createRegistration(userId, hackathonId) {
    const { run } = await http<{ run: RegistrationRun }>(`/registrations`, {
      method: "POST",
      body: JSON.stringify({ userId, hackathonId }),
    });
    return run;
  },
  async getRun(id) {
    try {
      const { run } = await http<{ run: RegistrationRun }>(`/registrations/${id}`);
      return run;
    } catch {
      return null;
    }
  },
  async approveRun(id) {
    await http(`/registrations/${id}/approve`, { method: "POST" });
  },
  async cancelRun(id) {
    await http(`/registrations/${id}/cancel`, { method: "POST" });
  },
  streamRun(id, handlers) {
    const es = new EventSource(`${BASE}/registrations/${id}/stream`);
    es.addEventListener("status", (ev) => {
      try {
        handlers.onStatus?.(JSON.parse((ev as MessageEvent).data));
      } catch {
        /* ignore malformed */
      }
    });
    for (const type of SSE_EVENT_TYPES) {
      es.addEventListener(type, (ev) => {
        try {
          handlers.onEvent(JSON.parse((ev as MessageEvent).data) as RegistrationProgressEvent);
        } catch {
          /* ignore malformed */
        }
      });
    }
    es.addEventListener("error", () => handlers.onError?.("stream error"));
    return () => es.close();
  },
};

export const api: Api = USE_MOCKS ? mockApi : realApi;
