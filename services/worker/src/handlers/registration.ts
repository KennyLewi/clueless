import type { Job } from "bullmq";
import type { RegistrationRunJob, RegistrationStatus } from "@earlybirds/contracts";

// Drives the RegistrationRun state machine.
// Runner choice (Playwright vs Simulang) is based on hackathon.registration.provider.
// Hard stops at awaiting_approval — waits for POST /registrations/:id/approve.
export async function handleRegistration(job: Job<RegistrationRunJob>) {
  const { runId } = job.data;
  console.log(`[registration] run ${runId} starting`);

  const transitions: RegistrationStatus[] = [
    "introspecting",
    "filling",
    "awaiting_approval",
    // submitting / succeeded happen after human approval (separate trigger)
  ];

  for (const status of transitions) {
    console.log(`[registration] ${runId} → ${status}`);
    // TODO(M2): execute real step, persist status, push SSE event
  }

  return { runId, status: "awaiting_approval" as RegistrationStatus };
}
