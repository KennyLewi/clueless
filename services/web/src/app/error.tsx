"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page">
      <div style={{ textAlign: "center", maxWidth: 380 }}>
        <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em" }}>Something went wrong</div>
        <div style={{ color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>
          An unexpected error interrupted the agent. You can retry or head back to your events.
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
          <button onClick={reset} className="btn btn-primary">Try again</button>
          <Link href="/" className="btn btn-neutral">Discover</Link>
        </div>
      </div>
    </div>
  );
}
