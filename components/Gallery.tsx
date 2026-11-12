"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { gallery, rooms, type RoomId } from "@/lib/content";
import { Lines, Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";

const roomLabel = Object.fromEntries(rooms.map((r) => [r.id, r.label])) as Record<RoomId, string>;

const span: Record<string, string> = {
  big: "md:col-span-4 md:row-span-2",
  wide: "md:col-span-4",
  tall: "md:col-span-2 md:row-span-2",
  default: "md:col-span-2",
};

export function Gallery() {
  const [room, setRoom] = useState<RoomId>("all");
  const [zoom, setZoom] = useState<number | null>(null);

  const items = useMemo(() => (room === "all" ? gallery : gallery.filter((g) => g.room === room)), [room]);
  const lightboxItems = useMemo(
    () => items.map((g) => ({ image: g.image, alt: g.alt, title: g.title, note: `${roomLabel[g.room]} · пример решения` })),
    [items],
  );

  return (
    <section id="gallery" className="bg-ivory text-graphite">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal><p className="eyebrow mb-6 text-arch">Галерея</p></Reveal>
            <Lines lines={["Представьте это", "у себя дома"]} className="text-[clamp(2.25rem,6vw,5.5rem)]" />
          </div>
          <Reveal delay={150} className="text-sm leading-relaxed text-graphite/60 md:col-span-4 md:col-start-9">
            Примеры потолочных и световых решений — так может выглядеть ваш интерьер после ремонта. Выберите помещение
            и откройте любое фото на весь экран.
          </Reveal>
        </div>

        <Reveal delay={100} className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 md:mx-0 md:mt-16 md:flex-wrap md:px-0">
          {rooms.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setZoom(null);
                setRoom(r.id);
              }}
              aria-pressed={room === r.id}
              className={`shrink-0 border px-5 py-3 text-[0.75rem] uppercase tracking-[0.14em] transition-colors duration-500 ${
                room === r.id
                  ? "border-graphite bg-graphite text-ivory"
                  : "border-graphite/20 text-graphite/70 hover:border-graphite"
              }`}
            >
              {r.label}
            </button>
          ))}
        </Reveal>

        <div className="mt-8 grid grid-flow-dense grid-cols-2 gap-3 md:mt-12 md:auto-rows-[17vw] md:grid-cols-6 md:gap-5 2xl:auto-rows-[280px]">
            {items.map((g, i) => {
              const cls = room === "all" ? span[g.size ?? "default"] : i % 5 === 0 ? span.wide : span.default;
              const mobileWide = room === "all" ? g.size === "big" || g.size === "wide" : i % 3 === 0;
              return (
                <motion.button
                  key={g.image}
                  onClick={() => setZoom(i)}
                  aria-label={`${g.title} — открыть на весь экран`}
                  className={`group relative overflow-hidden bg-ivory-2 ${mobileWide ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"} md:aspect-auto ${cls}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={g.image}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 768px) 66vw, 100vw"
                    className="object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-graphite/75 via-graphite/0 to-graphite/0 opacity-70 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100" />
                  <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-left text-ivory md:inset-x-6 md:bottom-6 md:translate-y-3 md:opacity-0 md:transition-[opacity,transform] md:duration-700 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    <span>
                      <span className="eyebrow block text-champagne-2">{roomLabel[g.room]}</span>
                      <span className="font-display mt-1 block text-lg leading-tight md:text-2xl">{g.title}</span>
                    </span>
                    <span className="hidden h-11 w-11 shrink-0 items-center justify-center border border-ivory/40 md:flex">
                      <Plus size={18} strokeWidth={1.25} />
                    </span>
                  </span>
                </motion.button>
              );
            })}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-arch">
          Изображения показывают возможные решения и служат визуальным ориентиром. Фотографии выполненных нами объектов
          появятся в этом разделе.
        </p>
      </div>

      <Lightbox items={lightboxItems} index={zoom} onChange={setZoom} />
    </section>
  );
}
