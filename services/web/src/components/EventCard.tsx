"use client";

import Link from "next/link";
import type { FeedEvent } from "@/lib/types";
import { feedExtras } from "@/lib/mock-data";
import { formatDateRange, formatDeadline, locationLabel } from "@/lib/format";
import { useSaved } from "@/lib/useSaved";
import { IconBookmark } from "./icons";

export function EventCard({ event }: { event: FeedEvent }) {
  const e = event.hackathon;
  const { viaExa, merged } = feedExtras(e.id);
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(e.id);
  const deadline = formatDeadline(e.dates.registrationClosesAt);

  return (
    <div className="card" style={{ padding: "20px 22px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {(viaExa || merged > 0) && (
            <div style={{ display: "flex", gap: 7, marginBottom: 9 }}>
              {viaExa && (
                <span className="pill-exa">
                  <span className="dot" />
                  Via Exa
                </span>
              )}
              {merged > 0 && <span className="pill-merged">Merged from {merged} sources</span>}
            </div>
          )}
          <Link
            href={`/events/${e.id}`}
            style={{ fontWeight: 600, fontSize: 19, letterSpacing: "-0.01em", color: "var(--text)", textDecoration: "none" }}
          >
            {e.title}
          </Link>
          <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4 }}>
            {locationLabel(e.location)} · {formatDateRange(e.dates.startsAt, e.dates.endsAt)}
          </div>
          <div className="mono" style={{ fontSize: 12.5, color: "var(--faint)", marginTop: 6 }}>
            closes in {deadline}
          </div>
          <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 9, lineHeight: 1.5 }}>
            {event.reasons[0]}
          </div>
        </div>
        <button
          onClick={() => toggle(e.id)}
          aria-label={saved ? "Remove bookmark" : "Bookmark"}
          style={{ background: "none", border: "1px solid var(--input)", borderRadius: 9, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
        >
          <IconBookmark on={saved} />
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
        <Link href={`/events/${e.id}`} style={{ color: "var(--faint)", fontSize: 13.5, fontWeight: 500, textDecoration: "none" }}>
          View details →
        </Link>
        <Link href={`/register/${e.id}`} className="btn btn-outline">
          Auto-register
        </Link>
      </div>
    </div>
  );
}
