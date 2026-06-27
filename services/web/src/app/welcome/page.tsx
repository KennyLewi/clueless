"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bird } from "@/components/icons";
import { api } from "@/lib/api";
import { setSession } from "@/lib/session";

type Mode = "signin" | "signup";

export default function WelcomePage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError("What should we call you?");
      return;
    }
    setBusy(true);
    try {
      const result =
        mode === "signup"
          ? await api.signup(name.trim(), email.trim(), password)
          : await api.login(email.trim(), password);
      setSession({ userId: result.userId, name: result.name, email: result.email });
      // New accounts go through onboarding; returning users land on the feed.
      router.push(mode === "signup" ? "/onboarding/connect" : "/");
    } catch (e) {
      setError(
        mode === "signup"
          ? "Couldn't create your account — that email may already be registered."
          : "Invalid email or password.",
      );
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ width: 400, padding: "38px 36px", boxShadow: "0 2px 10px rgba(0,0,0,.04)", borderRadius: 20 }}>
        <div className="brand" style={{ padding: 0, marginBottom: 26 }}>
          <Bird size={26} />
          <span style={{ fontSize: 20 }}>EarlyBirds</span>
        </div>
        <div style={{ fontWeight: 700, fontSize: 23, letterSpacing: "-0.01em" }}>Catch the worm first.</div>
        <div style={{ fontSize: 14.5, color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>
          {mode === "signup"
            ? "Create an account and let the agent register you for the events that fit — before the deadlines pass."
            : "Welcome back. Sign in to pick up where the agent left off."}
        </div>

        {mode === "signup" && (
          <>
            <label className="label" style={{ margin: "24px 0 7px" }}>Name</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Maya Chen"
            />
          </>
        )}

        <label className="label" style={{ margin: mode === "signup" ? "16px 0 7px" : "24px 0 7px" }}>Email</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@school.edu"
        />

        <label className="label" style={{ margin: "16px 0 7px" }}>Password</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={mode === "signup" ? "At least 6 characters" : "••••••••"}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />

        {error && (
          <div style={{ fontSize: 13, color: "var(--red-text)", marginTop: 12, lineHeight: 1.45 }}>{error}</div>
        )}

        <button
          className="btn btn-primary"
          style={{ width: "100%", marginTop: 18, padding: 13, opacity: busy ? 0.6 : 1 }}
          onClick={submit}
          disabled={busy}
        >
          {busy ? "One moment…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>

        <div style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", marginTop: 18 }}>
          {mode === "signup" ? "Already have an account?" : "New to EarlyBirds?"}{" "}
          <button
            className="btn-ghost"
            style={{ color: "var(--teal-fill)", fontWeight: 600, fontSize: 13 }}
            onClick={() => {
              setMode(mode === "signup" ? "signin" : "signup");
              setError(null);
            }}
          >
            {mode === "signup" ? "Sign in" : "Create one"}
          </button>
        </div>

        <div style={{ textAlign: "center", fontSize: 12.5, color: "var(--faint2)", marginTop: 22, lineHeight: 1.5 }}>
          We never submit anything without your confirmation.
        </div>
      </div>
    </div>
  );
}
