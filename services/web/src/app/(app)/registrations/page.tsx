"use client";

import Link from "next/link";
import { useState } from "react";
import { REGISTRATIONS, eventById, type RegRow } from "@/lib/mock-data";
import { formatDeadline, locationLabel } from "@/lib/format";

type Filter = "all" | "active" | "needsyou" | "registered";
type Status = RegRow["status"];

const META: Record<Status, { label: string; color: string; bg: string; dot: string }> = {
  registered: { label: "Registered", color: "#1D6F52", bg: "#E7F4EE", dot: "#1D9E75" },
  awaiting: { label: "Awaiting approval", color: "#9A6B00", bg: "#FBF1DC", dot: "#D9920F" },
  needsinput: { label: "Needs your input", color: "#9A6B00", bg: "#FBF1DC", dot: "#D9920F" },
  filling: { label: "Filling…", color: "#2B6F63", bg: "#E3F1EE", dot: "#1FA38C" },
  paused: { label: "Paused", color: "#7A746C", bg: "#EFEBE5", dot: "#A39E97" },
  failed: { label: "Failed", color: "#A23A2E", bg: "#F8E6E2", dot: "#C2412E" },
};

const ACTION: Record<Status, { label: string; primary: boolean; step?: string }> = {
  registered: { label: "View", primary: false },
  awaiting: { label: "Review & submit", primary: true, step: "awaiting" },
  needsinput: { label: "Answer", primary: true, step: "needsinput" },
  filling: { label: "View progress", primary: false, step: "filling" },
  paused: { label: "Resume", primary: false, step: "captcha" },
  failed: { label: "Retry", primary: false, step: "failed" },
};

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "needsyou", label: "Needs you" },
  { key: "registered", label: "Registered" },
];

const inFilter = (status: Status, f: Filter) => {
  if (f === "all") return true;
  if (f === "active") return ["filling", "awaiting", "needsinput"].includes(status);
  if (f === "needsyou") return ["awaiting", "needsinput", "failed", "paused"].includes(status);
  return status === "registered";
};

function Row({ row }: { row: RegRow }) {
  const e = eventById(row.eventId);
  const m = META[row.status];
  const a = ACTION[row.status];
  const title = e?.title ?? row.eventId;
  const place = e ? locationLabel(e.location) : "";
  const deadline = row.deadlineLabel ?? formatDeadline(e?.dates.registrationClosesAt);
  const href = a.step ? `/register/${row.eventId}?step=${a.step}` : `/events/${row.eventId}`;

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
  const rows = REGISTRATIONS.filter((r) => inFilter(r.status, filter));

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
        {rows.map((r) => (
          <Row key={r.rowId} row={r} />
        ))}
      </div>
    </div>
  );
}
