import type { NextConfig } from "next";

// Сайт собирается в обычные статические файлы (папка out) — их можно отдавать откуда угодно,
// в том числе с GitHub Pages. Адрес вида имя.github.io/репозиторий/ задаётся переменной
// NEXT_PUBLIC_BASE_PATH (её выставляет автосборка GitHub). Для своего домена она пустая.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 750, 1080, 1440, 1920, 2560],
  },
};

export default config;
