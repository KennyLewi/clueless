import Link from "next/link";
import { Bird } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="page">
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, opacity: 0.85 }}>
          <Bird size={34} />
        </div>
        <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em" }}>Page not found</div>
        <div style={{ color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>
          That one flew the coop. Let&apos;s get you back to the events.
        </div>
        <Link href="/" className="btn btn-primary" style={{ marginTop: 20, display: "inline-flex" }}>
          Back to discover
        </Link>
      </div>
    </div>
  );
}
