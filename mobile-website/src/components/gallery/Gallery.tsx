"use client";

import { ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import type { SiteImage } from "@shared/lib/images";
import { Leaf } from "@shared/ui/Decorations";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Lightbox } from "./Lightbox";
import { arrangeRows, initialRowCount, shouldContain, tileRatio } from "./rows";

/** Organic corners that alternate tile by tile. */
const SHAPES = [
  "rounded-[1.25rem_0.4rem_1.25rem_1.25rem]",
  "rounded-[999px_999px_1rem_1rem]",
  "rounded-[1rem_1rem_1rem_0.4rem]",
  "rounded-[0.4rem_1.25rem_1.25rem_1.25rem]",
  "rounded-[1.25rem_1.25rem_0.4rem_1.25rem]",
];

export function Gallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const rows = useMemo(() => arrangeRows(images), [images]);
  // Lightbox order = reading order of the tiles.
  const ordered = useMemo(() => rows.flatMap((row) => row.images), [rows]);
  const initialRows = initialRowCount(rows);
  const visibleRows = expanded ? rows : rows.slice(0, initialRows);
  const hasMore = rows.length > initialRows;

  const toggle = () => {
    const button = toggleRef.current;
    if (!expanded || !button) {
      setExpanded((v) => !v);
      return;
    }
    // Collapsing removes the rows above the button: keep the button under the finger.
    const before = button.getBoundingClientRect().top;
    flushSync(() => setExpanded(false));
    window.scrollBy({ top: button.getBoundingClientRect().top - before, behavior: "instant" });
  };

  let index = 0;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-milk pt-6 pb-7">
      <div className="m-container">
        <Reveal className="flex items-end justify-between gap-3">
          <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
          {images.length > 0 && (
            <span className="mb-1 shrink-0 rounded-full bg-mint px-2.5 py-0.5 text-[0.7rem] font-extrabold text-forest tabular-nums">
              {images.length}
            </span>
          )}
        </Reveal>

        {images.length === 0 ? (
          <div className="m-shape-leaf relative mt-4 flex flex-col items-center gap-2 overflow-hidden border border-dashed border-leaf/50 bg-cream px-5 py-8 text-center">
            <Leaf aria-hidden tone="mint" className="absolute -top-2 -right-1 w-6 rotate-45" />
            <span className="m-shape-blob grid size-11 place-items-center bg-mint text-forest">
              <ImageIcon className="size-5" strokeWidth={1.7} aria-hidden />
            </span>
            <p className="font-semibold text-ink-soft">{t.gallery.empty}</p>
          </div>
        ) : (
          <>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {visibleRows.flatMap((row, r) =>
                row.images.map((image) => {
                  const i = index++;
                  const fresh = r >= initialRows;
                  const single = row.images.length === 1;
                  const contain = shouldContain(row.kind, image);
                  return (
                    <li
                      key={image.src}
                      className={`${single ? "col-span-2" : ""} ${SHAPES[i % SHAPES.length]} overflow-hidden ${fresh ? "animate-fade-up" : ""}`}
                      style={{
                        aspectRatio: tileRatio(row.kind, image),
                        ...(fresh ? { animationDelay: `${Math.min(r - initialRows, 4) * 60}ms` } : {}),
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={t.gallery.openPhoto(i + 1)}
                        className="relative block size-full overflow-hidden rounded-[inherit] bg-mint transition-[scale] duration-150 active:scale-[0.98]"
                      >
                        <Image
                          src={image.src}
                          alt={t.gallery.photoAlt(i + 1)}
                          fill
                          loading="lazy"
                          quality={70}
                          sizes={single ? "(max-width: 480px) 92vw, 448px" : "(max-width: 480px) 46vw, 224px"}
                          className={contain ? "object-contain" : "object-cover object-[center_35%]"}
                        />
                      </button>
                    </li>
                  );
                }),
              )}
            </ul>

            {hasMore && (
              <button
                ref={toggleRef}
                type="button"
                onClick={toggle}
                aria-expanded={expanded}
                className="m-btn m-btn-ghost mx-auto mt-4 flex w-full max-w-[19rem]"
              >
                {expanded ? t.gallery.collapse : t.gallery.showAll}
                {expanded ? (
                  <ChevronUp className="size-4" aria-hidden />
                ) : (
                  <ChevronDown className="size-4" aria-hidden />
                )}
              </button>
            )}
          </>
        )}
      </div>

      <Lightbox images={ordered} index={active} onChange={setActive} />
    </section>
  );
}
