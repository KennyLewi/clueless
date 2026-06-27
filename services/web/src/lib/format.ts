/** Tiny classnames helper (avoids a clsx dependency). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Compact "2d 03h" style countdown from an ISO timestamp.
 * Falls back to "—" when the date is missing/invalid.
 */
export function formatDeadline(iso?: string): string {
  if (!iso) return "—";
  const ms = new Date(iso).getTime() - Date.now();
  if (Number.isNaN(ms)) return "—";
  if (ms <= 0) return "closed";
  const mins = Math.floor(ms / 60000);
  const d = Math.floor(mins / 1440);
  const h = Math.floor((mins % 1440) / 60);
  const m = mins % 60;
  if (d > 0) return `${d}d ${String(h).padStart(2, "0")}h`;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}m`;
}

export function locationLabel(loc: { mode: string; city?: string; country?: string }): string {
  if (loc.mode === "online") return "Online";
  const parts = [loc.city, loc.country].filter(Boolean);
  return parts.length ? parts.join(", ") : loc.mode === "hybrid" ? "Hybrid" : "In person";
}

const md = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

/** "May 9–11, 2026" style range; tolerant of missing dates. */
export function formatDateRange(startIso?: string, endIso?: string): string {
  if (!startIso) return "Dates TBA";
  const s = new Date(startIso);
  if (!endIso) return `${md(s)}, ${s.getFullYear()}`;
  const e = new Date(endIso);
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  const right = sameMonth ? `${e.getDate()}` : md(e);
  return `${md(s)}–${right}, ${e.getFullYear()}`;
}

/** True when a deadline is within `days` from now. */
export function isClosingSoon(iso?: string, days = 3): boolean {
  if (!iso) return false;
  const ms = new Date(iso).getTime() - Date.now();
  return ms > 0 && ms <= days * 86400000;
}
