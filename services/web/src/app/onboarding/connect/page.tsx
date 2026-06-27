import Link from "next/link";
import type { ReactNode } from "react";

function SourceRow({ icon, name, detail, action }: { icon: ReactNode; name: string; detail: string; action: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px" }}>
      <div style={{ width: 42, height: 42, borderRadius: 11, background: "#F4F2EE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{name}</div>
        <div style={{ fontSize: 13, color: "var(--faint)" }}>{detail}</div>
      </div>
      {action}
    </div>
  );
}

const connected = (label: string) => (
  <span style={{ background: "var(--teal-tint2)", color: "var(--teal-fill)", border: "1px solid var(--teal-border)", padding: "8px 15px", borderRadius: 9, fontSize: 13, fontWeight: 600 }}>{label}</span>
);

export default function ConnectPage() {
  return (
    <div className="page">
      <div className="card" style={{ width: 520, padding: "38px 40px", boxShadow: "0 2px 10px rgba(0,0,0,.04)", borderRadius: 20 }}>
        <div className="eyebrow">STEP 1 OF 3 · CONNECT YOUR SOURCES</div>
        <div style={{ fontWeight: 700, fontSize: 24, letterSpacing: "-0.01em", marginTop: 12 }}>Connect once. Autofill everywhere.</div>
        <div style={{ fontSize: 14.5, color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>
          EarlyBirds pulls from these to fill registration forms for you. Connect what you have — you can add the rest later.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          <SourceRow
            name="GitHub"
            detail="Projects, languages, links"
            action={connected("Connected")}
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="#3F3A35"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg>}
          />
          <SourceRow
            name="Résumé"
            detail="maya-chen-resume.pdf"
            action={connected("Uploaded")}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3F3A35" strokeWidth={1.8}><path d="M14 3v5h5" /><path d="M7 3h7l5 5v13H7z" strokeLinejoin="round" /><path d="M9 13h6M9 16h6" strokeLinecap="round" /></svg>}
          />
          <SourceRow
            name="Google"
            detail="Calendar + email confirmations"
            action={<button className="btn btn-primary" style={{ padding: "8px 15px", borderRadius: 9, fontSize: 13 }}>Connect</button>}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3F3A35" strokeWidth={1.8}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28 }}>
          <Link href="/welcome" className="btn-ghost">Back</Link>
          <Link href="/onboarding/basics" className="btn btn-primary">Continue</Link>
        </div>
      </div>
    </div>
  );
}
