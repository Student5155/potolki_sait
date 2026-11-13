import Link from "next/link";
import { cities } from "@/lib/cities";
import { nav, site, telLink, tgLink, waLink } from "@/lib/site";
import { withBase } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-graphite text-ivory">
      <div className="mx-auto max-w-[1680px] px-5 pb-10 pt-16 md:px-10 md:pt-24">
        <div className="grid gap-12 border-b border-ivory/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-4xl tracking-[0.32em]">{site.name}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/55">
              Натяжные потолки и продуманный свет. Продажа и профессиональный монтаж в Месягутово, Верхних Кигах,
              Большеустьикинском и Новобелокатае.
            </p>
          </div>

          <nav aria-label="Разделы сайта" className="md:col-span-2">
            <p className="eyebrow mb-5 text-champagne">Разделы</p>
            <ul className="space-y-3 text-sm text-ivory/70">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={withBase(n.href)} className="transition-colors hover:text-ivory">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="География работы" className="md:col-span-3">
            <p className="eyebrow mb-5 text-champagne">Где работаем</p>
            <ul className="space-y-3 text-sm text-ivory/70">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}/`} className="transition-colors hover:text-ivory">
                    Натяжные потолки {c.inName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="eyebrow mb-5 text-champagne">Связь</p>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li><a href={telLink} className="text-base text-ivory transition-colors hover:text-champagne-2">{site.phoneDisplay}</a></li>
              <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ivory">WhatsApp</a></li>
              <li><a href={tgLink()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ivory">Telegram</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-8 text-xs text-ivory/40 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Натяжные потолки.</p>
          <p>Изображения интерьеров — примеры решений, Unsplash.</p>
        </div>
      </div>
    </footer>
  );
}
