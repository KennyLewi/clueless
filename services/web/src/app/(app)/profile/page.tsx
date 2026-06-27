"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { currentUserId } from "@/lib/session";
import { DEMO_PROFILE } from "@/lib/mock-data";
import type { UserProfile } from "@/lib/types";

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div style={{ fontSize: 12.5, color: "var(--faint)", marginBottom: 5 }}>{label}</div>
      <input
        className="input"
        style={{ background: "#fff" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function VoiceArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <>
      <div style={{ fontSize: 12, color: "var(--faint)", margin: "18px 0 6px" }}>{label}</div>
      <textarea
        className="input"
        style={{ background: "#fff", minHeight: 64, resize: "vertical", lineHeight: 1.5 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [skillsText, setSkillsText] = useState("");
  const [interestsText, setInterestsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let alive = true;
    api
      .getProfile(currentUserId())
      .then((p) => {
        if (!alive) return;
        const base = p ?? { ...DEMO_PROFILE, id: currentUserId() };
        setProfile(base);
        setSkillsText((base.skills ?? []).join(", "));
        setInterestsText((base.interests ?? []).join(", "));
      })
      .catch(() => {
        if (!alive) return;
        const base = { ...DEMO_PROFILE, id: currentUserId() };
        setProfile(base);
        setSkillsText(base.skills.join(", "));
        setInterestsText(base.interests.join(", "));
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!profile) {
    return (
      <div className="wrap wrap-narrow">
        <div className="mono" style={{ color: "var(--faint)", padding: "40px 4px" }}>Loading…</div>
      </div>
    );
  }

  const set = (patch: Partial<UserProfile>) => setProfile((p) => (p ? { ...p, ...patch } : p));
  const setVoice = (patch: Partial<NonNullable<UserProfile["voice"]>>) =>
    setProfile((p) => (p ? { ...p, voice: { ...p.voice, ...patch } } : p));

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const toSave: UserProfile = {
        ...profile,
        skills: skillsText.split(",").map((s) => s.trim()).filter(Boolean),
        interests: interestsText.split(",").map((s) => s.trim()).filter(Boolean),
        // Keep formAnswers in sync with the basics the agent reuses on forms.
        formAnswers: {
          ...profile.formAnswers,
          full_name: profile.name,
          email: profile.email,
          ...(profile.school ? { school: profile.school } : {}),
        },
      };
      const result = await api.putProfile(toSave);
      setProfile(result);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const voice = profile.voice ?? {};

  return (
    <div className="wrap wrap-narrow">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 className="page-title">Profile</h1>
          <div className="page-sub">Fill once — EarlyBirds reuses these on every form.</div>
        </div>
        <button className="btn btn-primary" style={{ padding: "10px 22px", opacity: saving ? 0.6 : 1 }} onClick={save} disabled={saving}>
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
        </button>
      </div>

      <div className="card" style={{ padding: 24, marginTop: 22 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>BASICS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Full name" value={profile.name} onChange={(v) => set({ name: v })} />
          <Field label="Email" value={profile.email} onChange={(v) => set({ email: v })} />
          <Field label="School" value={profile.school ?? ""} onChange={(v) => set({ school: v })} />
          <Field
            label="GitHub"
            value={profile.formAnswers?.github ?? ""}
            onChange={(v) => set({ formAnswers: { ...profile.formAnswers, github: v } })}
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <Field label="Skills (comma-separated)" value={skillsText} onChange={setSkillsText} />
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginTop: 16 }}>
        <div className="section-label" style={{ marginBottom: 14 }}>YOUR VOICE</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16, lineHeight: 1.5 }}>
          The agent writes open-ended answers in <em>your voice</em> — your interests steer matches, not your past topics.
        </div>
        <Field label="Interests (comma-separated)" value={interestsText} onChange={setInterestsText} />
        <VoiceArea label="One-liner" value={voice.oneLiner ?? ""} onChange={(v) => setVoice({ oneLiner: v })} />
        <VoiceArea label="Proud project" value={voice.proudProject ?? ""} onChange={(v) => setVoice({ proudProject: v })} />
        <VoiceArea label="Outside my lane" value={voice.outsideLane ?? ""} onChange={(v) => setVoice({ outsideLane: v })} />
      </div>
    </div>
  );
}
