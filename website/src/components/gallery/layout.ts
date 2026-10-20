/**
 * Editorial grid layout. Photos are placed in blocks of six that fully fill
 * a 4-column × 3-row area on desktop (2 columns × 6 rows on mobile),
 * mirrored on every other block. Each slot has a shape ("kind"), and photos
 * are assigned to slots that suit their proportions, so crops stay gentle.
 * Class strings are written out in full so Tailwind can detect them.
 */

type Dimensions = { width: number; height: number };
type SlotKind = "big" | "tall" | "small" | "wide";
type Slot = { kind: SlotKind; span: string; shape: string };

const BLOCK = 6;

const SIZES: Record<SlotKind, string> = {
  big: "(min-width: 1024px) 480px, 100vw",
  wide: "(min-width: 1024px) 480px, 100vw",
  tall: "(min-width: 1024px) 240px, 50vw",
  small: "(min-width: 1024px) 240px, 50vw",
};

// One full block: mobile spans / desktop spans.
const BLOCK_SLOTS: Slot[] = [
  { kind: "big", span: "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2", shape: "rounded-[2.25rem_1.25rem_2.25rem_1.25rem]" },
  { kind: "tall", span: "col-span-1 row-span-2 lg:col-span-1 lg:row-span-2", shape: "rounded-[999px_999px_1.5rem_1.5rem]" },
  { kind: "small", span: "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1", shape: "rounded-[1.5rem]" },
  { kind: "small", span: "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1", shape: "rounded-[1.5rem_2.5rem_1.5rem_1.5rem]" },
  { kind: "wide", span: "col-span-2 row-span-1 lg:col-span-2 lg:row-span-1", shape: "rounded-[1.5rem_1.5rem_2.25rem_1.5rem]" },
  { kind: "wide", span: "col-span-2 row-span-1 lg:col-span-2 lg:row-span-1", shape: "rounded-[2.5rem_1.5rem_1.5rem_1.5rem]" },
];

// Mirrored blocks put the large photo on the right on desktop.
const MIRRORED_START = ["lg:col-start-3", "lg:col-start-2", "lg:col-start-1", "lg:col-start-1", "", ""];

// Layout for an incomplete last block, keyed by how many photos are left.
const REMAINDER_SLOTS: Record<number, Slot[]> = {
  1: [{ kind: "wide", span: "col-span-2 row-span-2 lg:col-span-4 lg:row-span-2", shape: "rounded-[2.25rem_1.25rem_2.25rem_1.25rem]" }],
  2: [
    { kind: "big", span: "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2", shape: "rounded-[2.25rem_1.25rem_2.25rem_1.25rem]" },
    { kind: "big", span: "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2", shape: "rounded-[1.25rem_2.25rem_1.25rem_2.25rem]" },
  ],
  3: [
    { kind: "big", span: "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2", shape: "rounded-[2.25rem_1.25rem_2.25rem_1.25rem]" },
    { kind: "tall", span: "col-span-1 row-span-2 lg:col-span-1 lg:row-span-2", shape: "rounded-[999px_999px_1.5rem_1.5rem]" },
    { kind: "tall", span: "col-span-1 row-span-2 lg:col-span-1 lg:row-span-2", shape: "rounded-[1.5rem_2.5rem_1.5rem_1.5rem]" },
  ],
  4: [
    { kind: "tall", span: "col-span-1 row-span-2 lg:col-span-1 lg:row-span-2", shape: "rounded-[999px_999px_1.5rem_1.5rem]" },
    { kind: "tall", span: "col-span-1 row-span-2 lg:col-span-1 lg:row-span-2", shape: "rounded-[1.5rem]" },
    { kind: "tall", span: "col-span-1 row-span-2 lg:col-span-1 lg:row-span-2", shape: "rounded-[1.5rem_2.5rem_1.5rem_1.5rem]" },
    { kind: "tall", span: "col-span-1 row-span-2 lg:col-span-1 lg:row-span-2", shape: "rounded-[999px_999px_1.5rem_1.5rem]" },
  ],
  5: [
    { kind: "big", span: "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2", shape: "rounded-[2.25rem_1.25rem_2.25rem_1.25rem]" },
    { kind: "small", span: "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1", shape: "rounded-[1.5rem]" },
    { kind: "small", span: "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1", shape: "rounded-[1.5rem_2.5rem_1.5rem_1.5rem]" },
    { kind: "small", span: "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1", shape: "rounded-[1.5rem_1.5rem_2.5rem_1.5rem]" },
    { kind: "small", span: "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1", shape: "rounded-[1.5rem]" },
  ],
};

function slotsFor(total: number): { slot: Slot; mirrored: boolean }[] {
  const fullBlocks = Math.floor(total / BLOCK);
  const result: { slot: Slot; mirrored: boolean }[] = [];
  for (let b = 0; b < fullBlocks; b++) {
    BLOCK_SLOTS.forEach((slot) => result.push({ slot, mirrored: b % 2 === 1 }));
  }
  const remainder = total - fullBlocks * BLOCK;
  if (remainder) REMAINDER_SLOTS[remainder].forEach((slot) => result.push({ slot, mirrored: false }));
  return result;
}

export function getTile(index: number, total: number): { className: string; sizes: string } {
  const { slot, mirrored } = slotsFor(total)[index];
  const position = index % BLOCK;
  const start = mirrored ? MIRRORED_START[position] : "";
  return { className: `${slot.span} ${start} ${slot.shape}`, sizes: SIZES[slot.kind] };
}

// Photo groups by proportions. "Narrow" covers very tall shots such as phone
// screenshots (often letterboxed) — they look best cropped to their middle.
type Group = "landscape" | "portrait" | "panorama" | "narrow";

function groupOf({ width, height }: Dimensions): Group {
  const ratio = width / height;
  if (ratio >= 1.7) return "panorama";
  if (ratio >= 0.9) return "landscape";
  if (ratio >= 0.6) return "portrait";
  return "narrow";
}

// Which groups suit each slot, best first.
const PREFERENCES: Record<SlotKind, Group[]> = {
  big: ["landscape", "panorama", "portrait", "narrow"],
  tall: ["portrait", "landscape", "narrow", "panorama"],
  small: ["landscape", "narrow", "portrait", "panorama"],
  wide: ["panorama", "landscape", "portrait", "narrow"],
};

/**
 * Orders photos so each lands in a slot that fits its proportions.
 * Keeps filename order inside each group; every photo is used exactly once.
 */
export function arrangeForGrid<T extends Dimensions>(images: T[]): T[] {
  const pools: Record<Group, T[]> = { landscape: [], portrait: [], panorama: [], narrow: [] };
  images.forEach((image) => pools[groupOf(image)].push(image));

  const slots = slotsFor(images.length);
  const result: T[] = new Array(images.length);

  // Fill the pickiest slots first so scarce shapes go where they matter.
  const order = slots
    .map((s, i) => ({ i, kind: s.slot.kind }))
    .sort((a, b) => kindPriority(a.kind) - kindPriority(b.kind) || a.i - b.i);

  // Spread panoramas: at most one per block until they run out of other options.
  const panoramaPerBlock = new Map<number, number>();
  for (const { i, kind } of order) {
    let prefs = PREFERENCES[kind];
    const block = Math.floor(i / BLOCK);
    if (kind === "wide" && (panoramaPerBlock.get(block) ?? 0) >= 1 && pools.landscape.length > 0) {
      prefs = ["landscape", ...prefs.filter((g) => g !== "landscape")];
    }
    const group = prefs.find((g) => pools[g].length > 0)!;
    if (group === "panorama") panoramaPerBlock.set(block, (panoramaPerBlock.get(block) ?? 0) + 1);
    result[i] = pools[group].shift()!;
  }
  return result;
}

function kindPriority(kind: SlotKind) {
  return { tall: 0, wide: 1, big: 2, small: 3 }[kind];
}

export const INITIAL_VISIBLE = 6;
