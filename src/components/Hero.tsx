"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { Cloud, DashedArc, Flower, Leaf, Sprig, Star, Sun } from "./decor/Decorations";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  // Keep the photo's own proportions (within sensible limits) instead of cropping it to a fixed shape.
  const frameRatio = image ? Math.min(Math.max(image.width / image.height, 0.8), 1.6) : 1.1;

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-[6.5rem] pb-20 lg:pt-32 lg:pb-28">
      {/* Background washes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="shape-pebble absolute -top-24 -right-40 h-[34rem] w-[40rem] bg-mint/80 lg:-right-24" />
        <div className="shape-blob absolute top-[55%] -left-40 h-72 w-80 bg-cream" />
        <Cloud className="animate-float-slow absolute top-28 left-[44%] hidden w-28 opacity-90 lg:block" />
      </div>

      <div className="container-site grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        {/* Text */}
        <div className="relative z-10 max-w-xl">
          <motion.p
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-leaf/30 bg-cream/80 py-1.5 pr-4 pl-2 text-sm font-bold text-forest"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint">
              <Star className="h-3.5 w-3.5" />
            </span>
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            {...fadeUp(0.15)}
            id="hero-title"
            className="mt-5 text-[2.3rem] leading-[1.08] font-semibold text-ink sm:text-[2.9rem] lg:text-[3.35rem]"
          >
            <span className="relative inline-block text-forest italic">
              {t.hero.titleBrand}
              <svg
                aria-hidden
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full"
              >
                <path d="M3 9c40-6 90-8 194-3" stroke="#D7B978" strokeWidth="4" strokeLinecap="round" fill="none" />
              </svg>
            </span>{" "}
            {t.hero.titleRest}
          </motion.h1>

          <motion.p {...fadeUp(0.25)} className="mt-6 max-w-md text-[1.08rem] text-ink-soft">
            {t.hero.description}
          </motion.p>

          <motion.div {...fadeUp(0.35)} className="mt-8 flex flex-wrap gap-3">
            <a href="#about" className="btn-primary">
              {t.hero.primary}
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
            <a href={siteConfig.phones[0].href} className="btn-ghost">
              <Phone className="h-4 w-4" aria-hidden />
              {t.hero.secondary}
            </a>
          </motion.div>

          <motion.dl
            {...fadeUp(0.45)}
            className="mt-10 inline-grid grid-cols-3 divide-x divide-forest/15 rounded-[1.75rem] border border-forest/10 bg-cream/80 py-3.5 shadow-soft backdrop-blur-sm"
          >
            {t.hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col px-4 sm:px-6">
                <dt className="order-2 text-[0.78rem] leading-tight font-semibold text-ink-soft sm:text-[0.82rem]">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-[1.6rem] leading-tight font-semibold text-forest">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Photo composition — the frame follows the photo's proportions, so nothing important is cropped */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-[34rem] lg:max-w-none"
        >
          <div className="relative mx-auto w-[92%] lg:w-full" style={{ aspectRatio: frameRatio }}>
            {/* Layered backing shapes */}
            <div aria-hidden className="shape-hero absolute inset-0 translate-x-[4%] translate-y-[6%] rotate-3 bg-leaf/75" />
            <div aria-hidden className="shape-hero absolute inset-0 -translate-x-[3%] -translate-y-[4%] -rotate-2 bg-honey-soft" />

            <div className="shape-hero relative h-full w-full overflow-hidden border-[5px] border-cream bg-mint shadow-lift sm:border-[6px]">
              {image ? (
                <Image
                  src={image.src}
                  alt={t.hero.photoAlt}
                  fill
                  priority
                  quality={80}
                  sizes="(min-width: 1180px) 600px, (min-width: 1024px) 52vw, 92vw"
                  className="object-cover"
                />
              ) : (
                <PhotoPlaceholder label={t.hero.placeholder} />
              )}
            </div>

            {/* Decorations sit on the frame's edges, away from the faces */}
            <DashedArc className="pointer-events-none absolute -top-[16%] -left-[8%] w-[34%] -rotate-12" />
            <Sun className="animate-spin-slow absolute -top-[14%] -right-[4%] w-[17%]" />
            <Leaf className="animate-sway absolute -bottom-[6%] -left-[5%] w-[8%] origin-bottom" />
            <Leaf tone="forest" className="animate-sway absolute -bottom-[2%] -left-[1%] w-[5.5%] origin-bottom rotate-12 [animation-delay:-2s]" />
            <Flower className="animate-float absolute -right-[4%] top-[24%] w-[9%]" />
            <Flower petal="#E7F0E2" className="absolute -right-[1%] -bottom-[8%] w-[6%]" />
            <Star className="animate-float absolute top-[24%] -left-[5%] w-[4.5%] [animation-delay:-3s]" color="#7FAA76" />
            <Star className="absolute -top-[6%] right-[22%] w-[3.5%]" />

            <div className="absolute -bottom-[9%] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-cream py-1.5 pr-4 pl-1.5 shadow-soft sm:py-2 sm:pl-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint sm:h-8 sm:w-8">
                <Sprig className="h-5 w-4" />
              </span>
              <span className="text-[0.8rem] font-bold whitespace-nowrap text-forest sm:text-[0.82rem]">{siteConfig.hours}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
