import Image from "next/image";
import type { CSSProperties } from "react";
import type { ServiceHeroContent } from "@/content/services/types";
import { ButtonLink } from "@/components/ui/Button";
import { CheckItem } from "@/components/ui/CheckItem";
import { CroppedImage } from "@/components/ui/CroppedImage";

const HEADING_ID = "service-hero-heading";

/**
 * Service page hero (IoT: Figma 12110:446 at 1440, 12110:854 at 390).
 * Full-bleed photo with a bottom scrim; copy, CTAs and Clutch badge on top, capability checklist
 * along the bottom (row from 1024, stacked below).
 */
export function ServiceHero({ content }: { content: ServiceHeroContent }) {
  const zoom = { "--hero-zoom": content.imageZoom ?? 1 } as CSSProperties;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative isolate flex min-h-service-hero-sm overflow-hidden lg:min-h-service-hero"
    >
      <Image
        src={content.image.src}
        alt={content.image.alt}
        fill
        preload
        sizes="100vw"
        style={zoom}
        className="-z-10 object-cover lg:origin-top lg:scale-(--hero-zoom) lg:object-top"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-transparent from-[60.096%] to-black/50 to-[77.885%] lg:from-[61.058%] lg:to-[77.404%]"
      />

      <div className="container-site flex flex-col justify-between gap-12 pt-12 pb-6 lg:pt-20 lg:pb-8">
        <div className="flex flex-col items-start gap-4 md:max-w-service-hero-copy">
          <h1
            id={HEADING_ID}
            className="text-3xl font-semibold text-ochre lg:text-4xl"
          >
            {content.heading}
          </h1>
          <p className="text-base text-ochre-deep lg:text-lg">
            {content.description}
          </p>
          <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:gap-6">
            <ButtonLink href={content.primaryCta.href}>
              {content.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={content.secondaryCta.href} variant="light">
              {content.secondaryCta.label}
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

        <ul className="flex flex-col gap-4 text-sm text-inverse lg:flex-row lg:justify-center lg:gap-8 lg:text-base">
          {content.points.map((point) => (
            <CheckItem key={point} gap="loose">
              {point}
            </CheckItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
