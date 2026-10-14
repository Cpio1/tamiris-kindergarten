import { About } from "@/components/About";
import { Contacts } from "@/components/Contacts";
import { Documents } from "@/components/Documents";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/gallery/Gallery";
import { arrangeForGrid } from "@/components/gallery/layout";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import type { Metadata } from "next";
import { SkipLink } from "@/components/SkipLink";
import { siteConfig } from "@/config/site";
import { getGalleryImages, getSpecialImage } from "@/lib/images";

// Photos are discovered from public/images at build time.
export const dynamic = "force-static";

const title = "«Тамирис» балабақшасы | Алматы";
const description =
  "Алматы қаласындағы «Тамирис» жеке балабақшасы. 2–5 жас, қазақ тіліндегі тәрбие, 3 топ, 5 мезгіл тамақтану.";

export function generateMetadata(): Metadata {
  const hero = getSpecialImage("main-page");
  const images = hero ? [{ url: hero.src, width: hero.width, height: hero.height, alt: "«Тамирис» балабақшасы" }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "kk_KZ",
      alternateLocale: ["ru_RU"],
      url: "/",
      siteName: "«Тамирис»",
      title,
      description,
      images,
    },
    twitter: { card: images ? "summary_large_image" : "summary", title, description, images: images?.map((i) => i.url) },
    robots: { index: true, follow: true },
  };
}

function StructuredData({ image }: { image?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: siteConfig.legalName,
    alternateName: "«Тамирис» балабақшасы",
    url: siteConfig.url,
    telephone: siteConfig.phones.map((p) => p.display.replace(/\s/g, "")),
    ...(image ? { image: `${siteConfig.url}${image}` } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: "улица Кенесары хан, 116, микрорайон Каргалы, Наурызбайский район",
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
    sameAs: [siteConfig.instagram.url],
    knowsLanguage: "kk",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function Home() {
  const heroImage = getSpecialImage("main-page");
  const aboutImage = getSpecialImage("main-page2");
  const gallery = arrangeForGrid(getGalleryImages());

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">
        <Hero image={heroImage} />
        <About image={aboutImage} />
        <Info />
        <Gallery images={gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer />
      <StructuredData image={heroImage?.src} />
    </>
  );
}
