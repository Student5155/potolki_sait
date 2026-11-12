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

const defaultMessage = "Здравствуйте! Хочу обсудить натяжной потолок.";

/** Ссылка на чат WhatsApp с уже набранным сообщением */
export const waLink = (text: string = defaultMessage) =>
  `https://api.whatsapp.com/send?phone=${site.whatsapp}&text=${encodeURIComponent(text)}`;

/** Ссылка на чат Telegram по номеру телефона с уже набранным сообщением */
export const tgLink = (text: string = defaultMessage) =>
  `https://t.me/${site.telegram}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: "/#types", label: "Решения" },
  { href: "/#gallery", label: "Галерея" },
  { href: "/#light", label: "Свет" },
  { href: "/#process", label: "Процесс" },
  { href: "/#calc", label: "Расчёт" },
  { href: "/#faq", label: "Вопросы" },
] as const;
