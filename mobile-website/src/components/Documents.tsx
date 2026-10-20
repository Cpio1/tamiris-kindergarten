"use client";

import { ArrowUpRight, Clock3, FileText } from "lucide-react";
import { siteConfig } from "@shared/config/site";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { Leaf, Star } from "@shared/ui/Decorations";
import { Reveal } from "./Reveal";

export function Documents() {
  const { t } = useLanguage();
  const url = siteConfig.documentsUrl;

  return (
    <section id="documents" aria-labelledby="documents-title" className="bg-milk pt-2 pb-8">
      <div className="m-container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem_0.6rem_1.75rem_1.75rem] bg-forest px-4 py-5 text-cream">
            <div aria-hidden className="m-shape-pebble pointer-events-none absolute -top-10 -right-10 h-28 w-32 bg-leaf/35" />
            <Leaf aria-hidden tone="leaf" className="pointer-events-none absolute right-4 bottom-3 w-5 rotate-[30deg] opacity-50" />
            <Star aria-hidden className="pointer-events-none absolute top-4 right-16 w-3" />

            <div className="relative flex items-start gap-3">
              <span className="m-shape-blob grid size-11 shrink-0 place-items-center bg-cream text-forest">
                <FileText className="size-5" strokeWidth={1.8} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[0.72rem] font-bold tracking-wide text-honey">{t.documents.eyebrow}</p>
                <h2 id="documents-title" className="text-[1.25rem] leading-tight font-semibold text-cream">
                  {t.documents.title}
                </h2>
                <p className="mt-1 text-[0.82rem] leading-snug text-cream/85">{t.documents.description}</p>
              </div>
            </div>

            <div className="relative mt-4">
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-btn w-full bg-cream text-forest active:bg-honey-soft"
                >
                  {t.documents.button}
                  <ArrowUpRight className="size-4" aria-hidden />
                  <span className="sr-only">{t.documents.newTab}</span>
                </a>
              ) : (
                <p
                  role="status"
                  className="flex items-center gap-2.5 rounded-2xl border border-cream/20 bg-cream/10 px-3.5 py-2.5 text-[0.8rem] leading-snug font-semibold"
                >
                  <Clock3 className="size-4 shrink-0 text-honey" aria-hidden />
                  {t.documents.soon}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
