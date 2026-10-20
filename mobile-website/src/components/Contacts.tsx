"use client";

import { ChevronRight, Clock3, MapPin, Navigation, Phone } from "lucide-react";
import { mapLinks, siteConfig } from "@shared/config/site";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { Flower, Sprig, WaveEdge } from "@shared/ui/Decorations";
import { InstagramIcon } from "@shared/ui/InstagramIcon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Contacts() {
  const { t } = useLanguage();

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative bg-cream">
      <WaveEdge fill="#FFF9F0" className="block h-5 w-full bg-milk" />
      <div className="m-container relative pt-3 pb-10">
        <Sprig aria-hidden className="pointer-events-none absolute top-2 right-5 w-6 rotate-12 opacity-80" />
        <Reveal>
          <SectionHeading id="contacts-title" eyebrow={t.contacts.eyebrow} title={t.contacts.title} description={t.contacts.description} />
        </Reveal>

        <Reveal className="mt-4">
          <address className="not-italic">
            {/* Phones: big tap targets */}
            <p className="text-[0.72rem] font-bold text-ink-soft">{t.contacts.phonesLabel}</p>
            <ul className="mt-1.5 grid gap-2">
              {siteConfig.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="flex min-h-12 items-center gap-3 rounded-2xl border border-forest/10 bg-milk px-3 font-bold text-ink shadow-soft active:bg-mint"
                  >
                    <span className="m-shape-blob grid size-8 shrink-0 place-items-center bg-forest text-cream">
                      <Phone className="size-3.5" aria-hidden />
                    </span>
                    <span className="flex-1 text-[0.95rem] whitespace-nowrap tabular-nums">{phone.display}</span>
                    <ChevronRight className="size-4 text-forest/60" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-3 divide-y divide-forest/10 rounded-[1.4rem_0.6rem_1.4rem_1.4rem] border border-forest/10 bg-milk px-3.5">
              <li className="flex gap-3 py-3">
                <span className="m-shape-blob grid size-8 shrink-0 place-items-center bg-mint text-forest">
                  <MapPin className="size-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.72rem] font-bold text-ink-soft">{t.contacts.addressLabel}</p>
                  <a
                    href={mapLinks.route}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.85rem] leading-snug font-semibold break-words text-ink underline decoration-forest/25 underline-offset-4"
                  >
                    {t.contacts.address}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 py-3">
                <span className="m-shape-blob grid size-8 shrink-0 place-items-center bg-mint text-forest">
                  <Clock3 className="size-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.72rem] font-bold text-ink-soft">{t.contacts.hoursLabel}</p>
                  <p className="text-[0.85rem] font-semibold text-ink">{t.contacts.hours}</p>
                </div>
              </li>
              <li>
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3"
                >
                  <span className="m-shape-blob grid size-8 shrink-0 place-items-center bg-mint text-forest">
                    <InstagramIcon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.72rem] font-bold text-ink-soft">{t.contacts.instagramLabel}</span>
                    <span className="block truncate text-[0.85rem] font-semibold text-forest">{siteConfig.instagram.handle}</span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-forest/60" aria-hidden />
                </a>
              </li>
            </ul>
          </address>
        </Reveal>

        <Reveal className="relative mt-5">
          <div aria-hidden className="m-shape-leaf absolute inset-0 translate-x-2 translate-y-2 bg-mint" />
          <div className="relative aspect-[4/3] max-h-[60svh] w-full overflow-hidden rounded-[0.6rem_1.75rem_0.6rem_1.75rem] border-[3px] border-cream bg-mint shadow-lift">
            <iframe
              src={mapLinks.embed}
              title={t.contacts.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
              allowFullScreen
            />
          </div>
          <Flower aria-hidden className="absolute -top-3 -right-1 w-8" />
        </Reveal>

        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
          <a href={mapLinks.route} target="_blank" rel="noopener noreferrer" className="m-btn m-btn-primary">
            <Navigation className="size-4" aria-hidden />
            {t.contacts.route}
          </a>
          {/* The phone numbers above are the main call targets; this is a quick shortcut. */}
          <a href={siteConfig.phones[0].href} aria-label={`${t.contacts.call}: ${siteConfig.phones[0].display}`} className="m-btn m-btn-ghost w-11 px-0">
            <Phone className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
