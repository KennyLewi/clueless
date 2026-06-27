import crypto from "node:crypto";
import { EXA_OUTPUT_SCHEMA } from "@earlybirds/contracts";
import type { SourceAdapter, RawListing } from "@earlybirds/contracts";

const EXA_BASE_URL = "https://api.exa.ai";
const FIXTURE_PATH = new URL("../../../../fixtures/exa-response.json", import.meta.url);

interface ExaSearchResult {
  output?: {
    content?: {
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
  };
}

export class ExaAdapter implements SourceAdapter {
  readonly source = "exa" as const;

  private readonly apiKey: string | undefined;
  private readonly useFixture: boolean;

  constructor() {
    this.apiKey = process.env["EXA_API_KEY"];
    // Fall back to fixture if no key — safe for offline dev (M0 requirement).
    this.useFixture = !this.apiKey;
    if (this.useFixture) {
      console.warn("[exa] No EXA_API_KEY found — using fixture data.");
    }
  }

  async discover(cursor?: string): Promise<{ listings: RawListing[]; nextCursor?: string }> {
    const raw = this.useFixture ? await this.loadFixture() : await this.fetchFromExa();
    const events = raw.output?.content?.events ?? [];
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

  private async fetchFromExa(): Promise<ExaSearchResult> {
    const res = await fetch(`${EXA_BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey!, // verified: Exa uses x-api-key, not Bearer
      },
      body: JSON.stringify({
        query: "upcoming hackathons open for registration AI fintech blockchain 2026",
        type: "deep",
        numResults: 25,
        contents: { highlights: true },
        outputSchema: EXA_OUTPUT_SCHEMA,
      }),
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
