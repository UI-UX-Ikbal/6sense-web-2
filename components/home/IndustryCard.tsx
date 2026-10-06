import Image from "next/image";
import type { CSSProperties } from "react";
import type { Industry, LinkItem } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";

type IndustryCardProps = {
  industry: Industry;
  icon: { src: string; width: number; height: number };
  cta: LinkItem;
  titleId: string;
};

/**
 * Wide photo card for an industry (Figma 11995:44534 at 1440, 11995:45530 at 390).
 * When covered in the sticky stack, icon + title move into the visible top strip (11995:47727).
 */
export function IndustryCard({
  industry,
  icon,
  cta,
  titleId,
}: IndustryCardProps) {
  const vars = {
    "--img-pos": industry.mobileImagePosition ?? "50% 50%",
    ...(industry.scrim
      ? { "--scrim-from": industry.scrim.from, "--scrim-to": industry.scrim.to }
      : {}),
  } as CSSProperties;

  return (
    <article
      aria-labelledby={titleId}
      style={vars}
      className="relative isolate flex h-industry-card-mobile flex-col justify-end overflow-hidden rounded-panel p-6 [--overlay-from:var(--scrim-from,42.308%)] [--overlay-to:var(--scrim-to,71.154%)] lg:h-industry-card lg:p-8 lg:[--overlay-from:42.308%] lg:[--overlay-to:71.154%] stack:group-data-stacked/stack:justify-start"
    >
      <Image
        src={industry.image.src}
        alt={industry.image.alt}
        fill
        sizes="(min-width: 1304px) 1240px, 100vw"
        className="-z-10 object-cover object-(--img-pos) lg:object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 card-scrim" />

      <div className="flex flex-col items-start gap-4 text-inverse stack:group-data-stacked/stack:flex-row stack:group-data-stacked/stack:items-center">
        <Image
          src={icon.src}
          alt=""
          width={Math.round(icon.width)}
          height={Math.round(icon.height)}
          className="size-badge"
        />
        <h3 id={titleId} className="text-3xl font-semibold lg:text-4xl">
          {industry.title}
        </h3>
        <p className="text-base lg:text-lg stack:group-data-stacked/stack:hidden">
          {industry.description}
        </p>
      </div>

      <ButtonLink
        href={cta.href}
        aria-describedby={titleId}
        className="absolute top-7.5 right-7.5 text-sm lg:text-button"
      >
        {cta.label}
      </ButtonLink>
    </article>
  );
}
