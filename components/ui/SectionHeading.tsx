export type HeadingTone = "fg" | "brand" | "inverse";

export type HeadingSize = "responsive" | "large";

/** responsive: 30/45 → 36/54 title, 16 → 18 subheading. large: 36/54 and 18 at every width. */
const sizeClasses: Record<HeadingSize, { title: string; subheading: string }> =
  {
    responsive: {
      title: "text-3xl lg:text-4xl",
      subheading: "text-base lg:text-lg",
    },
    large: { title: "text-4xl", subheading: "text-lg" },
  };

const toneClasses: Record<HeadingTone, string> = {
  fg: "text-fg",
  brand: "text-brand",
  inverse: "text-inverse",
};

type SectionHeadingProps = {
  title: string;
  subheading?: string;
  /** id for the heading, so the section can use aria-labelledby. */
  id?: string;
  tone?: HeadingTone;
  size?: HeadingSize;
  /** Extra classes for the title (e.g. a fixed column width). */
  titleClassName?: string;
  className?: string;
};

/**
 * Section title + optional subheading ("Heading" frame in Figma, e.g. 11995:43899).
 * Stacked at 390 (30/45, gap 12); side by side from 1024 (36/54, gap 48, subheading 640 wide).
 */
export function SectionHeading({
  title,
  subheading,
  id,
  tone = "fg",
  size = "responsive",
  titleClassName = "",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-3 ${toneClasses[tone]} lg:flex-row lg:items-start lg:gap-12 ${className}`.trim()}
    >
      <h2
        id={id}
        className={`font-semibold lg:shrink-0 ${sizeClasses[size].title} ${titleClassName}`.trim()}
      >
        {title}
      </h2>
      {subheading ? (
        <p
          className={`lg:w-subheading-col lg:max-w-full lg:pt-4 ${sizeClasses[size].subheading}`}
        >
          <span className="block lg:max-w-subheading">{subheading}</span>
        </p>
      ) : null}
    </div>
  );
}
