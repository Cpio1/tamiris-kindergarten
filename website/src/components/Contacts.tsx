"use client";

import { Clock3, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { mapLinks, siteConfig } from "@shared/config/site";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { Flower, Sprig, Star } from "@shared/ui/Decorations";
import { InstagramIcon } from "@shared/ui/InstagramIcon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-3.5 py-3 first:pt-0 last:pb-0">
      <span className="shape-blob flex h-9 w-9 shrink-0 items-center justify-center bg-mint text-forest">{icon}</span>
      <div className="min-w-0">
        <p className="text-[0.75rem] font-bold text-ink-soft">{label}</p>
        <div className="mt-0.5 text-[0.92rem] font-semibold text-ink">{children}</div>
      </div>
    </li>
  );
}

export function Contacts() {
  const { t } = useLanguage();
  const linkClass = "underline-offset-4 transition-colors hover:text-forest hover:underline";

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="section bg-cream">
      <Sprig aria-hidden className="pointer-events-none absolute top-14 left-[4%] hidden w-10 -rotate-12 lg:block" />

      <div className="container-site">
        <Reveal>
          <SectionHeading id="contacts-title" eyebrow={t.contacts.eyebrow} title={t.contacts.title} description={t.contacts.description} />
        </Reveal>

        <div className="mt-9 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <Reveal>
            <div className="relative h-full rounded-[2rem_1rem_2rem_1rem] border border-forest/10 bg-milk p-5 shadow-soft sm:p-6">
              <Flower aria-hidden className="absolute -top-4 -right-3 w-11" />
              <address className="not-italic">
                <ul className="divide-y divide-forest/10">
                  <ContactRow icon={<MapPin className="h-4 w-4" aria-hidden />} label={t.contacts.addressLabel}>
                    <a href={mapLinks.route} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {t.contacts.address}
                    </a>
                  </ContactRow>
                  <ContactRow icon={<Phone className="h-4 w-4" aria-hidden />} label={t.contacts.phonesLabel}>
                    <span className="flex flex-col gap-0.5">
                      {siteConfig.phones.map((phone) => (
                        <a key={phone.href} href={phone.href} className={`${linkClass} whitespace-nowrap`}>
                          {phone.display}
                        </a>
                      ))}
                    </span>
                  </ContactRow>
                  <ContactRow icon={<Clock3 className="h-4 w-4" aria-hidden />} label={t.contacts.hoursLabel}>
                    {t.contacts.hours}
                  </ContactRow>
                  <ContactRow icon={<InstagramIcon className="h-4 w-4" />} label={t.contacts.instagramLabel}>
                    <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} break-all`}>
                      {siteConfig.instagram.handle}
                    </a>
                  </ContactRow>
                </ul>
              </address>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <a href={mapLinks.route} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <Navigation className="h-4 w-4" aria-hidden />
                  {t.contacts.route}
                </a>
                <a href={siteConfig.phones[0].href} className="btn-ghost">
                  <Phone className="h-4 w-4" aria-hidden />
                  {siteConfig.phones[0].display}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full">
              <div aria-hidden className="shape-leaf absolute -inset-1 translate-x-1.5 translate-y-3 bg-mint sm:-inset-3 sm:translate-x-3" />
              <div className="relative h-[18rem] w-full overflow-hidden rounded-[1rem_2.75rem_1rem_2.75rem] border-4 border-cream bg-mint shadow-lift sm:h-[21rem] lg:h-full lg:min-h-[22rem]">
                <iframe
                  src={mapLinks.embed}
                  title={t.contacts.mapTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />
              </div>
              <Star aria-hidden className="absolute -top-3 left-8 w-5" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
