import crypto from "node:crypto";
import { Exa, type DeepObjectOutputSchema } from "exa-js";
import { EXA_OUTPUT_SCHEMA } from "@earlybirds/contracts";
import type { SourceAdapter, RawListing } from "@earlybirds/contracts";

const FIXTURE_PATH = new URL("../../../../fixtures/exa-response.json", import.meta.url);

// Shape of output.content after Exa applies our EXA_OUTPUT_SCHEMA.
interface ExaOutputContent {
  events?: Array<{
    title: string;
    url: string;
    registrationUrl?: string;
    startsAt?: string;
    registrationClosesAt?: string;
    location?: string;
    themes?: string[];
    description?: string;
    organizer?: string;
  }>;
}

// Fixture type matches the live SearchResponse shape.
interface ExaFixture {
  output?: {
    content?: ExaOutputContent;
  };
}

export interface ExaAdapterOptions {
  includeDomains?: string[];
}

export class ExaAdapter implements SourceAdapter {
  readonly source = "exa" as const;

  private readonly client: Exa | null;
  private readonly useFixture: boolean;
  private readonly includeDomains: string[] | undefined;

  constructor(opts: ExaAdapterOptions = {}) {
    const apiKey = process.env["EXA_API_KEY"];
    this.useFixture = !apiKey;
    this.client = apiKey ? new Exa(apiKey) : null;
    this.includeDomains = opts.includeDomains;
    if (this.useFixture) {
      console.warn("[exa] No EXA_API_KEY found — using fixture data.");
    }
  }

  async discover(_cursor?: string): Promise<{ listings: RawListing[]; nextCursor?: string }> {
    const content = this.useFixture
      ? await this.loadFixtureContent()
      : await this.fetchFromExa();

    const events = content?.events ?? [];
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
        description: event.description,
        organizer: event.organizer,
      },
      rawPayloadRef: `exa:${crypto.createHash("sha1").update(event.url).digest("hex")}`,
      scrapedAt: now,
    }));

    return { listings };
  }

  private async fetchFromExa(): Promise<ExaOutputContent | undefined> {
    const results = await this.client!.search(
      "upcoming hackathons open for registration AI fintech blockchain 2026",
      {
        type: "deep",
        numResults: 25,
        systemPrompt:
          "Find hackathon events. Prefer official event pages and organizer announcements. Collapse duplicates from the same event. Ignore meetups, webinars, and competitions that are not hackathons.",
        outputSchema: EXA_OUTPUT_SCHEMA as unknown as DeepObjectOutputSchema,
        contents: { highlights: true },
        ...(this.includeDomains?.length ? { includeDomains: this.includeDomains } : {}),
      },
    );

    return results.output?.content as ExaOutputContent | undefined;
  }

  private async loadFixtureContent(): Promise<ExaOutputContent | undefined> {
    const { readFile } = await import("node:fs/promises");
    const raw = await readFile(FIXTURE_PATH, "utf-8");
    const fixture = JSON.parse(raw) as ExaFixture;
    return fixture.output?.content;
  }
}
