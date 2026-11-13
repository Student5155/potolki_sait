"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { ceilingTypes } from "@/lib/content";
import { site } from "@/lib/site";
import { Lines, Reveal } from "./Reveal";
import { SendButtons } from "./SendButtons";

const typeOptions = [...ceilingTypes.map((t) => t.name), "Пока не знаю"];
const roomOptions = ["Гостиная", "Спальня", "Кухня", "Ванная", "Детская", "Коридор", "Весь дом"];
const extraOptions = ["Скрытый карниз", "Ниша под шторы", "Второй уровень", "Обход труб", "Крепление люстры", "Вентиляционная решётка"];

function Stepper({ value, onChange, min = 0, max = 99, label }: { value: number; onChange: (v: number) => void; min?: number; max?: number; label: string }) {
  const btn = "flex h-12 w-12 items-center justify-center border border-ivory/15 transition-colors hover:border-champagne hover:text-champagne disabled:opacity-30 disabled:hover:border-ivory/15 disabled:hover:text-inherit";
  return (
    <div className="flex items-center gap-4">
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`${label}: меньше`}>
        <Minus size={16} strokeWidth={1.25} />
      </button>
      <span className="font-display w-12 text-center text-4xl tabular-nums" aria-live="polite">{value}</span>
      <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`${label}: больше`}>
        <Plus size={16} strokeWidth={1.25} />
      </button>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-4 py-3 text-[0.8125rem] transition-colors duration-300 ${
        active ? "border-champagne bg-champagne text-graphite" : "border-ivory/15 text-ivory/70 hover:border-ivory/50"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-ivory/10 py-8 md:py-10">
      <legend className="sr-only">{label}</legend>
      <div className="grid gap-5 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-base text-ivory" aria-hidden>{label}</p>
          {hint && <p className="mt-1.5 text-xs leading-relaxed text-ivory/40">{hint}</p>}
        </div>
        <div className="md:col-span-8">{children}</div>
      </div>
    </fieldset>
  );
}

export function Calculator() {
  const [area, setArea] = useState(18);
  const [room, setRoom] = useState(roomOptions[0]);
  const [type, setType] = useState(typeOptions[0]);
  const [lamps, setLamps] = useState(6);
  const [lines, setLines] = useState(false);
  const [lineMeters, setLineMeters] = useState(4);
  const [corners, setCorners] = useState(4);
  const [extras, setExtras] = useState<string[]>([]);
  const [city, setCity] = useState<string>(site.cities[0]);
  const [comment, setComment] = useState("");

  const message = useMemo(() => {
    const rows = [
      `Населённый пункт: ${city}`,
      `Помещение: ${room}`,
      `Площадь: ${area} м²`,
      `Тип потолка: ${type}`,
      `Светильники: ${lamps} шт.`,
      `Световые линии: ${lines ? `да, примерно ${lineMeters} м` : "нет"}`,
      `Углы: ${corners}`,
      `Дополнительно: ${extras.length ? extras.join(", ").toLowerCase() : "нет"}`,
    ];
    const note = comment.trim() ? `\n\nКомментарий: ${comment.trim()}` : "";
    return `Здравствуйте! Прошу сделать предварительный расчёт натяжного потолка.\n\n${rows.map((r) => `• ${r}`).join("\n")}${note}\n\nЗаявка с сайта.`;
  }, [area, room, type, lamps, lines, lineMeters, corners, extras, city, comment]);

  const toggleExtra = (e: string) => setExtras((prev) => (prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]));

  return (
    <section id="calc" className="bg-graphite text-ivory">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal><p className="eyebrow mb-6 text-champagne">Рассчитать стоимость</p></Reveal>
            <Lines lines={["Соберите свой", "потолок"]} className="text-[clamp(2.25rem,6vw,5.5rem)]" />
          </div>
          <Reveal delay={150} className="text-sm leading-relaxed text-ivory/55 md:col-span-4 md:col-start-9">
            Укажите параметры — мы соберём их в одно сообщение. Отправьте его нам в мессенджер, и мы быстро ответим
            с предварительным расчётом. Телефон оставлять не нужно.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Field label="Площадь помещения" hint="Примерно — точные размеры снимем на замере.">
              <div className="flex items-baseline gap-3">
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={300}
                  value={area}
                  onChange={(e) => setArea(Math.max(1, Math.min(300, Number(e.target.value) || 1)))}
                  aria-label="Площадь помещения, квадратных метров"
                  className="font-display w-28 border-b border-ivory/20 bg-transparent pb-1 text-6xl tabular-nums outline-none focus:border-champagne"
                />
                <span className="text-ivory/50">м²</span>
              </div>
              <input
                type="range"
                min={4}
                max={120}
                value={Math.min(120, Math.max(4, area))}
                onChange={(e) => setArea(Number(e.target.value))}
                aria-label="Площадь помещения — ползунок"
                className="mt-6"
                style={{ "--p": `${((Math.min(120, Math.max(4, area)) - 4) / 116) * 100}%` } as CSSProperties}
              />
            </Field>

            <Field label="Помещение">
              <div className="flex flex-wrap gap-2">
                {roomOptions.map((r) => (
                  <Chip key={r} active={room === r} onClick={() => setRoom(r)}>{r}</Chip>
                ))}
              </div>
            </Field>

            <Field label="Тип потолка" hint="Не уверены — выберите «Пока не знаю», подскажем.">
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((t) => (
                  <Chip key={t} active={type === t} onClick={() => setType(t)}>{t}</Chip>
                ))}
              </div>
            </Field>

            <Field label="Количество светильников">
              <Stepper value={lamps} onChange={setLamps} max={80} label="Светильники" />
            </Field>

            <Field label="Световые линии" hint="Длину можно указать приблизительно.">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                <div className="flex gap-2">
                  <Chip active={!lines} onClick={() => setLines(false)}>Не нужны</Chip>
                  <Chip active={lines} onClick={() => setLines(true)}>Нужны</Chip>
                </div>
                {lines && (
                  <div className="flex items-center gap-4">
                    <Stepper value={lineMeters} onChange={setLineMeters} min={1} max={60} label="Длина световых линий" />
                    <span className="text-sm text-ivory/50">метров</span>
                  </div>
                )}
              </div>
            </Field>

            <Field label="Количество углов" hint="В обычной прямоугольной комнате — четыре.">
              <Stepper value={corners} onChange={setCorners} min={3} max={30} label="Углы" />
            </Field>

            <Field label="Дополнительные конструкции">
              <div className="flex flex-wrap gap-2">
                {extraOptions.map((e) => (
                  <Chip key={e} active={extras.includes(e)} onClick={() => toggleExtra(e)}>{e}</Chip>
                ))}
              </div>
            </Field>

            <Field label="Населённый пункт">
              <div className="flex flex-wrap gap-2">
                {[...site.cities, "Другой"].map((c) => (
                  <Chip key={c} active={city === c} onClick={() => setCity(c)}>{c}</Chip>
                ))}
              </div>
              <label className="mt-8 block">
                <span className="text-xs text-ivory/40">Комментарий — по желанию</span>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, 400))}
                  rows={2}
                  maxLength={400}
                  placeholder="Например: дом из бруса, ремонт закончим в мае"
                  className="mt-2 w-full resize-none border-b border-ivory/20 bg-transparent py-2 text-[0.9375rem] outline-none placeholder:text-ivory/25 focus:border-champagne"
                />
              </label>
            </Field>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5">
            <div className="border border-ivory/10 bg-graphite-2 p-6 md:p-9 lg:sticky lg:top-28">
              <p className="eyebrow text-champagne">Ваша заявка</p>
              <div className="mt-6 rounded-2xl rounded-bl-sm bg-ivory px-5 py-4 text-graphite">
                <p className="whitespace-pre-line text-[0.875rem] leading-relaxed">{message}</p>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-ivory/60">
                Отправьте это сообщение нам — и мы непременно быстро ответим: уточним детали и назовём предварительную
                стоимость. Точная сумма — после замера, без скрытых платежей.
              </p>
              <div className="mt-7">
                <SendButtons message={message} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
