"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type StackedItem = {
  id: string;
  /** The part that sticks and stacks. */
  card: ReactNode;
  /** Optional content that scrolls normally after the card (passes over earlier cards). */
  after?: ReactNode;
  afterClassName?: string;
};

type StackedListProps = {
  items: readonly StackedItem[];
  /** Vertical offset between stacked cards, in px (how much of each earlier card peeks out). */
  step: number;
  /** Card height as a CSS length, so the stack never pushes a card below the viewport. */
  cardHeight: string;
  /** Scale lost per card stacked on top (Figma: earlier cards render slightly narrower). */
  scaleStep: number;
  className?: string;
};

/**
 * Sticky stacked-card scroll (Figma 11995:47029, 11995:47727, 12002:449).
 * From the `stack:` breakpoint each card sticks below the header, offset by `step`; cards
 * underneath shrink slightly and fade behind a veil. Below it, the list scrolls normally.
 * Covered cards carry `data-stacked`, so cards can restyle with `group-data-stacked/stack:`.
 */
export function StackedList({
  items,
  step,
  cardHeight,
  scaleStep,
  className = "",
}: StackedListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [depths, setDepths] = useState<number[]>(() => items.map(() => 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const cards = Array.from(
        container.querySelectorAll<HTMLElement>("[data-stack-card]"),
      );
      const stuck = cards.map((card) => {
        const style = getComputedStyle(card);
        if (style.position !== "sticky") return false;
        return card.getBoundingClientRect().top <= parseFloat(style.top) + 1;
      });
      const next = stuck.map(
        (_, index) => stuck.slice(index + 1).filter(Boolean).length,
      );
      setDepths((current) => (current.join() === next.join() ? current : next));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-col ${className}`.trim()}>
      {items.map((item, index) => {
        const depth = depths[index] ?? 0;
        const cardStyle = {
          // Applied via `stack:top-*` only, so relative cards aren't shifted when not sticky.
          "--stack-card-top": `min(calc(var(--stack-top) + ${index * step}px), calc(100dvh - ${cardHeight} - var(--stack-gap)))`,
          zIndex: index * 2 + 1,
          scale: depth ? `${1 - depth * scaleStep}` : undefined,
        } as CSSProperties;
        return (
          <Fragment key={item.id}>
            <div
              data-stack-card
              data-stacked={depth > 0 || undefined}
              style={cardStyle}
              className="group/stack relative origin-top transition-[scale] duration-300 ease-out motion-reduce:transition-none stack:sticky stack:top-(--stack-card-top)"
            >
              {item.card}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 rounded-panel bg-surface transition-opacity duration-300 motion-reduce:transition-none ${
                  depth ? "opacity-50" : "opacity-0"
                }`}
              />
            </div>
            {item.after ? (
              <div
                className={`relative ${item.afterClassName ?? ""}`.trim()}
                style={{ zIndex: index * 2 + 2 }}
              >
                {item.after}
              </div>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}
