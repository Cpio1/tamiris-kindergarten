import type { SVGProps } from "react";

type DecorProps = SVGProps<SVGSVGElement>;

const base = { "aria-hidden": true, focusable: false } as const;

/** Soft sun with rounded rays. */
export function Sun({ className, ...props }: DecorProps) {
  const rays = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <svg viewBox="0 0 120 120" className={className} {...base} {...props}>
      <g fill="#D7B978">
        {rays.map((deg) => (
          <rect key={deg} x="56" y="6" width="8" height="20" rx="4" transform={`rotate(${deg} 60 60)`} opacity="0.85" />
        ))}
      </g>
      <circle cx="60" cy="60" r="27" fill="#E8CF97" />
      <circle cx="60" cy="60" r="27" fill="none" stroke="#D7B978" strokeWidth="3" />
      <path d="M50 64c3 5 17 5 20 0" fill="none" stroke="#406F4F" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <circle cx="51" cy="55" r="2.6" fill="#406F4F" opacity="0.55" />
      <circle cx="69" cy="55" r="2.6" fill="#406F4F" opacity="0.55" />
    </svg>
  );
}

/** Simple leaf with central vein. */
export function Leaf({ className, tone = "leaf", ...props }: DecorProps & { tone?: "leaf" | "forest" | "mint" }) {
  const fill = tone === "forest" ? "#406F4F" : tone === "mint" ? "#CFE0C7" : "#7FAA76";
  return (
    <svg viewBox="0 0 60 90" className={className} {...base} {...props}>
      <path d="M30 4C52 22 56 52 30 86 4 52 8 22 30 4Z" fill={fill} />
      <path d="M30 18v62M30 40l-9-8M30 54l10-9M30 66l-8-7" stroke="#FFF9F0" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" fill="none" />
    </svg>
  );
}

/** Small sprig — stem with leaves. */
export function Sprig({ className, ...props }: DecorProps) {
  return (
    <svg viewBox="0 0 80 120" className={className} {...base} {...props}>
      <path d="M40 116C40 80 38 50 46 8" stroke="#406F4F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M41 82C26 80 16 70 14 56c14 1 25 10 27 26Z" fill="#7FAA76" />
      <path d="M42 62c14-3 24-13 26-27-14 2-24 11-26 27Z" fill="#7FAA76" opacity="0.85" />
      <path d="M43 38C32 33 27 24 28 12c10 4 16 13 15 26Z" fill="#9DBF94" />
      <path d="M45 22c7-5 10-11 9-18-7 3-10 9-9 18Z" fill="#9DBF94" />
    </svg>
  );
}

/** Five-petal flower. */
export function Flower({ className, petal = "#FFF9F0", center = "#D7B978", ...props }: DecorProps & { petal?: string; center?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} {...base} {...props}>
      <g fill={petal} stroke="#E3D3B0" strokeWidth="1.2">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="30" cy="15" rx="9" ry="13" transform={`rotate(${deg} 30 30)`} />
        ))}
      </g>
      <circle cx="30" cy="30" r="7.5" fill={center} />
    </svg>
  );
}

/** Soft abstract cloud. */
export function Cloud({ className, ...props }: DecorProps) {
  return (
    <svg viewBox="0 0 140 70" className={className} {...base} {...props}>
      <path
        d="M30 62c-14 0-24-9-24-21s10-20 22-20c3-11 13-18 25-18 12 0 22 7 26 17 3-1 6-2 9-2 13 0 24 10 24 22 0 1 0 2-.2 3C122 45 132 52 132 60c0 1 0 2-.4 2H30Z"
        fill="#FFF9F0"
      />
    </svg>
  );
}

/** Rounded four-point sparkle. */
export function Star({ className, color = "#D7B978", ...props }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base} {...props}>
      <path d="M20 2c1.8 9.6 8.4 16.2 18 18-9.6 1.8-16.2 8.4-18 18-1.8-9.6-8.4-16.2-18-18 9.6-1.8 16.2-8.4 18-18Z" fill={color} />
    </svg>
  );
}

/** Hand-drawn style looping line. */
export function Squiggle({ className, color = "#7FAA76", ...props }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 160 40" className={className} fill="none" {...base} {...props}>
      <path
        d="M4 28c14-20 26-20 30 0s18 18 30-2 26-20 32 0 20 18 30-4 18-16 30-6"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Dashed arc, used around photos. */
export function DashedArc({ className, color = "#7FAA76", ...props }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" {...base} {...props}>
      <path d="M20 150A90 90 0 0 1 150 26" stroke={color} strokeWidth="2.4" strokeDasharray="2 9" strokeLinecap="round" />
    </svg>
  );
}

/** Wavy edge between sections. `flip` puts the wave on the bottom side. */
export function WaveEdge({ className, fill = "#E7F0E2", flip = false }: { className?: string; fill?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      {...base}
    >
      <path d="M0 60V32c120-22 240-30 360-18s240 34 360 30 240-34 360-38 240 10 360 26V60H0Z" fill={fill} />
    </svg>
  );
}
