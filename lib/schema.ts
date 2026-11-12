import { cities, type City } from "./cities";
import { ceilingTypes } from "./content";
import { site } from "./site";

const areaServed = cities.map((c) => ({ "@type": "Place", name: `${c.name}, ${c.district}, Республика Башкортостан` }));

export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${site.url}/#business`,
  name: `${site.name} — натяжные потолки`,
  url: site.url,
  telephone: site.phone,
  image: "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?auto=format&fit=crop&w=1200&q=75",
  description: "Продажа и профессиональный монтаж натяжных потолков и потолочного освещения.",
  areaServed,
  address: { "@type": "PostalAddress", addressRegion: "Республика Башкортостан", addressCountry: "RU" },
  contactPoint: { "@type": "ContactPoint", telephone: site.phone, contactType: "customer service", availableLanguage: "Russian" },
});

export const serviceSchema = (city?: City) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Монтаж натяжных потолков",
  name: city ? `Натяжные потолки ${city.inName}` : "Натяжные потолки под ключ",
  provider: { "@id": `${site.url}/#business` },
  areaServed: city ? { "@type": "Place", name: `${city.name}, ${city.district}, Республика Башкортостан` } : areaServed,
  url: city ? `${site.url}/${city.slug}/` : `${site.url}/`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Виды натяжных потолков",
    itemListElement: ceilingTypes.map((t) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t.name, description: t.text } })),
  },
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
});

export const breadcrumbSchema = (city: City) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: `Натяжные потолки ${city.inName}`, item: `${site.url}/${city.slug}/` },
  ],
});
