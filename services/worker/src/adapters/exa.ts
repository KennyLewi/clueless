import crypto from "node:crypto";
import { EXA_OUTPUT_SCHEMA } from "@earlybirds/contracts";
import type { SourceAdapter, RawListing } from "@earlybirds/contracts";

const EXA_BASE_URL = "https://api.exa.ai";
const FIXTURE_PATH = new URL("../../../../fixtures/exa-response.json", import.meta.url);

// Exa /search response with outputSchema: structured data lives directly in
// `output` (matching the schema shape), alongside the standard `results[]` array.
interface ExaSearchResult {
  results?: Array<{ url: string; title: string }>;
  output?: {
    events?: Array<{
      title: string;
      url: string;
      registrationUrl?: string;
      startsAt?: string;
      registrationClosesAt?: string;
      location?: string;
      themes?: string[];
      eligibility?: string;
      description?: string;
      organizer?: string;
      prizes?: string;
    }>;
  };
}

export interface ExaAdapterOptions {
  includeDomains?: string[];
}

export class ExaAdapter implements SourceAdapter {
  readonly source = "exa" as const;

  private readonly apiKey: string | undefined;
  private readonly useFixture: boolean;
  private readonly includeDomains: string[] | undefined;

  constructor(opts: ExaAdapterOptions = {}) {
    this.apiKey = process.env["EXA_API_KEY"];
    this.useFixture = !this.apiKey;
    this.includeDomains = opts.includeDomains;
    if (this.useFixture) {
      console.warn("[exa] No EXA_API_KEY found — using fixture data.");
    }
  }

  async discover(cursor?: string): Promise<{ listings: RawListing[]; nextCursor?: string }> {
    const raw = this.useFixture ? await this.loadFixture() : await this.fetchFromExa(cursor);
    // Structured events live at output.events (matching the outputSchema shape).
    const events = raw.output?.events ?? [];
    const now = new Date().toISOString();

    const listings: RawListing[] = events.map((event) => ({
      source: "exa" as const,
      rawUrl: event.url,
      title: event.title,
      fields: {
        registrationUrl: event.registrationUrl,
        startsAt: event.startsAt,
        registrationClosesAt: event.registrationClosesAt,
        location: event.location,
        themes: event.themes ?? [],
        eligibility: event.eligibility,
        description: event.description,
        organizer: event.organizer,
        prizes: event.prizes,
      },
      rawPayloadRef: `exa:${crypto.createHash("sha1").update(event.url).digest("hex")}`,
      scrapedAt: now,
    }));

    return { listings };
  }

  private async fetchFromExa(cursor?: string): Promise<ExaSearchResult> {
    const body: Record<string, unknown> = {
      query: "upcoming hackathons open for registration AI fintech blockchain 2026",
      type: "deep",
      numResults: 25,
      contents: { highlights: true },
      outputSchema: EXA_OUTPUT_SCHEMA,
    };

    if (this.includeDomains && this.includeDomains.length > 0) {
      body["includeDomains"] = this.includeDomains;
    }

    // cursor is an opaque page token returned by a previous Exa response.
    if (cursor) {
      body["cursor"] = cursor;
    }

    const res = await fetch(`${EXA_BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey!, // verified: Exa uses x-api-key, not Authorization: Bearer
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Exa search failed: ${res.status} ${text}`);
    }

    return res.json() as Promise<ExaSearchResult>;
  }

  private async loadFixture(): Promise<ExaSearchResult> {
    const { readFile } = await import("node:fs/promises");
    const raw = await readFile(FIXTURE_PATH, "utf-8");
    return JSON.parse(raw) as ExaSearchResult;
  }
}
