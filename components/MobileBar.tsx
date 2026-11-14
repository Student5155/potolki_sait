"use client";

import { useEffect, useState } from "react";
import { Calculator, MessageCircle, Phone } from "lucide-react";
import { telLink, waLink } from "@/lib/site";
import { withBase } from "@/lib/site";

/** Нижняя панель быстрого обращения — только на телефонах, появляется после первого экрана */
export function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 320;
      setShow(window.scrollY > window.innerHeight * 0.7 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.6875rem] uppercase tracking-[0.12em]";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-graphite pb-[env(safe-area-inset-bottom)] text-ivory transition-transform duration-500 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex divide-x divide-ivory/10">
        <a href={telLink} className={item}>
          <Phone size={18} strokeWidth={1.25} />
          Позвонить
        </a>
        <a href={waLink("Здравствуйте! Хочу обсудить натяжной потолок.")} target="_blank" rel="noopener noreferrer" className={item}>
          <MessageCircle size={18} strokeWidth={1.25} />
          Написать
        </a>
        <a href={withBase("/#calc")} className={`${item} text-champagne-2`}>
          <Calculator size={18} strokeWidth={1.25} />
          Расчёт
        </a>
      </div>
    </div>
  );
}
