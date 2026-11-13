import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { Lines, Reveal } from "@/components/Reveal";
import { cities, cityBySlug } from "@/lib/cities";
import { faq as commonFaq, processSteps } from "@/lib/content";
import { breadcrumbSchema, faqSchema, localBusinessSchema, serviceSchema } from "@/lib/schema";
import { site, telLink } from "@/lib/site";
import { withBase } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cityBySlug((await params).slug);
  if (!city) return {};
  return {
    title: city.title,
    description: city.description,
    alternates: { canonical: `/${city.slug}/` },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      title: city.title,
      description: city.description,
      url: `/${city.slug}/`,
      images: [{ url: `https://images.unsplash.com/${city.heroImage.slice(3)}?auto=format&fit=crop&w=1200&h=630&q=75`, width: 1200, height: 630, alt: city.heroAlt }],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const city = cityBySlug((await params).slug);
  if (!city) notFound();

  const localFaq = [...city.faq, commonFaq[0], commonFaq[6], commonFaq[7]];
  const others = cities.filter((c) => c.slug !== city.slug);

  return (
    <>
      <JsonLd data={[localBusinessSchema(), serviceSchema(city), breadcrumbSchema(city), faqSchema(localFaq)]} />

      {/* Первый экран */}
      <section className="grain relative flex min-h-[86svh] flex-col justify-end overflow-hidden bg-graphite text-ivory">
        <div className="kenburns absolute inset-0">
          <Image src={city.heroImage} alt={city.heroAlt} fill priority sizes="(max-width: 767px) 130vw, 100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,25,27,0.6)_0%,rgba(23,25,27,0)_75%),linear-gradient(180deg,rgba(23,25,27,0.72)_0%,rgba(23,25,27,0.25)_32%,rgba(23,25,27,0.5)_60%,rgba(23,25,27,0.96)_100%)]" />
        <div className="light-line absolute inset-x-5 top-16 md:inset-x-10 md:top-20" style={{ "--d": "0.3s" } as CSSProperties} aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-[1680px] px-5 pb-12 pt-32 md:px-10 md:pb-16">
          <nav aria-label="Хлебные крошки" className="hero-fade mb-8 text-xs text-ivory/55" style={{ "--d": "0.2s" } as CSSProperties}>
            <Link href="/" className="transition-colors hover:text-ivory">Главная</Link>
            <span className="mx-2 text-ivory/30">/</span>
            <span>{city.name}</span>
          </nav>
          <p className="eyebrow hero-fade mb-5 text-champagne-2" style={{ "--d": "0.3s" } as CSSProperties}>{city.district}</p>
          <h1 className="h-display max-w-[16ch] text-[clamp(2.6rem,7.4vw,6.5rem)]">
            <span className="hero-line"><span style={{ "--i": -3 } as CSSProperties}>Натяжные потолки</span></span>
            <span className="hero-line"><span style={{ "--i": -2 } as CSSProperties}>{city.inName}</span></span>
          </h1>
          <div className="hero-fade mt-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10" style={{ "--d": "0.8s" } as CSSProperties}>
            <a href={withBase("/#calc")} className="btn">
              Рассчитать стоимость
              <ArrowRight className="arrow" size={16} strokeWidth={1.25} />
            </a>
            <a href={telLink} className="link-line self-start text-[0.8125rem] uppercase tracking-[0.16em] text-ivory/80 sm:self-auto">
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Местный контекст */}
      <section className="bg-ivory text-graphite">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3"><p className="eyebrow text-arch">{city.name}</p></Reveal>
            <Reveal className="h-display text-[clamp(1.75rem,3.4vw,3rem)] !leading-[1.15] md:col-span-9">{city.lead}</Reveal>
          </div>

          <div className="mt-20 grid gap-x-16 gap-y-16 md:mt-28 md:grid-cols-2">
            {city.sections.map((s, i) => (
              <Reveal as="article" key={s.heading} delay={i * 120} className="border-t border-graphite/15 pt-8">
                <h2 className="h-display text-[2rem] md:text-[2.75rem]">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-graphite/70 md:text-base">{p}</p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Что выбирают + примеры */}
      <section className="bg-graphite text-ivory">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-36">
          <Reveal><p className="eyebrow mb-6 text-champagne">Решения</p></Reveal>
          <Lines lines={["Что чаще всего", `выбирают ${city.inName}`]} className="text-[clamp(2.1rem,5vw,4.5rem)]" />

          <ul className="mt-14 grid border-t border-ivory/10 md:grid-cols-3 md:gap-x-12">
            {city.popular.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 100} className="border-b border-ivory/10 py-8 md:border-b-0">
                <h3 className="h-display text-[1.9rem]">{p.name}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ivory/60">{p.text}</p>
              </Reveal>
            ))}
          </ul>

          <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-6">
            {city.examples.map((e, i) => (
              <Reveal as="figure" key={e.image} delay={i * 120}>
                <div className="group relative aspect-[4/5] overflow-hidden bg-graphite-2">
                  <Photo src={e.image} alt={e.alt} sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                </div>
                <figcaption className="mt-4 text-sm text-ivory/60">{e.caption}</figcaption>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-col justify-between gap-4 text-xs leading-relaxed text-ivory/40 md:flex-row md:items-center">
            <p>Изображения — примеры решений. Фотографии наших объектов {city.inName} появятся здесь.</p>
            <a href={withBase("/#gallery")} className="link-line self-start text-[0.75rem] uppercase tracking-[0.16em] text-ivory/80">Вся галерея</a>
          </div>
        </div>
      </section>

      {/* Процесс кратко */}
      <section className="bg-ivory-2 text-graphite">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Lines lines={["От сообщения", "до готового потолка"]} className="text-[clamp(2.1rem,5vw,4.5rem)]" />
            <a href={withBase("/#process")} className="link-line self-start text-[0.75rem] uppercase tracking-[0.16em] md:self-auto">Подробно о процессе</a>
          </div>
          <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 4) * 80} className="border-t border-graphite/20 pt-5">
                <p className="eyebrow text-arch">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="h-display mt-3 text-2xl">{s.title}</h3>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Faq items={localFaq} title={["Вопросы", `из ${city.name === "Верхние Киги" ? "Верхних Киг" : city.name === "Большеустьикинское" ? "Большеустьикинского" : city.name === "Новобелокатай" ? "Новобелокатая" : "Месягутово"}`]} />

      <FinalCta image={city.heroImage} defaultCity={city.name} />

      {/* Перелинковка */}
      <nav aria-label="Другие населённые пункты" className="border-b border-ivory/10 bg-graphite text-ivory">
        <div className="mx-auto max-w-[1680px] px-5 py-14 md:px-10">
          <p className="eyebrow mb-6 text-champagne">Также работаем</p>
          <ul className="grid gap-x-10 md:grid-cols-3">
            {others.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}/`} className="group flex items-center justify-between border-t border-ivory/10 py-5">
                  <span>
                    <span className="h-display block text-3xl text-ivory/70 transition-colors group-hover:text-ivory">{c.name}</span>
                    <span className="mt-1 block text-xs text-ivory/40">{c.district}</span>
                  </span>
                  <ArrowRight size={18} strokeWidth={1.25} className="text-champagne-2 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
