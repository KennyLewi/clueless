"use client";

import Link from "next/link";
import { eventById } from "@/lib/mock-data";
import { formatDateRange, formatDeadline, locationLabel } from "@/lib/format";
import { useSaved } from "@/lib/useSaved";
import { IconBookmark } from "@/components/icons";
import type { Hackathon } from "@/lib/types";

export default function SavedPage() {
  const { ids, toggle } = useSaved();
  const saved = ids.map(eventById).filter((e): e is Hackathon => !!e);

  return (
    <div className="wrap">
      <h1 className="page-title">Saved</h1>
      <div className="page-sub">Events you&apos;ve bookmarked to revisit or register later.</div>
      {saved.length ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 22 }}>
          {saved.map((e) => (
            <div key={e.id} className="card" style={{ padding: "20px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link href={`/events/${e.id}`} style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em", color: "var(--text)", textDecoration: "none" }}>
                  {e.title}
                </Link>
                <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4 }}>
                  {locationLabel(e.location)} · {formatDateRange(e.dates.startsAt, e.dates.endsAt)}
                </div>
                <div className="mono" style={{ fontSize: 12.5, color: "var(--faint)", marginTop: 6 }}>
                  closes in {formatDeadline(e.dates.registrationClosesAt)}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                  onClick={() => toggle(e.id)}
                  aria-label="Remove bookmark"
                  style={{ background: "none", border: "1px solid var(--input)", borderRadius: 9, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                >
                  <IconBookmark on />
                </button>
                <Link href={`/register/${e.id}`} className="btn btn-outline">Auto-register</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)", marginTop: 22 }}>
          <div style={{ fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>No saved events</div>
          Bookmark events from Discover to track them here.
        </div>
      )}
    </div>
  );
}
