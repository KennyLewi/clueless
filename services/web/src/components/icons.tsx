type IconProps = { size?: number; className?: string };

export function Bird({ size = 24, color = "#0F6E56" }: IconProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path
        d="M4 18 L14 6 L14 11 L24 18"
        stroke={color}
        strokeWidth={2.4}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

const base = (size = 19) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none" });

export const IconDiscover = ({ size }: IconProps) => (
  <svg {...base(size)} stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
    <path d="M4 6h16M4 12h16M4 18h10" />
  </svg>
);
export const IconSaved = ({ size }: IconProps) => (
  <svg {...base(size)} stroke="currentColor" strokeWidth={1.9} strokeLinejoin="round">
    <path d="M6 4h12v16l-6-4-6 4z" />
  </svg>
);
export const IconRegs = ({ size }: IconProps) => (
  <svg {...base(size)} stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </svg>
);
export const IconNotif = ({ size }: IconProps) => (
  <svg {...base(size)} stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);
export const IconProfile = ({ size }: IconProps) => (
  <svg {...base(size)} stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
  </svg>
);
export const IconSettings = ({ size }: IconProps) => (
  <svg {...base(size)} stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
    <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
    <circle cx="16" cy="7" r="2.3" />
    <circle cx="8" cy="17" r="2.3" />
  </svg>
);
export const IconSearch = ({ size = 17 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#A39E97" strokeWidth={2}
    style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4-4" strokeLinecap="round" />
  </svg>
);
export const IconCheck = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M3 8.5 L6.5 12 L13 4" stroke="#1D9E75" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconBookmark = ({ on, size = 15 }: IconProps & { on?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={on ? "#0F6E56" : "none"}
    stroke={on ? "#0F6E56" : "#97918A"} strokeWidth={1.8} strokeLinejoin="round">
    <path d="M6 4h12v16l-6-4-6 4z" />
  </svg>
);
export const IconLock = ({ size = 14 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="9" rx="2" stroke="#97918A" strokeWidth={2} />
    <path d="M8 11 V8 a4 4 0 0 1 8 0 V11" stroke="#97918A" strokeWidth={2} />
  </svg>
);
export const IconShield = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3 L20 6 V11 C20 16 16 20 12 21 C8 20 4 16 4 11 V6 Z" stroke="#0F6E56" strokeWidth={2} strokeLinejoin="round" />
    <path d="M9 12 L11.5 14.5 L15.5 9.5" stroke="#0F6E56" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Spinner = ({ size = 12, color = "#0F6E56" }: IconProps & { color?: string }) => (
  <span
    className="spin"
    style={{
      width: size,
      height: size,
      border: `2px solid #BBD8CC`,
      borderTopColor: color,
      borderRadius: "50%",
      display: "inline-block",
    }}
  />
);
