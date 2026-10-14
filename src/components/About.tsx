"use client";

import Image from "next/image";
import { Languages } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { Flower, Leaf, Sprig, Squiggle, Star, Sun } from "./decor/Decorations";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const MAX_PHOTO_HEIGHT = 540;
const PANORAMA_RATIO = 1.6;

type Dictionary = ReturnType<typeof useLanguage>["t"];

function Intro({ t }: { t: Dictionary }) {
  return (
    <Reveal>
      <SectionHeading id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} align="left" />
      <p className="mt-4 font-display text-[1.18rem] text-forest italic">{t.about.subtitle}</p>
      <Squiggle className="mt-4 w-28" color="#D7B978" />
    </Reveal>
  );
}

function Paragraphs({ t }: { t: Dictionary }) {
  return (
    <div className="space-y-4 text-[1.02rem] text-ink-soft">
      {t.about.paragraphs.map((paragraph, i) => (
        <Reveal key={i} delay={0.08 * i}>
          <p className={i === 0 ? "text-[1.08rem] font-semibold text-ink" : undefined}>{paragraph}</p>
        </Reveal>
      ))}
    </div>
  );
}

function Badge({ t }: { t: Dictionary }) {
  return (
    <p className="inline-flex items-center gap-3 rounded-full bg-mint py-2 pr-5 pl-2 text-sm font-bold text-forest">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-cream">
        <Languages className="h-4.5 w-4.5" aria-hidden />
      </span>
      {t.about.badge}
    </p>
  );
}

function Photo({ image, alt, placeholder, className, sizes }: { image: SiteImage | null; alt: string; placeholder: string; className: string; sizes: string }) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-milk shadow-lift ${className}`}>
      {image ? (
        // object-contain + a frame with the photo's own ratio = the whole photo is visible, nothing cropped.
        <Image src={image.src} alt={alt} fill loading="lazy" quality={80} sizes={sizes} className="object-contain" />
      ) : (
        <PhotoPlaceholder label={placeholder} />
      )}
    </div>
  );
}

export function About({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const ratio = image ? image.width / image.height : 4 / 5;
  const portrait = ratio < 1;

  if (ratio >= PANORAMA_RATIO) {
    // Wide panoramic photo: text on top, photo across the full container width.
    return (
      <section id="about" aria-labelledby="about-title" className="section bg-cream">
        <Leaf tone="mint" aria-hidden className="pointer-events-none absolute top-10 right-[6%] hidden w-14 rotate-[25deg] lg:block" />

        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Intro t={t} />
              <Reveal delay={0.2} className="mt-7 hidden lg:block">
                <Badge t={t} />
              </Reveal>
            </div>
            <div className="lg:pt-10">
              <Paragraphs t={t} />
              <Reveal delay={0.2} className="mt-7 lg:hidden">
                <Badge t={t} />
              </Reveal>
            </div>
          </div>

          <Reveal className="relative mx-auto mt-14 max-w-[64rem] px-2 sm:mt-16 sm:px-4">
            <div className="relative w-full" style={{ aspectRatio: ratio }}>
              <div aria-hidden className="absolute -inset-2.5 rounded-[2.5rem_1.25rem_2.5rem_1.25rem] bg-mint sm:-inset-4 sm:rounded-[5rem_2rem_5rem_2rem]" />
              <div aria-hidden className="shape-leaf absolute -right-3 -bottom-4 h-3/4 w-1/3 bg-leaf/25 sm:-right-6 sm:-bottom-6" />
              <div aria-hidden className="shape-pebble absolute -top-6 -left-4 h-1/2 w-1/4 bg-honey-soft sm:-top-9 sm:-left-8" />
              <Photo
                image={image}
                alt={t.about.photoAlt}
                placeholder={t.about.placeholder}
                className="rounded-[1.75rem_0.75rem_1.75rem_0.75rem] sm:rounded-[3.25rem_1.25rem_3.25rem_1.25rem]"
                sizes="(min-width: 1080px) 1000px, 94vw"
              />
              <Sun className="animate-spin-slow absolute -top-[16%] -right-[3%] w-[11%] sm:-top-[14%]" />
              <Flower className="animate-float absolute -bottom-[9%] left-[8%] w-[6%]" />
              <Star className="absolute top-[30%] -left-[3.5%] w-[2.6%]" color="#7FAA76" />
              <Sprig className="absolute -right-[4%] bottom-[18%] hidden w-[4.5%] sm:block" />
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="about" aria-labelledby="about-title" className="section bg-cream">
      <Leaf tone="mint" aria-hidden className="pointer-events-none absolute top-10 right-[6%] hidden w-14 rotate-[25deg] lg:block" />

      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Photo — shown in full (object-contain) inside a frame that follows its proportions */}
        <Reveal className={`relative order-2 mx-auto w-full lg:order-1 ${portrait ? "pt-[30%]" : ""}`}>
          <div
            className="@container relative mx-auto w-full"
            style={{ aspectRatio: ratio, maxWidth: `min(100%, ${Math.round(MAX_PHOTO_HEIGHT * ratio)}px)` }}
          >
            {portrait ? (
              // Arch window rising above the photo, so the photo's corners stay inside it.
              <div aria-hidden className="shape-arch absolute -inset-x-4 top-[calc(-1rem-30cqw)] -bottom-4 bg-mint">
                <Sun className="absolute top-[3%] left-1/2 w-[16%] -translate-x-1/2" />
              </div>
            ) : (
              <div aria-hidden className="shape-pebble absolute -inset-4 bg-mint" />
            )}
            <div aria-hidden className="shape-leaf absolute -right-5 -bottom-5 h-2/3 w-2/3 bg-leaf/25" />
            <Photo
              image={image}
              alt={t.about.photoAlt}
              placeholder={t.about.placeholder}
              className={portrait ? "rounded-[2.75rem_2.75rem_1.5rem_1.5rem]" : "rounded-[3rem_1.25rem_3rem_1.25rem]"}
              sizes="(min-width: 1024px) 520px, 92vw"
            />

            <Flower className="animate-float absolute -top-5 -right-3 w-12" />
            <Star className="absolute top-[18%] -left-6 w-5" color="#7FAA76" />
            <Sprig className="absolute -bottom-6 -left-5 w-12" />
          </div>
        </Reveal>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <Intro t={t} />
          <div className="mt-6">
            <Paragraphs t={t} />
          </div>
          <Reveal delay={0.25} className="mt-8">
            <Badge t={t} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
