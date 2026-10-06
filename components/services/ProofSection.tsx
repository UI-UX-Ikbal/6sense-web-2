import type { ProofContent } from "@/content/services/types";
import { CaseStudyCard } from "@/components/home/CaseStudyCard";
import { CaseStudyDetails } from "@/components/home/CaseStudyDetails";
import { Reveal } from "@/components/ui/Reveal";

const TITLE_ID = "service-proof-title";
const HEADING_ID = "service-proof-heading";

/**
 * Single case study as proof (IoT "Proof" 12110:1821 at 1440, 12110:2826 at 390): the homepage
 * case-study card with its "What we work with" details, no stacking. AI Automation (12356:563 /
 * 12356:1191) adds a heading + intro above the card.
 */
export function ProofSection({ content }: { content: ProofContent }) {
  const { heading } = content;

  return (
    <section
      aria-labelledby={heading ? HEADING_ID : TITLE_ID}
      className="bg-surface section-y"
    >
      <Reveal className="container-site flex flex-col gap-8 lg:gap-9">
        {heading ? (
          <div className="flex flex-col gap-3 text-brand lg:flex-row lg:gap-12">
            <h2
              id={HEADING_ID}
              className="text-3xl font-semibold lg:w-split-media lg:shrink-0 lg:text-4xl"
            >
              {heading.title}
            </h2>
            <div className="flex flex-col gap-2.5 text-base lg:w-cta-copy lg:pt-4 lg:text-lg">
              {heading.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : null}
        <div>
          <CaseStudyCard
            study={content.study}
            titleId={TITLE_ID}
            badge={content.badge}
            mobileBadge={content.mobileBadge}
          />
          <CaseStudyDetails
            details={content.study.details}
            primaryCta={content.primaryCta}
            secondaryCta={content.secondaryCta}
            roomyGroups={content.roomyGroups}
          />
        </div>
      </Reveal>
    </section>
  );
}
