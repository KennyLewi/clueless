"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { currentUserId, getSession } from "@/lib/session";
import type { UserProfile } from "@/lib/types";

function Field({ label, value, onChange, placeholder, full }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; full?: boolean }) {
  return (
    <div style={full ? { gridColumn: "1 / -1" } : undefined}>
      <label className="label">{label}</label>
      <input
        className={`input${placeholder && !value ? " input-dashed" : ""}`}
        style={{ borderRadius: 10, padding: "11px 12px" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default function BasicsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [github, setGithub] = useState("");
  const [skills, setSkills] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const session = getSession();
    api
      .getProfile(currentUserId())
      .then((p) => {
        setProfile(p);
        setName(p?.name ?? session?.name ?? "");
        setEmail(p?.email ?? session?.email ?? "");
        setSchool(p?.school ?? "");
        setGithub(p?.formAnswers?.github ?? "");
        setSkills((p?.skills ?? []).join(", "));
      })
      .catch(() => {
        setName(session?.name ?? "");
        setEmail(session?.email ?? "");
      });
  }, []);

  const filledCount = [name, email, school, github, skills].filter((v) => v.trim()).length;

  const save = async (next: string) => {
    setSaving(true);
    try {
      const toSave: UserProfile = {
        id: currentUserId(),
        name: name.trim() || "Anonymous",
        email: email.trim(),
        school: school.trim() || undefined,
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        interests: profile?.interests ?? [],
        willingToTravel: profile?.willingToTravel ?? false,
        travelRegions: profile?.travelRegions,
        resumeUrl: profile?.resumeUrl,
        locationBase: profile?.locationBase,
        voice: profile?.voice,
        formAnswers: {
          ...profile?.formAnswers,
          full_name: name.trim(),
          email: email.trim(),
          ...(school.trim() ? { school: school.trim() } : {}),
          ...(github.trim() ? { github: github.trim() } : {}),
        },
      };
      await api.putProfile(toSave);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
      router.push(next);
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ width: 520, padding: "38px 40px", boxShadow: "0 2px 10px rgba(0,0,0,.04)", borderRadius: 20 }}>
        <div className="eyebrow">STEP 2 OF 3 · PROFILE BASICS</div>
        <div style={{ fontWeight: 700, fontSize: 24, letterSpacing: "-0.01em", marginTop: 12 }}>Fill once — EarlyBirds reuses these on every form.</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
          <div style={{ flex: 1, height: 6, background: "#EFEBE5", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${(filledCount / 5) * 100}%`, height: "100%", background: "var(--teal)", borderRadius: 999, transition: "width .2s" }} />
          </div>
          <span className="mono" style={{ fontSize: 12.5, color: "var(--muted)" }}>{filledCount} of 5 fields</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
          <Field label="Full name" value={name} onChange={setName} />
          <Field label="Email" value={email} onChange={setEmail} />
          <Field label="School" value={school} onChange={setSchool} />
          <Field label="GitHub" value={github} onChange={setGithub} />
          <Field label="Skills" value={skills} onChange={setSkills} placeholder="Add skills (e.g. React, embedded, design)…" full />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28 }}>
          <button className="btn-ghost" onClick={() => router.push("/")}>Skip for now</button>
          <button className="btn btn-primary" onClick={() => save("/onboarding/voice")} disabled={saving}>
            {saving ? "Saving…" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
