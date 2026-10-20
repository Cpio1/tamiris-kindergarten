"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SECTION_IDS, siteConfig, type SectionId } from "@shared/config/site";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { InstagramIcon } from "@shared/ui/InstagramIcon";
import { LogoMark } from "@shared/ui/LogoMark";
import { LangToggle } from "./LangToggle";
import { scrollToSection } from "./nav";

export function MobileHeader() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: SectionId) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Wait one frame so the scroll lock is released before scrolling.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 ${
        scrolled || open ? "bg-milk/95 shadow-[0_1px_0_rgb(64_111_79/0.1),0_8px_20px_-16px_rgb(38_56_42/0.45)]" : "bg-milk/0"
      }`}
    >
      <div className="m-container flex h-14 items-center justify-between gap-2">
        <a href="#home" aria-label={t.nav.homeLabel} onClick={go("home")} className="flex min-h-11 items-center gap-2 rounded-xl">
          <LogoMark className="size-8 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="text-[0.92rem] font-extrabold tracking-[0.14em] text-forest">{siteConfig.brand}</span>
            <span className="mt-0.5 text-[0.6rem] font-semibold tracking-wide text-ink-soft">
              {locale === "kk" ? "балабақшасы" : "детский сад"}
            </span>
          </span>
        </a>

        <div className="flex items-center gap-1">
          <LangToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="m-menu"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            className="grid size-11 place-items-center rounded-full"
          >
            <span className="grid size-9 place-items-center rounded-full border border-forest/15 bg-cream text-forest">
              {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
            </span>
          </button>
        </div>
      </div>

      {/* Menu: always mounted, toggled with CSS — no animation library, no layout work on open. */}
      <div
        id="m-menu"
        inert={!open}
        className={`fixed inset-x-0 top-14 bottom-0 transition-[visibility] duration-200 ${open ? "visible" : "invisible"}`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/25 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          aria-label={t.footer.navTitle}
          className={`relative max-h-full overflow-y-auto rounded-b-[1.75rem] bg-milk pb-5 shadow-lift transition-[opacity,translate] duration-200 ease-out ${
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <ul className="m-container">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={go(id)}
                  className="flex min-h-12 items-center justify-between border-b border-forest/10 font-display text-[1rem] font-semibold text-forest"
                >
                  {t.nav[id]}
                  <span aria-hidden className="size-1.5 rounded-full bg-leaf" />
                </a>
              </li>
            ))}
          </ul>
          <div className="m-container mt-4 grid grid-cols-[1fr_auto] gap-2">
            <a href={siteConfig.phones[0].href} className="m-btn m-btn-primary">
              <Phone className="size-4" aria-hidden />
              {siteConfig.phones[0].display}
            </a>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${siteConfig.instagram.handle}`}
              className="m-btn m-btn-ghost w-11 px-0"
            >
              <InstagramIcon className="size-[1.1rem]" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
