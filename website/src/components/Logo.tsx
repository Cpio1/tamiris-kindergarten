import { LogoMark } from "@shared/ui/LogoMark";

type LogoProps = { subtitle?: string; inverted?: boolean; className?: string };

export function Logo({ subtitle, inverted = false, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" inverted={inverted} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-sans text-[1rem] font-extrabold tracking-[0.16em] ${inverted ? "text-cream" : "text-forest"}`}
        >
          ТАМИРИС
        </span>
        {subtitle && (
          <span className={`mt-0.5 text-[0.64rem] font-semibold tracking-wide ${inverted ? "text-cream/70" : "text-ink-soft"}`}>
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
}
