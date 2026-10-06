import Image from "next/image";
import { homeContent, type Insight } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const HEADING_ID = "insights-heading";

/** Blog card with the author avatar overlapping the image edge (Figma 11995:44652). */
function InsightCard({
  insight,
  titleId,
}: {
  insight: Insight;
  titleId: string;
}) {
  return (
    <article
      aria-labelledby={titleId}
      className="flex flex-col overflow-hidden rounded-card"
    >
      <div className="relative h-insight-media shrink-0">
        <Image
          src={insight.image.src}
          alt={insight.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="relative flex flex-1 flex-col justify-end gap-4 bg-inverse px-8 pt-16 pb-8">
        <div className="absolute -top-10.5 right-8 left-6 flex items-end gap-1 text-fg">
          <Image
            src={insight.author.avatar.src}
            alt={insight.author.avatar.alt}
            width={insight.author.avatar.width}
            height={insight.author.avatar.height}
            className="size-avatar-lg shrink-0 rounded-full"
          />
          <p className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="flex-1 text-base font-semibold">
              {insight.author.name}
            </span>
            <span className="text-right text-sm whitespace-nowrap">
              {insight.readTime}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-fg">
          <h3 id={titleId} className="text-xl font-semibold">
            {insight.title}
          </h3>
          <p className="text-sm">{insight.excerpt}</p>
        </div>
        <ButtonLink
          href={insight.link.href}
          variant="soft"
          aria-describedby={titleId}
          className="self-start"
        >
          {insight.link.label}
        </ButtonLink>
      </div>
    </article>
  );
}

/** "Insights from experts" (Figma 11995:44642 at 1440, 11995:45640 at 390). */
export function InsightsSection() {
  const { insights } = homeContent;
  const actions = (className: string) => (
    <div className={className}>
      <ButtonLink
        href={insights.primaryCta.href}
        variant="inverse"
        className="w-full lg:w-auto"
      >
        {insights.primaryCta.label}
      </ButtonLink>
      <ButtonLink
        href={insights.secondaryCta.href}
        variant="outline-inverse"
        className="w-full lg:w-auto"
      >
        {insights.secondaryCta.label}
      </ButtonLink>
    </div>
  );

  return (
    <section aria-labelledby={HEADING_ID} className="bg-brand-deep section-y">
      <div className="container-site flex flex-col gap-9">
        <Reveal className="flex items-center gap-12">
          <h2
            id={HEADING_ID}
            className="min-w-0 flex-1 text-3xl font-semibold text-inverse lg:text-4xl"
          >
            {insights.heading}
          </h2>
          {actions("hidden shrink-0 gap-6 lg:flex")}
        </Reveal>

        <Reveal delay={120} className="grid gap-6 lg:grid-cols-3">
          {insights.items.map((insight, index) => (
            <InsightCard
              key={insight.title}
              insight={insight}
              titleId={`insight-${index}`}
            />
          ))}
        </Reveal>

        {actions("flex flex-col gap-6 lg:hidden")}
      </div>
    </section>
  );
}
