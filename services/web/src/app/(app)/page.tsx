"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { DEMO_USER_ID, feedExtras } from "@/lib/mock-data";
import { isClosingSoon, locationLabel } from "@/lib/format";
import type { FeedEvent } from "@/lib/types";
import { EventCard } from "@/components/EventCard";
import { IconSearch } from "@/components/icons";

const FILTERS: Array<[string, string]> = [
  ["all", "All"],
  ["closing", "Closing soon"],
  ["remote", "Remote"],
  ["exa", "Via Exa"],
];

export default function FeedPage() {
  const [events, setEvents] = useState<FeedEvent[] | null>(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let alive = true;
    api.getFeed(DEMO_USER_ID).then((e) => alive && setEvents(e));
    return () => {
      alive = false;
    };
  }, []);

  const shown = useMemo(() => {
    if (!events) return [];
    const q = query.trim().toLowerCase();
    return events.filter((ev) => {
      const h = ev.hackathon;
      if (filter === "closing" && !isClosingSoon(h.dates.registrationClosesAt)) return false;
      if (filter === "remote" && h.location.mode !== "online") return false;
      if (filter === "exa" && !feedExtras(h.id).viaExa) return false;
      if (q) {
        const haystack = [h.title, h.organizer ?? "", locationLabel(h.location), ...h.themes, ...ev.reasons]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [events, filter, query]);

  return (
    <div className="wrap">
      <h1 className="page-title">Discover</h1>
      <div className="page-sub">Ranked by fit to your profile. The agent can register you for any of these.</div>

      <div style={{ position: "relative", marginTop: 22 }}>
        <IconSearch />
        <input
          className="input"
          style={{ background: "#fff", borderRadius: 12, padding: "12px 14px 12px 40px" }}
          placeholder="Search events, locations, tracks…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: 9, marginTop: 14, flexWrap: "wrap" }}>
        {FILTERS.map(([f, label]) => (
          <button key={f} className={`filter-chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 22 }}>
        {events === null ? (
          <div className="mono" style={{ color: "var(--faint)", padding: "40px 4px" }}>
            Searching via Exa…
          </div>
        ) : shown.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
            {query.trim() ? `No events match “${query.trim()}”.` : "No matches for this filter."}
          </div>
        ) : (
          shown.map((ev) => <EventCard key={ev.hackathonId} event={ev} />)
        )}
      </div>
    </div>
  );
}
