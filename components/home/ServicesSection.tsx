import { homeContent } from "@/content/home";
import type { FeatureCardSlots } from "@/components/ui/FeatureCard";
import { FeatureCardRow } from "@/components/ui/FeatureCardRow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const HEADING_ID = "services-heading";

/**
 * ≥1024 slots (Figma 11995:43904 / 43914 / 43924): 508×484 r24, fluid×416 r32, 307×360 r32,
 * each with its own scrim stops. 390 frame (11995:44892 / 44902 / 44912): 484 r24, 416 r32, 349 r32.
 */
const SLOTS: FeatureCardSlots = {
  sizes: {
    lg: "lg:h-service-lg lg:w-(--service-w-lg) lg:rounded-panel lg:[--overlay-from:42.308%] lg:[--overlay-to:71.154%]",
    md: "lg:h-service-md lg:w-[calc(100%-var(--service-w-lg)-var(--service-w-sm)-3rem)] lg:rounded-card-lg lg:[--overlay-from:64.5%] lg:[--overlay-to:82%]",
    sm: "lg:h-service-sm lg:w-(--service-w-sm) lg:rounded-card-lg lg:[--overlay-from:45.164%] lg:[--overlay-to:74.099%]",
  },
  mobile: [
    "h-service-lg rounded-panel",
    "h-service-md rounded-card-lg",
    "h-service-sm-mobile rounded-card-lg",
  ],
};

/** "Our engineering services" (Figma 11995:43898 at 1440, 11995:44886 at 390). */
export function ServicesSection() {
  const { services } = homeContent;

  return (
    <section
      id={services.id}
      aria-labelledby={HEADING_ID}
      className="bg-surface section-y"
    >
      <div className="container-site flex flex-col gap-8 lg:gap-9">
        <Reveal>
          <SectionHeading
            id={HEADING_ID}
            title={services.heading}
            subheading={services.subheading}
          />
        </Reveal>

        <Reveal delay={120}>
          <FeatureCardRow
            items={services.items}
            icon={services.icon}
            slots={SLOTS}
          />
        </Reveal>
      </div>
    </section>
  );
}
