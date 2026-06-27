"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { INTERESTS } from "@/lib/mock-data";
import { api } from "@/lib/api";
import { currentUserId } from "@/lib/session";
import type { UserProfile } from "@/lib/types";

function PromptCard({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return (
    <div
      className="card"
      style={
        accent
          ? { border: "1px solid var(--teal-border)", borderRadius: 18, padding: "26px 28px", boxShadow: "0 1px 0 var(--teal-tint2)" }
          : { borderRadius: 18, padding: "26px 28px" }
      }
    >
      {children}
    </div>
  );
}

export default function VoicePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [oneLiner, setOneLiner] = useState("");
  const [proudProject, setProudProject] = useState("");
  const [outsideLane, setOutsideLane] = useState("");
  const [essay, setEssay] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getProfile(currentUserId()).then((p) => {
      if (!p) return;
      setProfile(p);
      setInterests(p.interests ?? []);
      setOneLiner(p.voice?.oneLiner ?? "");
      setProudProject(p.voice?.proudProject ?? "");
      setOutsideLane(p.voice?.outsideLane ?? "");
    });
  }, []);

  const toggle = (t: string) =>
    setInterests((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const essayWords = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  const save = async (skipVoice: boolean) => {
    setSaving(true);
    try {
      const writingSamples = [
        ...(profile?.voice?.writingSamples ?? []),
        ...(essay.trim() && !skipVoice ? [{ label: "Pasted essay", text: essay.trim() }] : []),
      ];
      const toSave: UserProfile = {
        id: currentUserId(),
        name: profile?.name ?? "Anonymous",
        email: profile?.email ?? "",
        school: profile?.school,
        skills: profile?.skills ?? [],
        interests: skipVoice ? profile?.interests ?? [] : interests,
        willingToTravel: profile?.willingToTravel ?? false,
        travelRegions: profile?.travelRegions,
        resumeUrl: profile?.resumeUrl,
        locationBase: profile?.locationBase,
        formAnswers: profile?.formAnswers ?? {},
        voice: skipVoice
          ? profile?.voice
          : {
              oneLiner: oneLiner.trim() || undefined,
              proudProject: proudProject.trim() || undefined,
              outsideLane: outsideLane.trim() || undefined,
              writingSamples: writingSamples.length ? writingSamples : undefined,
            },
      };
      await api.putProfile(toSave);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
      router.push("/");
    }
  };

  return (
    <div style={{ height: "100vh", background: "var(--bg)", overflow: "auto" }}>
      <div style={{ width: 580, maxWidth: "100%", margin: "0 auto", padding: "40px 24px 120px" }}>
        <div className="eyebrow">STEP 3 OF 3 · YOUR VOICE</div>
        <div style={{ fontWeight: 700, fontSize: 26, letterSpacing: "-0.015em", marginTop: 12 }}>Tell us how you think.</div>
        <div style={{ fontSize: 14.5, color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>
          A few quick prompts. The agent learns your <em>voice</em> from these — your interests steer matches, never your past topics. All optional.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
          <PromptCard>
            <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>What do you want to hack on next?</div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>Pick what excites you — not just what you&apos;ve done before.</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
              {INTERESTS.map((t) => (
                <button key={t} className={`interest-chip${interests.includes(t) ? " active" : ""}`} onClick={() => toggle(t)}>
                  {t}
                </button>
              ))}
            </div>
          </PromptCard>
          <PromptCard>
            <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>One line about you.</div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>How you&apos;d introduce yourself to a team.</div>
            <input className="input" style={{ marginTop: 18, fontSize: 15 }} value={oneLiner} onChange={(e) => setOneLiner(e.target.value)} />
          </PromptCard>
          <PromptCard>
            <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>Something you&apos;ve built that represents how you work.</div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>We learn your voice from this — not your topic.</div>
            <textarea className="input" style={{ marginTop: 18, minHeight: 92, resize: "vertical", lineHeight: 1.55 }} value={proudProject} onChange={(e) => setProudProject(e.target.value)} />
          </PromptCard>
          <PromptCard>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>What would you try outside your usual lane?</div>
              <span className="mono" style={{ fontSize: 11, color: "var(--faint2)" }}>optional</span>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>Helps us surface stretch matches.</div>
            <input className="input input-dashed" style={{ marginTop: 18, fontSize: 15 }} placeholder="e.g. fintech, climate, devtools…" value={outsideLane} onChange={(e) => setOutsideLane(e.target.value)} />
          </PromptCard>
          <PromptCard accent>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>Paste an essay or write-up you&apos;re proud of</div>
              <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--teal-fill)", fontWeight: 600, background: "var(--teal-tint2)", padding: "2px 8px", borderRadius: 999 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--teal)" }} />best signal
              </span>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>
              This is the strongest way to capture your voice — a personal statement, blog post, or project README in your own words. The more you paste, the better the agent sounds like you.
            </div>
            <textarea className="input" style={{ marginTop: 18, border: "1px solid var(--teal-border)", background: "#FBFCFB", minHeight: 150, resize: "vertical", lineHeight: 1.6 }} placeholder="Paste a personal statement, blog post, essay, or detailed README…" value={essay} onChange={(e) => setEssay(e.target.value)} />
            <div className="mono" style={{ fontSize: 11.5, color: "#A39E97", marginTop: 8 }}>{essayWords} words · aim for 150+</div>
          </PromptCard>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(246,244,241,0.92)", borderTop: "1px solid #E5E0D9", backdropFilter: "blur(6px)" }}>
        <div style={{ width: 580, maxWidth: "100%", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="btn-ghost" onClick={() => router.push("/onboarding/basics")}>Back</button>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <button className="btn-ghost" onClick={() => save(true)} disabled={saving}>Skip voice step</button>
            <button className="btn btn-primary" onClick={() => save(false)} disabled={saving}>
              {saving ? "Saving…" : "Save & find hackathons"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
