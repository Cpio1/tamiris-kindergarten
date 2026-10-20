import { Sprig } from "@shared/ui/Decorations";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "default" | "light";
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, description, tone = "default", className = "" }: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div className={className}>
      <p className={`m-eyebrow ${light ? "text-honey" : ""}`}>
        <Sprig className="h-3.5 w-3" />
        {eyebrow}
      </p>
      <h2 id={id} className={`m-title ${light ? "text-cream" : ""}`}>
        {title}
      </h2>
      {description && <p className={`mt-1.5 m-lead ${light ? "text-cream/85" : ""}`}>{description}</p>}
    </div>
  );
}
