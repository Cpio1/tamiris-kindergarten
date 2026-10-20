"use client";

import { useLanguage } from "@shared/i18n/LanguageProvider";
import { LOCALES } from "@shared/i18n/translations";

const LABELS = { kk: "ҚАЗ", ru: "РУС" } as const;
const FULL = { kk: "Қазақша", ru: "Русский" } as const;

/** ҚАЗ / РУС switch: a small pill, but each half keeps a 44px-tall touch area. */
export function LangToggle() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div role="group" aria-label={t.nav.language} className="flex rounded-full border border-forest/15 bg-cream p-0.5">
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={FULL[code]}
            className={`relative h-7 min-w-9 rounded-full px-2 text-[0.66rem] font-extrabold tracking-wider transition-colors duration-200 after:absolute after:-inset-y-2 after:inset-x-0 ${
              active ? "bg-forest text-cream" : "text-ink-soft"
            }`}
          >
            {LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
