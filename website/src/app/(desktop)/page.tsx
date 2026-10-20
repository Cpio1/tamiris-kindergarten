import { About } from "@/components/About";
import { Contacts } from "@/components/Contacts";
import { Documents } from "@/components/Documents";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/gallery/Gallery";
import { arrangeForGrid } from "@/components/gallery/layout";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { SkipLink } from "@/components/SkipLink";
import { getGalleryImages, getSpecialImage } from "@shared/lib/images";

// Photos are discovered from public/images at build time.
export const dynamic = "force-static";

/** Desktop home page (also used for tablets, ≥ 768 px). */
export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">
        <Hero image={getSpecialImage("main-page")} />
        <About image={getSpecialImage("main-page2")} />
        <Info />
        <Gallery images={arrangeForGrid(getGalleryImages())} />
        <Documents />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
