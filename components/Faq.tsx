"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lines, Reveal } from "./Reveal";

export function Faq({ items, title = ["Коротко", "о главном"] }: { items: { q: string; a: string }[]; title?: string[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ivory text-graphite">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <Reveal><p className="eyebrow mb-6 text-arch">Вопросы и ответы</p></Reveal>
              <Lines lines={title} className="text-[clamp(2.25rem,5.4vw,5rem)]" />
            </div>
          </div>

          <div className="border-t border-graphite/15 md:col-span-7 md:col-start-6">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.q} delay={Math.min(i, 4) * 60} className="border-b border-graphite/15">
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
                    >
                      <span className={`h-display text-[1.6rem] transition-colors duration-500 md:text-[2.1rem] ${isOpen ? "text-graphite" : "text-graphite/75 group-hover:text-graphite"}`}>
                        {item.q}
                      </span>
                      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-graphite/20 transition-colors duration-500 group-hover:border-graphite">
                        <span className="absolute h-px w-3.5 bg-current" />
                        <span className={`absolute h-3.5 w-px bg-current transition-transform duration-500 ${isOpen ? "scale-y-0" : ""}`} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-8 text-[0.9375rem] leading-relaxed text-graphite/70 md:text-base">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
