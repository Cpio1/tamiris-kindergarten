"use client";

import { MapPin, Phone } from "lucide-react";
import { SECTION_IDS, mapLinks, siteConfig } from "@shared/config/site";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { WaveEdge } from "@shared/ui/Decorations";
import { InstagramIcon } from "@shared/ui/InstagramIcon";
import { Logo } from "./Logo";

export function Footer() {
  const { t, locale } = useLanguage();
  const linkClass = "text-cream/90 transition-colors hover:text-cream";

  return (
    <footer className="relative bg-forest text-cream">
      <WaveEdge fill="#406F4F" className="absolute top-px left-0 z-10 h-7 w-full -translate-y-full sm:h-8" />
      <div className="container-site grid gap-8 pt-10 pb-6 md:grid-cols-[1.3fr_0.8fr_1fr] md:gap-8">
        <div className="max-w-xs">
          <a href="#home" aria-label={t.nav.homeLabel} className="inline-block rounded-xl">
            <Logo inverted subtitle={locale === "kk" ? "балабақшасы" : "детский сад"} />
          </a>
          <p className="mt-3 text-[0.86rem] text-cream/90">{t.footer.description}</p>
        </div>

        <nav aria-label={t.footer.navTitle}>
          <h2 className="font-sans text-[0.8rem] font-extrabold text-honey">{t.footer.navTitle}</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[0.86rem] md:grid-cols-1">
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
          <h2 className="font-sans text-[0.8rem] font-extrabold text-honey">{t.footer.contactsTitle}</h2>
          <ul className="mt-3 space-y-2.5 text-[0.86rem]">
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
        <p className="container-site py-4 text-center text-[0.78rem] text-cream/85 md:text-left">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
