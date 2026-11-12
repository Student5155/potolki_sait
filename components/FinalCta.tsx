import { ArrowRight } from "lucide-react";
import { images } from "@/lib/content";
import { site, telLink, waLink } from "@/lib/site";
import { Lines, Reveal } from "./Reveal";
import { Parallax } from "./Parallax";
import { Photo } from "./Photo";
import { MeasureForm } from "./MeasureForm";

export function FinalCta({ image = images.final, defaultCity }: { image?: string; defaultCity?: string }) {
  return (
    <section id="contact" className="grain relative overflow-hidden bg-graphite text-ivory">
      <Parallax className="!absolute inset-0" amount={7}>
        <Photo src={image} alt="Гостиная с тёплой подсветкой потолка — пример завершённого интерьера" sizes="(max-width: 767px) 130vw, 100vw" />
      </Parallax>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,25,27,0.8)_0%,rgba(23,25,27,0.62)_45%,rgba(23,25,27,0.95)_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-[1680px] gap-14 px-5 py-28 md:px-10 md:py-44 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow mb-6 text-champagne-2">Обсудить проект</p></Reveal>
          <Lines lines={["Ваш интерьер", "заслуживает", "продуманного", "завершения"]} className="text-[clamp(2.5rem,7vw,6.5rem)]" />
          <Reveal delay={250} className="mt-8 max-w-md text-base leading-relaxed text-ivory/75">
            Расскажите, каким вы хотите видеть своё пространство. Поможем подобрать подходящее потолочное решение.
          </Reveal>
          <Reveal delay={350} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <a href={waLink("Здравствуйте! Хочу обсудить проект натяжного потолка.")} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              Обсудить проект
              <ArrowRight className="arrow" size={16} strokeWidth={1.25} />
            </a>
            <a href={telLink} className="group self-start sm:self-auto">
              <span className="block text-xs text-ivory/50">или позвоните</span>
              <span className="font-display text-3xl transition-colors group-hover:text-champagne-2">{site.phoneDisplay}</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:col-span-5">
          <MeasureForm defaultCity={defaultCity} />
        </Reveal>
      </div>
    </section>
  );
}
