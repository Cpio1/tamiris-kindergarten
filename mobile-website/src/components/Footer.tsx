"use client";

import { Phone } from "lucide-react";
import { SECTION_IDS, siteConfig, type SectionId } from "@shared/config/site";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { WaveEdge } from "@shared/ui/Decorations";
import { InstagramIcon } from "@shared/ui/InstagramIcon";
import { LogoMark } from "@shared/ui/LogoMark";
import { scrollToSection } from "./nav";

export function Footer() {
  const { t, locale } = useLanguage();

  const go = (id: SectionId) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer className="bg-forest text-cream">
      <WaveEdge fill="#406F4F" className="block h-5 w-full bg-cream" />
      <div className="m-container pt-4 pb-5">
        <div className="flex items-center gap-2.5">
          <LogoMark inverted className="size-9 shrink-0" />
          <div className="leading-none">
            <p className="text-[0.95rem] font-extrabold tracking-[0.14em]">{siteConfig.brand}</p>
            <p className="mt-1 text-[0.62rem] font-semibold tracking-wide text-cream/70">
              {locale === "kk" ? "балабақшасы" : "детский сад"}
            </p>
          </div>
        </div>
        <p className="mt-3 text-[0.8rem] leading-snug text-cream/85">{t.footer.description}</p>

        <nav aria-label={t.footer.navTitle} className="mt-4">
          <ul className="grid grid-cols-3 gap-x-2 text-[0.78rem] font-semibold">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={go(id)} className="flex min-h-9 items-center text-cream/90">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-3 flex flex-wrap gap-2 text-[0.78rem] font-semibold">
          {siteConfig.phones.map((phone) => (
            <li key={phone.href}>
              <a href={phone.href} className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-cream/10 px-3 whitespace-nowrap">
                <Phone className="size-3.5 text-honey" aria-hidden />
                {phone.display}
              </a>
            </li>
          ))}
          <li>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-cream/10 px-3"
            >
              <InstagramIcon className="size-3.5 text-honey" />
              {siteConfig.instagram.handle}
            </a>
          </li>
        </ul>

        <p className="mt-4 border-t border-cream/15 pt-3 text-[0.7rem] text-cream/75">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
