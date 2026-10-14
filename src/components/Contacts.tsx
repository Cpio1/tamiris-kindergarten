"use client";

import { Clock3, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { mapLinks, siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Flower, Sprig, Star } from "./decor/Decorations";
import { InstagramIcon } from "./InstagramIcon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 py-4 first:pt-0 last:pb-0">
      <span className="shape-blob flex h-11 w-11 shrink-0 items-center justify-center bg-mint text-forest">{icon}</span>
      <div className="min-w-0">
        <p className="text-[0.8rem] font-bold text-ink-soft">{label}</p>
        <div className="mt-0.5 font-semibold text-ink">{children}</div>
      </div>
    </li>
  );
}

export function Contacts() {
  const { t } = useLanguage();
  const linkClass = "underline-offset-4 transition-colors hover:text-forest hover:underline";

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="section bg-cream">
      <Sprig aria-hidden className="pointer-events-none absolute top-16 left-[4%] hidden w-12 -rotate-12 lg:block" />

      <div className="container-site">
        <Reveal>
          <SectionHeading id="contacts-title" eyebrow={t.contacts.eyebrow} title={t.contacts.title} description={t.contacts.description} />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <Reveal>
            <div className="relative h-full rounded-[2.5rem_1.25rem_2.5rem_1.25rem] border border-forest/10 bg-milk p-6 shadow-soft sm:p-8">
              <Flower aria-hidden className="absolute -top-5 -right-4 w-14" />
              <address className="not-italic">
                <ul className="divide-y divide-forest/10">
                  <ContactRow icon={<MapPin className="h-5 w-5" aria-hidden />} label={t.contacts.addressLabel}>
                    <a href={mapLinks.route} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {t.contacts.address}
                    </a>
                  </ContactRow>
                  <ContactRow icon={<Phone className="h-5 w-5" aria-hidden />} label={t.contacts.phonesLabel}>
                    <span className="flex flex-col gap-0.5">
                      {siteConfig.phones.map((phone) => (
                        <a key={phone.href} href={phone.href} className={`${linkClass} whitespace-nowrap`}>
                          {phone.display}
                        </a>
                      ))}
                    </span>
                  </ContactRow>
                  <ContactRow icon={<Clock3 className="h-5 w-5" aria-hidden />} label={t.contacts.hoursLabel}>
                    {t.contacts.hours}
                  </ContactRow>
                  <ContactRow icon={<InstagramIcon className="h-5 w-5" />} label={t.contacts.instagramLabel}>
                    <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} break-all`}>
                      {siteConfig.instagram.handle}
                    </a>
                  </ContactRow>
                </ul>
              </address>

              <div className="mt-7 flex flex-wrap gap-3">
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
              <div className="relative h-[22rem] w-full overflow-hidden rounded-[1.25rem_3.5rem_1.25rem_3.5rem] border-4 border-cream bg-mint shadow-lift sm:h-[26rem] lg:h-full lg:min-h-[28rem]">
                <iframe
                  src={mapLinks.embed}
                  title={t.contacts.mapTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />
              </div>
              <Star aria-hidden className="absolute -top-3 left-8 w-6" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
