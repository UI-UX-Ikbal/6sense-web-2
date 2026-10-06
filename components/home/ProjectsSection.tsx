import { homeContent } from "@/content/home";
import { StackedList } from "@/components/ui/StackedList";
import { CaseStudyCard } from "./CaseStudyCard";
import { CaseStudyDetails } from "./CaseStudyDetails";

const HEADING_ID = "projects-heading";
/** Peek between stacked cards and per-level shrink (Figma 11995:47029: 1240 → 1180 → 1118). */
const STACK_STEP = 62;
const STACK_SCALE_STEP = 0.049;

/**
 * "80+ Projects delivered" (Figma 11995:43934 at 1440, 11995:44922 at 390).
 * Case-study photo cards stack while their details scroll past (sticky stack from ≥1024).
 */
export function ProjectsSection() {
  const { projects, industries } = homeContent;
  const lastIndex = projects.items.length - 1;

  return (
    <section aria-labelledby={HEADING_ID} className="bg-surface section-y">
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <h2
          id={HEADING_ID}
          className="text-3xl font-semibold text-brand lg:text-4xl"
        >
          {projects.heading}
        </h2>

        <StackedList
          step={STACK_STEP}
          scaleStep={STACK_SCALE_STEP}
          cardHeight="var(--spacing-case-card)"
          items={projects.items.map((study, index) => ({
            id: study.title,
            card: (
              <CaseStudyCard
                study={study}
                titleId={`case-study-${index}`}
                badge={projects.badge}
                mobileBadge={projects.mobileBadge}
              />
            ),
            after: (
              <CaseStudyDetails
                details={study.details}
                primaryCta={industries.cta}
                secondaryCta={projects.secondaryCta}
              />
            ),
            afterClassName:
              index < lastIndex ? "bg-surface pb-8 lg:pb-12" : undefined,
          }))}
        />
      </div>
    </section>
  );
}
