import type { SiteImage } from "@shared/lib/images";

/**
 * Mobile gallery layout: rows instead of the desktop mosaic.
 * - "portraits": two vertical photos side by side (3:4)
 * - "landscapes": two horizontal photos side by side (4:3)
 * - "mixed": a leftover vertical + horizontal photo, both square
 * - "wide": one panorama across the column, in its own proportions
 * Pairing photos of the same shape keeps cropping small.
 */
export type RowKind = "portraits" | "landscapes" | "mixed" | "wide";
export type GalleryRow = { kind: RowKind; images: SiteImage[] };

/** Photos shown before "show all". */
export const INITIAL_PHOTOS = 4;

const ratioOf = ({ width, height }: SiteImage) => width / height;
const isPortrait = (image: SiteImage) => ratioOf(image) < 0.9;
const isPanorama = (image: SiteImage) => ratioOf(image) >= 1.6;

/** Tile proportions (width / height) for a photo in a row. */
export function tileRatio(kind: RowKind, image: SiteImage) {
  if (kind === "portraits") return 3 / 4;
  if (kind === "landscapes") return 4 / 3;
  if (kind === "mixed") return 1;
  return Math.min(Math.max(ratioOf(image), 1.6), 2.4);
}

/**
 * Photos whose shape is far from their tile (e.g. very tall phone shots) are
 * shown whole on a soft background instead of being cropped hard.
 */
export function shouldContain(kind: RowKind, image: SiteImage) {
  const r = ratioOf(image);
  const t = tileRatio(kind, image);
  return 1 - Math.min(r / t, t / r) > 0.28;
}

export function arrangeRows(images: SiteImage[]): GalleryRow[] {
  const portraits = images.filter(isPortrait);
  const panoramas = images.filter(isPanorama);
  const landscapes = images.filter((image) => !isPortrait(image) && !isPanorama(image));

  const pairs = (list: SiteImage[], kind: RowKind) => {
    const rows: GalleryRow[] = [];
    while (list.length >= 2) rows.push({ kind, images: list.splice(0, 2) });
    return rows;
  };
  const portraitRows = pairs(portraits, "portraits");
  const landscapeRows = pairs(landscapes, "landscapes");

  // Interleave: two vertical, two horizontal, one panorama, … — varied rhythm.
  const rows: GalleryRow[] = [];
  while (portraitRows.length || landscapeRows.length || panoramas.length) {
    if (portraitRows.length) rows.push(portraitRows.shift()!);
    if (landscapeRows.length) rows.push(landscapeRows.shift()!);
    if (panoramas.length) rows.push({ kind: "wide", images: [panoramas.shift()!] });
  }

  // Leftovers (at most one vertical and one horizontal photo).
  const left = [...portraits, ...landscapes];
  if (left.length === 2) rows.push({ kind: "mixed", images: left });
  // A lone photo spans the column; a vertical one is then shown whole (see shouldContain).
  else if (left.length === 1) rows.push({ kind: "wide", images: left });

  return rows;
}

/** Number of leading rows that hold the first INITIAL_PHOTOS photos. */
export function initialRowCount(rows: GalleryRow[]) {
  let photos = 0;
  let count = 0;
  while (count < rows.length && photos < INITIAL_PHOTOS) photos += rows[count++].images.length;
  return count;
}
