import type { ProofContent } from "@/content/services/types";
import { CaseStudyCard } from "@/components/home/CaseStudyCard";
import { CaseStudyDetails } from "@/components/home/CaseStudyDetails";
import { Reveal } from "@/components/ui/Reveal";

const TITLE_ID = "service-proof-title";

/**
 * Single case study as proof (IoT "Proof" 12110:1821 at 1440, 12110:2826 at 390): the homepage
 * case-study card with its "What we work with" details, no stacking.
 */
export function ProofSection({ content }: { content: ProofContent }) {
  return (
    <section aria-labelledby={TITLE_ID} className="bg-surface section-y">
      <Reveal className="container-site">
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
        />
      </Reveal>
    </section>
  );
}
