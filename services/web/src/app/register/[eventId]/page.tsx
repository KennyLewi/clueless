"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { AUTOFILL_FIELDS, NEXT_MATCHES, eventById } from "@/lib/mock-data";
import { formatDateRange, formatDeadline, locationLabel } from "@/lib/format";
import type { FieldView, Hackathon } from "@/lib/types";
import { Bird, IconCheck, IconLock, IconShield, Spinner } from "@/components/icons";

type AfStep =
  | "filling"
  | "needsinput"
  | "captcha"
  | "oauth"
  | "awaiting"
  | "submitting"
  | "success"
  | "failed";

const AF_STEPS: Array<[AfStep, string]> = [
  ["filling", "Filling"],
  ["needsinput", "Needs input"],
  ["captcha", "CAPTCHA"],
  ["oauth", "OAuth"],
  ["awaiting", "Awaiting"],
  ["submitting", "Submitting"],
  ["success", "Success"],
  ["failed", "Failed"],
];

type FieldStatus = "done" | "active" | "pending";

function statusOf(key: string, af: AfStep): FieldStatus {
  if (af === "filling" || af === "captcha" || af === "oauth") {
    if (key === "team_status") return "active";
    if (key === "why_join") return "pending";
    return "done";
  }
  if (af === "needsinput") {
    if (key === "team_status" || key === "why_join") return "pending";
    return "done";
  }
  return "done";
}

function FieldRow({
  field,
  af,
  draft,
  onDraft,
  onRegenerate,
  onShorter,
}: {
  field: FieldView;
  af: AfStep;
  draft: string;
  onDraft: (v: string) => void;
  onRegenerate: () => void;
  onShorter: () => void;
}) {
  const st = statusOf(field.key, af);
  const wide = field.key === "team_status" || field.key === "why_join";
  const isDraft = field.source === "llm_draft";
  const isInferred = field.source === "llm_inferred";

  const labelStyle: React.CSSProperties = {
    fontSize: 12.5,
    color: st === "active" ? "var(--teal-fill)" : "var(--muted)",
    fontWeight: st === "active" ? 600 : 500,
    display: "block",
    marginBottom: 7,
  };

  let body: React.ReactNode;
  if (st === "active") {
    body = (
      <div className="field-box active">
        <span className="mono" style={{ fontSize: 13 }}>{field.value}</span>
        <span className="caret" />
      </div>
    );
  } else if (st === "pending") {
    body = (
      <div className={`field-box pending${wide ? " pending-wide" : ""}`}>
        <span className="mono" style={{ fontSize: 12.5, color: "var(--placeholder)" }}>waiting…</span>
      </div>
    );
  } else if (isInferred) {
    body = (
      <>
        <div className="field-box">
          <span className="mono" style={{ fontSize: 12.5, color: "var(--mono-body)", lineHeight: 1.55 }}>{field.value}</span>
        </div>
        <div className="chip-inferred" style={{ marginTop: 7 }}>
          <span className="dot" />
          Inferred — review
        </div>
      </>
    );
  } else if (isDraft) {
    body = (
      <>
        <textarea
          className="mono"
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          style={{ width: "100%", border: "1px solid var(--amber-panel-border)", borderRadius: 10, padding: 12, background: "var(--amber-panel)", fontSize: 12.5, color: "var(--mono-body)", lineHeight: 1.55, minHeight: 92, resize: "vertical" }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <span className="chip-draft">
            <span className="dot" />
            Draft — tailored to this event
          </span>
          <span style={{ display: "flex", gap: 14 }}>
            <button className="btn-ghost" style={{ color: "var(--teal-fill)", fontWeight: 600, fontSize: 12.5 }} onClick={onRegenerate}>Regenerate</button>
            <button className="btn-ghost" style={{ color: "var(--teal-fill)", fontWeight: 600, fontSize: 12.5 }} onClick={onShorter}>Shorter</button>
          </span>
        </div>
      </>
    );
  } else {
    body = (
      <>
        <div className="field-box">
          <span className="val">{field.value}</span>
          <IconCheck />
        </div>
        {(field.source === "profile" || field.source === "default") && (
          <span className="chip-src" style={{ marginTop: 7 }}>{field.source}</span>
        )}
      </>
    );
  }

  return (
    <div style={wide ? { gridColumn: "1 / -1" } : undefined}>
      <label style={labelStyle}>{field.label}</label>
      {body}
    </div>
  );
}

function StatusPill({ af }: { af: AfStep }) {
  const label =
    af === "filling" ? "auto-registering"
    : af === "needsinput" ? "needs your input"
    : af === "captcha" || af === "oauth" ? "paused — action needed"
    : af === "awaiting" ? "awaiting your review"
    : af === "submitting" ? "submitting"
    : "";
  if (!label) return null;
  const dot = (c: string) => <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "inline-block" }} />;
  const inner =
    af === "filling" || af === "submitting" ? <Spinner />
    : af === "awaiting" ? dot("var(--teal-fill)")
    : dot("var(--amber-dot)");
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--teal-tint)", color: "var(--teal-fill)", fontSize: 13, fontWeight: 500, padding: "6px 13px", borderRadius: 999, marginLeft: 6 }}>
      {inner}
      {label}
    </span>
  );
}

function agentLog(af: AfStep, title: string): React.ReactNode[] {
  const line = (time: string, body: React.ReactNode, key: string) => (
    <div key={key}>
      <span style={{ color: "var(--placeholder)", marginRight: 8 }}>{time}</span>
      {body}
    </div>
  );
  const tag = (t: string, c: string) => <span style={{ color: c, marginRight: 6 }}>{t}</span>;
  const plain = (t: string) => <span style={{ color: "var(--mono-body)" }}>{t}</span>;
  const status = (t: string) => <span style={{ color: "var(--teal-fill)", fontWeight: 500 }}>{t}</span>;

  const out: React.ReactNode[] = [
    line("14:02:58", plain(`Opened ${title} registration`), "l1"),
    line("14:03:00", plain("Reading form · 6 fields detected"), "l2"),
    line("14:03:01", plain("Matched 4 fields from your profile"), "l3"),
    line("14:03:03", <>{tag("profile", "#3A6B59")}{plain("Full name → Maya Chen")}</>, "l4"),
    line("14:03:04", <>{tag("profile", "#3A6B59")}{plain("Email → maya.chen@berkeley.edu")}</>, "l5"),
    line("14:03:05", <>{tag("profile", "#3A6B59")}{plain("GitHub · School")}</>, "l6"),
  ];
  if (af === "filling") out.push(line("14:03:09", <>{plain("Inferring team status…")}<span className="caret" style={{ height: 13, verticalAlign: "middle" }} /></>, "lf"));
  if (af === "captcha") out.push(line("14:03:10", <>{tag("Paused", "#B5740E")}{plain("CAPTCHA challenge — needs you in-browser")}</>, "lc"));
  if (af === "oauth") out.push(line("14:03:10", <>{tag("Paused", "#B5740E")}{plain("Sign-in required — Google OAuth in-browser")}</>, "lo"));
  if (af === "needsinput") out.push(line("14:03:11", <>{tag("Paused", "#B5740E")}{plain("Can't infer: team status — needs your input")}</>, "ln"));
  if (af === "awaiting" || af === "submitting" || af === "success") {
    out.push(line("14:03:12", <>{tag("inferred", "#B5740E")}{plain("Team status → Looking for teammates")}</>, "li"));
    out.push(line("14:03:13", <>{tag("draft", "#B5740E")}{plain('"Why join?" drafted in your voice')}</>, "ld"));
    out.push(line("14:03:13", plain("All fields complete · 2 to review"), "la"));
  }
  if (af === "awaiting") out.push(line("14:03:14", status("awaiting approval"), "law"));
  if (af === "submitting") out.push(line("14:03:15", status("Submitting registration…"), "ls"));
  if (af === "success") out.push(line("14:03:17", <>{tag("Submitted", "#0F6E56")}{plain("Confirmation LUM-8K2F9Q")}</>, "lsu"));
  return out;
}

export default function RegisterTakeoverPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<Hackathon | null>(() => eventById(eventId) ?? null);
  const [af, setAf] = useState<AfStep>("filling");
  const draftField = AUTOFILL_FIELDS.find((f) => f.source === "llm_draft");
  const [draft, setDraft] = useState(draftField?.draftText ?? "");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };
  const go = (step: AfStep) => {
    clearTimers();
    setAf(step);
  };

  useEffect(() => {
    if (!event) api.getEvent(eventId).then((e) => e && setEvent(e));
  }, [eventId, event]);

  useEffect(() => {
    // Initial auto-advance filling → needs input (mirrors the agent hitting a gap).
    const t = window.setTimeout(() => setAf("needsinput"), 2600);
    timers.current.push(t);
    return clearTimers;
  }, []);

  const confirmSubmit = () => {
    clearTimers();
    setAf("submitting");
    timers.current.push(window.setTimeout(() => setAf("success"), 1800));
  };
  const retry = () => {
    clearTimers();
    setAf("submitting");
    timers.current.push(window.setTimeout(() => setAf("success"), 1600));
  };
  const regenerate = () => setDraft(draftField?.draftText ?? "");
  const shorter = () => setDraft((d) => d.split(". ")[0].replace(/\.?$/, "."));

  const title = event?.title ?? "this event";
  const isForm = ["filling", "needsinput", "awaiting", "submitting", "captcha", "oauth"].includes(af);

  return (
    <div style={{ height: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", position: "relative" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border-lt2)", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <Bird size={22} />
          <span style={{ fontWeight: 700, fontSize: 16 }}>EarlyBirds</span>
          <StatusPill af={af} />
        </div>
        <button className="btn-ghost" onClick={() => router.push("/")}>✕ Close</button>
      </div>

      {isForm && <FormView af={af} event={event} title={title} draft={draft} setDraft={setDraft} go={go} confirmSubmit={confirmSubmit} regenerate={regenerate} shorter={shorter} />}
      {af === "success" && <SuccessView event={event} title={title} router={router} />}
      {af === "failed" && <FailedView title={title} retry={retry} router={router} />}

      <div className="demo-bar">
        <span className="lbl">DEMO STATES</span>
        {AF_STEPS.map(([k, l]) => (
          <button key={k} className={`demo-chip${af === k ? " active" : ""}`} onClick={() => go(k)}>{l}</button>
        ))}
      </div>
    </div>
  );
}

function FormView({
  af, event, title, draft, setDraft, go, confirmSubmit, regenerate, shorter,
}: {
  af: AfStep;
  event: Hackathon | null;
  title: string;
  draft: string;
  setDraft: (v: string) => void;
  go: (s: AfStep) => void;
  confirmSubmit: () => void;
  regenerate: () => void;
  shorter: () => void;
}) {
  const deadline = event ? formatDeadline(event.dates.registrationClosesAt) : "—";
  const place = event ? locationLabel(event.location) : "";

  return (
    <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px", background: "#fff", borderBottom: "1px solid var(--border-lt)" }}>
        <div>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{title}</span>
          <span style={{ fontSize: 14, color: "var(--muted)", marginLeft: 8 }}>{place}</span>
        </div>
        <span className="mono" style={{ fontSize: 13.5, color: "var(--faint)" }}>{deadline} left to register</span>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "58% 42%", maxWidth: 1180, width: "100%", margin: "0 auto" }}>
        <div style={{ padding: "26px 30px", borderRight: "1px solid var(--border-lt2)" }}>
          <div className="section-label" style={{ marginBottom: 18 }}>REGISTRATION FORM</div>
          <PauseCallout af={af} go={go} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {AUTOFILL_FIELDS.map((f) => (
              <FieldRow key={f.key} field={f} af={af} draft={draft} onDraft={setDraft} onRegenerate={regenerate} onShorter={shorter} />
            ))}
          </div>
        </div>
        <div style={{ padding: "26px 30px", background: "var(--panel)" }}>
          <div className="section-label" style={{ marginBottom: 18 }}>AGENT ACTIVITY</div>
          <div className="mono" style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 12.5, lineHeight: 1.45 }}>
            {agentLog(af, title)}
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", borderTop: "1px solid var(--border-lt2)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "18px 30px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Footer af={af} go={go} confirmSubmit={confirmSubmit} />
        </div>
      </div>
    </div>
  );
}

function PauseCallout({ af, go }: { af: AfStep; go: (s: AfStep) => void }) {
  if (af === "needsinput") {
    return (
      <div className="callout">
        <div className="callout-eyebrow"><span className="dot" />NEEDS YOUR INPUT</div>
        <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 9 }}>
          This form asks for <span style={{ color: "var(--amber-text)" }}>Team status</span> — we don&apos;t have it yet.
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 13 }}>
          <input className="input" style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "10px 12px" }} placeholder="e.g. Looking for teammates" />
          <button className="btn btn-primary" style={{ padding: "10px 18px", borderRadius: 10, fontSize: 14, whiteSpace: "nowrap" }} onClick={() => go("awaiting")}>Provide &amp; resume</button>
        </div>
      </div>
    );
  }
  if (af === "captcha") {
    return (
      <div className="callout">
        <div className="callout-eyebrow"><span className="dot" />ACTION NEEDED IN YOUR BROWSER</div>
        <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 9 }}>Complete the CAPTCHA in your browser, then click Resume.</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>We paused so a human can clear the challenge — the agent won&apos;t fake it.</div>
        <button className="btn btn-outline" style={{ marginTop: 13, padding: "9px 18px", borderRadius: 10 }} onClick={() => go("awaiting")}>Resume</button>
      </div>
    );
  }
  if (af === "oauth") {
    return (
      <div className="callout">
        <div className="callout-eyebrow"><span className="dot" />SIGN-IN REQUIRED</div>
        <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 9 }}>Sign in to Google in your browser, then click Resume.</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>The form uses Google sign-in — we hand control to you, then pick back up.</div>
        <button className="btn btn-outline" style={{ marginTop: 13, padding: "9px 18px", borderRadius: 10 }} onClick={() => go("awaiting")}>Resume</button>
      </div>
    );
  }
  return null;
}

function Footer({ af, go, confirmSubmit }: { af: AfStep; go: (s: AfStep) => void; confirmSubmit: () => void }) {
  const lockedBtn = <button className="btn" disabled style={{ padding: "11px 24px", fontSize: 14.5 }}>Confirm &amp; submit</button>;
  const amberDot = <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--amber-dot)" }} />;

  if (af === "filling") {
    return (
      <>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--faint)" }}><IconLock />Nothing is submitted until you confirm</span>
        {lockedBtn}
      </>
    );
  }
  if (af === "needsinput") {
    return (
      <>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--amber-text)", fontWeight: 500 }}>{amberDot}Paused — one answer needed below</span>
        {lockedBtn}
      </>
    );
  }
  if (af === "captcha" || af === "oauth") {
    return (
      <>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--amber-text)", fontWeight: 500 }}>{amberDot}Paused — finish the step above, then Resume</span>
        {lockedBtn}
      </>
    );
  }
  if (af === "awaiting") {
    return (
      <>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--teal-fill)", fontWeight: 500 }}><IconShield />Ready — review, then confirm</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="btn-ghost" onClick={() => go("filling")}>Cancel</button>
          <button className="btn btn-primary" style={{ padding: "11px 24px", fontSize: 14.5 }} onClick={confirmSubmit}>Confirm &amp; submit</button>
        </div>
      </>
    );
  }
  if (af === "submitting") {
    return (
      <>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--teal-fill)", fontWeight: 500 }}><Spinner size={13} />Submitting your registration…</span>
        <button className="btn btn-primary" disabled style={{ opacity: 0.55, padding: "11px 24px", fontSize: 14.5 }}>Submitting…</button>
      </>
    );
  }
  return null;
}

function SuccessView({ event, title, router }: { event: Hackathon | null; title: string; router: ReturnType<typeof useRouter> }) {
  const place = event ? locationLabel(event.location) : "";
  const dates = event ? formatDateRange(event.dates.startsAt, event.dates.endsAt) : "";
  return (
    <div style={{ flex: 1, overflow: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 24px" }}>
      <div className="card" style={{ width: 460, borderRadius: 18, overflow: "hidden" }}>
        <div className="fadeup" style={{ background: "var(--amber-bg)", padding: "36px 28px 32px", textAlign: "center" }}>
          <Bird size={46} color="#C97B14" />
          <div style={{ fontWeight: 700, fontSize: 25, letterSpacing: "-0.02em", color: "var(--amber-head)", marginTop: 8 }}>You&apos;re in. Worm secured.</div>
          <div style={{ fontSize: 15, color: "var(--amber-sub)", marginTop: 8 }}>{title} · {place}</div>
          <div className="mono" style={{ display: "inline-block", marginTop: 16, fontSize: 14, letterSpacing: "0.08em", color: "var(--amber-head)", background: "#F7E2C4", border: "1px solid #ECCF9E", borderRadius: 9, padding: "8px 16px" }}>LUM-8K2F9Q</div>
        </div>
        <div style={{ padding: "22px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <Row label="When" value={dates} />
            <Row label="Where" value={place} />
            <Row label="Confirmation" value="sent to your email" />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button className="btn btn-primary" style={{ flex: 1, padding: 12 }}>Add to calendar</button>
            <button className="btn btn-outline" style={{ flex: 1, padding: 12, justifyContent: "center" }} onClick={() => router.push("/registrations")}>View registrations</button>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--border-lt)", padding: "18px 24px" }}>
          <div style={{ fontSize: 12, color: "#A39E97", fontWeight: 500, letterSpacing: "0.02em", marginBottom: 13 }}>NEXT MATCHES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {NEXT_MATCHES.map((e) => (
              <div key={e.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{e.title}</div>
                  <div className="mono" style={{ fontSize: 11.5, color: "#A39E97", marginTop: 2 }}>closes in {formatDeadline(e.dates.registrationClosesAt)}</div>
                </div>
                <Link href={`/register/${e.id}`} className="btn btn-outline btn-sm">Register</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
      <span style={{ color: "var(--faint)" }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function FailedView({ title, retry, router }: { title: string; retry: () => void; router: ReturnType<typeof useRouter> }) {
  return (
    <div style={{ flex: 1, overflow: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 24px" }}>
      <div className="card" style={{ width: 440, borderRadius: 18, padding: "32px 30px", textAlign: "center" }}>
        <div style={{ width: 54, height: 54, borderRadius: "50%", background: "var(--red-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C2503E" strokeWidth={2.2} strokeLinecap="round">
            <path d="M12 8v5" />
            <circle cx="12" cy="16.5" r="0.4" fill="#C2503E" />
            <path d="M12 3l9 16H3z" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.01em", marginTop: 16 }}>Couldn&apos;t submit — site rejected it.</div>
        <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>{title}&apos;s form returned an error on submit. Your answers are saved — nothing was lost.</div>
        <div className="mono" style={{ fontSize: 12, color: "var(--red-text)", background: "var(--red-bg)", borderRadius: 9, padding: "10px 12px", marginTop: 16, lineHeight: 1.5 }}>ERR 422 · field &quot;phone&quot; required but not in profile</div>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button className="btn btn-neutral" style={{ flex: 1, padding: 12, justifyContent: "center" }} onClick={() => router.push("/registrations")}>Back to registrations</button>
          <button className="btn btn-primary" style={{ flex: 1, padding: 12 }} onClick={retry}>Retry</button>
        </div>
      </div>
    </div>
  );
}
