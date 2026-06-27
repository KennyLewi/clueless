"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { DEMO_USER_ID } from "@/lib/mock-data";
import { formatDateRange, formatDeadline, locationLabel } from "@/lib/format";
import type { FeedEvent, Hackathon } from "@/lib/types";
import { feedExtras } from "@/lib/mock-data";

const CONF_COLOR: Record<string, string> = {
  high: "var(--teal-fill)",
  medium: "var(--amber-text)",
  low: "var(--faint)",
};

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Hackathon | null | undefined>(undefined);
  const [ranked, setRanked] = useState<FeedEvent | null>(null);

  useEffect(() => {
    let alive = true;
    Promise.all([api.getEvent(id), api.getFeed(DEMO_USER_ID)]).then(([ev, feed]) => {
      if (!alive) return;
      setEvent(ev);
      setRanked(feed.find((f) => f.hackathonId === id) ?? null);
    });
    return () => {
      alive = false;
    };
  }, [id]);

  if (event === undefined) {
    return (
      <div className="wrap wrap-event">
        <div className="mono" style={{ color: "var(--faint)", padding: "40px 4px" }}>Loading…</div>
      </div>
    );
  }
  if (event === null) {
    return (
      <div className="wrap wrap-event">
        <Link href="/" style={{ color: "var(--faint)", fontSize: 13.5, textDecoration: "none" }}>← Back to discover</Link>
        <div style={{ padding: "40px 4px", color: "var(--muted)" }}>Event not found.</div>
      </div>
    );
  }

  const { viaExa, merged } = feedExtras(event.id);
  const reasons = ranked?.reasons ?? event.themes.map((t) => `Theme: ${t}`);
  const groundingSources = event.sources.filter((s) => s.exaGrounding?.length);

  return (
    <div className="wrap wrap-event">
      <Link href="/" style={{ color: "var(--faint)", fontSize: 13.5, textDecoration: "none", display: "inline-block", marginBottom: 18 }}>
        ← Back to discover
      </Link>

      <div className="card" style={{ borderRadius: 18, overflow: "hidden" }}>
        <div style={{ padding: "28px 30px" }}>
          {viaExa && (
            <span className="pill-exa">
              <span className="dot" />
              Via Exa
            </span>
          )}
          <div style={{ fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", margin: "14px 0 6px" }}>{event.title}</div>
          <div style={{ fontSize: 14.5, color: "var(--muted)" }}>
            {locationLabel(event.location)} · {formatDateRange(event.dates.startsAt, event.dates.endsAt)}
          </div>
          <div className="mono" style={{ fontSize: 14, color: "var(--faint)", marginTop: 8 }}>
            closes in {formatDeadline(event.dates.registrationClosesAt)}
          </div>

          <div>
            <Link href={`/register/${event.id}`} className="btn btn-primary" style={{ marginTop: 18, padding: "13px 28px", display: "inline-flex" }}>
              Auto-register me
            </Link>
          </div>

          <div className="section-label" style={{ margin: "26px 0 11px" }}>WHY YOU&apos;RE A MATCH</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {reasons.map((r) => (
              <span key={r} className="reason-pill">{r}</span>
            ))}
          </div>
        </div>

        <div style={{ margin: "0 30px 30px", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "var(--panel)", borderBottom: "1px solid #EFEBE5" }}>
            <span style={{ fontWeight: 600, fontSize: 14.5 }}>How we found this</span>
            {merged > 0 && <span className="pill-merged" style={{ fontSize: 10.5 }}>Merged from {merged} sources</span>}
          </div>
          <div style={{ padding: 16 }}>
            {groundingSources.length === 0 ? (
              <div style={{ fontSize: 13, color: "var(--muted)" }}>No Exa grounding recorded for this event.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {groundingSources.flatMap((s) =>
                  (s.exaGrounding ?? []).map((g) => (
                    <div key={`${s.rawUrl}-${g.field}`} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, minWidth: 120 }}>{g.field}</span>
                      <span className="mono" style={{ fontSize: 11.5, color: "var(--teal-fill)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {g.citations[0]?.url ?? s.rawUrl}
                      </span>
                      <span className="mono" style={{ fontSize: 11.5, color: CONF_COLOR[g.confidence] ?? "var(--faint)" }}>
                        {g.confidence}
                      </span>
                    </div>
                  )),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
