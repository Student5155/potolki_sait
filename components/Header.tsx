"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { nav, site, telLink, waLink } from "@/lib/site";
import { lockScroll } from "./SmoothScroll";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-ivory transition-[background-color,backdrop-filter,border-color] duration-700 ${
          scrolled && !open
            ? "border-b border-ivory/10 bg-graphite/95 lg:bg-graphite/80 lg:backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1680px] items-center justify-between px-5 md:h-20 md:px-10">
          <Link href="/" className="group flex items-baseline gap-3" aria-label={`${site.name} — на главную`} onClick={() => setOpen(false)}>
            <span className="font-display text-2xl tracking-[0.32em] md:text-[1.7rem]">{site.name}</span>
            <span className="eyebrow hidden text-ivory/55 sm:inline">{site.descriptor}</span>
          </Link>

          <nav aria-label="Основная навигация" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-[0.8125rem] tracking-wide text-ivory/75 transition-colors duration-300 hover:text-champagne-2">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a href={telLink} className="hidden text-sm tracking-wide text-ivory/90 transition-colors hover:text-champagne-2 md:inline">
              {site.phoneDisplay}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
              <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col bg-graphite px-5 pb-8 pt-24 text-ivory lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Мобильная навигация" className="flex flex-1 flex-col justify-center gap-1">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="h-display border-b border-ivory/10 py-4 text-[2.5rem]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <a href={telLink} className="btn !px-3">Позвонить</a>
              <a href={waLink("Здравствуйте! Хочу обсудить натяжной потолок.")} target="_blank" rel="noopener noreferrer" className="btn btn-solid !px-3">
                WhatsApp
              </a>
            </div>
            <p className="mt-6 text-center text-xs tracking-wide text-ivory/45">{site.cities.join(" · ")}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
