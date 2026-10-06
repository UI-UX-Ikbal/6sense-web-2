import Image from "next/image";
import { homeContent, orbitStates } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { IconOrbit } from "@/components/ui/IconOrbit";

const HEADING_ID = "mission-heading";

/**
 * Image-backed mission card (Figma "CTA" 11995:43876 at 1440, 12012:1355 at 390).
 * Heading leads at 390 and sits right at ≥1024; copy block keeps room for the icon cluster.
 */
export function MissionSection() {
  const { mission } = homeContent;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="bg-brand section-y md:bg-brand-deep"
    >
      <div className="container-site">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-panel p-6 lg:p-16">
            <Image
              src={mission.mobileImage.src}
              alt={mission.mobileImage.alt}
              fill
              sizes="100vw"
              className="-z-10 object-cover object-bottom md:hidden"
            />
            <Image
              src={mission.image.src}
              alt={mission.image.alt}
              fill
              sizes="(min-width: 1304px) 1240px, 100vw"
              className="-z-10 hidden object-cover object-bottom md:block"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-linear-to-b from-mission-from from-[68.269%] to-mission-to"
            />

            <div className="flex flex-col gap-6 text-fg lg:flex-row-reverse lg:gap-12">
              <h2
                id={HEADING_ID}
                className="text-3xl font-semibold lg:w-mission-heading lg:shrink-0 lg:text-4xl"
              >
                {mission.heading}
              </h2>
              <div className="flex min-h-mission-copy flex-1 flex-col gap-[1lh] text-base md:text-lg">
                {mission.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <IconOrbit
              states={orbitStates}
              className="absolute right-6 bottom-3.75 lg:right-10 lg:bottom-12.5"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
