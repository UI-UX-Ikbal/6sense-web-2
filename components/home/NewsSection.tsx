import Image from "next/image";
import { homeContent, type NewsItem } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const HEADING_ID = "news-heading";

function NewsCard({
  item,
  lead,
  titleId,
}: {
  item: NewsItem;
  lead: boolean;
  titleId: string;
}) {
  return (
    <article
      aria-labelledby={titleId}
      className={`flex flex-col gap-4 p-2.5 ${lead ? "lg:h-news-lead" : ""}`.trim()}
    >
      <div
        className={`relative overflow-hidden rounded-panel ${
          lead ? "h-news-lead-mobile lg:h-auto lg:flex-1" : "h-news-thumb"
        }`}
      >
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes={
            lead
              ? "(min-width: 1024px) 65vw, 100vw"
              : "(min-width: 1024px) 33vw, 100vw"
          }
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 text-fg">
        <h3 id={titleId} className="text-2xl font-semibold">
          {item.title}
        </h3>
        <p className={`text-lg ${lead ? "" : "truncate"}`.trim()}>
          {item.description}
        </p>
      </div>
      <ButtonLink
        href={item.link.href}
        variant="soft"
        aria-describedby={titleId}
        className="self-start"
      >
        {item.link.label}
      </ButtonLink>
    </article>
  );
}

/** "Latest news from us" (Figma 11995:44606 at 1440, 11995:45605 at 390). */
export function NewsSection() {
  const { news } = homeContent;
  const [lead, ...rest] = news.items;
  const actions = (className: string) => (
    <div className={className}>
      <ButtonLink href={news.primaryCta.href} className="w-full lg:w-auto">
        {news.primaryCta.label}
      </ButtonLink>
      <ButtonLink
        href={news.secondaryCta.href}
        variant="outline-dark"
        className="w-full lg:w-auto"
      >
        {news.secondaryCta.label}
      </ButtonLink>
    </div>
  );

  return (
    <section aria-labelledby={HEADING_ID} className="bg-surface section-y">
      <div className="container-site flex flex-col gap-8 lg:gap-9">
        <Reveal className="flex items-center gap-12">
          <h2
            id={HEADING_ID}
            className="min-w-0 flex-1 text-4xl font-semibold text-brand"
          >
            {news.heading}
          </h2>
          {actions("hidden shrink-0 gap-6 lg:flex")}
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6 lg:flex-row">
          {lead ? (
            <div className="lg:w-(--news-w-lead) lg:shrink-0">
              <NewsCard item={lead} lead titleId="news-0" />
            </div>
          ) : null}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {rest.map((item, index) => (
              <NewsCard
                key={item.image.src}
                item={item}
                lead={false}
                titleId={`news-${index + 1}`}
              />
            ))}
          </div>
        </Reveal>

        {actions("flex flex-col gap-4 lg:hidden")}
      </div>
    </section>
  );
}
