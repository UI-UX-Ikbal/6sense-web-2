import { homeContent } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StackedList } from "@/components/ui/StackedList";
import { IndustryCard } from "./IndustryCard";

const HEADING_ID = "industries-heading";
/** Figma 12002:449: each earlier card peeks ~71px and is ~30px narrower per level. */
const STACK_STEP = 71;
const STACK_SCALE_STEP = 0.024;

/** "Who we work with" (Figma 11995:44528 at 1440, 11995:45524 at 390). */
export function IndustriesSection() {
  const { industries } = homeContent;

  return (
    <section aria-labelledby={HEADING_ID} className="bg-surface section-y">
      <div className="container-site flex flex-col gap-9">
        <Reveal>
          <SectionHeading
            id={HEADING_ID}
            tone="brand"
            title={industries.heading}
            subheading={industries.subheading}
            titleClassName="lg:w-heading-title"
          />
        </Reveal>

        <StackedList
          step={STACK_STEP}
          scaleStep={STACK_SCALE_STEP}
          cardHeight="var(--spacing-industry-card)"
          className="gap-6"
          items={industries.items.map((industry, index) => ({
            id: industry.title,
            card: (
              <IndustryCard
                industry={industry}
                icon={industries.icon}
                cta={industries.cta}
                titleId={`industry-${index}`}
              />
            ),
          }))}
        />

        <ButtonLink
          href={industries.cta.href}
          className="w-full text-sm lg:hidden"
        >
          {industries.cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
