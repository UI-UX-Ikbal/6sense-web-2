import Image from "next/image";
import type { CSSProperties } from "react";
import type { CaseStudy } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { CheckItem } from "@/components/ui/CheckItem";

type Badge = { src: string; width: number; height: number };

type CaseStudyCardProps = {
  study: CaseStudy;
  titleId: string;
  badge: Badge;
  mobileBadge: Badge;
};

const toneClasses = {
  dark: { meta: "text-fg", title: "text-olive" },
  light: { meta: "text-inverse", title: "text-inverse" },
} as const;

/**
 * Photo card of a case study (Figma "Card" 11995:43938 at 1440, 11995:44926 at 390):
 * badge, meta line, title and CTA on top; three highlights along the bottom.
 */
export function CaseStudyCard({
  study,
  titleId,
  badge,
  mobileBadge,
}: CaseStudyCardProps) {
  const tone = toneClasses[study.tone];
  const imagePosition = {
    "--img-pos": study.mobileImagePosition,
    "--img-pos-lg": study.imagePosition ?? "50% 50%",
  } as CSSProperties;

  return (
    <article
      aria-labelledby={titleId}
      className="relative isolate flex h-case-card-mobile flex-col gap-6 overflow-hidden rounded-panel p-6 lg:h-case-card lg:px-7.5 lg:py-8"
    >
      <Image
        src={study.image.src}
        alt={study.image.alt}
        fill
        sizes="(min-width: 1304px) 1240px, 100vw"
        style={imagePosition}
        className="-z-10 object-cover object-(--img-pos) lg:object-(--img-pos-lg)"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: study.scrim }}
      />

      <div className="flex min-h-0 flex-1 flex-col justify-between">
        <div className="flex items-start gap-2 lg:gap-4">
          <Image
            src={mobileBadge.src}
            alt=""
            width={mobileBadge.width}
            height={mobileBadge.height}
            className="shrink-0 lg:hidden"
          />
          <Image
            src={badge.src}
            alt=""
            width={badge.width}
            height={badge.height}
            className="hidden shrink-0 lg:block"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-2.5 lg:pr-28">
            <p className={`text-base lg:text-lg ${tone.meta}`}>{study.meta}</p>
            <h3
              id={titleId}
              className={`text-3xl font-semibold lg:text-4xl ${tone.title}`}
            >
              {study.title}
            </h3>
          </div>
          <ButtonLink
            href={study.link.href}
            aria-describedby={titleId}
            className="shrink-0 max-lg:hidden"
          >
            {study.link.label}
          </ButtonLink>
        </div>

        <ul className="flex flex-col gap-3 text-base text-inverse lg:flex-row lg:gap-8 lg:text-lg">
          {study.highlights.map((highlight) => (
            <CheckItem key={highlight} className="lg:flex-1">
              {highlight}
            </CheckItem>
          ))}
        </ul>
      </div>

      <ButtonLink
        href={study.link.href}
        aria-describedby={titleId}
        className="w-full text-sm lg:hidden"
      >
        {study.link.label}
      </ButtonLink>
    </article>
  );
}
