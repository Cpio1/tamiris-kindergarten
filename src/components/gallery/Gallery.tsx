"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, ChevronUp, Expand, ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { Flower, Leaf, Sprig } from "../decor/Decorations";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { INITIAL_VISIBLE, getTile } from "./layout";
import { Lightbox } from "./Lightbox";

export function Gallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const total = images.length;
  const hasMore = total > INITIAL_VISIBLE;
  const visible = expanded ? images : images.slice(0, INITIAL_VISIBLE);

  const toggle = () => {
    if (expanded) {
      setExpanded(false);
      sectionRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    } else {
      setExpanded(true);
    }
  };

  return (
    <section ref={sectionRef} id="gallery" aria-labelledby="gallery-title" className="section pt-24 lg:pt-32">
      <Sprig aria-hidden className="pointer-events-none absolute top-24 right-[5%] hidden w-14 rotate-12 opacity-70 lg:block" />
      <Leaf aria-hidden tone="mint" className="pointer-events-none absolute bottom-24 left-[3%] hidden w-12 -rotate-12 lg:block" />

      <div className="container-site">
        <Reveal>
          <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} description={t.gallery.description} />
        </Reveal>

        {total === 0 ? (
          <Reveal className="mx-auto mt-12 max-w-md">
            <div className="relative overflow-hidden rounded-[2.5rem_1.25rem_2.5rem_1.25rem] border border-dashed border-leaf/50 bg-cream px-8 py-12 text-center">
              <Flower aria-hidden className="absolute -top-4 -right-4 w-16 opacity-70" />
              <span className="shape-blob mx-auto flex h-16 w-16 items-center justify-center bg-mint text-forest">
                <ImageIcon className="h-7 w-7" strokeWidth={1.7} aria-hidden />
              </span>
              <p className="mt-4 font-semibold text-ink-soft">{t.gallery.empty}</p>
            </div>
          </Reveal>
        ) : (
          <>
            <ul className="mt-12 grid grid-flow-dense auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:auto-rows-[11.5rem] lg:grid-cols-4">
              <AnimatePresence initial={false}>
                {visible.map((image, i) => {
                  const extra = i >= INITIAL_VISIBLE;
                  const tile = getTile(i, total);
                  return (
                    <motion.li
                      key={image.src}
                      className={`relative overflow-hidden bg-mint ${tile.className}`}
                      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
                      whileInView={extra ? undefined : { opacity: 1, y: 0, scale: 1 }}
                      animate={extra ? { opacity: 1, y: 0, scale: 1 } : undefined}
                      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                      transition={{
                        duration: 0.6,
                        delay: extra ? 0.05 * ((i - INITIAL_VISIBLE) % 6) : 0.06 * (i % 6),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(i)}
                        aria-label={t.gallery.openPhoto(i + 1)}
                        className="group absolute inset-0 h-full w-full cursor-zoom-in focus-visible:outline-offset-[-4px]"
                      >
                        <Image
                          src={image.src}
                          alt={t.gallery.photoAlt(i + 1)}
                          fill
                          loading="lazy"
                          sizes={tile.sizes}
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="absolute right-3 bottom-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-cream/90 text-forest opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                          <Expand className="h-4 w-4" aria-hidden />
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button type="button" onClick={toggle} aria-expanded={expanded} className="btn-ghost group">
                  {expanded ? t.gallery.collapse : t.gallery.showAll}
                  {!expanded && (
                    <span className="rounded-full bg-mint px-2 py-0.5 text-xs font-extrabold text-forest">{total}</span>
                  )}
                  {expanded ? (
                    <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden />
                  ) : (
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Lightbox images={images} index={openIndex} onChange={setOpenIndex} />
    </section>
  );
}
