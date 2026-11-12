"use client";

import { telLink, site } from "@/lib/site";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center bg-graphite px-5 text-center text-ivory">
      <p className="eyebrow text-champagne">Что-то пошло не так</p>
      <h1 className="h-display mt-6 text-[clamp(2.25rem,6vw,4.5rem)]">Страница не загрузилась</h1>
      <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/60">
        Попробуйте ещё раз. Если не получится — позвоните нам: <a href={telLink} className="text-ivory underline">{site.phoneDisplay}</a>
      </p>
      <button onClick={reset} className="btn mt-10">Обновить</button>
    </section>
  );
}
