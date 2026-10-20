"use client";

import { ArrowUpRight, FileText } from "lucide-react";
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
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-12 w-full items-center gap-3 rounded-full bg-cream py-1.5 pr-4 pl-1.5 text-[0.875rem] font-bold text-forest shadow-[0_10px_22px_-14px_rgb(0_0_0/0.55)] transition-[background-color,scale] duration-200 ease-out hover:bg-honey-soft active:scale-[0.98] active:bg-honey-soft"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint transition-colors duration-200 group-hover:bg-forest group-hover:text-cream group-active:bg-forest group-active:text-cream">
                  <FileText className="size-4" strokeWidth={1.9} aria-hidden />
                </span>
                <span className="flex-1">{t.documents.button}</span>
                <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                <span className="sr-only">{t.documents.newTab}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
