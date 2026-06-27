import type { Job } from "bullmq";
import type { FormIntrospectJob, FormFieldSpec } from "@earlybirds/contracts";
import { db } from "@earlybirds/db";

export async function handleFormIntrospect(job: Job<FormIntrospectJob>) {
  const { hackathonId, formUrl } = job.data;
  console.log(`[form-introspect] ${hackathonId} → ${formUrl}`);

  const exaKey = process.env["EXA_API_KEY"];
  const openaiKey = process.env["OPENAI_API_KEY"];

  if (!exaKey) {
    console.warn("[form-introspect] no EXA_API_KEY — skipping");
    return { hackathonId, fields: [] };
  }

  // 1. Fetch clean page text via Exa /contents.
  const exaRes = await fetch("https://api.exa.ai/contents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": exaKey,
    },
    body: JSON.stringify({ ids: [formUrl], text: true }),
  });

  if (!exaRes.ok) {
    console.warn(`[form-introspect] Exa /contents ${exaRes.status} for ${formUrl}`);
    return { hackathonId, fields: [] };
  }

  const exaData = (await exaRes.json()) as { results: Array<{ url: string; text?: string }> };
  const pageText = exaData.results[0]?.text ?? "";

  if (!pageText) {
    console.warn("[form-introspect] Exa returned empty text");
    return { hackathonId, fields: [] };
  }

  if (!openaiKey) {
    console.warn("[form-introspect] no OPENAI_API_KEY — skipping LLM field inference");
    return { hackathonId, fields: [] };
  }

  // 2. Infer FormFieldSpec[] via OpenAI structured output.
  const oaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${openaiKey}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 900,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            "Extract registration form fields from the provided page text.",
            "Return JSON: { \"fields\": FormFieldSpec[] }",
            "Each FormFieldSpec: { canonicalName: string (snake_case), label: string, type: \"text\"|\"email\"|\"textarea\"|\"select\"|\"checkbox\"|\"radio\"|\"file\", required: boolean, options?: string[] }",
            "Focus on fields the user must fill out. Max 15 fields. Omit hidden/submit/CSRF fields.",
          ].join(" "),
        },
        {
          role: "user",
          content: `Form URL: ${formUrl}\n\nPage text (truncated):\n${pageText.slice(0, 6_000)}`,
        },
      ],
    }),
  });

  if (!oaiRes.ok) {
    console.warn(`[form-introspect] OpenAI ${oaiRes.status}`);
    return { hackathonId, fields: [] };
  }

  const oaiData = (await oaiRes.json()) as {
    choices: Array<{ message: { content: string } }>;
  };

  let fields: FormFieldSpec[] = [];
  try {
    const parsed = JSON.parse(oaiData.choices[0]!.message.content) as {
      fields: Array<{
        canonicalName: string;
        label: string;
        type: string;
        required: boolean;
        options?: string[];
      }>;
    };

    fields = parsed.fields
      .slice(0, 15)
      .map((f) => ({
        canonicalName: f.canonicalName,
        label: f.label,
        type: (["text", "email", "textarea", "select", "checkbox", "radio", "file"].includes(f.type)
          ? f.type
          : "text") as FormFieldSpec["type"],
        required: Boolean(f.required),
        options: f.options,
        confidence: 0.8,
      }));
  } catch {
    console.warn("[form-introspect] failed to parse OpenAI response");
    return { hackathonId, fields: [] };
  }

  if (fields.length === 0) return { hackathonId, fields: [] };

  // 3. Persist to DB.
  await db.hackathon.update({
    where: { id: hackathonId },
    data: { knownFields: fields as object[] },
  });

  console.log(`[form-introspect] stored ${fields.length} fields for ${hackathonId}`);
  return { hackathonId, fields };
}
