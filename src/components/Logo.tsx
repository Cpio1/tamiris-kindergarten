type LogoMarkProps = { className?: string; inverted?: boolean };

/** Brand sign: a rising sun between two sprouting leaves. */
export function LogoMark({ className, inverted = false }: LogoMarkProps) {
  const ground = inverted ? "#FBF4E8" : "#406F4F";
  const leaf = inverted ? "#406F4F" : "#FFF9F0";
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable={false}>
      <path d="M24 3c12 0 21 8.6 21 20.6C45 36 35.4 45 23.6 45 11.8 45 3 36.4 3 24.6 3 12.4 12 3 24 3Z" fill={ground} />
      <g fill="#D7B978">
        <rect x="22.6" y="8" width="2.8" height="5" rx="1.4" />
        <rect x="22.6" y="8" width="2.8" height="5" rx="1.4" transform="rotate(-45 24 21)" />
        <rect x="22.6" y="8" width="2.8" height="5" rx="1.4" transform="rotate(45 24 21)" />
      </g>
      <circle cx="24" cy="21" r="5.2" fill="#D7B978" />
      <path d="M24 38c0-6 0-9 0-12" stroke={leaf} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M24 33c-1.5-5-6-7.6-11-7.2 1 5 5.4 8 11 7.2Z" fill={leaf} />
      <path d="M24 33c1.5-5 6-7.6 11-7.2-1 5-5.4 8-11 7.2Z" fill={leaf} opacity="0.85" />
    </svg>
  );
}

type LogoProps = { subtitle?: string; inverted?: boolean; className?: string };

export function Logo({ subtitle, inverted = false, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0" inverted={inverted} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-sans text-[1.15rem] font-extrabold tracking-[0.16em] ${inverted ? "text-cream" : "text-forest"}`}
        >
          ТАМИРИС
        </span>
        {subtitle && (
          <span className={`mt-1 text-[0.7rem] font-semibold tracking-wide ${inverted ? "text-cream/70" : "text-ink-soft"}`}>
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
}
