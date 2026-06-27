"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "earlybirds.saved";
// First-run seed so the demo opens with a couple of bookmarked events.
const SEED = ["treehacks", "calhacks"];

function read(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  if (raw === null) return SEED;
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

// Module-level subscribers keep every mounted component in sync within a tab
// (the native "storage" event only fires across tabs).
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function useSaved() {
  // Start empty to match SSR, then hydrate from localStorage after mount.
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setIds(read());
    sync();
    listeners.add(sync);
    window.addEventListener("storage", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    window.localStorage.setItem(KEY, JSON.stringify(next));
    emit();
  }, []);

  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, isSaved, toggle };
}
