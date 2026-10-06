import Image from "next/image";
import {
  bookMeetingContent,
  type MeetingDetail,
} from "@/content/book-a-meeting";
import { MeetingScheduler } from "@/components/booking/MeetingScheduler";
import { IconPoint } from "@/components/ui/IconPoint";

/**
 * Hero with the booking scheduler (Figma 12266:767 at 1440, 12266:1968 at 390).
 * <1024: copy stacked above the scheduler. ≥1024: two equal columns, 48px apart.
 */
export function BookingHero() {
  const { hero, scheduler } = bookMeetingContent;

  return (
    <section
      aria-labelledby="booking-hero-heading"
      className="bg-surface py-12 lg:py-20"
    >
      <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex flex-col gap-4 lg:min-w-0 lg:flex-1 lg:gap-6 lg:pr-13">
          <h1
            id="booking-hero-heading"
            className="text-3xl font-semibold text-brand lg:text-4xl"
          >
            {hero.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="text-base text-fg-subtle lg:text-lg">
            {hero.description}
          </p>
          <p className="text-base text-fg-subtle lg:text-lg">
            {hero.pointsIntro}
          </p>
          <ul className="flex flex-col gap-3 text-base text-fg lg:gap-6 lg:text-lg">
            {hero.points.map((point) => (
              <IconPoint key={point} icon={hero.pointIcon}>
                {point}
              </IconPoint>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 pt-4 lg:min-w-0 lg:flex-1 lg:gap-0">
          <ul className="flex flex-wrap gap-6 lg:px-8.5">
            {hero.details.map((detail) => (
              <DetailChip key={detail.title} detail={detail} />
            ))}
          </ul>
          <MeetingScheduler content={scheduler} />
        </div>
      </div>
    </section>
  );
}

/** Host / duration chip (32px badge + two lines, Figma 12266:798 / 12266:803). */
function DetailChip({ detail }: { detail: MeetingDetail }) {
  return (
    <li className="flex items-start gap-3">
      <Image
        src={detail.icon.src}
        alt={detail.icon.alt}
        width={detail.icon.width}
        height={detail.icon.height}
        className="size-8 shrink-0 rounded-full object-cover"
      />
      <p className="flex flex-col">
        <span className="text-lg font-semibold text-fg">{detail.title}</span>
        <span className="text-sm text-fg-subtle">{detail.caption}</span>
      </p>
    </li>
  );
}
