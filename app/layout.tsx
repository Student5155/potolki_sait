import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const title = "Натяжные потолки в Месягутово, Верхних Кигах, Большеустьикинском и Новобелокатае";
const description =
  "Современные натяжные потолки с продуманным светом: матовые, парящие, теневые, световые линии. Замер в согласованный день, монтаж за один день, гарантия. Рассчитайте стоимость онлайн.";
const ogImage = "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?auto=format&fit=crop&w=1200&h=630&q=75";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${title} — ${site.name}`, template: `%s — ${site.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: `${site.name} — натяжные потолки`,
    title,
    description,
    url: "/",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Гостиная с современным натяжным потолком" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#17191B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <noscript>
          <style>{`.rv,.rv-mask>*,.rv-lines .line>span{opacity:1!important;transform:none!important;clip-path:none!important}.intro-curtain{display:none}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ivory focus:px-4 focus:py-3 focus:text-graphite">
          Перейти к содержанию
        </a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
