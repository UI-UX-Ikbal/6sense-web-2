import type { Metadata } from "next";
import { aboutContent } from "@/content/about";
import { routes } from "@/content/navigation";
import { AboutHero } from "@/components/about/AboutHero";
import { BeliefSection } from "@/components/about/BeliefSection";
import { PeopleSection } from "@/components/about/PeopleSection";
import { WhySection } from "@/components/about/WhySection";
import { WorkSection } from "@/components/about/WorkSection";
import { CtaBand } from "@/components/ui/CtaBand";

const { meta, cta } = aboutContent;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: routes.about },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: routes.about,
    images: [
      { url: aboutContent.hero.image.src, alt: aboutContent.hero.image.alt },
    ],
  },
};

/** About page — Figma 12263:1647 (1440) / 12263:2288 (390). */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <BeliefSection />
      <WhySection />
      <WorkSection />
      <PeopleSection />
      <CtaBand
        id="about-cta-heading"
        heading={cta.heading}
        body={cta.body}
        link={cta.link}
        image={cta.image}
        mobileImage={cta.mobileImage}
        orbitStates={cta.orbitStates}
      />
    </>
  );
}
