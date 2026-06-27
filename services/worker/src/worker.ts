import "dotenv/config";
import { Worker } from "bullmq";
import { QUEUE_NAMES } from "@earlybirds/contracts";
import { REDIS_URL } from "./config.js";
import type {
  DiscoveryRunJob,
  NormalizeListingJob,
  RankRecomputeJob,
  FormIntrospectJob,
  RegistrationRunJob,
  NotifyEnqueueJob,
} from "@earlybirds/contracts";
import { handleDiscovery } from "./handlers/discovery.js";
import { handleNormalize, rankQueue, formQueue } from "./handlers/normalize.js";
import { handleRank, notifyQueue } from "./handlers/rank.js";
import { handleFormIntrospect } from "./handlers/formIntrospect.js";
import { handleRegistration } from "./handlers/registration.js";
import { handleNotify } from "./handlers/notify.js";

const connection = { url: REDIS_URL };

const workers = [
  new Worker<DiscoveryRunJob>(QUEUE_NAMES.DISCOVERY_RUN, handleDiscovery, { connection }),
  new Worker<NormalizeListingJob>(QUEUE_NAMES.NORMALIZE_LISTING, handleNormalize, { connection }),
  new Worker<RankRecomputeJob>(QUEUE_NAMES.RANK_RECOMPUTE, handleRank, { connection }),
  new Worker<FormIntrospectJob>(QUEUE_NAMES.FORM_INTROSPECT, handleFormIntrospect, { connection }),
  new Worker<RegistrationRunJob>(QUEUE_NAMES.REGISTRATION_RUN, handleRegistration, { connection }),
  new Worker<NotifyEnqueueJob>(QUEUE_NAMES.NOTIFY_ENQUEUE, handleNotify, { connection }),
];

// Queue instances opened by handlers — close them alongside workers on shutdown.
const queues = [rankQueue, formQueue, notifyQueue];

console.log("Workers started for queues:", Object.values(QUEUE_NAMES).join(", "));

const shutdown = async () => {
  console.log("Shutting down workers...");
  await Promise.all([
    ...workers.map((w) => w.close()),
    ...queues.map((q) => q.close()),
  ]);
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
