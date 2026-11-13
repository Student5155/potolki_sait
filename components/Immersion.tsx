import { images } from "@/lib/content";
import { Lines, Reveal } from "./Reveal";
import { Parallax } from "./Parallax";
import { Photo } from "./Photo";

const points = [
  { n: "01", title: "Свет, который создаёт атмосферу", text: "Один и тот же интерьер утром, вечером и ночью выглядит по-разному — если свет продуман заранее." },
  { n: "02", title: "Каждая линия на своём месте", text: "Ровная плоскость и точные примыкания собирают комнату в единое целое." },
  { n: "03", title: "Интерьер начинается с деталей", text: "Скрытый карниз, тонкий теневой зазор, аккуратные светильники — их не замечают, но чувствуют." },
];

export function Immersion() {
  return (
    <section id="about" className="bg-ivory text-graphite">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-arch">Восприятие пространства</p>
          </Reveal>
          <div className="md:col-span-9">
            <Lines
              lines={["Потолок — это больше,", "чем просто поверхность"]}
              className="text-[clamp(2.25rem,6vw,5.5rem)]"
            />
            <Reveal delay={200} className="mt-8 max-w-xl text-base leading-relaxed text-graphite/70 md:mt-10 md:text-lg">
              Это самая большая непрерывная плоскость в комнате. От неё зависит, каким кажется помещение — высоким или
              приземистым, спокойным или суетливым, обычным или собранным. Представьте, как изменится ваша гостиная.
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:mt-28 md:grid-cols-12 md:gap-8">
          <Reveal variant="rv-mask" className="md:col-span-8">
            <Parallax className="aspect-[4/3] md:aspect-[16/10]">
              <Photo src={images.immersionA} alt="Просторная гостиная: многоуровневый потолок со встроенным светом собирает зоны в единое пространство" sizes="(min-width: 768px) 66vw, 100vw" />
            </Parallax>
          </Reveal>
          <div className="flex flex-col justify-between gap-8 md:col-span-4">
            <Reveal variant="rv-mask" delay={150} className="md:mt-24">
              <Parallax className="aspect-[4/5]" amount={6}>
                <Photo src={images.immersionB} alt="Световая линия на потолке — графичная деталь современного интерьера" sizes="(min-width: 768px) 33vw, 100vw" />
              </Parallax>
            </Reveal>
            <Reveal delay={250} className="text-sm leading-relaxed text-arch">
              Обычный потолок просто закрывает перекрытие. Продуманный — управляет светом, пропорциями и настроением комнаты.
            </Reveal>
          </div>
        </div>

        <ul className="mt-20 grid gap-10 border-t border-graphite/15 pt-12 md:mt-32 md:grid-cols-3 md:gap-12 md:pt-16">
          {points.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 120}>
              <h3 className="h-display text-3xl md:text-[2.25rem]">{p.title}</h3>
              <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-graphite/65">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
