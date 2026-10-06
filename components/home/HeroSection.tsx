import Image from "next/image";
import { homeContent } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { HeroNotificationStack } from "./HeroNotificationStack";

const HEADING_ID = "hero-heading";

/**
 * Homepage hero (Figma 11995:43863 at 1440, 11995:44850 at 390).
 * 390–1023: image on top, copy below. ≥1024: copy left in the content column, image bleeds right.
 */
export function HeroSection() {
  const { hero } = homeContent;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative overflow-hidden bg-cream"
    >
      <div className="flex flex-col lg:h-hero lg:flex-row lg:gap-12 lg:ps-[max(var(--gutter),calc((100%-var(--container-content))/2))]">
        <div className="relative h-hero-media-sm overflow-hidden md:aspect-video md:h-auto lg:order-last lg:aspect-auto lg:h-full lg:flex-1">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            preload
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[50%_17.6%] lg:object-center"
          />
          <HeroNotificationStack notifications={hero.notifications} />
        </div>

        <div className="relative z-10 container-site flex flex-col gap-12 pt-12 pb-21 md:gap-8 lg:mx-0 lg:w-hero-copy lg:max-w-none lg:shrink-0 lg:px-0 lg:py-section">
          <div className="flex flex-col gap-4 text-fg">
            <h1
              id={HEADING_ID}
              className="text-display-sm font-semibold text-black md:text-display lg:font-bold"
            >
              {hero.headline.map((segment) =>
                segment.highlight ? (
                  <span key={segment.text} className="text-accent">
                    {segment.text}
                  </span>
                ) : (
                  segment.text
                ),
              )}
            </h1>
            <p className="text-base md:text-lg">{hero.description}</p>
          </div>

          <div className="flex flex-col gap-6 md:flex-row">
            <ButtonLink
              href={hero.primaryCta.href}
              className="w-full md:w-auto"
            >
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="outline-dark"
              className="w-full md:w-auto"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Oversized "6SenseHQ" wordmark — decorative; left-aligned to the content column at ≥768, outlined SVG at 390. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[0.5636em] container-site hidden h-[1.359em] overflow-hidden bg-linear-to-b from-wordmark-from from-[32.692%] to-wordmark-to bg-clip-text text-[length:var(--wordmark-size)] leading-[1.2] font-bold whitespace-nowrap text-transparent select-none md:block"
      >
        {hero.wordmark}
      </div>
      <Image
        src={hero.mobileWordmark.src}
        alt=""
        width={hero.mobileWordmark.width}
        height={hero.mobileWordmark.height}
        className="pointer-events-none absolute -bottom-2.75 left-1/2 -translate-x-1/2 select-none md:hidden"
      />
    </section>
  );
}
