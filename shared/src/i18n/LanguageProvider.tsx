"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LOCALE_STORAGE_KEY } from "./localeBoot";
import { DEFAULT_LOCALE, LOCALES, translations, type Dictionary, type Locale } from "./translations";

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Restore the saved language after hydration (the static HTML is always Kazakh).
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      // Storage can be unavailable (private mode) — keep the default.
    }
    if (isLocale(saved) && saved !== DEFAULT_LOCALE) setLocaleState(saved);
    document.documentElement.classList.remove("locale-pending");
  }, []);

  useEffect(() => {
    document.documentElement.lang = translations[locale].meta.htmlLang;
    document.title = translations[locale].meta.title;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors — the switch still works for this visit.
    }
  }, []);

  const value = useMemo(() => ({ locale, t: translations[locale], setLocale }), [locale, setLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
