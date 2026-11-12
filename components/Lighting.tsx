"use client";

import { useEffect, useRef, useState } from "react";
import { Lines, Reveal } from "./Reveal";

type Key = "lines" | "contour" | "floating" | "spots" | "cornice";

const lights: { key: Key; name: string; text: string }[] = [
  { key: "lines", name: "Световые линии", text: "Ровный основной свет и графика потолка." },
  { key: "contour", name: "Контурная подсветка", text: "Тёплое свечение, которое ложится на стены." },
  { key: "floating", name: "Парящий потолок", text: "Свет в зазоре — полотно словно отрывается от стен." },
  { key: "spots", name: "Точечное освещение", text: "Направленный свет там, где он нужен." },
  { key: "cornice", name: "Скрытый карниз", text: "Шторы выходят из потолка, свет скользит по ткани." },
];

const scenes: { name: string; keys: Key[] }[] = [
  { name: "Вечер", keys: ["contour", "cornice"] },
  { name: "Гости", keys: ["lines", "spots", "cornice"] },
  { name: "Всё сразу", keys: ["lines", "contour", "floating", "spots", "cornice"] },
  { name: "Выключить", keys: [] },
];

const spots = [
  { x: 230, y: 50, s: 1.25, px: 215, py: 652, rx: 130, ry: 26 },
  { x: 600, y: 42, s: 1.3, px: 600, py: 664, rx: 140, ry: 28 },
  { x: 970, y: 50, s: 1.25, px: 985, py: 652, rx: 130, ry: 26 },
  { x: 352, y: 136, s: 0.8, px: 345, py: 548, rx: 78, ry: 13 },
  { x: 600, y: 130, s: 0.8, px: 600, py: 552, rx: 80, ry: 14 },
  { x: 848, y: 136, s: 0.8, px: 855, py: 548, rx: 78, ry: 13 },
];

export function Lighting() {
  const [on, setOn] = useState<Set<Key>>(new Set());
  const stage = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  // при первом появлении свет включается сам — по очереди
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        (["contour", "lines", "cornice"] as Key[]).forEach((k, i) => {
          timers.push(
            window.setTimeout(() => {
              if (!touched.current) setOn((prev) => new Set(prev).add(k));
            }, 500 + i * 750),
          );
        });
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const toggle = (k: Key) => {
    touched.current = true;
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };
  const applyScene = (keys: Key[]) => {
    touched.current = true;
    setOn(new Set(keys));
  };

  const c = (k: Key) => `lx ${on.has(k) ? "on" : ""}`;
  const darkness = Math.max(0.1, 0.84 - on.size * 0.15);

  return (
    <section id="light" className="bg-[#0f1011] text-ivory">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal><p className="eyebrow mb-6 text-champagne">Освещение</p></Reveal>
            <Lines lines={["Свет, который", "создаёт атмосферу"]} className="text-[clamp(2.25rem,6vw,5.5rem)]" />
          </div>
          <Reveal delay={150} className="text-sm leading-relaxed text-ivory/55 md:col-span-4 md:col-start-9">
            Один потолок — несколько сценариев. Включайте и выключайте источники света и смотрите, как меняется комната.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-8">
            <div ref={stage} className="relative overflow-hidden bg-black">
              <svg viewBox="0 0 1200 700" className="block h-auto w-full" role="img" aria-label="Схема комнаты: интерактивная демонстрация сценариев освещения потолка">
                <defs>
                  <linearGradient id="lg-ceil" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#e3e0d9" />
                    <stop offset="1" stopColor="#cfcbc3" />
                  </linearGradient>
                  <linearGradient id="lg-floor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7d7468" />
                    <stop offset="1" stopColor="#a1978a" />
                  </linearGradient>
                  <linearGradient id="lg-wl" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#bdb9b0" />
                    <stop offset="1" stopColor="#a9a59c" />
                  </linearGradient>
                  <linearGradient id="lg-wr" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0" stopColor="#c2beb5" />
                    <stop offset="1" stopColor="#aeaaa1" />
                  </linearGradient>
                  <linearGradient id="lg-warm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffd08a" stopOpacity="0.75" />
                    <stop offset="1" stopColor="#ffd08a" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lg-cool" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f4f7ff" stopOpacity="0.7" />
                    <stop offset="1" stopColor="#f4f7ff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lg-curtain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fff0d2" stopOpacity="0.9" />
                    <stop offset="0.75" stopColor="#fff0d2" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lg-cone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fff6e6" stopOpacity="0.22" />
                    <stop offset="1" stopColor="#fff6e6" stopOpacity="0.02" />
                  </linearGradient>
                  <radialGradient id="rg-pool">
                    <stop offset="0" stopColor="#fff3dc" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#fff3dc" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="rg-wash">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>
                  <pattern id="pt-folds" width="16" height="10" patternUnits="userSpaceOnUse">
                    <rect width="16" height="10" fill="#b4ad9f" />
                    <rect x="0" width="5" height="10" fill="#9d9688" />
                    <rect x="11" width="2" height="10" fill="#c4bdaf" />
                  </pattern>
                  <filter id="f-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="10" />
                  </filter>
                  <filter id="f-glow-lg" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="26" />
                  </filter>
                  <filter id="f-soft"><feGaussianBlur stdDeviation="3" /></filter>
                </defs>

                {/* ── Комната ── */}
                <polygon points="0,0 1200,0 900,180 300,180" fill="url(#lg-ceil)" />
                <rect x="300" y="180" width="600" height="320" fill="#c7c3ba" />
                <polygon points="0,0 300,180 300,500 0,700" fill="url(#lg-wl)" />
                <polygon points="1200,0 900,180 900,500 1200,700" fill="url(#lg-wr)" />
                <polygon points="0,700 1200,700 900,500 300,500" fill="url(#lg-floor)" />
                {[120, 360, 600, 840, 1080].map((x) => (
                  <line key={x} x1={x} y1="700" x2={300 + (x / 1200) * 600} y2="500" stroke="#000" strokeOpacity="0.12" />
                ))}
                <g stroke="#000" strokeOpacity="0.22" fill="none">
                  <polyline points="0,0 300,180 900,180 1200,0" />
                  <polyline points="0,700 300,500 900,500 1200,700" />
                  <line x1="300" y1="180" x2="300" y2="500" />
                  <line x1="900" y1="180" x2="900" y2="500" />
                </g>

                {/* окно со шторами */}
                <rect x="640" y="182" width="230" height="318" fill="url(#pt-folds)" />
                <rect x="716" y="182" width="78" height="318" fill="#5f6a75" opacity="0.55" />
                <rect x="640" y="182" width="230" height="318" fill="#000" opacity="0.08" />

                {/* картина, диван, столик */}
                <rect x="372" y="248" width="170" height="112" fill="#8f8a80" />
                <rect x="384" y="260" width="146" height="88" fill="#b9b2a4" />
                <path d="M384 330 L430 292 L470 318 L500 284 L530 312 L530 348 L384 348 Z" fill="#8a8477" />
                <rect x="340" y="404" width="270" height="62" rx="6" fill="#57544f" />
                <rect x="328" y="440" width="294" height="50" rx="6" fill="#65625c" />
                <rect x="352" y="414" width="76" height="34" rx="5" fill="#b6a58a" />
                <rect x="436" y="414" width="76" height="34" rx="5" fill="#77736c" />
                <rect x="520" y="414" width="76" height="34" rx="5" fill="#77736c" />
                <rect x="336" y="490" width="6" height="12" fill="#2b2a28" />
                <rect x="608" y="490" width="6" height="12" fill="#2b2a28" />
                <ellipse cx="600" cy="606" rx="330" ry="58" fill="#b9b1a3" opacity="0.5" />
                <ellipse cx="600" cy="596" rx="118" ry="20" fill="#34322f" />
                <rect x="596" y="596" width="8" height="34" fill="#2b2a28" />
                <ellipse cx="600" cy="632" rx="46" ry="7" fill="#2b2a28" />

                {/* ── Темнота: чем больше света включено, тем она слабее ── */}
                <rect width="1200" height="700" fill="#07080a" style={{ opacity: darkness, transition: "opacity 1s ease" }} />

                {/* ── Парящий потолок ── */}
                <g className={c("floating")}>
                  <polyline points="0,0 300,180 900,180 1200,0" fill="none" stroke="#f4f7ff" strokeWidth="46" filter="url(#f-glow-lg)" opacity="0.75" />
                  <rect x="300" y="180" width="600" height="120" fill="url(#lg-cool)" opacity="0.6" />
                  <polygon points="6,8 300,186 900,186 1194,8 1200,0 900,180 300,180 0,0" fill="#0a0a0a" />
                  <polyline points="6,8 300,186 900,186 1194,8" fill="none" stroke="#ffffff" strokeWidth="2.5" filter="url(#f-soft)" />
                </g>

                {/* ── Контурная подсветка ── */}
                <g className={c("contour")}>
                  <rect x="300" y="180" width="600" height="190" fill="url(#lg-warm)" />
                  <polygon points="0,0 300,180 300,350 0,330" fill="url(#lg-warm)" opacity="0.7" />
                  <polygon points="1200,0 900,180 900,350 1200,330" fill="url(#lg-warm)" opacity="0.7" />
                  <polyline points="0,0 300,180 900,180 1200,0" fill="none" stroke="#ffc978" strokeWidth="16" filter="url(#f-glow)" />
                  <polyline points="0,0 300,180 900,180 1200,0" fill="none" stroke="#ffe9c4" strokeWidth="3" />
                </g>

                {/* ── Скрытый карниз ── */}
                <g className={c("cornice")}>
                  <rect x="632" y="182" width="246" height="300" fill="url(#lg-curtain)" />
                  <rect x="632" y="180" width="246" height="8" fill="#fff6e2" filter="url(#f-glow)" />
                  <rect x="640" y="181" width="230" height="3" fill="#fffaf0" />
                </g>

                {/* ── Точечное освещение ── */}
                <g className={c("spots")}>
                  {spots.map((s, i) => (
                    <g key={i}>
                      <polygon points={`${s.x - 9 * s.s},${s.y} ${s.x + 9 * s.s},${s.y} ${s.px + s.rx},${s.py} ${s.px - s.rx},${s.py}`} fill="url(#lg-cone)" />
                      <ellipse cx={s.px} cy={s.py} rx={s.rx} ry={s.ry} fill="url(#rg-pool)" />
                      <ellipse cx={s.x} cy={s.y} rx={26 * s.s} ry={10 * s.s} fill="#fff3dc" filter="url(#f-glow)" opacity="0.9" />
                      <ellipse cx={s.x} cy={s.y} rx={11 * s.s} ry={4 * s.s} fill="#ffffff" />
                    </g>
                  ))}
                </g>

                {/* ── Световые линии ── */}
                <g className={c("lines")}>
                  <ellipse cx="600" cy="610" rx="470" ry="100" fill="url(#rg-wash)" opacity="0.55" />
                  <ellipse cx="600" cy="90" rx="430" ry="110" fill="url(#rg-wash)" opacity="0.5" />
                  <g fill="none" stroke="#fff4dc" strokeLinecap="square" filter="url(#f-glow)" opacity="0.95">
                    <path d="M350 0 L482 180" strokeWidth="18" />
                    <path d="M850 0 L718 180" strokeWidth="18" />
                    <path d="M416 90 L784 90" strokeWidth="14" />
                  </g>
                  <g fill="#ffffff">
                    <polygon points="344,0 356,0 484.500,180 479.500,180" />
                    <polygon points="844,0 856,0 720.500,180 715.500,180" />
                    <polygon points="414,87 786,87 783,93 417,93" />
                  </g>
                </g>
              </svg>

              <p className="eyebrow pointer-events-none absolute left-4 top-4 text-ivory/50 md:left-6 md:top-6">
                {on.size === 0 ? "Свет выключен" : `Включено источников: ${on.size}`}
              </p>
            </div>

            <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
              {scenes.map((s) => {
                const activeScene = s.keys.length === on.size && s.keys.every((k) => on.has(k));
                return (
                  <button
                    key={s.name}
                    onClick={() => applyScene(s.keys)}
                    className={`shrink-0 border px-5 py-3 text-[0.75rem] uppercase tracking-[0.14em] transition-colors duration-500 ${
                      activeScene ? "border-champagne bg-champagne text-graphite" : "border-ivory/15 text-ivory/65 hover:border-ivory/50"
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-4">
            <ul className="border-t border-ivory/10">
              {lights.map((l) => {
                const active = on.has(l.key);
                return (
                  <li key={l.key}>
                    <button
                      role="switch"
                      aria-checked={active}
                      onClick={() => toggle(l.key)}
                      className="group flex w-full items-center gap-5 border-b border-ivory/10 py-5 text-left"
                    >
                      <span className="flex-1">
                        <span className={`h-display block text-[1.65rem] transition-colors duration-500 md:text-3xl ${active ? "text-ivory" : "text-ivory/45"}`}>
                          {l.name}
                        </span>
                        <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-ivory/45">{l.text}</span>
                      </span>
                      <span className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-500 ${active ? "border-champagne bg-champagne/25" : "border-ivory/25"}`}>
                        <span
                          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            active ? "left-[26px] bg-champagne-2 shadow-[0_0_14px_2px_rgba(205,191,166,0.8)]" : "left-1.5 bg-ivory/40"
                          }`}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-ivory/40">
              Схема условная: реальное расположение света подбирается под планировку вашей комнаты на замере.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
