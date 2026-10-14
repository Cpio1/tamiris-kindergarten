import { Sprig } from "./decor/Decorations";

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
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <p
        className={`inline-flex items-center gap-2 text-sm font-bold ${light ? "text-honey" : "text-forest/80"} ${centered ? "justify-center" : ""}`}
      >
        <Sprig className="h-5 w-4" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 text-[1.9rem] leading-[1.15] font-semibold sm:text-[2.35rem] ${light ? "text-cream" : "text-forest"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-[1.02rem] ${light ? "text-cream/90" : "text-ink-soft"}`}>{description}</p>
      )}
    </div>
  );
}
