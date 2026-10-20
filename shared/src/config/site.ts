// Single source of the kindergarten's data — used by the desktop and the mobile site.

// Public site URL for SEO. On Vercel it falls back to the project's production domain.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

export const siteConfig = {
  brand: "ТАМИРИС",
  name: "«Тамирис»",
  legalName: "Частное учреждение детский сад «Тамирис»",
  url: rawSiteUrl.replace(/\/$/, ""),
  phones: [
    { display: "+7 705 267 25 25", href: "tel:+77052672525" },
    { display: "+7 701 369 28 55", href: "tel:+77013692855" },
  ],
  // Key facts; texts in i18n/translations.ts are built from these values.
  hours: "08:00–18:30",
  ages: "2–5",
  groups: 3,
  meals: 5,
  instagram: {
    handle: "@tamiris_bala_bagshasi",
    url: "https://www.instagram.com/tamiris_bala_bagshasi/",
  },
  address: {
    country: "KZ",
    city: "Алматы",
    street: "Кенесары хан көшесі, 116",
    schemaStreet: "улица Кенесары хан, 116, микрорайон Каргалы, Наурызбайский район",
    query: "Казахстан, Алматы, Наурызбайский район, микрорайон Каргалы, улица Кенесары хан, 116",
  },
  documentsUrl: process.env.NEXT_PUBLIC_DOCUMENTS_URL?.trim() || "",
} as const;

const encodedAddress = encodeURIComponent(siteConfig.address.query);

export const mapLinks = {
  // Address search, not invented coordinates.
  route: `https://yandex.kz/maps/?mode=search&text=${encodedAddress}`,
  embed: `https://yandex.ru/map-widget/v1/?mode=search&text=${encodedAddress}&z=16`,
};

export const SECTION_IDS = ["home", "about", "info", "gallery", "documents", "contacts"] as const;
export type SectionId = (typeof SECTION_IDS)[number];
