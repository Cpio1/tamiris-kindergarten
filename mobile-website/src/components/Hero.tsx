"use client";

import { ArrowDown, Phone } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@shared/config/site";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import type { SiteImage } from "@shared/lib/images";
import { Flower, Leaf, Sprig, Star, Sun, WaveEdge } from "@shared/ui/Decorations";
import { PhotoPlaceholder } from "@shared/ui/PhotoPlaceholder";
import { scrollToSection } from "./nav";

export function Hero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  // Keep the photo's own proportions within gentle limits, so faces stay in frame.
  const ratio = image ? Math.min(Math.max(image.width / image.height, 0.85), 1.4) : 1.2;
  // The photo shrinks on short phones so the stats and buttons stay on the first screen.
  const width = `min(100%, 21.5rem, max(13rem, calc((100svh - 26.5rem) * ${ratio.toFixed(3)})))`;

  return (
    <section id="home" aria-labelledby="hero-title" className="relative -mt-14 overflow-x-clip pt-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-mint via-milk to-milk" />
      <div aria-hidden className="m-shape-pebble pointer-events-none absolute top-24 -right-16 h-48 w-44 bg-mint/80" />

      <div className="m-container relative pt-3 pb-4">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-leaf/30 bg-cream/85 py-0.5 pr-3 pl-1 text-[0.72rem] font-bold text-forest">
          <span className="grid size-5 place-items-center rounded-full bg-mint">
            <Star className="size-2.5" />
          </span>
          {t.hero.eyebrow}
        </p>

        <h1 id="hero-title" className="mt-2.5 text-[clamp(1.45rem,7vw,1.8rem)] leading-[1.15] font-semibold text-ink">
          <span className="relative inline-block text-forest italic">
            {t.hero.titleBrand}
            <svg aria-hidden viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-2 w-full">
              <path d="M3 9c40-6 90-8 194-3" stroke="#D7B978" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
          </span>{" "}
          {t.hero.titleRest}
        </h1>

        <p className="mt-2.5 max-w-[21rem] m-lead">{t.hero.description}</p>

        {/* Photo: shifted right, with a leaf-green backing peeking out on the left. */}
        <div className="relative mt-5 ml-auto" style={{ width, aspectRatio: ratio }}>
          <div aria-hidden className="m-shape-hero absolute inset-0 -translate-x-[5%] translate-y-[5%] -rotate-3 bg-leaf/45" />
          <div aria-hidden className="absolute -top-[9%] -left-[3%] w-[13%]">
            <Sun className="w-full" />
          </div>
          <Leaf aria-hidden className="absolute -bottom-[4%] -left-[7%] z-10 w-[7%] -rotate-12" />
          <Flower aria-hidden className="absolute -top-[5%] right-[16%] z-10 w-[8%]" />
          <Star aria-hidden className="absolute top-[42%] -left-[9%] w-[4%]" color="#7FAA76" />

          <div className="m-shape-hero relative size-full overflow-hidden border-4 border-cream bg-mint shadow-lift">
            {image ? (
              <Image
                src={image.src}
                alt={t.hero.photoAlt}
                fill
                priority
                quality={75}
                sizes="(max-width: 480px) 88vw, 344px"
                className="object-cover"
              />
            ) : (
              <PhotoPlaceholder label={t.hero.placeholder} />
            )}
          </div>

          <p className="absolute -bottom-3 left-[8%] z-10 inline-flex items-center gap-1 rounded-full bg-cream py-0.5 pr-2.5 pl-0.5 text-[0.7rem] font-bold text-forest shadow-soft">
            <span className="grid size-5 place-items-center rounded-full bg-mint">
              <Sprig className="h-3 w-2.5" />
            </span>
            {siteConfig.hours}
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-3 rounded-[1.1rem_1.1rem_1.1rem_0.4rem] border border-forest/10 bg-cream py-2 shadow-soft">
          {t.hero.stats.map((stat, i) => (
            <div key={stat.label} className={`flex flex-col items-center px-1 text-center ${i > 0 ? "border-l border-dashed border-forest/20" : ""}`}>
              <dt className="order-2 text-[0.68rem] leading-tight font-semibold text-ink-soft">{stat.label}</dt>
              <dd className="order-1 font-display text-[1.15rem] leading-tight font-semibold text-forest">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href={siteConfig.phones[0].href} className="m-btn m-btn-primary">
            <Phone className="size-4" aria-hidden />
            {t.contacts.call}
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
            className="m-btn m-btn-ghost"
          >
            {t.hero.primary}
            <ArrowDown className="size-4" aria-hidden />
          </a>
        </div>
      </div>

      <WaveEdge fill="#FFF9F0" className="relative block h-5 w-full" />
    </section>
  );
}
