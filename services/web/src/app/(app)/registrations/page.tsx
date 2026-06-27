"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { currentUserId } from "@/lib/session";
import { eventById } from "@/lib/mock-data";
import { formatDeadline, locationLabel } from "@/lib/format";
import type { Hackathon, RegistrationRun, RegistrationStatus } from "@/lib/types";

type Filter = "all" | "active" | "needsyou" | "registered";
// Visual status buckets the dashboard renders.
type UiStatus = "registered" | "awaiting" | "needsinput" | "filling" | "paused" | "failed" | "cancelled";

const META: Record<UiStatus, { label: string; color: string; bg: string; dot: string }> = {
  registered: { label: "Registered", color: "#1D6F52", bg: "#E7F4EE", dot: "#1D9E75" },
  awaiting: { label: "Awaiting approval", color: "#9A6B00", bg: "#FBF1DC", dot: "#D9920F" },
  needsinput: { label: "Needs your input", color: "#9A6B00", bg: "#FBF1DC", dot: "#D9920F" },
  filling: { label: "Filling…", color: "#2B6F63", bg: "#E3F1EE", dot: "#1FA38C" },
  paused: { label: "Paused", color: "#7A746C", bg: "#EFEBE5", dot: "#A39E97" },
  failed: { label: "Failed", color: "#A23A2E", bg: "#F8E6E2", dot: "#C2412E" },
  cancelled: { label: "Cancelled", color: "#7A746C", bg: "#EFEBE5", dot: "#A39E97" },
};

const ACTION: Record<UiStatus, { label: string; primary: boolean; resume: boolean }> = {
  registered: { label: "View", primary: false, resume: false },
  awaiting: { label: "Review & submit", primary: true, resume: true },
  needsinput: { label: "Answer", primary: true, resume: true },
  filling: { label: "View progress", primary: false, resume: true },
  paused: { label: "Resume", primary: false, resume: true },
  failed: { label: "Retry", primary: false, resume: false },
  cancelled: { label: "View event", primary: false, resume: false },
};

// Map the backend's full state machine onto the dashboard's visual buckets.
function toUiStatus(s: RegistrationStatus): UiStatus {
  switch (s) {
    case "succeeded":
      return "registered";
    case "awaiting_approval":
      return "awaiting";
    case "needs_input":
      return "needsinput";
    case "captcha_encountered":
    case "oauth_redirect":
      return "paused";
    case "failed":
      return "failed";
    case "cancelled":
      return "cancelled";
    default:
      // queued · introspecting · filling · submitting
      return "filling";
  }
}

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "needsyou", label: "Needs you" },
  { key: "registered", label: "Registered" },
];

const inFilter = (status: UiStatus, f: Filter) => {
  if (f === "all") return true;
  if (f === "active") return ["filling", "awaiting", "needsinput"].includes(status);
  if (f === "needsyou") return ["awaiting", "needsinput", "failed", "paused"].includes(status);
  return status === "registered";
};

function Row({ run, hackathon }: { run: RegistrationRun; hackathon: Hackathon | null }) {
  const ui = toUiStatus(run.status);
  const m = META[ui];
  const a = ACTION[ui];
  const title = hackathon?.title ?? run.hackathonId;
  const place = hackathon ? locationLabel(hackathon.location) : "";
  const deadline = formatDeadline(hackathon?.dates.registrationClosesAt);
  const href = a.resume
    ? `/register/${run.hackathonId}?run=${run.id}`
    : `/events/${run.hackathonId}`;

  return (
    <div className="card" style={{ borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 16 }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--faint)", marginTop: 3 }}>{place}</div>
      </div>
      <div className="mono" style={{ fontSize: 12.5, color: "var(--faint)", width: 90, textAlign: "right" }}>{deadline}</div>
      <div style={{ width: 170 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 11px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, background: m.bg, color: m.color }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot }} />
          {m.label}
        </span>
      </div>
      <Link href={href} className={`btn ${a.primary ? "btn-primary" : "btn-neutral"} btn-sm`} style={a.primary ? { padding: "7px 16px" } : undefined}>
        {a.label}
      </Link>
    </div>
  );
}

export default function RegistrationsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [runs, setRuns] = useState<RegistrationRun[] | null>(null);
  const [events, setEvents] = useState<Record<string, Hackathon | null>>({});

  useEffect(() => {
    let alive = true;
    api
      .getRuns(currentUserId())
      .then(async (rs) => {
        if (!alive) return;
        setRuns(rs);
        // Resolve event details for each distinct hackathon (mock-data fallback).
        const ids = [...new Set(rs.map((r) => r.hackathonId))];
        const resolved = await Promise.all(
          ids.map(async (id) => [id, (await api.getEvent(id)) ?? eventById(id) ?? null] as const),
        );
        if (alive) setEvents(Object.fromEntries(resolved));
      })
      .catch(() => alive && setRuns([]));
    return () => {
      alive = false;
    };
  }, []);

  const rows = useMemo(
    () => (runs ?? []).filter((r) => inFilter(toUiStatus(r.status), filter)),
    [runs, filter],
  );

  return (
    <div className="wrap">
      <h1 className="page-title">Registrations</h1>
      <div className="page-sub">Everything the agent is working on, and what still needs you.</div>
      <div style={{ display: "flex", gap: 22, marginTop: 20, borderBottom: "1px solid var(--border)" }}>
        {FILTERS.map((t) => {
          const active = filter === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              style={{ padding: "8px 4px", border: "none", borderBottom: `2px solid ${active ? "var(--teal-fill)" : "transparent"}`, background: "none", color: active ? "var(--text)" : "var(--faint)", fontSize: 14, fontWeight: active ? 600 : 500, cursor: "pointer" }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        {runs === null ? (
          <div className="mono" style={{ color: "var(--faint)", padding: "40px 4px" }}>Loading…</div>
        ) : rows.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
            {runs.length === 0 ? "No registrations yet — pick an event and let the agent register you." : "Nothing in this filter."}
          </div>
        ) : (
          rows.map((r) => <Row key={r.id} run={r} hackathon={events[r.hackathonId] ?? null} />)
        )}
      </div>
    </div>
  );
}
