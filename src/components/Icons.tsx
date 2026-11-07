import type { ReactNode, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const I = (children: ReactNode) =>
  function Icon(p: P) {
    return (
      <svg {...base} aria-hidden="true" {...p}>
        {children}
      </svg>
    );
  };

export const Check = I(<path d="M4 12.5l5 5L20 6.5" />);
export const Plus = I(<path d="M12 4v16M4 12h16" />);
export const ArrowRight = I(<path d="M5 12h14M13 6l6 6-6 6" />);
export const ArrowUp = I(<path d="M12 19V5M6 11l6-6 6 6" />);
export const ArrowDown = I(<path d="M12 5v14M6 13l6 6 6-6" />);
export const ArrowUpRight = I(<path d="M7 17L17 7M8 7h9v9" />);
export const ArrowDownLeft = I(<path d="M17 7L7 17M16 17H7V8" />);
export const Home = I(<path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z" />);
export const Scan = I(<path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M4 12h16" />);
export const CardIc = I(<><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M3 10h18" /></>);
export const Trend = I(<path d="M3 17l6-6 4 4 8-8M15 7h6v6" />);
export const Eye = I(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>);
export const EyeOff = I(<><path d="M3 3l18 18M10.6 5.2A9.6 9.6 0 0112 5c6.5 0 10 7 10 7a17 17 0 01-3.2 4M6.5 6.7A17 17 0 002 12s3.5 7 10 7c1.7 0 3.2-.4 4.5-1" /><path d="M9.9 9.9a3 3 0 004.2 4.2" /></>);
export const Shield = I(<><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" /><path d="M8.5 12l2.6 2.6L15.8 10" /></>);
export const Bell = I(<path d="M6 16V11a6 6 0 1112 0v5l1.5 2h-15zM10 21h4" />);
export const Search = I(<><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.2-4.2" /></>);
export const Share = I(<path d="M12 15V4M8 8l4-4 4 4M5 13v6h14v-6" />);
export const Bolt = I(<path d="M13 3L5 14h6l-1 7 8-11h-6z" />);
export const Chevron = I(<path d="M6 9l6 6 6-6" />);
export const Back = I(<path d="M15 5l-7 7 7 7" />);
export const User = I(<><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0114 0" /></>);

/** Two-currency swap icon (arrows swap on reveal) */
export function SwapIcon(p: P) {
  return (
    <svg {...base} aria-hidden="true" {...p}>
      <g className="ic-a"><path d="M4 8h15M15 4l4 4-4 4" /></g>
      <g className="ic-b"><path d="M20 16H5M9 12l-4 4 4 4" /></g>
    </svg>
  );
}
/** Layers / pocket icon (drops in) */
export function LayersIcon(p: P) {
  return (
    <svg {...base} aria-hidden="true" {...p}>
      <g className="ic-layers"><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></g>
    </svg>
  );
}
/** Lock icon (shackle closes) */
export function LockIcon(p: P) {
  return (
    <svg {...base} aria-hidden="true" {...p}>
      <rect x="5" y="11" width="14" height="9" rx="2.5" />
      <path className="ic-shackle" d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  );
}
/** Face ID glyph for the security tile (corner brackets draw in) */
export function FaceGlyph(p: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <g stroke="#fff">
        <path className="br" d="M8 22V12a4 4 0 014-4h10" />
        <path className="br" d="M42 8h10a4 4 0 014 4v10" />
        <path className="br" d="M56 42v10a4 4 0 01-4 4H42" />
        <path className="br" d="M22 56H12a4 4 0 01-4-4V42" />
        <path className="fc" d="M24 25v5M40 25v5M32 27v8h-3M23 43c5 5 13 5 18 0" />
      </g>
    </svg>
  );
}
