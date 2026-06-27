import { NOTIFS, NOTIF_COLOR } from "@/lib/mock-data";

export default function NotificationsPage() {
  return (
    <div className="wrap wrap-narrow">
      <h1 className="page-title">Notifications</h1>
      <div className="page-sub">Activity from your agent.</div>
      <div className="card" style={{ marginTop: 22, overflow: "hidden" }}>
        {NOTIFS.map((n, i) => (
          <div key={i} style={{ display: "flex", gap: 13, padding: "16px 20px", borderBottom: "1px solid #F2EFEA" }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", marginTop: 6, flexShrink: 0, background: NOTIF_COLOR[n.type] ?? "var(--faint)" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, lineHeight: 1.45 }}>{n.text}</div>
              <div className="mono" style={{ fontSize: 11.5, color: "#A39E97", marginTop: 4 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
