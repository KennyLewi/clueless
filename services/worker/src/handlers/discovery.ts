import type { Job } from "bullmq";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { DiscoveryRunJob, NormalizeListingJob } from "@earlybirds/contracts";
import { ExaAdapter } from "../adapters/exa.js";
import { REDIS_URL } from "../config.js";

const normalizeQueue = new Queue<NormalizeListingJob>(QUEUE_NAMES.NORMALIZE_LISTING, {
  connection: { url: REDIS_URL },
});

// Per the design doc, Devpost and Luma adapters are Exa passes with includeDomains
// filters — they're not separate scraper implementations.
const ADAPTER_DOMAINS: Partial<Record<DiscoveryRunJob["adapter"], string[]>> = {
  devpost: ["devpost.com"],
  luma: ["lu.ma"],
  exa: [], // broad open-web pass; no domain filter
};

// Runs a discovery pass via the appropriate adapter.
// Enqueues one normalize job per RawListing.
export async function handleDiscovery(job: Job<DiscoveryRunJob>) {
  const { adapter: adapterName, cursor } = job.data;

  const domains = ADAPTER_DOMAINS[adapterName] ?? [];
  const adapter = new ExaAdapter({ includeDomains: domains.length > 0 ? domains : undefined });
  const { listings, nextCursor } = await adapter.discover(cursor);

  console.log(`[discovery] ${adapterName} returned ${listings.length} listings`);

  for (const listing of listings) {
    await normalizeQueue.add("listing", listing);
  }

  return { count: listings.length, nextCursor };
}
