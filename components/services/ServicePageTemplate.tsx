import type { Metadata } from "next";
import type {
  ServicePageContent,
  ServiceSection,
} from "@/content/services/types";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqSection } from "@/components/ui/FaqSection";
import { CapabilityGridSection } from "./CapabilityGridSection";
import { ProofSection } from "./ProofSection";
import { ServiceHero } from "./ServiceHero";
import { ServiceOfferingsSection } from "./ServiceOfferingsSection";
import { SplitFeatureSection } from "./SplitFeatureSection";
import { StepsSection } from "./StepsSection";

function SectionBlock({
  section,
  index,
}: {
  section: ServiceSection;
  index: number;
}) {
  switch (section.type) {
    case "offerings":
      return <ServiceOfferingsSection content={section.content} />;
    case "split":
      return <SplitFeatureSection content={section.content} />;
    case "proof":
      return <ProofSection content={section.content} />;
    case "steps":
      return <StepsSection content={section.content} />;
    case "grid":
      return <CapabilityGridSection content={section.content} />;
    case "faq":
      return (
        <FaqSection
          content={section.content}
          headingId="service-faq-heading"
          type={section.size ?? "large"}
          insetAnswers={section.insetAnswers}
        />
      );
    case "cta":
      return (
        <CtaBand
          id={`service-cta-heading-${index}`}
          heading={section.content.heading}
          body={section.content.body}
          link={section.content.link}
          secondaryLink={section.content.secondaryLink}
          tallOnMobile={section.content.tallOnMobile}
          imageFit={section.content.imageFit}
          image={section.content.image}
          mobileImage={section.content.mobileImage}
          orbitStates={section.content.orbitStates}
        />
      );
  }
}

/** Per-page metadata for a service page (title, description, canonical, Open Graph). */
export function servicePageMetadata(content: ServicePageContent): Metadata {
  const { meta, path, hero } = content;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      images: [{ url: hero.image.src, alt: hero.image.alt }],
    },
  };
}

/** Service page: hero, then the content's sections in order. Header/Footer come from the layout. */
export function ServicePageTemplate({
  content,
}: {
  content: ServicePageContent;
}) {
  return (
    <>
      <ServiceHero content={content.hero} />
      {content.sections.map((section, index) => (
        <SectionBlock
          key={`${section.type}-${index}`}
          section={section}
          index={index}
        />
      ))}
    </>
  );
}
