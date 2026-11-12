"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, CheckCheck } from "lucide-react";
import { reviews } from "@/lib/content";
import { waLink } from "@/lib/site";
import { Lines, Reveal } from "./Reveal";

const sourceLabel = { whatsapp: "WhatsApp", telegram: "Telegram" } as const;

export function Reviews() {
  const track = useRef<HTMLDivElement>(null);
  const onlyDemo = reviews.every((r) => r.demo);

  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 460), behavior: "smooth" });
  };

  return (
    <section id="reviews" className="overflow-hidden bg-ivory text-graphite">
      <div className="mx-auto max-w-[1680px] px-5 pt-24 md:px-10 md:pt-40">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal><p className="eyebrow mb-6 text-arch">Отзывы</p></Reveal>
            <Lines lines={["Слова клиентов —", "без редактуры"]} className="text-[clamp(2.25rem,6vw,5.5rem)]" />
          </div>
          <Reveal delay={150} className="flex items-end gap-8">
            <p className="max-w-xs text-sm leading-relaxed text-graphite/60">
              Сообщения из WhatsApp и Telegram — так, как их написали сами заказчики.
            </p>
            <div className="hidden shrink-0 gap-2 md:flex">
              <button onClick={() => scroll(-1)} aria-label="Предыдущие отзывы" className="flex h-14 w-14 items-center justify-center border border-graphite/20 transition-colors hover:border-graphite hover:bg-graphite hover:text-ivory">
                <ArrowLeft size={18} strokeWidth={1.25} />
              </button>
              <button onClick={() => scroll(1)} aria-label="Следующие отзывы" className="flex h-14 w-14 items-center justify-center border border-graphite/20 transition-colors hover:border-graphite hover:bg-graphite hover:text-ivory">
                <ArrowRight size={18} strokeWidth={1.25} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={100}>
        <div ref={track} data-lenis-prevent-wheel className="no-scrollbar mt-12 flex snap-x snap-mandatory scroll-px-5 md:scroll-px-10 gap-4 overflow-x-auto px-5 pb-4 md:mt-20 md:gap-6 md:px-10 min-[1760px]:px-[calc((100vw-1600px)/2)]">
          {reviews.map((r, i) => {
            const wa = r.source === "whatsapp";
            return (
              <figure key={i} className="flex w-[84vw] max-w-[440px] shrink-0 snap-start flex-col overflow-hidden border border-graphite/10 bg-white/60">
                <figcaption className={`flex items-center gap-3 px-5 py-4 text-white ${wa ? "bg-[#1f6f63]" : "bg-[#517da2]"}`}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-display text-xl">
                    {r.name.charAt(0)}
                  </span>
                  <span className="flex-1 leading-tight">
                    <span className="block text-[0.9375rem] font-medium">{r.name}</span>
                    <span className="block text-xs text-white/70">{r.city}</span>
                  </span>
                  <span className="text-[0.625rem] uppercase tracking-[0.16em] text-white/75">{sourceLabel[r.source]}</span>
                </figcaption>
                <div className={`flex min-h-[220px] flex-1 flex-col justify-end p-5 ${wa ? "bg-[#ece5dc]" : "bg-[#dfe7ee]"}`}>
                  <blockquote className={`relative max-w-[92%] self-start rounded-2xl rounded-bl-sm px-4 pb-6 pt-3 text-[0.9375rem] leading-relaxed shadow-sm ${r.demo ? "bg-white/80 text-graphite/50" : "bg-white text-graphite"}`}>
                    {r.text}
                    <span className="absolute bottom-1.5 right-3 flex items-center gap-1 text-[0.6875rem] text-graphite/40">
                      {r.time} <CheckCheck size={13} className={wa ? "text-[#53bdeb]" : "text-[#4fae4e]"} />
                    </span>
                  </blockquote>
                </div>
                {r.demo && (
                  <p className="border-t border-graphite/10 px-5 py-3 text-[0.625rem] uppercase tracking-[0.18em] text-arch">
                    Образец оформления — здесь будет настоящий отзыв
                  </p>
                )}
              </figure>
            );
          })}
          <div className="w-1 shrink-0" aria-hidden />
        </div>
      </Reveal>

      <div className="mx-auto max-w-[1680px] px-5 pb-24 pt-8 md:px-10 md:pb-40">
        <div className="flex flex-col gap-5 border-t border-graphite/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-graphite/60">
            {onlyDemo
              ? "Мы публикуем только настоящие сообщения клиентов, поэтому раздел наполняется постепенно."
              : "Мы публикуем только настоящие сообщения клиентов — с их согласия."}{" "}
            Уже заказывали у нас потолок? Будем благодарны за пару слов.
          </p>
          <a href={waLink("Здравствуйте! Хочу оставить отзыв о вашей работе: ")} target="_blank" rel="noopener noreferrer" className="link-line self-start text-[0.8125rem] uppercase tracking-[0.16em]">
            Написать отзыв
          </a>
        </div>
      </div>
    </section>
  );
}
