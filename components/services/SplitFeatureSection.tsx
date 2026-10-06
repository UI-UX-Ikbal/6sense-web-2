import Image from "next/image";
import type { SplitPoint, SplitSectionContent } from "@/content/services/types";
import { ButtonLink } from "@/components/ui/Button";
import { IconPoint } from "@/components/ui/IconPoint";
import { Reveal } from "@/components/ui/Reveal";

const toneClasses = {
  light: {
    section: "bg-surface",
    heading: "text-brand",
    title: "font-bold text-fg",
    body: "text-fg-subtle",
    copy: "lg:max-w-split-point",
    grid: "gap-8",
    media: "gap-8 lg:gap-12",
  },
  dark: {
    section: "bg-brand-deep",
    heading: "text-inverse",
    title: "text-inverse",
    body: "text-inverse-subtle",
    copy: "",
    grid: "gap-9",
    media: "gap-12",
  },
} as const;

const shapeClasses = {
  leaf: "aspect-leaf rounded-tl-leaf rounded-br-leaf",
  quarter: "aspect-square rounded-tr-quarter",
} as const;

type Tone = SplitSectionContent["tone"];

function PointCopy({ point, tone }: { point: SplitPoint; tone: Tone }) {
  const classes = toneClasses[tone];
  return (
    <span className={`flex flex-col gap-2 ${classes.copy}`}>
      <span className={`block text-lg lg:text-xl ${classes.title}`}>
        {point.title}
      </span>
      {point.body.map((paragraph) => (
        <span
          key={paragraph}
          className={`block text-sm lg:text-base ${classes.body}`}
        >
          {paragraph}
        </span>
      ))}
    </span>
  );
}

/** Points led by an icon badge (light tone) or a numbered badge (dark tone). */
function PointList({ content }: { content: SplitSectionContent }) {
  const { points, pointIcon, tone } = content;

  if (pointIcon) {
    return (
      <ul className="flex flex-col gap-6">
        {points.map((point) => (
          <IconPoint key={point.title} icon={pointIcon}>
            <PointCopy point={point} tone={tone} />
          </IconPoint>
        ))}
      </ul>
    );
  }

  return (
    <ol className="flex flex-col gap-6">
      {points.map((point, index) => (
        <li key={point.title} className="flex items-start gap-3">
          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lime text-xl text-inverse"
          >
            {index + 1}
          </span>
          <PointCopy point={point} tone={tone} />
        </li>
      ))}
    </ol>
  );
}

/**
 * Heading + shaped photo beside a column of points (IoT "Why 6sense HQ…" 12110:478, "Built for…"
 * 12110:2017, "Why What Got You Here…" 12110:2455, "Use Cases" 12110:2615; 390 frames 12110:886 /
 * 922 / 3402 / 3469). Columns 537 + 581 from 1024; stacked below with the image capped at 537.
 */
export function SplitFeatureSection({
  content,
}: {
  content: SplitSectionContent;
}) {
  const tone = toneClasses[content.tone];
  const headingId = `${content.id}-heading`;
  const columns = content.wideCopy
    ? "lg:grid-cols-[minmax(0,var(--container-split-media))_minmax(0,1fr)]"
    : "lg:grid-cols-[minmax(0,var(--container-split-media))_minmax(0,var(--container-split-copy))]";

  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className={`section-y ${tone.section}`}
    >
      <div className={`container-site grid lg:gap-12 ${tone.grid} ${columns}`}>
        <Reveal className={`flex flex-col ${tone.media}`}>
          <h2
            id={headingId}
            className={`text-3xl font-semibold lg:text-4xl ${tone.heading} ${
              content.headingAlign === "end" ? "text-right" : ""
            } ${content.narrowHeading ? "lg:max-w-arch-media" : ""}`}
          >
            {content.heading}
          </h2>
          <div
            className={`relative w-full overflow-hidden md:max-w-split-media ${shapeClasses[content.media.shape]} ${
              content.headingAlign === "end" ? "self-end" : ""
            }`}
          >
            <Image
              src={content.media.image.src}
              alt={content.media.image.alt}
              fill
              sizes="(min-width: 768px) 537px, 100vw"
              style={{ objectPosition: content.media.position }}
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6 pt-4 lg:gap-4.5">
          {content.lead ? (
            <p className="text-lg text-ink-green lg:text-xl">{content.lead}</p>
          ) : null}
          <PointList content={content} />
          {content.footnote ? (
            <p className="text-sm text-ink-green lg:text-base">
              {content.footnote}
            </p>
          ) : null}
          {content.actions ? (
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <ButtonLink
                href={content.actions.primary.href}
                className="max-md:text-sm"
              >
                {content.actions.primary.label}
              </ButtonLink>
              <ButtonLink
                href={content.actions.secondary.href}
                variant="outline-dark"
                className="max-md:text-sm"
              >
                {content.actions.secondary.label}
              </ButtonLink>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
