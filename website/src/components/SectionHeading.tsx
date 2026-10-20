import { Sprig } from "@shared/ui/Decorations";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
};

export function SectionHeading({ id, eyebrow, title, description, align = "center", tone = "default" }: SectionHeadingProps) {
  const centered = align === "center";
  const light = tone === "light";
  return (
    <div className={`max-w-xl ${centered ? "mx-auto text-center" : ""}`}>
      <p
        className={`inline-flex items-center gap-1.5 text-[0.8rem] font-bold ${light ? "text-honey" : "text-forest/80"} ${centered ? "justify-center" : ""}`}
      >
        <Sprig className="h-4 w-3.5" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-2 text-[1.65rem] leading-[1.18] font-semibold sm:text-[1.9rem] ${light ? "text-cream" : "text-forest"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-2.5 text-[0.95rem] ${light ? "text-cream/90" : "text-ink-soft"}`}>{description}</p>
      )}
    </div>
  );
}
