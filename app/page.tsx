import { Hero } from "@/components/Hero";
import { Immersion } from "@/components/Immersion";
import { CeilingTypes } from "@/components/CeilingTypes";
import { Gallery } from "@/components/Gallery";
import { WhyUs } from "@/components/WhyUs";
import { Lighting } from "@/components/Lighting";
import { Process } from "@/components/Process";
import { Calculator } from "@/components/Calculator";
import { Geography } from "@/components/Geography";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { faq } from "@/lib/content";
import { faqSchema, localBusinessSchema, serviceSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[localBusinessSchema(), serviceSchema(), faqSchema(faq)]} />
      <Hero />
      <Immersion />
      <CeilingTypes />
      <Gallery />
      <WhyUs />
      <Lighting />
      <Process />
      <Calculator />
      <Geography />
      <Faq items={faq} />
      <FinalCta />
    </>
  );
}
