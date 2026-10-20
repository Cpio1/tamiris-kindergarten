import type { SectionId } from "@shared/config/site";

/** Smoothly scrolls to a section and updates the hash without a jump. */
export function scrollToSection(id: SectionId) {
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (id === "home") window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  else document.getElementById(id)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
}
