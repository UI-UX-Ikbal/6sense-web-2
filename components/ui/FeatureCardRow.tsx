"use client";

import { useState } from "react";
import type { FeatureCardItem } from "@/content/types";
import {
  FeatureCard,
  type FeatureCardSize,
  type FeatureCardSlots,
} from "./FeatureCard";

/** Slot by distance from the active card: active → lg, next → md, the other → sm. */
const SIZE_BY_OFFSET: readonly FeatureCardSize[] = ["lg", "md", "sm"];

type FeatureCardRowProps = {
  items: readonly FeatureCardItem[];
  icon: { src: string; width: number; height: number };
  slots: FeatureCardSlots;
  /** Card shown in the large slot before any interaction (Figma's default state). */
  initialActive?: number;
};

/**
 * Row of three image cards (homepage services, About "Not just a sector").
 * ≥1024: hovering or focusing a card grows it into the large slot and the others rotate down.
 * Below 1024 the cards stack full width.
 */
export function FeatureCardRow({
  items,
  icon,
  slots,
  initialActive = 0,
}: FeatureCardRowProps) {
  const [active, setActive] = useState(initialActive);
  const count = items.length;

  return (
    <ul className="flex flex-col gap-6 lg:flex-row lg:items-center">
      {items.map((item, index) => (
        <FeatureCard
          key={item.title}
          item={item}
          icon={icon}
          index={index}
          size={SIZE_BY_OFFSET[(index - active + count) % count] ?? "sm"}
          slots={slots}
          onActivate={() => setActive(index)}
        />
      ))}
    </ul>
  );
}
