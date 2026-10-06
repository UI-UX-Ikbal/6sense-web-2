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
  "leaf-short": "aspect-leaf-short rounded-tl-leaf-short rounded-br-leaf-short",
  quarter: "aspect-square rounded-tr-quarter",
} as const;

const pointKey = (point: SplitPoint) => point.title ?? point.body[0];

function PointCopy({
  point,
  content,
}: {
  point: SplitPoint;
  content: SplitSectionContent;
}) {
  const classes = toneClasses[content.tone];
  const large = content.scale === "large";
  const titleSize = large ? "text-xl" : "text-lg lg:text-xl";
  const bodySize =
    large || content.bigBody ? "text-base" : "text-sm lg:text-base";
  // Dark "bulleted" points (EV & Mobility) use bold titles; the IoT dark list does not.
  const bulletedTitle =
    content.tone === "dark" ? "font-bold text-inverse" : classes.title;
  const darkBold = content.tone === "dark" && content.boldTitles;
  const bodyColor = content.strongBody
    ? "text-fg"
    : darkBold
      ? "text-inverse-muted"
      : classes.body;
  const titleWeight = darkBold
    ? "font-bold text-inverse"
    : content.bulleted
      ? bulletedTitle
      : content.regularTitles
        ? classes.title.replace("font-bold ", "")
        : classes.title;
  return (
    <span className={`flex flex-col gap-2 ${classes.copy}`}>
      {point.title ? (
        <span className={`block ${titleSize} ${titleWeight}`}>
          {point.title}
        </span>
      ) : null}
      {content.bulleted ? (
        <ul className={`list-disc ps-5.25 lg:ps-6 ${bodySize} ${bodyColor}`}>
          {point.body.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        point.body.map((paragraph) => (
          <span key={paragraph} className={`block ${bodySize} ${bodyColor}`}>
            {paragraph}
          </span>
        ))
      )}
    </span>
  );
}

/** Gap between lead, points, footnote and actions: dark 18; light 24 (→18 from 1024 unless bulleted / led by paragraphs). */
function copyGap(content: SplitSectionContent) {
  if (content.bulleted && content.tone === "dark") return "gap-4.5";
  if (content.tone === "light" && (content.bulleted || content.airy)) {
    return "gap-6";
  }
  return content.bulleted ? "gap-4.5" : "gap-6 lg:gap-4.5";
}

/** Points led by an icon badge (light tone) or a numbered badge (dark tone). */
function PointList({ content }: { content: SplitSectionContent }) {
  const { points, pointIcon } = content;

  if (pointIcon) {
    return (
      <ul className="flex flex-col gap-6">
        {points.map((point) => (
          <IconPoint key={pointKey(point)} icon={pointIcon}>
            <PointCopy point={point} content={content} />
          </IconPoint>
        ))}
      </ul>
    );
  }

  return (
    <ol className="flex flex-col gap-6">
      {points.map((point, index) => (
        <li key={pointKey(point)} className="flex items-start gap-3">
          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lime text-xl text-inverse"
          >
            {index + 1}
          </span>
          <PointCopy point={point} content={content} />
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
  const large = content.scale === "large";
  const airy = content.bulleted || content.airy;
  const leads =
    typeof content.lead === "string" ? [content.lead] : (content.lead ?? []);
  const headingId = `${content.id}-heading`;
  const columns = content.wideCopy
    ? "lg:grid-cols-[minmax(0,var(--container-split-media))_minmax(0,1fr)]"
    : "lg:grid-cols-[minmax(0,var(--container-split-media))_minmax(0,var(--container-split-copy))]";

  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className={`section-y ${tone.section} ${
        content.tightMobile ? "max-lg:py-12" : ""
      }`}
    >
      <div
        className={`container-site grid lg:gap-12 ${
          airy ? "gap-12" : tone.grid
        } ${columns}`}
      >
        <Reveal
          className={`flex flex-col ${large || content.airy ? "gap-12" : tone.media}`}
        >
          <h2
            id={headingId}
            className={`font-semibold whitespace-pre-line ${large ? "text-4xl" : "text-3xl lg:text-4xl"} ${tone.heading} ${
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

        <Reveal
          delay={120}
          className={`flex flex-col pt-4 ${copyGap(content)} ${
            content.narrowCopy ? "lg:max-w-split-copy-narrow" : ""
          }`}
        >
          {leads.length > 0 ? (
            <div className="flex flex-col gap-6">
              {leads.map((lead) => (
                <p
                  key={lead}
                  className={`${
                    content.smallLead
                      ? "text-base lg:text-lg"
                      : "text-lg lg:text-xl"
                  } ${
                    content.tone === "dark" ? "text-inverse" : "text-ink-green"
                  }`}
                >
                  {lead}
                </p>
              ))}
            </div>
          ) : null}
          <PointList content={content} />
          {content.footnote ? (
            <p
              className={
                content.tone === "dark"
                  ? "text-lg text-inverse lg:text-xl"
                  : "text-sm text-ink-green lg:text-base"
              }
            >
              {content.footnote}
            </p>
          ) : null}
          {content.actions ? (
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <ButtonLink
                href={content.actions.primary.href}
                className={
                  content.actions.secondary ? "max-md:text-sm" : undefined
                }
              >
                {content.actions.primary.label}
              </ButtonLink>
              {content.actions.secondary ? (
                <ButtonLink
                  href={content.actions.secondary.href}
                  variant="outline-dark"
                  className="max-md:text-sm"
                >
                  {content.actions.secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
