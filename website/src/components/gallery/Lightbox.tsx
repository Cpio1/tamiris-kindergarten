"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import type { SiteImage } from "@shared/lib/images";

type LightboxProps = {
  images: SiteImage[];
  index: number | null;
  onChange: (index: number | null) => void;
};

const SWIPE_DISTANCE = 60;

export function Lightbox({ images, index, onChange }: LightboxProps) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const open = index !== null;
  const total = images.length;

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => onChange(null), [onChange]);
  const go = useCallback(
    (step: number) => {
      if (index === null || total < 2) return;
      setDirection(step);
      onChange((index + step + total) % total);
    },
    [index, total, onChange],
  );

  // Body scroll lock + focus management.
  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      returnFocusRef.current?.focus();
    };
  }, [open]);

  // Keyboard: Esc closes, arrows navigate, Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 && Math.abs(info.offset.x) < 80) close();
    else if (info.offset.x < -SWIPE_DISTANCE) go(1);
    else if (info.offset.x > SWIPE_DISTANCE) go(-1);
  };

  if (!mounted) return null;
  const current = index ?? 0;
  const image = index !== null ? images[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && image && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.dialogLabel}
          className="fixed inset-0 z-[100] flex flex-col bg-[#1d2b20]/92 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 text-cream sm:px-6 sm:py-4" onClick={(e) => e.stopPropagation()}>
            <span className="text-sm font-bold tracking-wider text-cream/80" aria-live="polite">
              {t.gallery.counter(current + 1, total)}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={t.gallery.close}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-6 sm:px-20">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={image.src}
                custom={direction}
                className="relative h-full w-full max-w-6xl touch-pan-y"
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                drag={reduce ? false : true}
                dragSnapToOrigin
                dragElastic={0.25}
                onDragEnd={onDragEnd}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={image.src}
                  alt={t.gallery.photoAlt(current + 1)}
                  fill
                  sizes="100vw"
                  draggable={false}
                  className="pointer-events-none object-contain select-none"
                />
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <>
                <NavButton side="left" label={t.gallery.prev} onClick={() => go(-1)} />
                <NavButton side="right" label={t.gallery.next} onClick={() => go(1)} />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function NavButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute bottom-6 flex h-12 w-12 items-center justify-center rounded-full bg-cream/90 text-forest shadow-lift transition-transform hover:scale-105 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 ${
        side === "left" ? "left-4 sm:left-5" : "right-4 sm:right-5"
      }`}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </button>
  );
}
