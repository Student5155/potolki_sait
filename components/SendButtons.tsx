"use client";

import { useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import { tgLink, waLink } from "@/lib/site";

/** Отправка готового сообщения в мессенджер. Клиент пишет сам — номер телефона на сайте не собирается. */
export function SendButtons({ message, tone = "dark" }: { message: string; tone?: "dark" | "light" }) {
  const [note, setNote] = useState<string | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      return true;
    } catch {
      return false;
    }
  };

  const flash = (text: string) => {
    setNote(text);
    window.setTimeout(() => setNote(null), 6000);
  };

  // Текст уже подставлен в ссылку; копия в буфере — запасной вариант, если мессенджер его не подхватил.
  const onSend = async () => {
    const ok = await copy();
    flash(
      ok
        ? "Сообщение уже набрано в чате — осталось нажать «Отправить». Если поле пустое, вставьте текст: он скопирован."
        : "Сообщение уже набрано в чате — осталось нажать «Отправить».",
    );
  };

  const onlyCopy = async () => {
    const ok = await copy();
    flash(ok ? "Текст заявки скопирован." : "Не удалось скопировать — выделите текст вручную.");
  };

  const ghost = tone === "dark" ? "text-ivory" : "text-graphite";

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <a href={waLink(message)} onClick={onSend} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
          <Send size={15} strokeWidth={1.25} /> WhatsApp
        </a>
        <a href={tgLink(message)} onClick={onSend} target="_blank" rel="noopener noreferrer" className={`btn ${ghost}`}>
          <Send size={15} strokeWidth={1.25} /> Telegram
        </a>
      </div>
      <button type="button" onClick={onlyCopy} className={`mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] opacity-60 transition-opacity hover:opacity-100 ${ghost}`}>
        {note?.includes("скопирован") ? <Check size={14} strokeWidth={1.25} /> : <Copy size={14} strokeWidth={1.25} />}
        Скопировать текст
      </button>
      <p role="status" aria-live="polite" className={`mt-3 min-h-[2.5rem] text-xs leading-relaxed text-champagne ${note ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        {note}
      </p>
    </div>
  );
}
