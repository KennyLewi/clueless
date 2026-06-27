import { DEMO_PROFILE, VOICE, WRITING_SAMPLES } from "@/lib/mock-data";

function Basic({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 12.5, color: "var(--faint)", marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function VoiceField({ label, value }: { label: string; value: string }) {
  return (
    <>
      <div style={{ fontSize: 12, color: "var(--faint)", margin: "18px 0 6px" }}>{label}</div>
      <div style={{ fontSize: 14, lineHeight: 1.5 }}>{value}</div>
    </>
  );
}

export default function ProfilePage() {
  return (
    <div className="wrap wrap-narrow">
      <h1 className="page-title">Profile</h1>
      <div className="page-sub">Fill once — EarlyBirds reuses these on every form.</div>

      <div className="card" style={{ padding: 24, marginTop: 22 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>BASICS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Basic label="Full name" value={DEMO_PROFILE.name} />
          <Basic label="Email" value={DEMO_PROFILE.email} />
          <Basic label="School" value={DEMO_PROFILE.school ?? "—"} />
          <Basic label="Graduation" value="2027" />
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div className="section-label">YOUR VOICE</div>
          <button className="btn-ghost" style={{ color: "var(--teal-fill)", fontWeight: 600, fontSize: 13 }}>Edit</button>
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16, lineHeight: 1.5 }}>
          The agent writes open-ended answers in <em>your voice</em> — your interests steer matches, not your past topics.
        </div>
        <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 8 }}>Interests</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {(DEMO_PROFILE.interests ?? []).map((t) => (
            <span key={t} className="reason-pill">{t}</span>
          ))}
        </div>
        <VoiceField label="One-liner" value={VOICE.oneLiner} />
        <VoiceField label="Proud project" value={VOICE.proudProject} />
        <VoiceField label="Outside my lane" value={VOICE.outsideLane} />
      </div>

      <div className="card" style={{ padding: 24, marginTop: 16 }}>
        <div className="section-label" style={{ marginBottom: 12 }}>WRITING SAMPLES</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14, lineHeight: 1.5 }}>
          Samples the agent learns your tone from — for voice, never to dictate topic.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {WRITING_SAMPLES.map((s) => (
            <div key={s.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #EFEBE5", borderRadius: 11, padding: "13px 15px", background: "var(--panel)" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</div>
                <div className="mono" style={{ fontSize: 11.5, color: "#A39E97", marginTop: 3 }}>{s.meta}</div>
              </div>
              <button className="btn-ghost" style={{ fontSize: 13 }}>View</button>
            </div>
          ))}
          <button className="input input-dashed" style={{ textAlign: "center", color: "var(--teal-fill)", fontWeight: 600, cursor: "pointer", padding: 12, fontSize: 13.5 }}>
            + Add writing sample
          </button>
        </div>
      </div>
    </div>
  );
}
