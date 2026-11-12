"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Expand } from "lucide-react";
import { ceilingTypes } from "@/lib/content";
import { Lines, Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";

const lightboxItems = ceilingTypes.map((t) => ({ image: t.image, alt: t.alt, title: t.name, note: t.text }));

export function CeilingTypes() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const current = ceilingTypes[active];

  return (
    <section id="types" className="bg-graphite text-ivory">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-40">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal><p className="eyebrow mb-6 text-champagne">Решения</p></Reveal>
            <Lines lines={["Виды натяжных", "потолков"]} className="text-[clamp(2.25rem,6vw,5.5rem)]" />
          </div>
          <Reveal delay={150} className="max-w-sm text-sm leading-relaxed text-ivory/55">
            Девять направлений, из которых складывается современный потолок. Подходящее сочетание подбираем под ваше
            помещение на консультации.
          </Reveal>
        </div>

        {/* Десктоп: список + крупное изображение */}
        <div className="mt-20 hidden gap-10 lg:grid lg:grid-cols-12">
          <ul className="col-span-5 border-t border-ivory/10">
            {ceilingTypes.map((t, i) => (
              <li key={t.id}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setZoom(i)}
                  aria-label={`${t.name} — посмотреть пример в интерьере`}
                  className="group flex w-full items-baseline gap-6 border-b border-ivory/10 py-[1.05rem] text-left"
                >
                  <span className={`eyebrow w-8 transition-colors duration-500 ${active === i ? "text-champagne" : "text-ivory/30"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`h-display whitespace-nowrap text-[2rem] transition-[color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] xl:text-[2.5rem] ${active === i ? "translate-x-3 text-ivory" : "text-ivory/35"}`}>
                    {t.name}
                  </span>
                  <span className={`ml-auto hidden text-right text-xs text-ivory/45 transition-opacity duration-500 2xl:inline ${active === i ? "opacity-100" : "opacity-0"}`}>
                    {t.short}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="col-span-7">
            <div className="sticky top-28">
              <button onClick={() => setZoom(active)} className="group relative block aspect-[16/11] w-full overflow-hidden bg-graphite-2" aria-label="Посмотреть пример в интерьере">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.id}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.08 }}
                    animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
                    exit={{ opacity: 0.4, transition: { duration: 0.9 } }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image src={current.image} alt={current.alt} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                  </motion.div>
                </AnimatePresence>
                <span className="absolute bottom-5 right-5 z-10 flex items-center gap-3 bg-graphite/70 px-4 py-3 text-[0.6875rem] uppercase tracking-[0.18em] backdrop-blur-sm transition-colors duration-500 group-hover:bg-champagne group-hover:text-graphite">
                  <Expand size={14} strokeWidth={1.25} /> Пример в интерьере
                </span>
              </button>
              <div className="mt-6 flex min-h-[4.5rem] items-start justify-between gap-10">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.id}
                    className="max-w-lg text-[0.9375rem] leading-relaxed text-ivory/70"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {current.text}
                  </motion.p>
                </AnimatePresence>
                <p className="eyebrow shrink-0 pt-1 text-ivory/35">
                  {String(active + 1).padStart(2, "0")} / {String(ceilingTypes.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Телефон и планшет: горизонтальная лента карточек */}
      <div className="no-scrollbar -mt-10 flex snap-x snap-mandatory scroll-px-5 md:scroll-px-10 gap-4 overflow-x-auto px-5 pb-24 md:-mt-20 md:px-10 lg:hidden">
        {ceilingTypes.map((t, i) => (
          <article key={t.id} className="w-[78vw] max-w-[420px] shrink-0 snap-start">
            <button onClick={() => setZoom(i)} className="relative block aspect-[4/5] w-full overflow-hidden bg-graphite-2" aria-label={`${t.name} — посмотреть пример в интерьере`}>
              <Image src={t.image} alt={t.alt} fill sizes="78vw" className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-transparent to-transparent" />
              <span className="eyebrow absolute left-4 top-4 text-ivory/80">{String(i + 1).padStart(2, "0")}</span>
              <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center border border-ivory/30 bg-graphite/50 backdrop-blur-sm">
                <Expand size={16} strokeWidth={1.25} />
              </span>
              <span className="h-display absolute bottom-4 left-4 right-20 text-left text-3xl">{t.name}</span>
            </button>
            <p className="mt-4 text-sm leading-relaxed text-ivory/65">{t.text}</p>
          </article>
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>

      <Lightbox items={lightboxItems} index={zoom} onChange={setZoom} />
    </section>
  );
}
