"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { FaqContent } from "@/content/types";
import { siteContent } from "@/content/site";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type FaqSectionProps = {
  content: FaqContent;
  /** id for the section heading (aria-labelledby). */
  headingId?: string;
  /** compact: 18 / 14 type below 1024 (homepage). large: 20 / 16 at every width (IoT 12110:1079). */
  type?: "compact" | "large";
};

const typeClasses = {
  compact: { question: "text-lg lg:text-xl", answer: "text-sm lg:text-base" },
  large: { question: "text-xl", answer: "text-base" },
} as const;

/**
 * FAQ accordion (homepage 11995:44700 / 11995:45698, IoT service 12110:677 / 12110:1079).
 * Each question is a disclosure button; "Expand all" opens every answer.
 */
export function FaqSection({
  content,
  headingId = "faq-heading",
  type = "compact",
}: FaqSectionProps) {
  const typography = typeClasses[type];
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(
    () => new Set(content.defaultOpen),
  );
  const allOpen = open.size === content.items.length;

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <section aria-labelledby={headingId} className="bg-sage section-y">
      <div className="container-site flex flex-col gap-6 lg:flex-row">
        <Reveal className="flex items-start gap-6 lg:w-faq-intro lg:shrink-0 lg:flex-col lg:pr-16">
          <h2
            id={headingId}
            className="min-w-0 flex-1 text-3xl font-semibold text-brand lg:flex-none lg:text-4xl"
          >
            {content.heading}
          </h2>
          <button
            type="button"
            onClick={() =>
              setOpen(new Set(content.items.map((_, index) => index)))
            }
            aria-disabled={allOpen}
            className={buttonClasses("outline-dark", "shrink-0 cursor-pointer")}
          >
            {content.expandAll}
          </button>
        </Reveal>

        <Reveal delay={120} className="flex min-w-0 flex-1 flex-col gap-6">
          {content.items.map((item, index) => {
            const isOpen = open.has(index);
            const buttonId = `${baseId}-q${index}`;
            const panelId = `${baseId}-a${index}`;
            return (
              <div
                key={item.question}
                className="border-t border-sage-line py-2"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className={`flex w-full cursor-pointer items-start justify-between gap-4 rounded-sm text-left text-fg ${typography.question}`}
                  >
                    <span className="lg:w-faq-question">{item.question}</span>
                    <Image
                      src={isOpen ? content.icons.open : content.icons.closed}
                      alt=""
                      width={32}
                      height={32}
                      className="shrink-0"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`pt-2 text-muted lg:w-faq-question ${typography.answer}`}
                    >
                      {item.answer ?? siteContent.faqAnswerPlaceholder}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
