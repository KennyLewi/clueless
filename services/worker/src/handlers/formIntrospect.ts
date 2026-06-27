import type { Job } from "bullmq";
import type { FormIntrospectJob } from "@earlybirds/contracts";

// Uses Exa /contents to pull clean form page text, then infers FormFieldSpec[].
// Updates Hackathon.registration.knownFields in DB.
export async function handleFormIntrospect(job: Job<FormIntrospectJob>) {
  const { hackathonId, formUrl } = job.data;
  console.log(`[form-introspect] ${hackathonId} → ${formUrl}`);

  // TODO(M1): Exa /contents → LLM → FormFieldSpec[] → DB update
  return { hackathonId, fields: [] };
}
