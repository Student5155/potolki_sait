"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cities } from "@/lib/cities";
import { Lines, Reveal } from "./Reveal";

// Схема построена по реальным координатам сёл: север сверху.
const W = 520;
const H = 600;
const LON = [57.9, 59.3];
const LAT = [55.25, 56.1];
const px = (lon: number) => ((lon - LON[0]) / (LON[1] - LON[0])) * W;
const py = (lat: number) => ((LAT[1] - lat) / (LAT[1] - LAT[0])) * H;

const points = cities.map((c) => ({ ...c, x: px(c.lon), y: py(c.lat) }));
const order = [2, 0, 1, 3]; // контур зоны: Большеустьикинское → Месягутово → Киги → Новобелокатай
const outline = order.map((i) => `${points[i].x},${points[i].y}`).join(" ");
const center = {
  x: points.reduce((s, p) => s + p.x, 0) / points.length,
  y: points.reduce((s, p) => s + p.y, 0) / points.length,
};

export function Geography() {
  const [active, setActive] = useState(0);
  const current = points[active];

  return (
    <section id="geo" className="bg-graphite text-ivory">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal><p className="eyebrow mb-6 text-champagne">География работы</p></Reveal>
            <Lines lines={["Четыре района —", "один стандарт", "работы"]} className="text-[clamp(2.25rem,5.4vw,5rem)]" />
            <Reveal delay={150} className="mt-8 max-w-md text-[0.9375rem] leading-relaxed text-ivory/60">
              Работаем на северо-востоке Башкортостана. В какой бы точке вы ни находились — замер в согласованный день
              и монтаж в оговорённый срок.
            </Reveal>

            <ul className="mt-12 border-t border-ivory/10">
              {points.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}/`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-center gap-5 border-b border-ivory/10 py-5"
                  >
                    <span className={`h-2 w-2 shrink-0 rounded-full transition-all duration-500 ${active === i ? "bg-champagne-2 shadow-[0_0_12px_3px_rgba(205,191,166,0.7)]" : "bg-ivory/25"}`} />
                    <span className="flex-1">
                      <span className={`h-display block text-3xl transition-colors duration-500 md:text-4xl ${active === i ? "text-ivory" : "text-ivory/50"}`}>{p.name}</span>
                      <span className="mt-1 block text-xs text-ivory/40">{p.district}</span>
                    </span>
                    <ArrowUpRight size={20} strokeWidth={1.25} className={`transition-all duration-500 ${active === i ? "translate-x-0 text-champagne-2 opacity-100" : "-translate-x-2 opacity-0"}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={200} className="lg:col-span-5 lg:col-start-8">
            <div className="relative mx-auto max-w-[520px]">
              <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" role="img" aria-label="Схема расположения: Большеустьикинское на севере, Новобелокатай на востоке, Месягутово и Верхние Киги на юге">
                <defs>
                  <radialGradient id="geo-glow">
                    <stop offset="0" stopColor="#cdbfa6" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#cdbfa6" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* условные «горизонтали» */}
                {[90, 150, 215, 285, 360].map((r, i) => (
                  <ellipse key={r} cx={center.x} cy={center.y} rx={r} ry={r * 1.08} fill="none" stroke="#f2f0eb" strokeOpacity={0.09 - i * 0.012} transform={`rotate(${-18 + i * 5} ${center.x} ${center.y})`} />
                ))}
                <circle cx={center.x} cy={center.y} r="260" fill="url(#geo-glow)" />

                <polygon points={outline} fill="#b6a58a" fillOpacity="0.07" stroke="#b6a58a" strokeOpacity="0.5" strokeDasharray="2 7" />
                {points.map((p, i) => (
                  <line key={p.slug} x1={center.x} y1={center.y} x2={p.x} y2={p.y} stroke="#cdbfa6" strokeWidth={active === i ? 1.2 : 0.6} strokeOpacity={active === i ? 0.9 : 0.2} style={{ transition: "all .6s ease" }} />
                ))}

                {points.map((p, i) => {
                  const on = active === i;
                  const left = p.x > W * 0.6;
                  return (
                    <g key={p.slug} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className="cursor-pointer">
                      <circle cx={p.x} cy={p.y} r="34" fill="transparent" />
                      <circle cx={p.x} cy={p.y} r={on ? 22 : 12} fill="none" stroke="#cdbfa6" strokeOpacity={on ? 0.55 : 0.25} style={{ transition: "all .6s cubic-bezier(.16,1,.3,1)" }} />
                      {on && (
                        <circle cx={p.x} cy={p.y} r="22" fill="none" stroke="#cdbfa6">
                          <animate attributeName="r" from="14" to="46" dur="2.4s" repeatCount="indefinite" />
                          <animate attributeName="stroke-opacity" from="0.6" to="0" dur="2.4s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle cx={p.x} cy={p.y} r={on ? 5 : 3.5} fill={on ? "#ffffff" : "#cdbfa6"} style={{ transition: "all .5s ease" }} />
                      <text
                        x={left ? p.x - 32 : p.x + 32}
                        y={p.y + 5}
                        textAnchor={left ? "end" : "start"}
                        fill="#f2f0eb"
                        fillOpacity={on ? 1 : 0.55}
                        fontSize="15"
                        letterSpacing="0.04em"
                        style={{ transition: "fill-opacity .5s ease" }}
                      >
                        {p.name}
                      </text>
                    </g>
                  );
                })}

                <g transform={`translate(${W - 26} 30)`} fill="none" stroke="#f2f0eb" strokeOpacity="0.4">
                  <line x1="0" y1="26" x2="0" y2="0" />
                  <polyline points="-5,8 0,0 5,8" />
                  <text x="0" y="44" textAnchor="middle" fill="#f2f0eb" fillOpacity="0.45" stroke="none" fontSize="11" letterSpacing="0.2em">С</text>
                </g>
              </svg>

              <div className="mt-8 flex items-start justify-between gap-6 border-t border-ivory/10 pt-6">
                <div>
                  <p className="eyebrow text-champagne">{current.district}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                    Натяжные потолки {current.inName}: замер, подбор света и монтаж.
                  </p>
                </div>
                <Link href={`/${current.slug}/`} className="link-line shrink-0 text-[0.75rem] uppercase tracking-[0.16em]">
                  Подробнее
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
