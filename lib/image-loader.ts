// Загрузчик изображений.
// Сейчас фотографии берутся с Unsplash (src вида "/u/photo-…"), сервис сам отдаёт AVIF/WebP нужной ширины.
// Собственные фото кладите в /public/photos и указывайте путь "/photos/имя.webp" — они отдаются как есть.
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("/u/")) {
    return `https://images.unsplash.com/${src.slice(3)}?auto=format&fit=crop&w=${width}&q=${quality ?? 70}`;
  }
  return `${src}?w=${width}`;
}
