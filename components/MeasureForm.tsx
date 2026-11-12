"use client";

import { useMemo, useState } from "react";
import { site } from "@/lib/site";
import { SendButtons } from "./SendButtons";

const roomOptions = ["Гостиная", "Спальня", "Кухня", "Ванная", "Детская", "Коридор", "Весь дом"];

/** Короткая заявка на замер: два выбора и необязательное пожелание по дате */
export function MeasureForm({ defaultCity }: { defaultCity?: string }) {
  const [city, setCity] = useState<string>(defaultCity ?? site.cities[0]);
  const [room, setRoom] = useState(roomOptions[0]);
  const [when, setWhen] = useState("");

  const message = useMemo(
    () =>
      `Здравствуйте! Хочу заказать замер для натяжного потолка.\n\n• Населённый пункт: ${city}\n• Помещение: ${room}${
        when.trim() ? `\n• Удобное время: ${when.trim()}` : ""
      }\n\nЗаявка с сайта.`,
    [city, room, when],
  );

  const chip = (active: boolean) =>
    `border px-4 py-3 text-[0.8125rem] transition-colors duration-300 ${
      active ? "border-champagne bg-champagne text-graphite" : "border-ivory/15 text-ivory/70 hover:border-ivory/50"
    }`;

  return (
    <form className="border border-ivory/10 bg-graphite-2/95 p-6 md:p-9 lg:bg-graphite-2/80 lg:backdrop-blur-md" onSubmit={(e) => e.preventDefault()}>
      <p className="eyebrow text-champagne">Заказать замер</p>
      <p className="mt-3 text-sm leading-relaxed text-ivory/60">
        Выберите два пункта — и отправьте готовое сообщение. Телефон оставлять не нужно.
      </p>

      <fieldset className="mt-7">
        <legend className="mb-3 text-xs text-ivory/45">Населённый пункт</legend>
        <div className="flex flex-wrap gap-2">
          {site.cities.map((c) => (
            <button type="button" key={c} onClick={() => setCity(c)} aria-pressed={city === c} className={chip(city === c)}>{c}</button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="mb-3 text-xs text-ivory/45">Помещение</legend>
        <div className="flex flex-wrap gap-2">
          {roomOptions.map((r) => (
            <button type="button" key={r} onClick={() => setRoom(r)} aria-pressed={room === r} className={chip(room === r)}>{r}</button>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className="text-xs text-ivory/45">Когда удобно — по желанию</span>
        <input
          value={when}
          onChange={(e) => setWhen(e.target.value.slice(0, 80))}
          maxLength={80}
          placeholder="Например: в субботу после обеда"
          className="mt-2 w-full border-b border-ivory/20 bg-transparent py-2 text-[0.9375rem] outline-none placeholder:text-ivory/25 focus:border-champagne"
        />
      </label>

      <div className="mt-8">
        <SendButtons message={message} />
      </div>
    </form>
  );
}
