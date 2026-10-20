import { siteConfig } from "../config/site";
import { translations } from "../i18n/translations";
import type { SiteImage } from "./images";

const kk = translations.kk;

export const seo = {
  title: kk.meta.title,
  description: kk.meta.description,
};

/** schema.org ChildCare markup — only confirmed data. */
export function childCareJsonLd(image: SiteImage | null) {
  return {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: siteConfig.legalName,
    alternateName: "«Тамирис» балабақшасы",
    url: siteConfig.url,
    telephone: siteConfig.phones.map((p) => p.display.replace(/\s/g, "")),
    ...(image ? { image: `${siteConfig.url}${image.src}` } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.schemaStreet,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    sameAs: [siteConfig.instagram.url],
    knowsLanguage: "kk",
  };
}
