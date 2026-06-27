import Link from "next/link";

function Field({ label, value, placeholder, full }: { label: string; value?: string; placeholder?: string; full?: boolean }) {
  return (
    <div style={full ? { gridColumn: "1 / -1" } : undefined}>
      <label className="label">{label}</label>
      <input
        className={`input${placeholder ? " input-dashed" : ""}`}
        style={{ borderRadius: 10, padding: "11px 12px" }}
        defaultValue={value}
        placeholder={placeholder}
      />
    </div>
  );
}

export default function BasicsPage() {
  return (
    <div className="page">
      <div className="card" style={{ width: 520, padding: "38px 40px", boxShadow: "0 2px 10px rgba(0,0,0,.04)", borderRadius: 20 }}>
        <div className="eyebrow">STEP 2 OF 3 · PROFILE BASICS</div>
        <div style={{ fontWeight: 700, fontSize: 24, letterSpacing: "-0.01em", marginTop: 12 }}>Fill once — EarlyBirds reuses these on every form.</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
          <div style={{ flex: 1, height: 6, background: "#EFEBE5", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: "80%", height: "100%", background: "var(--teal)", borderRadius: 999 }} />
          </div>
          <span className="mono" style={{ fontSize: 12.5, color: "var(--muted)" }}>4 of 5 fields</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
          <Field label="Full name" value="Maya Chen" />
          <Field label="Email" value="maya.chen@berkeley.edu" />
          <Field label="School" value="UC Berkeley" />
          <Field label="GitHub" value="github.com/mayac" />
          <Field label="Skills" placeholder="Add skills (e.g. React, embedded, design)…" full />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28 }}>
          <Link href="/" className="btn-ghost">Skip for now</Link>
          <Link href="/onboarding/voice" className="btn btn-primary">Continue</Link>
        </div>
      </div>
    </div>
  );
}
