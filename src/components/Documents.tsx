"use client";

import { ArrowUpRight, Clock3 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Leaf, Squiggle, Star } from "./decor/Decorations";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Stack of papers with a leaf seal. */
function DocumentIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} aria-hidden focusable={false}>
      <path d="M90 8c46 0 82 32 82 80s-36 84-84 84S8 136 8 90 44 8 90 8Z" fill="#FBF4E8" opacity="0.12" />
      <rect x="52" y="36" width="78" height="100" rx="14" transform="rotate(-8 91 86)" fill="#E7F0E2" />
      <rect x="50" y="40" width="80" height="104" rx="14" fill="#FFF9F0" />
      <rect x="64" y="60" width="44" height="6" rx="3" fill="#7FAA76" />
      <rect x="64" y="76" width="52" height="5" rx="2.5" fill="#406F4F" opacity="0.25" />
      <rect x="64" y="88" width="48" height="5" rx="2.5" fill="#406F4F" opacity="0.25" />
      <rect x="64" y="100" width="36" height="5" rx="2.5" fill="#406F4F" opacity="0.25" />
      <circle cx="118" cy="132" r="18" fill="#D7B978" />
      <path d="M118 142c0-6 0-10 0-14" stroke="#FFF9F0" strokeWidth="2" strokeLinecap="round" />
      <path d="M118 136c-1.5-4.5-5-6.6-9-6.2 1 4.2 4.4 6.8 9 6.2Z" fill="#FFF9F0" />
      <path d="M118 133c1.5-4.5 5-6.6 9-6.2-1 4.2-4.4 6.8-9 6.2Z" fill="#FFF9F0" />
    </svg>
  );
}

export function Documents() {
  const { t } = useLanguage();
  const url = siteConfig.documentsUrl;

  return (
    <section id="documents" aria-labelledby="documents-title" className="section pt-6 lg:pt-10">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[3rem_1.5rem_3rem_1.5rem] bg-forest px-6 py-12 sm:px-12 lg:rounded-[4.5rem_2rem_4.5rem_2rem] lg:px-16 lg:py-14">
            <div aria-hidden className="shape-pebble pointer-events-none absolute -top-24 -right-20 h-72 w-80 bg-leaf/35" />
            <div aria-hidden className="shape-blob pointer-events-none absolute -bottom-28 -left-16 h-60 w-64 bg-forest-deep/60" />
            <Leaf aria-hidden tone="leaf" className="absolute bottom-6 left-[46%] hidden w-8 rotate-[30deg] opacity-60 md:block" />
            <Star aria-hidden className="absolute top-8 left-[40%] w-4" />

            <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div>
                <SectionHeading
                  id="documents-title"
                  eyebrow={t.documents.eyebrow}
                  title={t.documents.title}
                  description={t.documents.description}
                  align="left"
                  tone="light"
                />
                <Squiggle className="mt-5 w-24" color="#D7B978" />

                <div className="mt-7">
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn group bg-cream text-forest hover:-translate-y-0.5 hover:bg-honey-soft"
                    >
                      {t.documents.button}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                      <span className="sr-only">{t.documents.newTab}</span>
                    </a>
                  ) : (
                    <p role="status" className="inline-flex items-center gap-3 rounded-2xl border border-cream/20 bg-cream/10 px-5 py-3 text-[0.95rem] font-semibold text-cream">
                      <Clock3 className="h-5 w-5 shrink-0 text-honey" aria-hidden />
                      {t.documents.soon}
                    </p>
                  )}
                </div>
              </div>

              <DocumentIllustration className="animate-float mx-auto w-40 sm:w-48 lg:w-52" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
