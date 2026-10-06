/** Site-wide metadata. Copy source: Figma hero (12215:1278 / 12215:1279). */
export const siteContent = {
  name: "6sense HQ",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Shown for FAQ entries whose answers are not in the design yet (see report). */
  faqAnswerPlaceholder: "Answer coming soon.",
  home: {
    heading:
      "Software Engineering for energy, mobility & data driven companies",
    description:
      "6sense HQ is a software and AI partner for energy, mobility, and operations-heavy businesses — from EV charging infrastructure to the data pipelines and internal platforms that keep complex operations moving.",
  },
} as const;
