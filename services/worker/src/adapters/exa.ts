import crypto from "node:crypto";
import { Exa, type DeepObjectOutputSchema } from "exa-js";
import { EXA_OUTPUT_SCHEMA } from "@earlybirds/contracts";
import type { SourceAdapter, RawListing, ExaGrounding } from "@earlybirds/contracts";

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

interface ExaResult {
  content: ExaOutputContent | undefined;
  grounding: ExaGrounding[];
}

// Fixture type matches the live SearchResponse shape.
interface ExaFixture {
  output?: {
    content?: ExaOutputContent;
    grounding?: ExaGrounding[];
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
    const { content, grounding } = this.useFixture
      ? await this.loadFixtureContent()
      : await this.fetchFromExa();

    const events = content?.events ?? [];
    const now = new Date().toISOString();

    const listings: RawListing[] = events.map((event, i) => ({
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
      // Exa grounding entries reference events by index: "events[0].title", "events[1].url", etc.
      exaGrounding: grounding.filter((g) => g.field.startsWith(`events[${i}]`)),
    }));

    return { listings };
  }

  private async fetchFromExa(): Promise<ExaResult> {
    const results = await this.client!.search(
      "upcoming hackathons open for registration AI fintech blockchain 2026",
      {
        type: "deep",
        category: "news",
        numResults: 25,
        systemPrompt:
          "Find hackathon events. Prefer official event pages and organizer announcements. Collapse duplicates from the same event. Ignore meetups, webinars, and competitions that are not hackathons.",
        outputSchema: EXA_OUTPUT_SCHEMA as unknown as DeepObjectOutputSchema,
        contents: { highlights: true, maxAgeHours: 72 },
        ...(this.includeDomains?.length ? { includeDomains: this.includeDomains } : {}),
      },
    );

    const output = results.output;
    return {
      content: output?.content as ExaOutputContent | undefined,
      grounding: (output?.grounding ?? []).map((g) => ({
        field: g.field,
        citations: g.citations,
        confidence: g.confidence,
      })),
    };
  }

  private async loadFixtureContent(): Promise<ExaResult> {
    const { readFile } = await import("node:fs/promises");
    const raw = await readFile(FIXTURE_PATH, "utf-8");
    const fixture = JSON.parse(raw) as ExaFixture;
    return {
      content: fixture.output?.content,
      grounding: fixture.output?.grounding ?? [],
    };
  }
}
