"use client";

import { motion, useReducedMotion } from "motion/react";
import { Baby, Clock3, Languages, UsersRound, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Cloud, Flower, Leaf, Star, WaveEdge } from "./decor/Decorations";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type CardStyle = {
  icon: LucideIcon;
  span: string;
  shape: string;
  surface: string;
  badge: string;
  badgeShape: string;
  value: string;
  label: string;
  accent?: "flower" | "leaf" | "star";
};

// Each card gets its own silhouette and tone so the grid reads like a composition, not a table.
const CARD_STYLES: CardStyle[] = [
  {
    icon: Baby,
    span: "sm:col-span-1 lg:col-span-2",
    shape: "rounded-[2.5rem_1.25rem_2.5rem_1.25rem]",
    surface: "bg-cream",
    badge: "bg-mint text-forest",
    badgeShape: "shape-blob",
    value: "text-forest",
    label: "text-ink-soft",
    accent: "star",
  },
  {
    icon: UsersRound,
    span: "sm:col-span-1 lg:col-span-2",
    shape: "rounded-[1.25rem_2.5rem_1.25rem_2.5rem]",
    surface: "bg-forest",
    badge: "bg-cream/15 text-cream",
    badgeShape: "shape-pebble",
    value: "text-cream",
    label: "text-cream/80",
    accent: "leaf",
  },
  {
    icon: Clock3,
    span: "sm:col-span-2 lg:col-span-2",
    shape: "rounded-[2.5rem_2.5rem_1.25rem_2.5rem]",
    surface: "bg-cream",
    badge: "bg-honey-soft text-forest",
    badgeShape: "shape-pebble",
    value: "text-forest",
    label: "text-ink-soft",
  },
  {
    icon: Languages,
    span: "sm:col-span-1 lg:col-span-3",
    shape: "rounded-[1.25rem_2.75rem_2.75rem_2.75rem]",
    surface: "bg-honey-soft",
    badge: "bg-cream text-forest",
    badgeShape: "shape-blob",
    value: "text-forest",
    label: "text-ink-soft",
    accent: "flower",
  },
  {
    icon: UtensilsCrossed,
    span: "sm:col-span-1 lg:col-span-3",
    shape: "rounded-[2.75rem_1.25rem_2.75rem_2.75rem]",
    surface: "bg-cream",
    badge: "bg-leaf text-cream",
    badgeShape: "shape-pebble",
    value: "text-forest",
    label: "text-ink-soft",
  },
];

export function Info() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="info" aria-labelledby="info-title" className="relative bg-mint">
      <WaveEdge className="absolute top-px left-0 z-10 h-8 w-full -translate-y-full sm:h-12" />
      <div className="section">
        <Cloud aria-hidden className="animate-float-slow pointer-events-none absolute top-16 left-[4%] hidden w-32 lg:block" />
        <Star aria-hidden className="pointer-events-none absolute top-24 right-[10%] w-6" />

        <div className="container-site">
          <Reveal>
            <SectionHeading id="info-title" eyebrow={t.info.eyebrow} title={t.info.title} description={t.info.description} />
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
            {t.info.cards.map((card, i) => {
              const style = CARD_STYLES[i];
              const Icon = style.icon;
              const wide = i >= 3;
              return (
                <motion.li
                  key={i}
                  className={style.span}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.6, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <article
                    className={`group relative flex h-full overflow-hidden p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7 ${style.shape} ${style.surface} ${
                      wide ? "items-center gap-5" : "items-center gap-5 lg:flex-col lg:items-start lg:gap-6"
                    }`}
                  >
                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${style.badge} ${style.badgeShape}`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                    </span>
                    <div className="relative">
                      <h3 className={`text-[1.6rem] leading-tight font-semibold ${style.value}`}>{card.value}</h3>
                      <p className={`mt-1 text-[0.95rem] font-semibold ${style.label}`}>{card.label}</p>
                    </div>

                    {style.accent === "leaf" && (
                      <Leaf aria-hidden tone="mint" className="absolute -right-3 -bottom-5 w-14 rotate-[-35deg] opacity-25" />
                    )}
                    {style.accent === "flower" && (
                      <Flower aria-hidden className="absolute -top-3 -right-3 w-16 opacity-80 transition-transform duration-700 group-hover:rotate-45" />
                    )}
                    {style.accent === "star" && (
                      <Star aria-hidden className="absolute top-6 right-6 w-4 opacity-80" />
                    )}
                  </article>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
      <WaveEdge className="absolute bottom-px left-0 z-10 h-8 w-full translate-y-full sm:h-12" flip />
    </section>
  );
}
