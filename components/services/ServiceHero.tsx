import Image from "next/image";
import type { CSSProperties } from "react";
import type { ServiceHeroContent } from "@/content/services/types";
import { ButtonLink } from "@/components/ui/Button";
import { CheckItem } from "@/components/ui/CheckItem";
import { CroppedImage } from "@/components/ui/CroppedImage";

const HEADING_ID = "service-hero-heading";

const mobileHeightClasses = {
  default: "min-h-service-hero-sm",
  tall: "min-h-service-hero-tall",
  xtall: "min-h-service-hero-xtall",
} as const;

/**
 * Service page hero (IoT: Figma 12110:446 at 1440, 12110:854 at 390).
 * Full-bleed photo with a bottom scrim; copy, CTAs and Clutch badge on top, capability checklist
 * along the bottom (row from 1024, stacked below).
 */
export function ServiceHero({ content }: { content: ServiceHeroContent }) {
  const zoom = { "--hero-zoom": content.imageZoom ?? 1 } as CSSProperties;
  const paragraphs =
    typeof content.description === "string"
      ? [content.description]
      : content.description;
  const fit = content.imageFit === "fill" ? "object-fill" : "object-cover";
  const { secondaryCta, secondaryCtaMobileLabel } = content;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className={`relative isolate flex overflow-hidden lg:min-h-service-hero ${
        mobileHeightClasses[content.mobileHeight ?? "default"]
      }`}
    >
      {content.mobileImage ? (
        <Image
          src={content.mobileImage.src}
          alt={content.mobileImage.alt}
          fill
          sizes="100vw"
          className={`-z-10 md:hidden ${fit}`}
        />
      ) : null}
      <Image
        src={content.image.src}
        alt={content.image.alt}
        fill
        preload
        sizes="100vw"
        style={zoom}
        className={`-z-10 lg:origin-top lg:scale-(--hero-zoom) ${
          content.imageAnchor === "center"
            ? "lg:object-center"
            : "lg:object-top"
        } ${fit} ${content.mobileImage ? "max-md:hidden" : ""}`}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-transparent from-[60.096%] to-black/50 to-[77.885%] lg:from-[61.058%] lg:to-[77.404%]"
      />

      <div className="container-site flex flex-col justify-between gap-12 pt-12 pb-6 lg:pt-20 lg:pb-8">
        <div className="flex flex-col items-start gap-4 md:max-w-service-hero-copy">
          <h1
            id={HEADING_ID}
            className={`text-3xl font-semibold lg:text-4xl ${
              content.headingTone === "umber" ? "text-umber" : "text-ochre"
            }`}
          >
            {content.heading}
          </h1>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base text-ochre-deep lg:text-lg">
              {paragraph}
            </p>
          ))}
          <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:gap-6">
            <ButtonLink href={content.primaryCta.href}>
              {content.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="light">
              {secondaryCtaMobileLabel ? (
                <>
                  <span className="md:hidden">{secondaryCtaMobileLabel}</span>
                  <span className="max-md:hidden">{secondaryCta.label}</span>
                </>
              ) : (
                secondaryCta.label
              )}
            </ButtonLink>
          </div>
          <div className="h-rating-h w-rating-w overflow-hidden rounded-chip bg-veil backdrop-blur-badge">
            <CroppedImage
              image={content.rating.image}
              crop={content.rating.crop}
              sizes="224px"
              className="size-full"
            />
          </div>
        </div>

        {content.points.length > 0 ? (
          <ul
            className={`flex flex-col text-sm text-inverse lg:flex-row lg:gap-8 lg:text-base ${
              content.tightPoints ? "gap-2" : "gap-4"
            } ${
              content.pointsSpread ? "lg:justify-between" : "lg:justify-center"
            }`}
          >
            {content.points.map((point) => {
              const label = typeof point === "string" ? point : point.label;
              return (
                <CheckItem key={label} gap="loose">
                  {typeof point === "string" ? (
                    point
                  ) : (
                    <>
                      <span className="md:hidden">{point.mobileLabel}</span>
                      <span className="max-md:hidden">{point.label}</span>
                    </>
                  )}
                </CheckItem>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
