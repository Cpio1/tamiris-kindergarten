"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { SECTION_IDS, siteConfig, type SectionId } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";

export function Header() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Closing the menu while the browser starts a smooth scroll cancels it on mobile,
  // so navigate explicitly once the menu has started to close.
  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    if (!open) return;
    event.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }, 50);
  };

  const subtitle = locale === "kk" ? "балабақшасы" : "детский сад";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-forest/10 bg-milk/80 shadow-[0_8px_30px_-24px_rgb(38_56_42/0.5)] backdrop-blur-xl"
          : "bg-milk/40 backdrop-blur-md"
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#home" aria-label={t.nav.homeLabel} className="rounded-xl" onClick={(e) => navigateFromMenu(e, "home")}>
          <Logo subtitle={subtitle} />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.9rem] font-semibold transition-colors ${
                    active === id ? "text-forest" : "text-ink-soft hover:text-forest"
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-mint"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitch className="hidden sm:inline-flex" />
          <a href={siteConfig.phones[0].href} className="btn-primary hidden min-h-10 px-5 text-sm sm:inline-flex">
            <Phone className="h-4 w-4" aria-hidden />
            {t.nav.contact}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 bg-cream text-forest lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="overflow-hidden border-t border-forest/10 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-site max-h-[calc(100dvh-4.5rem)] overflow-y-auto pt-3 pb-6">
              <ul className="flex flex-col">
                {SECTION_IDS.map((id, i) => (
                  <motion.li
                    key={id}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={(e) => navigateFromMenu(e, id)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[1.05rem] font-semibold ${
                        active === id ? "bg-mint text-forest" : "text-ink hover:bg-mint/60"
                      }`}
                    >
                      {t.nav[id]}
                      <span className={`h-1.5 w-1.5 rounded-full ${active === id ? "bg-leaf" : "bg-transparent"}`} />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-3 px-1">
                <LanguageSwitch />
                <a href={siteConfig.phones[0].href} className="btn-primary flex-1">
                  <Phone className="h-4 w-4" aria-hidden />
                  {t.nav.contact}
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
