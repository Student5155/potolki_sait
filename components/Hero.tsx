"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, isTouchLayout, prefersReducedMotion } from "@/lib/gsap";
import { images } from "@/lib/content";
import { site } from "@/lib/site";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const drift = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isTouchLayout()) return;
    const ctx = gsap.context(() => {
      // глубина при прокрутке: изображение уходит медленнее текста
      gsap.to(media.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(content.current, {
        yPercent: -12,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
      });
    }, root);

    // едва заметное движение «камеры» за курсором — только с мышью
    let off: (() => void) | undefined;
    if (window.matchMedia("(pointer: fine)").matches && drift.current) {
      const x = gsap.quickTo(drift.current, "x", { duration: 1.6, ease: "power3.out" });
      const y = gsap.quickTo(drift.current, "y", { duration: 1.6, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        x((e.clientX / window.innerWidth - 0.5) * -22);
        y((e.clientY / window.innerHeight - 0.5) * -14);
      };
      window.addEventListener("pointermove", move, { passive: true });
      off = () => window.removeEventListener("pointermove", move);
    }
    return () => {
      off?.();
      ctx.revert();
    };
  }, []);

  const lines = ["Потолок, который", "меняет восприятие", "пространства"];

  return (
    <section ref={root} className="grain relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-graphite text-ivory">
      {/* короткое раскрытие первого экрана */}
      <div className="intro-curtain fixed inset-0 z-[60] flex items-center justify-center bg-graphite" aria-hidden>
        <span className="font-display text-3xl text-ivory md:text-4xl">{site.name}</span>
      </div>

      <div ref={media} className="absolute inset-0">
        <div ref={drift} className="absolute -inset-6">
          <div className="kenburns absolute inset-0">
            <Image
              src={images.hero}
              alt="Современная гостиная с дизайнерским потолком, встроенным светом и панорамными окнами"
              fill
              priority
              sizes="(max-width: 767px) 130vw, 100vw"
              className="object-cover object-[62%_50%]"
            />
          </div>
        </div>
      </div>

      {/* кинематографическое затемнение ради читаемости текста */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,25,27,0.72)_0%,rgba(23,25,27,0.1)_30%,rgba(23,25,27,0.25)_55%,rgba(23,25,27,0.94)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,25,27,0.6)_0%,rgba(23,25,27,0)_60%)]" />

      {/* световая линия под шапкой */}
      <div className="light-line absolute inset-x-5 top-16 md:inset-x-10 md:top-20" style={{ "--d": "1.1s" } as CSSProperties} aria-hidden />

      <div ref={content} className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-1 flex-col justify-end px-5 pb-8 md:px-10 md:pb-12">
        <p className="eyebrow hero-fade mb-6 text-champagne-2" style={{ "--d": "0.7s" } as CSSProperties}>
          Натяжные потолки · свет · монтаж
        </p>

        <h1 className="h-display text-[clamp(2.5rem,min(8.4vw,12.5svh),7.25rem)]">
          {lines.map((line, i) => (
            <span className="hero-line" key={line}>
              <span style={{ "--i": i } as CSSProperties}>{line} </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-[0.9375rem] leading-relaxed text-ivory/75 md:text-base" style={{ "--d": "1.35s" } as CSSProperties}>
            Современные натяжные потолки. Продуманный свет. Безупречная геометрия. Профессиональный монтаж.
          </p>

          <div className="hero-fade flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-9" style={{ "--d": "1.55s" } as CSSProperties}>
            <a href="/#calc" className="btn">
              Рассчитать стоимость
              <ArrowRight className="arrow" size={16} strokeWidth={1.25} />
            </a>
            <a href="/#gallery" className="link-line self-start text-[0.8125rem] uppercase tracking-[0.16em] text-ivory/80 sm:self-auto">
              Смотреть решения
            </a>
          </div>
        </div>

        <div className="hero-fade mt-9 md:mt-12" style={{ "--d": "1.8s" } as CSSProperties}>
          <div className="light-line mb-5 opacity-60" style={{ "--d": "1.9s" } as CSSProperties} aria-hidden />
          <div className="flex items-center justify-between gap-6">
            <p className="text-[0.6875rem] uppercase leading-relaxed tracking-[0.2em] text-ivory/65 md:text-xs">
              {site.cities.join(" · ")}
            </p>
            <span className="eyebrow hidden shrink-0 text-ivory/40 md:inline">Листайте вниз</span>
          </div>
        </div>
      </div>
    </section>
  );
}
