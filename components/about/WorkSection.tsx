import { aboutContent } from "@/content/about";
import { ButtonLink } from "@/components/ui/Button";
import type { FeatureCardSlots } from "@/components/ui/FeatureCard";
import { FeatureCardRow } from "@/components/ui/FeatureCardRow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const HEADING_ID = "about-work-heading";

/**
 * ≥1024 slots (Figma 12263:1890 / 1900 / 1910): 508×484 r32, fluid×416 r32, 307×360 r24,
 * each with its own scrim stops. 390 frame (12293:4420 / 4430 / 4440): 484 r32, 416 r32, 360 r24;
 * card copy stays 24/36 and 16/24 at 390.
 */
const SLOTS: FeatureCardSlots = {
  sizes: {
    lg: "lg:h-service-lg lg:w-(--service-w-lg) lg:rounded-card-lg lg:[--overlay-from:64.5%] lg:[--overlay-to:82%]",
    md: "lg:h-service-md lg:w-[calc(100%-var(--service-w-lg)-var(--service-w-sm)-3rem)] lg:rounded-card-lg lg:[--overlay-from:22.106%] lg:[--overlay-to:63.504%]",
    sm: "lg:h-service-sm lg:w-(--service-w-sm) lg:rounded-panel lg:[--overlay-from:42.308%] lg:[--overlay-to:59.638%]",
  },
  mobile: [
    "h-service-lg rounded-card-lg",
    "h-service-md rounded-card-lg",
    "h-service-sm rounded-panel",
  ],
  copy: { title: "text-2xl", body: "text-base" },
};

/** "Not just a sector we talk about." (Figma 12263:1886 at 1440, 12263:2514 at 390). */
export function WorkSection() {
  const { work } = aboutContent;

  return (
    <section aria-labelledby={HEADING_ID} className="bg-surface section-y">
      <div className="container-site flex flex-col gap-9">
        <Reveal>
          <SectionHeading
            id={HEADING_ID}
            title={work.heading}
            subheading={work.subheading}
            tone="brand"
            size="large"
            titleClassName="lg:w-about-heading"
          />
        </Reveal>

        <Reveal delay={120}>
          <FeatureCardRow items={work.items} icon={work.icon} slots={SLOTS} />
        </Reveal>

        <p className="text-sm text-brand lg:text-base">{work.footnote}</p>
        <ButtonLink
          href={work.cta.href}
          className="w-full md:w-auto md:self-start"
        >
          {work.cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
