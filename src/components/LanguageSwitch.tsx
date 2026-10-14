"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/translations";

const OPTIONS: { value: Locale; label: string; full: string }[] = [
  { value: "kk", label: "ҚАЗ", full: "Қазақша" },
  { value: "ru", label: "РУС", full: "Русский" },
];

export function LanguageSwitch({ className = "inline-flex" }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`items-center rounded-full border border-forest/15 bg-cream/80 p-1 ${className}`}
    >
      {OPTIONS.map((option) => {
        const selected = locale === option.value;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={selected}
            aria-label={option.full}
            onClick={() => setLocale(option.value)}
            className={`min-h-8 rounded-full px-3 text-xs font-extrabold tracking-wider transition-colors duration-200 ${
              selected ? "bg-forest text-cream" : "text-ink-soft hover:text-forest"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
