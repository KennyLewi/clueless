"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { INTERESTS, DEMO_PROFILE, VOICE } from "@/lib/mock-data";

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
  const [interests, setInterests] = useState<string[]>(DEMO_PROFILE.interests ?? []);
  const toggle = (t: string) =>
    setInterests((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

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
            <input className="input" style={{ marginTop: 18, fontSize: 15 }} defaultValue={VOICE.oneLiner} />
          </PromptCard>
          <PromptCard>
            <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>Something you&apos;ve built that represents how you work.</div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>We learn your voice from this — not your topic.</div>
            <textarea className="input" style={{ marginTop: 18, minHeight: 92, resize: "vertical", lineHeight: 1.55 }} defaultValue={VOICE.proudProject} />
          </PromptCard>
          <PromptCard>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>What would you try outside your usual lane?</div>
              <span className="mono" style={{ fontSize: 11, color: "var(--faint2)" }}>optional</span>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>Helps us surface stretch matches.</div>
            <input className="input input-dashed" style={{ marginTop: 18, fontSize: 15 }} placeholder="e.g. fintech, climate, devtools…" />
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
            <textarea className="input" style={{ marginTop: 18, border: "1px solid var(--teal-border)", background: "#FBFCFB", minHeight: 150, resize: "vertical", lineHeight: 1.6 }} placeholder="Paste a personal statement, blog post, essay, or detailed README…" />
            <div className="mono" style={{ fontSize: 11.5, color: "#A39E97", marginTop: 8 }}>0 words · aim for 150+</div>
          </PromptCard>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(246,244,241,0.92)", borderTop: "1px solid #E5E0D9", backdropFilter: "blur(6px)" }}>
        <div style={{ width: 580, maxWidth: "100%", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/onboarding/basics" className="btn-ghost">Back</Link>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Link href="/" className="btn-ghost">Skip voice step</Link>
            <Link href="/" className="btn btn-primary">Save &amp; find hackathons</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
