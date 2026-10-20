"use client";

import { Baby, Clock3, Languages, UsersRound, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { Star, WaveEdge } from "@shared/ui/Decorations";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Tile = {
  icon: LucideIcon;
  /** "row" tiles span both columns and lay out horizontally. */
  layout: "tile" | "row";
  surface: string;
  badge: string;
  value: string;
  label: string;
  shape: string;
};

// Same order as t.info.cards: age, groups, hours, language, meals.
const TILES: Tile[] = [
  {
    icon: Baby,
    layout: "tile",
    surface: "bg-cream",
    badge: "bg-mint text-forest",
    value: "text-forest",
    label: "text-ink-soft",
    shape: "rounded-[1.4rem_0.6rem_1.4rem_1.4rem]",
  },
  {
    icon: UsersRound,
    layout: "tile",
    surface: "bg-forest",
    badge: "bg-cream/15 text-cream",
    value: "text-cream",
    label: "text-cream/80",
    shape: "rounded-[0.6rem_1.4rem_1.4rem_1.4rem]",
  },
  {
    icon: Clock3,
    layout: "row",
    surface: "bg-honey-soft",
    badge: "bg-cream text-forest",
    value: "text-forest",
    label: "text-ink-soft",
    shape: "rounded-[1.4rem_1.4rem_1.4rem_0.6rem]",
  },
  {
    icon: Languages,
    layout: "tile",
    surface: "bg-cream",
    badge: "bg-leaf text-cream",
    value: "text-forest",
    label: "text-ink-soft",
    shape: "rounded-[1.4rem_1.4rem_0.6rem_1.4rem]",
  },
  {
    icon: UtensilsCrossed,
    layout: "tile",
    surface: "bg-cream",
    badge: "bg-honey-soft text-forest",
    value: "text-forest",
    label: "text-ink-soft",
    shape: "rounded-[1.4rem_1.4rem_1.4rem_0.6rem]",
  },
];

export function Info() {
  const { t } = useLanguage();

  return (
    <section id="info" aria-labelledby="info-title" className="relative bg-mint">
      <WaveEdge className="block h-5 w-full bg-cream" />
      <div className="m-container relative pt-4 pb-7">
        <Star aria-hidden className="pointer-events-none absolute top-5 right-6 w-3.5" />
        <Reveal>
          <SectionHeading id="info-title" eyebrow={t.info.eyebrow} title={t.info.title} description={t.info.description} />
        </Reveal>

        <ul className="mt-4 grid grid-cols-2 gap-2.5">
          {t.info.cards.map((card, i) => {
            const tile = TILES[i];
            const Icon = tile.icon;
            const row = tile.layout === "row";
            return (
              <li key={i} className={row ? "col-span-2" : undefined}>
                <Reveal delay={40 * i} className="h-full">
                  <article
                    className={`flex h-full p-3.5 shadow-soft ${tile.shape} ${tile.surface} ${
                      row ? "items-center gap-3" : "flex-col gap-2.5"
                    }`}
                  >
                    <span className={`m-shape-blob grid size-9 shrink-0 place-items-center ${tile.badge}`}>
                      <Icon className="size-[1.1rem]" strokeWidth={1.8} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className={`text-[1.1rem] leading-tight font-semibold ${tile.value}`}>{card.value}</h3>
                      <p className={`mt-0.5 text-[0.75rem] leading-snug font-semibold ${tile.label}`}>{card.label}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
      <WaveEdge flip className="block h-5 w-full bg-milk" />
    </section>
  );
}
