import type { Job, UnrecoverableError } from "bullmq";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import type { DiscoveryRunJob, NormalizeListingJob } from "@earlybirds/contracts";
import { ExaAdapter } from "../adapters/exa.js";

const REDIS_URL = process.env["REDIS_URL"] ?? "redis://localhost:6379";

const normalizeQueue = new Queue<NormalizeListingJob>(QUEUE_NAMES.NORMALIZE_LISTING, {
  connection: { url: REDIS_URL },
});

// Runs an Exa-powered discovery pass. Enqueues one normalize job per RawListing.
export async function handleDiscovery(job: Job<DiscoveryRunJob>) {
  const { adapter: adapterName, cursor } = job.data;

  const adapter = new ExaAdapter();
  const { listings, nextCursor } = await adapter.discover(cursor);

  console.log(`[discovery] ${adapterName} returned ${listings.length} listings`);

  for (const listing of listings) {
    await normalizeQueue.add("listing", listing);
  }

  return { count: listings.length, nextCursor };
}
