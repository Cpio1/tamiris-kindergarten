"use client";

import { MapPin, Phone } from "lucide-react";
import { SECTION_IDS, mapLinks, siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WaveEdge } from "./decor/Decorations";
import { InstagramIcon } from "./InstagramIcon";
import { Logo } from "./Logo";

export function Footer() {
  const { t, locale } = useLanguage();
  const linkClass = "text-cream/90 transition-colors hover:text-cream";

  return (
    <footer className="relative bg-forest text-cream">
      <WaveEdge fill="#406F4F" className="absolute top-px left-0 z-10 h-8 w-full -translate-y-full sm:h-10" />
      <div className="container-site grid gap-10 pt-12 pb-8 md:grid-cols-[1.3fr_0.8fr_1fr] md:gap-8">
        <div className="max-w-xs">
          <a href="#home" aria-label={t.nav.homeLabel} className="inline-block rounded-xl">
            <Logo inverted subtitle={locale === "kk" ? "балабақшасы" : "детский сад"} />
          </a>
          <p className="mt-4 text-[0.92rem] text-cream/90">{t.footer.description}</p>
        </div>

        <nav aria-label={t.footer.navTitle}>
          <h2 className="font-sans text-sm font-extrabold text-honey">{t.footer.navTitle}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.92rem] md:grid-cols-1">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-extrabold text-honey">{t.footer.contactsTitle}</h2>
          <ul className="mt-4 space-y-3 text-[0.92rem]">
            {siteConfig.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                  <Phone className="h-4 w-4 text-honey" aria-hidden />
                  {phone.display}
                </a>
              </li>
            ))}
            <li>
              <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                <InstagramIcon className="h-4 w-4 text-honey" />
                {siteConfig.instagram.handle}
              </a>
            </li>
            <li>
              <a href={mapLinks.route} target="_blank" rel="noopener noreferrer" className={`inline-flex items-start gap-2.5 ${linkClass}`}>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-honey" aria-hidden />
                {t.contacts.address}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <p className="container-site py-5 text-center text-[0.82rem] text-cream/85 md:text-left">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
