// ─────────────────────────────────────────────────────────────
// Единая точка настройки сайта: название, контакты, домен.
// Меняйте значения здесь — они подтянутся на все страницы.
// ─────────────────────────────────────────────────────────────

export const site = {
  /** Рабочее название. Замените на настоящее название компании. */
  name: "СВОД",
  descriptor: "Натяжные потолки",
  /** Домен сайта без слэша в конце. Можно задать через NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.ru").replace(/\/$/, ""),
  phone: "+79871350550",
  phoneDisplay: "8 987 135-05-50",
  whatsapp: "79871350550",
  telegram: "+79871350550",
  cities: ["Месягутово", "Верхние Киги", "Большеустьикинское", "Новобелокатай"],
} as const;

export const telLink = `tel:${site.phone}`;

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Telegram не умеет подставлять текст в чат по номеру, поэтому текст копируем в буфер. */
export const tgLink = `https://t.me/${site.telegram}`;

export const nav = [
  { href: "/#types", label: "Решения" },
  { href: "/#gallery", label: "Галерея" },
  { href: "/#light", label: "Свет" },
  { href: "/#process", label: "Процесс" },
  { href: "/#calc", label: "Расчёт" },
  { href: "/#faq", label: "Вопросы" },
] as const;
