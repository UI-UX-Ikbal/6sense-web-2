import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { FeatureCardItem } from "@/content/types";

export type FeatureCardSize = "lg" | "md" | "sm";

/** Per-page Tailwind classes for each ≥1024 size slot and for the stacked (<1024) cards by position. */
export type FeatureCardSlots = {
  sizes: Record<FeatureCardSize, string>;
  mobile: readonly string[];
  /** Title / body type classes; defaults to 20→24 and 14→16 at 1024. */
  copy?: { title: string; body: string };
  /** ≥1024 overrides per size slot when the copy shrinks with the card (IoT service 12655:469). */
  sizeCopy?: Partial<Record<FeatureCardSize, FeatureCardSizeCopy>>;
};

/** `lg:` classes for one slot: title, body, icon badge and chip link. */
export type FeatureCardSizeCopy = {
  title: string;
  body: string;
  badge: string;
  chip: string;
};

const DEFAULT_COPY = {
  title: "text-xl lg:text-2xl",
  body: "text-sm lg:text-base",
};

type FeatureCardProps = {
  item: FeatureCardItem;
  icon: { src: string; width: number; height: number };
  index: number;
  size: FeatureCardSize;
  slots: FeatureCardSlots;
  /** Called on hover / keyboard focus so the row can promote this card. */
  onActivate: () => void;
};

/** Image-backed card (list item) with icon badge, copy and a chip link. */
export function FeatureCard({
  item,
  icon,
  index,
  size,
  slots,
  onActivate,
}: FeatureCardProps) {
  const vars = {
    "--scrim-from": item.scrim.from,
    "--scrim-to": item.scrim.to,
    "--image-position": item.imagePosition?.base ?? "50% 50%",
    "--image-position-lg": item.imagePosition?.lg ?? "50% 50%",
  } as CSSProperties;
  const mobile = slots.mobile[index] ?? slots.mobile.at(-1) ?? "";
  const copy = slots.copy ?? DEFAULT_COPY;
  const sizeCopy = slots.sizeCopy?.[size];

  return (
    <li
      style={vars}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      data-size={size}
      className={`relative isolate flex w-full flex-col justify-end overflow-hidden p-6 [--overlay-from:var(--scrim-from)] [--overlay-to:var(--scrim-to)] lg:shrink-0 lg:px-7.5 lg:py-8 lg:duration-500 lg:ease-out lg:motion-safe:transition-[width,height,border-radius] ${mobile} ${slots.sizes[size]}`}
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="-z-10 object-cover object-(--image-position) lg:object-(--image-position-lg)"
      />
      <div aria-hidden className="absolute inset-0 -z-10 card-scrim" />

      <div className="flex flex-col items-start gap-4 text-inverse">
        <Image
          src={icon.src}
          alt=""
          width={Math.round(icon.width)}
          height={Math.round(icon.height)}
          className={`size-badge ${sizeCopy?.badge ?? ""}`}
        />
        <h3 className={`font-semibold ${copy.title} ${sizeCopy?.title ?? ""}`}>
          {item.title}
        </h3>
        <p className={`${copy.body} ${sizeCopy?.body ?? ""}`}>
          {item.description}
        </p>
        <Link
          href={item.link.href}
          className={`rounded-full bg-chip px-4 py-2 text-sm backdrop-blur-button transition-colors duration-200 hover:bg-brand motion-reduce:transition-none ${sizeCopy?.chip ?? ""}`}
        >
          {item.link.label}
        </Link>
      </div>
    </li>
  );
}
