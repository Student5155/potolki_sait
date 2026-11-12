import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center bg-graphite px-5 text-center text-ivory">
      <p className="eyebrow text-champagne">Ошибка 404</p>
      <h1 className="h-display mt-6 text-[clamp(2.5rem,7vw,5.5rem)]">Такой страницы нет</h1>
      <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/60">
        Возможно, ссылка устарела. Вернитесь на главную — всё самое важное там.
      </p>
      <Link href="/" className="btn mt-10">На главную</Link>
    </section>
  );
}
