import Image from "next/image";
import { aboutContent } from "@/content/about";
import { CheckItem } from "@/components/ui/CheckItem";
import { CroppedImage } from "@/components/ui/CroppedImage";

const HEADING_ID = "about-hero-heading";

/**
 * About hero (Figma 12291:3416 at 1440, 12293:4266 at 390).
 * <1024: photo with the checklist on top, copy below. ≥1024: copy left in the content column,
 * photo bleeds right; the photo box overhangs the column (867×724 at −107px) and is clipped.
 */
export function AboutHero() {
  const { hero } = aboutContent;
  const [firstLine, secondLine] = hero.heading;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative overflow-hidden bg-cream"
    >
      <div className="flex flex-col lg:h-hero-about lg:flex-row lg:gap-12 lg:ps-[max(var(--gutter),calc((100%-var(--container-content))/2))]">
        <div className="relative h-hero-media-sm overflow-hidden md:aspect-video md:h-auto lg:order-last lg:aspect-auto lg:h-full lg:flex-1">
          <div className="absolute inset-0 lg:inset-auto lg:bottom-0 lg:-left-[16.563%] lg:h-[124.828%] lg:w-[134.211%]">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover object-bottom"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-b from-hero-scrim-from from-[27.206%] to-hero-scrim-to to-[66.267%] lg:from-[52.404%] lg:to-[79.808%]"
            />
          </div>

          <ul className="absolute bottom-0 left-0 flex flex-col gap-2 px-(--gutter) py-2 text-base text-inverse lg:gap-3 lg:p-6 lg:text-lg">
            {hero.points.map((point) => (
              <CheckItem key={point} gap="loose">
                {point}
              </CheckItem>
            ))}
          </ul>
        </div>

        <div className="container-site flex flex-col justify-center gap-8 py-12 lg:mx-0 lg:max-w-none lg:min-w-0 lg:flex-1 lg:px-0 lg:py-section">
          <div className="flex flex-col gap-4">
            <h1
              id={HEADING_ID}
              className="text-3xl font-semibold text-brand lg:text-4xl"
            >
              {firstLine} <br className="max-lg:hidden" />
              {secondLine}
            </h1>
            <p className="text-base text-fg lg:max-w-about-hero-copy lg:text-lg">
              {hero.description}
            </p>
          </div>

          <div className="h-rating-h w-rating-w overflow-hidden rounded-chip bg-veil backdrop-blur-badge">
            <CroppedImage
              image={hero.rating.image}
              crop={hero.rating.crop}
              sizes="224px"
              className="size-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
