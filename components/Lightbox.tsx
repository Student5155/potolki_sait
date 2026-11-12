"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { lockScroll } from "./SmoothScroll";

export type LightboxItem = { image: string; alt: string; title: string; note?: string };

export function Lightbox({
  items,
  index,
  onChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const open = index !== null;
  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go, onChange]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          data-lenis-prevent
          className="fixed inset-0 z-[100] flex flex-col bg-graphite/97 text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-10">
            <p className="eyebrow text-ivory/60">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button
              onClick={() => onChange(null)}
              aria-label="Закрыть просмотр"
              className="flex h-12 w-12 items-center justify-center border border-ivory/20 transition-colors hover:border-champagne hover:text-champagne"
            >
              <X size={20} strokeWidth={1.25} />
            </button>
          </div>

          <div className="relative min-h-0 flex-1" onClick={() => onChange(null)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={item.image}
                className="absolute inset-0 mx-4 md:mx-24"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="100vw"
                  className="pointer-events-none object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Предыдущее фото"
              className="absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-ivory/20 transition-colors hover:border-champagne hover:text-champagne md:flex"
            >
              <ChevronLeft size={22} strokeWidth={1.25} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Следующее фото"
              className="absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-ivory/20 transition-colors hover:border-champagne hover:text-champagne md:flex"
            >
              <ChevronRight size={22} strokeWidth={1.25} />
            </button>
          </div>

          <div className="flex items-end justify-between gap-6 px-5 py-5 md:px-10">
            <div>
              <p className="font-display text-2xl md:text-3xl">{item.title}</p>
              {item.note && <p className="mt-1 max-w-xl text-sm text-ivory/55">{item.note}</p>}
            </div>
            <div className="flex gap-2 md:hidden">
              <button onClick={() => go(-1)} aria-label="Предыдущее фото" className="flex h-12 w-12 items-center justify-center border border-ivory/20">
                <ChevronLeft size={20} strokeWidth={1.25} />
              </button>
              <button onClick={() => go(1)} aria-label="Следующее фото" className="flex h-12 w-12 items-center justify-center border border-ivory/20">
                <ChevronRight size={20} strokeWidth={1.25} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
