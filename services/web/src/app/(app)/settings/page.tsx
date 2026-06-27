"use client";

import { useState } from "react";
import { SETTING_DEFS, CONN_DEFS } from "@/lib/mock-data";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(SETTING_DEFS.map((s) => [s.key, s.on])),
  );
  const [connected, setConnected] = useState<Record<string, boolean>>(
    Object.fromEntries(CONN_DEFS.map((c) => [c.key, c.on])),
  );

  return (
    <div className="wrap wrap-narrow">
      <h1 className="page-title">Settings</h1>
      <div className="page-sub">Control how the agent works on your behalf.</div>

      <div className="card" style={{ padding: "8px 24px", marginTop: 22 }}>
        <div className="section-label" style={{ padding: "18px 0 4px" }}>AUTOFILL PREFERENCES</div>
        {SETTING_DEFS.map((x) => {
          const on = settings[x.key];
          return (
            <div key={x.key} style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 0", borderTop: "1px solid #F2EFEA" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14.5, fontWeight: 500 }}>{x.label}</div>
                <div style={{ fontSize: 13, color: "var(--faint)", marginTop: 3, lineHeight: 1.45 }}>{x.desc}</div>
              </div>
              <button
                className="toggle-track"
                style={{ background: on ? "var(--teal-fill)" : "#D8D3CC" }}
                onClick={() => setSettings((s) => ({ ...s, [x.key]: !s[x.key] }))}
                aria-pressed={on}
              >
                <span className="toggle-knob" style={{ transform: `translateX(${on ? "18px" : "0px"})` }} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ padding: "8px 24px", marginTop: 16 }}>
        <div className="section-label" style={{ padding: "18px 0 4px" }}>CONNECTED ACCOUNTS</div>
        {CONN_DEFS.map((x) => {
          const on = connected[x.key];
          return (
            <div key={x.key} style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 0", borderTop: "1px solid #F2EFEA" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14.5, fontWeight: 500 }}>{x.name}</div>
                <div style={{ fontSize: 13, color: "var(--faint)", marginTop: 3 }}>{x.detail}</div>
              </div>
              <button
                onClick={() => setConnected((c) => ({ ...c, [x.key]: !c[x.key] }))}
                style={
                  on
                    ? { background: "var(--teal-tint2)", color: "var(--teal-fill)", border: "1px solid var(--teal-border)", padding: "7px 15px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" }
                    : { background: "var(--teal-fill)", color: "#fff", border: "none", padding: "7px 15px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" }
                }
              >
                {on ? "Connected" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ padding: "8px 24px", marginTop: 16 }}>
        <div className="section-label" style={{ padding: "18px 0 4px" }}>PRIVACY &amp; DATA</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 0", borderTop: "1px solid #F2EFEA" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 500 }}>Download my data</div>
            <div style={{ fontSize: 13, color: "var(--faint)", marginTop: 3 }}>Export everything EarlyBirds stores about you.</div>
          </div>
          <button className="btn btn-neutral btn-sm">Export</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 0", borderTop: "1px solid #F2EFEA" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 500, color: "var(--red-text)" }}>Delete account</div>
            <div style={{ fontSize: 13, color: "var(--faint)", marginTop: 3 }}>Permanently remove your profile and history.</div>
          </div>
          <button style={{ background: "none", border: "1px solid #E7CEC8", color: "var(--red-text)", padding: "7px 15px", borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}
