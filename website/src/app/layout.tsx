import type { Metadata, Viewport } from "next";
import { Lora, Nunito } from "next/font/google";
import { siteConfig } from "@shared/config/site";
import { LanguageProvider } from "@shared/i18n/LanguageProvider";
import { localeBootScript } from "@shared/i18n/localeBoot";
import { getSpecialImage } from "@shared/lib/images";
import { childCareJsonLd, seo } from "@shared/lib/seo";

const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-nunito",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  style: ["normal", "italic"],
  weight: ["500", "600"],
  variable: "--font-lora",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const hero = getSpecialImage("main-page");
  const images = hero ? [{ url: hero.src, width: hero.width, height: hero.height, alt: "«Тамирис» балабақшасы" }] : undefined;
  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: seo.title,
    description: seo.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "kk_KZ",
      alternateLocale: ["ru_RU"],
      url: "/",
      siteName: "«Тамирис»",
      title: seo.title,
      description: seo.description,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: seo.title,
      description: seo.description,
      images: images?.map((i) => i.url),
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: true, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#FBF4E8",
  width: "device-width",
  initialScale: 1,
};

/** Shared by both interfaces; each one adds its own stylesheet in its layout. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = childCareJsonLd(getSpecialImage("main-page"));
  return (
    <html lang="kk" className={`${nunito.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeBootScript }} />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
