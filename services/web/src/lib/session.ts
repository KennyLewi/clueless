"use client";

import { useEffect, useState } from "react";
import { DEMO_USER_ID } from "./mock-data";

// Minimal client-side session: the signed-in user's id + name live in localStorage.
// No JWT — the backend trusts the userId passed in each request (demo-grade auth).

const KEY = "earlybirds.session";

export interface Session {
  userId: string;
  name: string;
  email: string;
}

const listeners = new Set<() => void>();

function read(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(s: Session): void {
  window.localStorage.setItem(KEY, JSON.stringify(s));
  listeners.forEach((fn) => fn());
}

export function clearSession(): void {
  window.localStorage.removeItem(KEY);
  listeners.forEach((fn) => fn());
}

export function getSession(): Session | null {
  return read();
}

/**
 * The active user id for API calls. Falls back to DEMO_USER_ID so the app still
 * works in mock/demo mode before anyone signs in.
 */
export function currentUserId(): string {
  return read()?.userId ?? DEMO_USER_ID;
}

/** Reactive session hook — re-renders on sign in/out (same tab and across tabs). */
export function useSession(): { session: Session | null; ready: boolean } {
  const [session, setSessionState] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSessionState(read());
    sync();
    setReady(true);
    listeners.add(sync);
    window.addEventListener("storage", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { session, ready };
}
