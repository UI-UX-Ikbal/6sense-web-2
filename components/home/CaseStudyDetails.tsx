import type { CaseStudy, LinkItem } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { CheckItem } from "@/components/ui/CheckItem";

type CaseStudyDetailsProps = {
  details: CaseStudy["details"];
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  /** 16px gap between tech groups below 1024 instead of 12 (AI Automation 12365:4964). */
  roomyGroups?: boolean;
};

function Actions({
  primaryCta,
  secondaryCta,
  className,
}: Pick<CaseStudyDetailsProps, "primaryCta" | "secondaryCta"> & {
  className: string;
}) {
  return (
    <div className={className}>
      <ButtonLink href={primaryCta.href} className="w-full lg:w-auto">
        {primaryCta.label}
      </ButtonLink>
      <ButtonLink
        href={secondaryCta.href}
        variant="outline-dark"
        className="w-full lg:w-auto"
      >
        {secondaryCta.label}
      </ButtonLink>
    </div>
  );
}

/**
 * "What we work with" block under each case-study card (Figma "Frame 23" 11995:43971 / 11995:44958):
 * heading + CTAs, a 2×2 grid of tech groups, a divider and the highlight row.
 */
export function CaseStudyDetails({
  details,
  primaryCta,
  secondaryCta,
  roomyGroups = false,
}: CaseStudyDetailsProps) {
  return (
    <div className="flex flex-col items-center gap-8 bg-surface px-3 pt-8 pb-16 lg:px-8 lg:pt-16 lg:pb-32">
      <div className="flex w-full flex-col gap-8 pb-4 lg:flex-row lg:gap-24">
        <div className="flex flex-col gap-6 lg:w-case-intro lg:shrink-0">
          <h4 className="text-3xl font-semibold text-olive lg:text-4xl">
            {details.heading}
          </h4>
          <Actions
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            className="hidden gap-6 lg:flex"
          />
        </div>

        <div
          className={`grid min-w-0 flex-1 grid-cols-2 lg:gap-x-12 lg:gap-y-8 ${
            roomyGroups ? "gap-4" : "gap-3"
          }`}
        >
          {details.groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-fg lg:w-tech-group">
                {group.title}
              </p>
              <ul className="flex flex-col gap-1 text-sm text-brand lg:text-base">
                {group.items.map((item) => (
                  <CheckItem key={item} tone="brand">
                    {item}
                  </CheckItem>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Figma's divider bleeds 19px past the card on each side (1278 wide). */}
      <hr className="w-full border-black/20 lg:w-[calc(100%+--spacing(25.5))]" />

      <ul className="flex w-full flex-col gap-2 text-base text-fg lg:flex-row lg:gap-8 lg:text-lg">
        {details.highlights.map((highlight) => (
          <CheckItem key={highlight} className="lg:flex-1">
            {highlight}
          </CheckItem>
        ))}
      </ul>

      <Actions
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        className="flex w-full flex-col gap-4 lg:hidden"
      />
    </div>
  );
}
