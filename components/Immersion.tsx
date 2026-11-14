"use client";

import { useEffect, useRef, useState } from "react";
import { immersionSteps } from "@/lib/content";
import { Lines, Reveal } from "./Reveal";
import { Photo } from "./Photo";

/**
 * Три идеи сменяют друг друга сами: фото плавно перетекает в следующее, линия света пробегает по кадру,
 * а у активного пункта заполняется полоска времени. Наведение мыши ставит смену на паузу,
 * клик по пункту переключает вручную. При «уменьшении движения» автосмена отключена.
 */
export function Immersion() {
  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0); // меняется при ручном выборе — перезапускает полоску
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);
  const [still, setStill] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    setActive(i);
    setRound((r) => r + 1);
  };
  const next = () => go((active + 1) % immersionSteps.length);
  const running = inView && !hover && !still;

  return (
    <section id="about" className="bg-ivory text-graphite">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-arch">Восприятие пространства</p>
          </Reveal>
          <div className="md:col-span-9">
            <Lines lines={["Потолок — это больше,", "чем просто поверхность"]} className="text-[clamp(2.25rem,6vw,5.5rem)]" />
            <Reveal delay={200} className="mt-8 max-w-xl text-base leading-relaxed text-graphite/70 md:mt-10 md:text-lg">
              Это самая большая непрерывная плоскость в комнате. От неё зависит, каким кажется помещение — высоким или
              приземистым, спокойным или суетливым, обычным или собранным. Представьте, как изменится ваша гостиная.
            </Reveal>
          </div>
        </div>

        <div
          className="mt-14 grid gap-8 md:mt-24 lg:grid-cols-12 lg:gap-14"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Reveal className="min-w-0 lg:col-span-7">
            <div ref={frame} className="relative aspect-[5/4] overflow-hidden bg-graphite lg:aspect-[4/3]">
              {immersionSteps.map((s, i) => (
                <div
                  key={s.title}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${active === i ? "opacity-100" : "opacity-0"}`}
                >
                  <div
                    className={`absolute inset-0 transition-transform ease-out ${
                      active === i ? "scale-100 duration-[8000ms]" : "scale-[1.14] duration-[1600ms]"
                    }`}
                  >
                    <Photo src={s.image} alt={s.alt} sizes="(min-width: 1024px) 58vw, 100vw" />
                  </div>
                </div>
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/45 via-transparent to-transparent" />
              {/* линия света пробегает по кадру при каждой смене */}
              <div
                key={`${active}-${round}`}
                className="light-line pointer-events-none absolute inset-x-0 top-0"
                style={{ "--d": "0.1s" } as React.CSSProperties}
                aria-hidden
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="min-w-0 lg:col-span-5">
            <ul className="border-t border-graphite/15">
              {immersionSteps.map((s, i) => {
                const on = active === i;
                return (
                  <li key={s.title} className="border-b border-graphite/15">
                    <button
                      onClick={() => go(i)}
                      aria-current={on}
                      className="relative block w-full py-6 text-left md:py-7"
                    >
                      <span
                        className={`h-display block text-[1.7rem] leading-tight transition-colors duration-700 md:text-[2.1rem] ${
                          on ? "text-graphite" : "text-graphite/40"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-out ${
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-sm pt-3 text-[0.9375rem] leading-relaxed text-graphite/65">{s.text}</span>
                        </span>
                      </span>
                      {/* полоска времени до следующей смены */}
                      <span className="absolute inset-x-0 bottom-[-1px] h-px bg-transparent" aria-hidden>
                        {on && (
                          <span
                            key={`${i}-${round}`}
                            className={`step-bar block h-px bg-champagne ${still ? "!scale-x-100 !animate-none" : ""} ${running ? "" : "step-paused"}`}
                            onAnimationEnd={next}
                          />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-arch">
              Обычный потолок просто закрывает перекрытие. Продуманный — управляет светом, пропорциями и настроением комнаты.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
