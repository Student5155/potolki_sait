"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { processSteps } from "@/lib/content";
import { Lines, Reveal } from "./Reveal";

export function Process() {
  const list = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (line.current) line.current.style.transform = "none";
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list.current, start: "top 70%", end: "bottom 60%", scrub: 0.4 },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="bg-ivory text-graphite">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <Reveal><p className="eyebrow mb-6 text-arch">Как проходит работа</p></Reveal>
              <Lines lines={["Восемь шагов", "до готового", "потолка"]} className="text-[clamp(2.25rem,5.4vw,5rem)]" />
              <Reveal delay={200} className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-graphite/65">
                Никакой неопределённости: вы заранее знаете, что происходит на каждом этапе, сколько это стоит и когда
                будет готово.
              </Reveal>
            </div>
          </div>

          <ol ref={list} className="relative md:col-span-6 md:col-start-7">
            <span className="absolute bottom-0 left-[1.1875rem] top-0 w-px bg-graphite/12" aria-hidden />
            <span ref={line} className="absolute bottom-0 left-[1.1875rem] top-0 w-px origin-top scale-y-0 bg-champagne" aria-hidden />
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.title} className="relative flex gap-7 pb-12 last:pb-0 md:gap-10 md:pb-16">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-graphite/20 bg-ivory text-[0.6875rem] tracking-[0.1em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-0.5">
                  <h3 className="h-display text-[1.9rem] md:text-[2.5rem]">{s.title}</h3>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-graphite/65">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
