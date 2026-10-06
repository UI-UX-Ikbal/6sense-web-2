import Image from "next/image";
import type { Testimonial, TestimonialsContent } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";

const STAR_COUNT = 5;

export type TestimonialLabels = Omit<TestimonialsContent, "heading" | "items">;

type TestimonialCardProps = {
  testimonial: Testimonial;
  labels: TestimonialLabels;
  /** ≥1024: the expanded card shows body, project panel and link; the other shows the quote only. */
  expanded: boolean;
  onActivate: () => void;
};

function Rating({
  rating,
  labels,
}: {
  rating: string;
  labels: TestimonialLabels;
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-chip bg-review p-2">
      <div className="flex items-center gap-1.5">
        <span className="flex items-center gap-1 text-xs whitespace-nowrap text-fg">
          <Image src={labels.verifiedIcon} alt="" width={16} height={16} />
          {labels.verifiedLabel}
        </span>
        <span aria-hidden className="flex items-center gap-1 p-px">
          {Array.from({ length: STAR_COUNT }, (_, index) => (
            <Image
              key={index}
              src={labels.starIcon}
              alt=""
              width={16}
              height={16}
            />
          ))}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Image
          src={labels.clutchLogo.src}
          alt={labels.clutchLogo.alt}
          width={labels.clutchLogo.width}
          height={labels.clutchLogo.height}
          className="h-6 w-clutch-w object-cover"
        />
        <p className="text-base font-semibold text-black lg:text-lg">
          {rating}
        </p>
      </div>
    </div>
  );
}

/** Clutch review card (Figma 11995:46705 expanded, 11995:46745 collapsed, 11995:45484 at 390). */
export function TestimonialCard({
  testimonial,
  labels,
  expanded,
  onActivate,
}: TestimonialCardProps) {
  const collapsedOnDesktop = expanded ? "" : "lg:hidden";

  return (
    <li
      onMouseEnter={onActivate}
      onFocus={onActivate}
      data-expanded={expanded}
      className={`flex min-w-0 rounded-panel bg-surface px-7.5 py-8 lg:h-full lg:shrink-0 lg:duration-500 lg:ease-out lg:motion-safe:transition-[width] ${
        expanded
          ? "lg:w-(--testimonial-w-active)"
          : "lg:w-[calc(100%-var(--testimonial-w-active)-var(--spacing)*9)]"
      }`}
    >
      <figure className="flex w-full min-w-0 flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex max-w-subheading-col flex-col gap-4 lg:flex-1">
            <blockquote className="text-quote-sm font-semibold text-fg lg:text-3xl">
              <p>{testimonial.quote}</p>
            </blockquote>
            <p
              className={`text-sm text-fg-subtle lg:text-base ${collapsedOnDesktop}`.trim()}
            >
              {testimonial.body}
            </p>
          </div>
          <figcaption className="flex items-center gap-2.5">
            <Image
              src={testimonial.avatar.src}
              alt={testimonial.avatar.alt}
              width={testimonial.avatar.width}
              height={testimonial.avatar.height}
              className={`size-avatar-md shrink-0 rounded-full lg:duration-500 lg:motion-safe:transition-[width,height] ${
                expanded ? "lg:size-avatar-lg" : "lg:size-avatar-sm"
              }`}
            />
            <Rating rating={testimonial.rating} labels={labels} />
          </figcaption>
        </div>

        <div
          className={`flex flex-col items-end justify-end gap-2.5 lg:shrink-0 ${collapsedOnDesktop}`.trim()}
        >
          <dl className="flex w-full flex-col gap-6 rounded-panel bg-panel p-6 text-fg lg:w-testimonial-panel">
            <div className="flex flex-col gap-2">
              <dt className="text-sm">{labels.projectLabel}</dt>
              <dd className="text-lg font-semibold lg:text-xl">
                {testimonial.project.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-sm">{labels.countryLabel}</dt>
              <dd className="text-lg font-semibold lg:text-xl">
                {testimonial.country}
              </dd>
            </div>
          </dl>
          <ButtonLink
            href={testimonial.link.href}
            variant="soft"
            className="w-full text-sm lg:w-auto lg:text-button"
          >
            {testimonial.link.label}
          </ButtonLink>
        </div>
      </figure>
    </li>
  );
}
