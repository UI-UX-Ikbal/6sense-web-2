import type { Metadata } from "next";
import { homeContent, orbitStates } from "@/content/home";
import { siteContent } from "@/content/site";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqSection } from "@/components/ui/FaqSection";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { InsightsSection } from "@/components/home/InsightsSection";
import { MissionSection } from "@/components/home/MissionSection";
import { NewsSection } from "@/components/home/NewsSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServicesSection } from "@/components/home/ServicesSection";

export const metadata: Metadata = {
  title: { absolute: siteContent.name },
  description: siteContent.home.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteContent.name,
    description: siteContent.home.description,
    url: "/",
  },
};

/** Homepage — Figma 11995:43840 (1440) / 11995:44828 (390). */
export default function HomePage() {
  const { cta } = homeContent;
  return (
    <>
      <HeroSection />
      <MissionSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection content={homeContent.testimonials} />
      <IndustriesSection />
      <NewsSection />
      <InsightsSection />
      <FaqSection content={homeContent.faq} />
      <CtaBand
        id="closing-cta-heading"
        heading={cta.heading}
        body={cta.body}
        link={cta.link}
        image={cta.image}
        mobileImage={cta.mobileImage}
        orbitStates={orbitStates}
      />
    </>
  );
}
