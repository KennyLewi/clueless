import Link from "next/link";
import { Bird } from "@/components/icons";

export default function WelcomePage() {
  return (
    <div className="page">
      <div className="card" style={{ width: 400, padding: "38px 36px", boxShadow: "0 2px 10px rgba(0,0,0,.04)", borderRadius: 20 }}>
        <div className="brand" style={{ padding: 0, marginBottom: 26 }}>
          <Bird size={26} />
          <span style={{ fontSize: 20 }}>EarlyBirds</span>
        </div>
        <div style={{ fontWeight: 700, fontSize: 23, letterSpacing: "-0.01em" }}>Catch the worm first.</div>
        <div style={{ fontSize: 14.5, color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>
          Sign in and let the agent register you for the events that fit — before the deadlines pass.
        </div>
        <label className="label" style={{ margin: "24px 0 7px" }}>Email</label>
        <input className="input" type="text" defaultValue="maya.chen@berkeley.edu" />
        <Link href="/onboarding/connect" className="btn btn-primary" style={{ width: "100%", marginTop: 14, padding: 13 }}>
          Continue with email
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0", color: "var(--placeholder)", fontSize: 12.5 }}>
          <div style={{ flex: 1, height: 1, background: "#EDE9E3" }} />
          or
          <div style={{ flex: 1, height: 1, background: "#EDE9E3" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/onboarding/connect" className="input" style={{ background: "#fff", fontWeight: 500, textAlign: "center", padding: 11, textDecoration: "none", color: "var(--text)" }}>
            Continue with Google
          </Link>
          <Link href="/onboarding/connect" className="input" style={{ background: "#fff", fontWeight: 500, textAlign: "center", padding: 11, textDecoration: "none", color: "var(--text)" }}>
            Continue with GitHub
          </Link>
        </div>
        <div style={{ textAlign: "center", fontSize: 12.5, color: "var(--faint2)", marginTop: 24, lineHeight: 1.5 }}>
          We never submit anything without your confirmation.
        </div>
      </div>
    </div>
  );
}
