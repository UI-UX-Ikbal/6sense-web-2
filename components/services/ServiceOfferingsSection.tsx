import type { ServiceOfferingsContent } from "@/content/services/types";
import type {
  FeatureCardSizeCopy,
  FeatureCardSlots,
} from "@/components/ui/FeatureCard";
import { FeatureCardRow } from "@/components/ui/FeatureCardRow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const HEADING_ID = "service-offerings-heading";

/** Side cards at ≥1024: 14/21 semibold title, 12/18 body, 48px badge, 12px chip (12655:470 / 490). */
const COMPACT: FeatureCardSizeCopy = {
  title: "lg:text-sm",
  body: "lg:text-xs",
  badge: "lg:size-12",
  chip: "lg:text-xs",
};

/**
 * ≥1024 slots (IoT 12655:480 / 490 / 470): 508×484 r32, fluid×416 r32, 307×360 r24, each with its
 * own scrim stops; only the large card keeps 24/36 + 16/24 copy. 390 frame (12110:2716 / 2726 /
 * 2736): 484 r24, 416 r32, 349 r32 with 20/30 + 14/21 copy.
 */
const SLOTS: FeatureCardSlots = {
  sizes: {
    lg: "lg:h-service-lg lg:w-(--service-w-lg) lg:rounded-card-lg lg:[--overlay-from:64.5%] lg:[--overlay-to:82%]",
    md: "lg:h-service-md lg:w-[calc(100%-var(--service-w-lg)-var(--service-w-sm)-3rem)] lg:rounded-card-lg lg:[--overlay-from:22.106%] lg:[--overlay-to:63.504%]",
    sm: "lg:h-service-sm lg:w-(--service-w-sm) lg:rounded-panel lg:[--overlay-from:42.308%] lg:[--overlay-to:59.638%]",
  },
  mobile: [
    "h-service-lg rounded-panel",
    "h-service-md rounded-card-lg",
    "h-service-sm-mobile rounded-card-lg",
  ],
  copy: { title: "text-xl", body: "text-sm" },
  sizeCopy: {
    lg: { title: "lg:text-2xl", body: "lg:text-base", badge: "", chip: "" },
    md: COMPACT,
    sm: COMPACT,
  },
};

/** "Our … Services" expanding card row on service pages (IoT 12110:1701 / 12110:2710). */
export function ServiceOfferingsSection({
  content,
}: {
  content: ServiceOfferingsContent;
}) {
  return (
    <section aria-labelledby={HEADING_ID} className="bg-surface section-y">
      <div className="container-site flex flex-col gap-8 lg:gap-9">
        <Reveal>
          <SectionHeading id={HEADING_ID} title={content.heading} />
        </Reveal>

        <Reveal delay={120}>
          <FeatureCardRow
            items={content.items}
            icon={content.icon}
            slots={SLOTS}
            initialActive={content.initialActive}
          />
        </Reveal>
      </div>
    </section>
  );
}
