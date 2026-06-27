"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { DEMO_PROFILE } from "@/lib/mock-data";
import { initials } from "@/lib/format";
import {
  Bird,
  IconDiscover,
  IconNotif,
  IconProfile,
  IconRegs,
  IconSaved,
  IconSettings,
} from "./icons";

interface NavDef {
  href?: string;
  label: string;
  icon: ReactNode;
  match?: (path: string) => boolean;
}

const NAV: NavDef[] = [
  { href: "/", label: "Discover", icon: <IconDiscover />, match: (p) => p === "/" || p.startsWith("/events") },
  { href: "/saved", label: "Saved", icon: <IconSaved />, match: (p) => p.startsWith("/saved") },
  { href: "/registrations", label: "Registrations", icon: <IconRegs />, match: (p) => p.startsWith("/registrations") },
  { href: "/notifications", label: "Notifications", icon: <IconNotif />, match: (p) => p.startsWith("/notifications") },
  { href: "/profile", label: "Profile", icon: <IconProfile />, match: (p) => p.startsWith("/profile") },
  { href: "/settings", label: "Settings", icon: <IconSettings />, match: (p) => p.startsWith("/settings") },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <Bird size={24} />
          <span>EarlyBirds</span>
        </div>
        <nav className="nav">
          {NAV.map((item) => {
            const active = item.match?.(pathname) ?? false;
            const cls = `nav-item${active ? " active" : ""}`;
            if (item.href) {
              return (
                <Link key={item.label} href={item.href} className={cls}>
                  {item.icon}
                  {item.label}
                </Link>
              );
            }
            return (
              <button key={item.label} className={cls} title="Coming soon" style={{ opacity: 0.55 }}>
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="user-chip">
          <div className="avatar">{initials(DEMO_PROFILE.name)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>{DEMO_PROFILE.name}</div>
            <div style={{ fontSize: 12, color: "var(--faint2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {DEMO_PROFILE.email}
            </div>
          </div>
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
