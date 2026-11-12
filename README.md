# Сайт компании по натяжным потолкам

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Motion · Lucide.
Все страницы собираются статически (SSG).

## Запуск

```bash
npm install
npm run dev      # разработка: http://localhost:3000
npm run build    # production-сборка
npm run start    # запуск собранного сайта
```

## Где менять содержимое

| Что | Файл |
| --- | --- |
| Название компании, телефон, мессенджеры, домен | `lib/site.ts` |
| Виды потолков, галерея, преимущества, этапы, FAQ, отзывы | `lib/content.ts` |
| Тексты локальных страниц (4 населённых пункта) | `lib/cities.ts` |
| Цвета, шрифты, анимации | `app/globals.css` |

### Перед публикацией

1. **Название.** «СВОД» — рабочее название. Замените `name` в `lib/site.ts`.
2. **Домен.** Задайте `NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru` (или поправьте `url` в `lib/site.ts`) — от него зависят canonical, sitemap.xml, robots.txt и Schema.org.
3. **Отзывы.** В `lib/content.ts` лежат только образцы оформления (`demo: true`). Вставьте тексты настоящих сообщений клиентов из WhatsApp/Telegram и уберите флаг `demo`.
4. **Фотографии.** Сейчас используются интерьерные фото с Unsplash как примеры решений. Свои фото положите в `public/photos/` и укажите путь вида `/photos/gostinaya-1.webp` вместо `u("…")`.
5. **Telegram.** Ссылка ведёт на чат по номеру телефона. Если есть username, замените `tgLink` в `lib/site.ts` на `https://t.me/username`.

## Как работают заявки

Сайт не собирает телефоны и не хранит данные. Калькулятор и форма замера собирают параметры в готовое сообщение:
WhatsApp открывается с подставленным текстом, для Telegram текст копируется в буфер и открывается чат.

## Страницы

- `/` — главная (12 блоков)
- `/natyazhnye-potolki-mesyagutovo/`
- `/natyazhnye-potolki-verhnie-kigi/`
- `/natyazhnye-potolki-bolsheustikinskoe/`
- `/natyazhnye-potolki-novobelokatay/`
- `/sitemap.xml`, `/robots.txt`
