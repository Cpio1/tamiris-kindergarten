import "server-only";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
};

type ImageFile = SiteImage & { hash: string };

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const SPECIAL = ["main-page", "main-page2"] as const;
const SERVICE = /^(logo|favicon|icon|og|og-image|apple-touch-icon)([-_.].*)?$/i;
const EXTENSION_PRIORITY = [".avif", ".webp", ".jpg", ".jpeg", ".png"];

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

function listImageFiles(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .filter((name) => SUPPORTED.has(path.extname(name).toLowerCase()));
  } catch {
    // The folder may not exist yet — that's a valid, empty state.
    return [];
  }
}

function readImage(dir: string, fileName: string): ImageFile | null {
  try {
    const buffer = fs.readFileSync(path.join(dir, fileName));
    const { width, height, orientation } = imageSize(buffer);
    if (!width || !height) return null;
    // EXIF orientations 5–8 mean the photo is displayed rotated by 90°.
    const rotated = orientation !== undefined && orientation >= 5 && orientation <= 8;
    const urlDir = path.relative(PUBLIC_DIR, dir).split(path.sep).filter(Boolean).join("/");
    return {
      src: `/${urlDir ? `${urlDir}/` : ""}${encodeURIComponent(fileName)}`,
      width: rotated ? height : width,
      height: rotated ? width : height,
      hash: createHash("sha1").update(buffer).digest("hex"),
    };
  } catch {
    return null;
  }
}

function baseName(fileName: string) {
  return path.basename(fileName, path.extname(fileName));
}

function strip({ src, width, height }: ImageFile): SiteImage {
  return { src, width, height };
}

/**
 * Finds `main-page.*` / `main-page2.*` regardless of the extension.
 * Looks in public/images first, then in public/ itself.
 */
function findSpecial(name: (typeof SPECIAL)[number]): ImageFile | null {
  for (const dir of [IMAGES_DIR, PUBLIC_DIR]) {
    const candidates = listImageFiles(dir)
      .filter((file) => baseName(file).toLowerCase() === name)
      .sort(
        (a, b) =>
          EXTENSION_PRIORITY.indexOf(path.extname(a).toLowerCase()) -
          EXTENSION_PRIORITY.indexOf(path.extname(b).toLowerCase()),
      );
    for (const file of candidates) {
      const image = readImage(dir, file);
      if (image) return image;
    }
  }
  return null;
}

export function getSpecialImage(name: (typeof SPECIAL)[number]): SiteImage | null {
  const image = findSpecial(name);
  return image ? strip(image) : null;
}

/**
 * Every other photo in public/images becomes part of the gallery.
 * Byte-identical copies (including copies of the main photos) are skipped.
 */
export function getGalleryImages(): SiteImage[] {
  const seen = new Set(SPECIAL.map(findSpecial).flatMap((image) => (image ? [image.hash] : [])));
  const result: SiteImage[] = [];

  for (const file of listImageFiles(IMAGES_DIR).sort(collator.compare)) {
    const base = baseName(file);
    if ((SPECIAL as readonly string[]).includes(base.toLowerCase()) || SERVICE.test(base)) continue;
    const image = readImage(IMAGES_DIR, file);
    if (!image || seen.has(image.hash)) continue;
    seen.add(image.hash);
    result.push(strip(image));
  }
  return result;
}
