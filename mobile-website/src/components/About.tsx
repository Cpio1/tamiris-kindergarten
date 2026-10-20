"use client";

import { Languages } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import type { SiteImage } from "@shared/lib/images";
import { Flower, Leaf, Squiggle, Star } from "@shared/ui/Decorations";
import { PhotoPlaceholder } from "@shared/ui/PhotoPlaceholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Portrait photos would take the whole screen at full width — cap their height. */
const MAX_PORTRAIT_HEIGHT_REM = 22;

export function About({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const ratio = image ? image.width / image.height : 4 / 3;
  const wide = ratio >= 1.2;
  const [lead, ...rest] = t.about.paragraphs;

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-x-clip bg-cream pt-5 pb-9">
      <Leaf aria-hidden tone="mint" className="pointer-events-none absolute top-4 right-3 w-6 rotate-[25deg]" />

      <div className="m-container">
        <Reveal>
          <SectionHeading id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} />
          <p className="mt-1.5 font-display text-[0.95rem] leading-snug text-forest italic">{t.about.subtitle}</p>
        </Reveal>

        {/*
         * The whole photo is visible: the frame takes the photo's own proportions
         * and the image is object-contain. Wide photos bleed to the right screen edge.
         */}
        <Reveal
          className={`relative mt-5 ${wide ? "-mr-4 ml-3" : "ml-auto"}`}
        >
          <div
            className="relative"
            style={wide ? { aspectRatio: ratio } : { aspectRatio: ratio, width: `min(100%, ${(MAX_PORTRAIT_HEIGHT_REM * ratio).toFixed(2)}rem)`, marginLeft: "auto" }}
          >
            <div aria-hidden className={`absolute -bottom-2.5 -left-3 h-[82%] w-[70%] bg-mint ${wide ? "rounded-[1.6rem_0.5rem_0.5rem_1.6rem]" : "m-shape-leaf"}`} />
            <div aria-hidden className="m-shape-pebble absolute -top-3 right-[14%] h-8 w-12 bg-honey-soft" />
            <div
              className={`relative size-full overflow-hidden bg-milk shadow-lift ${
                wide ? "rounded-[1.6rem_0_0_0.5rem]" : "rounded-[1.6rem_0.5rem_1.6rem_1.6rem]"
              }`}
            >
              {image ? (
                <Image
                  src={image.src}
                  alt={t.about.photoAlt}
                  fill
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 480px) 96vw, 460px"
                  className="object-contain"
                />
              ) : (
                <PhotoPlaceholder label={t.about.placeholder} />
              )}
            </div>
            <Flower aria-hidden className="absolute -bottom-3 left-[38%] w-7" />
            <Star aria-hidden className="absolute -top-2 left-2 w-3.5" color="#7FAA76" />
          </div>
        </Reveal>

        <Reveal className="mt-7 grid grid-cols-[auto_1fr] gap-x-3">
          <Squiggle aria-hidden className="mt-2 w-9" color="#D7B978" />
          <p className="text-[0.92rem] leading-[1.55] font-semibold text-ink">{lead}</p>
        </Reveal>

        <div className="mt-3 space-y-2.5 pl-12">
          {rest.map((paragraph, i) => (
            <Reveal key={i} delay={60 * (i + 1)}>
              <p className="m-lead">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4 pl-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-mint py-1 pr-3.5 pl-1 text-[0.75rem] font-bold text-forest">
            <span className="grid size-6 place-items-center rounded-full bg-forest text-cream">
              <Languages className="size-3.5" aria-hidden />
            </span>
            {t.about.badge}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
