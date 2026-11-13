import { advantages, stats } from "@/lib/content";
import { Lines, Reveal } from "./Reveal";
import { withBase } from "@/lib/site";

export function WhyUs() {
  return (
    <section id="why" className="bg-graphite text-ivory">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal><p className="eyebrow mb-6 text-champagne">Почему выбирают нас</p></Reveal>
            <Lines lines={["Доверие складывается", "из фактов"]} className="text-[clamp(2.25rem,6vw,5.5rem)]" />
          </div>
        </div>

        <dl className="mt-16 grid border-y border-ivory/10 md:mt-24 md:grid-cols-3 md:divide-x md:divide-ivory/10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120} className="border-b border-ivory/10 py-10 last:border-b-0 md:border-b-0 md:px-10 md:py-14 md:first:pl-0">
              <dd className="h-display flex items-baseline gap-3 text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.85] text-champagne-2">
                {s.value}
                {s.unit && <span className="text-[0.28em] text-ivory/60">{s.unit}</span>}
              </dd>
              <dt className="mt-6 max-w-[16rem] text-sm leading-relaxed text-ivory/60">{s.label}</dt>
            </Reveal>
          ))}
        </dl>

        <ul className="mt-6 grid md:mt-10 md:grid-cols-2 md:gap-x-16 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal as="li" key={a.title} delay={(i % 3) * 100} className="group border-b border-ivory/10 py-9">
              <p className="eyebrow text-ivory/30 transition-colors duration-500 group-hover:text-champagne">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="h-display mt-4 text-[1.9rem]">{a.title}</h3>
              <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/60">{a.text}</p>
            </Reveal>
          ))}
          <Reveal as="li" delay={200} className="flex flex-col justify-center border-b border-ivory/10 py-9">
            <p className="h-display text-[1.9rem] text-champagne-2">Хотите убедиться?</p>
            <a href={withBase("/#calc")} className="link-line mt-4 self-start text-[0.8125rem] uppercase tracking-[0.16em] text-ivory/80">
              Запросить расчёт
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
