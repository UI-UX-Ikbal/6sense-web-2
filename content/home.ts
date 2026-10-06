import { routes } from "@/content/navigation";
import { siteContent } from "@/content/site";
import type {
  FaqContent,
  FaqItem,
  FeatureCardItem,
  ImageAsset,
  LinkItem,
  OrbitLayer,
  Testimonial,
  TestimonialsContent,
} from "@/content/types";

export type { ImageAsset, LinkItem, OrbitLayer };

/**
 * Homepage copy, links and imagery.
 * Figma: desktop 11995:43840, mobile 11995:44828.
 */

export type HeadlineSegment = { text: string; highlight?: boolean };

export type HeroNotification = {
  name: string;
  avatar: ImageAsset;
  title: string;
  body: string;
};

export type ServiceItem = FeatureCardItem;

export type TechGroup = { title: string; items: readonly string[] };

export type CaseStudy = {
  meta: string;
  title: string;
  /** Text colour over the photo: "dark" for bright images, "light" otherwise. */
  tone: "dark" | "light";
  image: ImageAsset;
  /** CSS background-image for the photo scrim (per card in Figma). */
  scrim: string;
  /** object-position for the 390 crop. */
  mobileImagePosition: string;
  /** object-position from 1024 (defaults to centre). */
  imagePosition?: string;
  highlights: readonly string[];
  link: LinkItem;
  details: {
    heading: string;
    groups: readonly TechGroup[];
    highlights: readonly string[];
  };
};

export type { Testimonial };

export type Industry = {
  title: string;
  description: string;
  image: ImageAsset;
  /** object-position for the 390 crop, when Figma crops off-centre. */
  mobileImagePosition?: string;
  /** Mobile scrim stops when they differ from the default. */
  scrim?: { from: string; to: string };
};

export type NewsItem = {
  title: string;
  description: string;
  image: ImageAsset;
  link: LinkItem;
};

export type Insight = {
  title: string;
  excerpt: string;
  image: ImageAsset;
  author: { name: string; avatar: ImageAsset };
  readTime: string;
  link: LinkItem;
};

export type { FaqItem };

const avatar = (name: string): ImageAsset => ({
  src: `/home/hero/avatar-${name.toLowerCase()}.png`,
  alt: "",
  width: 56,
  height: 56,
});

/** Icon cluster states (tree → fuel → car): 12049:3993, 11995:46858, 11995:46912. Shared by the mission card and CTA band. */
export const orbitStates = [
  [
    {
      src: "/home/mission/orbit/s1-main-ring.svg",
      size: 76.385,
      left: 0,
      top: 0,
      opacity: 0.5,
    },
    {
      src: "/home/mission/orbit/s1-main-icon.svg",
      size: 50.923,
      left: 12.73,
      top: 12.73,
      opacity: 0.5,
    },
    {
      src: "/home/mission/orbit/s1-small-bottom.svg",
      size: 27.23,
      left: 73.38,
      top: 66.77,
      opacity: 0.5,
    },
    {
      src: "/home/mission/orbit/s1-small-top.svg",
      size: 29.134,
      left: 94.04,
      top: 9.86,
      opacity: 0.5,
    },
  ],
  [
    {
      src: "/home/mission/orbit/s2-main.svg",
      size: 76.385,
      left: 0,
      top: 0,
      opacity: 1,
    },
    {
      src: "/home/mission/orbit/s2-small-bottom.svg",
      size: 27.23,
      left: 73.38,
      top: 66.77,
      opacity: 0.3,
    },
    {
      src: "/home/mission/orbit/s2-small-top.svg",
      size: 29.134,
      left: 96,
      top: 13,
      opacity: 0.3,
    },
  ],
  [
    {
      src: "/home/mission/orbit/s3-main.svg",
      size: 76.385,
      left: 0,
      top: 0,
      opacity: 1,
    },
    {
      src: "/home/mission/orbit/s3-small-bottom.svg",
      size: 27.23,
      left: 73.38,
      top: 66.77,
      opacity: 0.3,
    },
    {
      src: "/home/mission/orbit/s3-small-top.svg",
      size: 29.134,
      left: 96,
      top: 13,
      opacity: 0.3,
    },
  ],
] satisfies OrbitLayer[][];

/** Section ids used for in-page anchors. */
export const homeSectionIds = {
  services: "our-engineering-services",
} as const;

const ENGINEER_CTA: LinkItem = {
  label: "Talk to an engineer",
  href: routes.contact,
};
const SERVICE_BLURB =
  "We engineer what's next: a platform, a feature, an integration, a data layer, or AI at the core.";
const READ_MORE = "Read more";

const CASE_HIGHLIGHTS_EV = [
  "Built the full platform — bookings, payments, access control, live monitoring.",
  "Hardware-agnostic via OCPP: no charger-vendor lock-in.",
  "Trusted by names like Greystar and Cushman & Wakefield.",
] as const;

const TECH_ENERGY_MOBILITY: readonly TechGroup[] = [
  {
    title: "EV charging & mobility",
    items: [
      "OCPP",
      "Multi-vendor chargers",
      "Charge-session billing",
      "Cloud platform",
    ],
  },
  {
    title: "Oil & gas data",
    items: ["Production and regulatory data", "ETL", "GIS", "Analytics"],
  },
  {
    title: "Utilities & energy",
    items: [
      "Metering and energy data",
      "Asset systems forecasting",
      "Customer and billing platforms",
    ],
  },
  {
    title: "Connected devices & IoT",
    items: ["Telemetry", "Device management", "Cloud platform"],
  },
];

const TECH_AI_AUTOMATION: readonly TechGroup[] = [
  {
    title: "AI Automation",
    items: [
      "OCPP",
      "Multi-vendor chargers",
      "Charge-session billing",
      "Roaming",
    ],
  },
  {
    title: "Process Automation",
    items: ["The internal platforms", "Billing", "Documents", "Workflows"],
  },
  {
    title: "AI Agent Development",
    items: ["Production and regulatory data", "ETL across all fifty states"],
  },
  {
    title: "Web Application",
    items: ["Telemetry", "Device management", "Cloud platform"],
  },
];

const OIL_GAS_HIGHLIGHTS = [
  "Built ETL pipelines across all 50 US states.",
  "Unified well, production, land, and regulatory data in one platform.",
  "Added new states without rebuilding the system.",
] as const;

const BOTTOM_SCRIM =
  "linear-gradient(180deg, rgb(0 0 0 / 0) 64.5%, rgb(0 0 0 / 0.4) 82%)";

/** Routes linked from the homepage that have no page yet; served by the placeholder catch-all. */
export const homePlaceholderRoutes: readonly LinkItem[] = [
  { label: "Scale & Maintain Software", href: "/services/scale-and-maintain" },
  { label: "Build Software", href: "/services/build-software" },
  { label: "Fix & Stabilize Software", href: "/services/fix-and-stabilize" },
  { label: "Client reviews", href: "/reviews" },
];

export const homeContent = {
  // Hero — 11995:43863 (1440) / 11995:44850 (390)
  hero: {
    headline: [
      { text: "Software Engineering for " },
      { text: "energy", highlight: true },
      { text: ", " },
      { text: "mobility", highlight: true },
      { text: " & " },
      { text: "data driven", highlight: true },
      { text: " companies" },
    ] satisfies HeadlineSegment[],
    description: siteContent.home.description,
    primaryCta: { label: "Talk to an engineer", href: routes.contact },
    secondaryCta: {
      label: "How it works?",
      href: `#${homeSectionIds.services}`,
    },
    image: {
      src: "/home/hero/wind-farm.jpg",
      alt: "Wind turbines above a green wheat field at sunrise",
      width: 2731,
      height: 4096,
    } satisfies ImageAsset,
    mobileWordmark: {
      src: "/home/hero/wordmark-mobile.svg",
      width: 386,
      height: 58,
    },
    wordmark: "6SenseHQ",
    /** Back-to-front order as stacked in Figma (12012:1179). */
    notifications: [
      {
        name: "Sophia",
        avatar: avatar("Sophia"),
        title: "Data-Driven Decision Making",
        body: "Utilize advanced analytics and business intelligence systems to inform strategic decisions and enhance operational efficiency.",
      },
      {
        name: "Alex",
        avatar: avatar("Alex"),
        title: "Sustainable Practices in Tech",
        body: "Integrate eco-friendly processes into your workflow to reduce carbon footprint and promote sustainability within your organization.",
      },
      {
        name: "Maria",
        avatar: avatar("Maria"),
        title: "Enhancing Remote Collaboration",
        body: "Leverage real-time feedback tools and virtual whiteboards to improve team cohesion and productivity across distributed teams.",
      },
    ] satisfies HeroNotification[],
  },

  // Mission card ("CTA") — 11995:43876 (1440) / 12012:1355 (390)
  mission: {
    heading:
      "We build alongside the people moving energy, mobility & AI forward.",
    paragraphs: [
      "EV charging, energy, oil and gas, connected equipment — different businesses, one shared goal: make physical systems work better and waste less.",
      "When that's your mission, your engineering partner should understand why the work matters before it begins — not need it translated first. That's where we want to sit: understand the goal, then build what moves it forward.",
    ],
    image: {
      src: "/home/mission/forest.png",
      alt: "",
      width: 1024,
      height: 578,
    } satisfies ImageAsset,
    mobileImage: {
      src: "/home/mission/forest-mobile.png",
      alt: "",
      width: 1024,
      height: 578,
    } satisfies ImageAsset,
  },

  // Our engineering services — 11995:43898 (1440) / 11995:44886 (390)
  services: {
    id: homeSectionIds.services,
    heading: "Our engineering services",
    subheading:
      "Maintaining a 20,000+ user software or building from scratch, we got you covered",
    icon: {
      src: "/home/services/service-icon.svg",
      width: 76.385,
      height: 76.385,
    },
    items: [
      {
        title: "Scale & Maintain Software",
        description:
          "We engineer what's next: a platform, a feature, an integration, a data layer, or AI at the core.",
        link: {
          label: "How we maintain?",
          href: "/services/scale-and-maintain",
        },
        image: {
          src: "/home/services/scale-maintain.jpg",
          alt: "A lone oak tree in a misty meadow at sunrise",
          width: 4096,
          height: 2731,
        },
        scrim: { from: "42.308%", to: "71.154%" },
      },
      {
        title: "Build Software",
        description:
          "We engineer what's next: a platform, a feature, an integration, a data layer, or AI at the core.",
        link: { label: "How we build?", href: "/services/build-software" },
        image: {
          src: "/home/services/build.jpg",
          alt: "A green seedling sprouting from dark soil",
          width: 4096,
          height: 2696,
        },
        scrim: { from: "42.308%", to: "61.058%" },
      },
      {
        title: "Fix & Stabilize Software",
        description:
          "We engineer what's next: a platform, a feature, an integration, a data layer, or AI at the core.",
        link: { label: "How we fix?", href: "/services/fix-and-stabilize" },
        image: {
          src: "/home/services/fix-stabilize.jpg",
          alt: "A bare tree on a grassy hill under stormy clouds",
          width: 4096,
          height: 2731,
        },
        scrim: { from: "32.212%", to: "65.865%" },
      },
    ] satisfies ServiceItem[],
  },

  // 80+ Projects delivered — 11995:43934 (1440) / 11995:44922 (390); stacked state 11995:47029
  projects: {
    heading: "80+ Projects delivered",
    badge: { src: "/home/projects/badge.svg", width: 68, height: 68 },
    mobileBadge: {
      src: "/home/projects/badge-mobile.svg",
      width: 32,
      height: 32,
    },
    secondaryCta: { label: "See more work", href: routes.caseStudyCos },
    items: [
      {
        meta: "EV Charging Success Story | North Carolina, US | Scale & Maintain",
        title:
          "How ChargeOnSite became the EV-charging partner national landlords trust.",
        tone: "dark",
        image: {
          src: "/home/projects/chargeonsite.jpg",
          alt: "A parent and child plugging in an electric car at a charger beside a wind turbine",
          width: 4096,
          height: 2731,
        },
        scrim:
          "linear-gradient(180deg, rgb(0 0 0 / 0) 66.03%, rgb(0 0 0 / 0.4) 80.129%)",
        mobileImagePosition: "17.6% 50%",
        highlights: CASE_HIGHLIGHTS_EV,
        link: { label: "See full case study", href: routes.caseStudyCos },
        details: {
          heading: "What We Work With for Energy & Mobility",
          groups: TECH_ENERGY_MOBILITY,
          highlights: CASE_HIGHLIGHTS_EV,
        },
      },
      {
        meta: "Energy | Colorado, US | Fix & Stabilise",
        title:
          "50 states of scattered oil & gas data, unified into one map you can trust.",
        tone: "light",
        image: {
          src: "/home/projects/oil-gas-map.jpg",
          alt: "An oil pump jack silhouetted against a red sunset",
          width: 3626,
          height: 2479,
        },
        scrim: BOTTOM_SCRIM,
        mobileImagePosition: "50% 50%",
        highlights: OIL_GAS_HIGHLIGHTS,
        link: { label: "See full case study", href: "/case-studies/peaketl" },
        details: {
          heading: "What We Work With for AI & Automation",
          groups: TECH_AI_AUTOMATION,
          highlights: CASE_HIGHLIGHTS_EV,
        },
      },
      {
        meta: "AI Engine | New York, US | Build",
        title:
          "The patent-pending AI engine behind a compatibility-first web platform.",
        tone: "light",
        image: {
          src: "/home/projects/ai-engine.jpg",
          alt: "A person sitting in a mountain meadow below granite cliffs",
          width: 2273,
          height: 1521,
        },
        scrim: `linear-gradient(180deg, rgb(0 0 0 / 0.4) 0%, rgb(0 0 0 / 0) 36.538%), ${BOTTOM_SCRIM}`,
        mobileImagePosition: "50% 50%",
        highlights: OIL_GAS_HIGHLIGHTS,
        link: { label: "See full case study", href: "/case-studies/jeter-ai" },
        details: {
          heading: "What We Work With for AI & Automation",
          groups: TECH_AI_AUTOMATION,
          highlights: CASE_HIGHLIGHTS_EV,
        },
      },
    ] satisfies CaseStudy[],
  },

  // Words from our clients — 11995:46701 (1440) / 11995:45440 (390); states 11995:46628 / 11995:47654
  testimonials: {
    heading: "Words from our clients",
    verifiedLabel: "Phone Verified",
    projectLabel: "Project",
    countryLabel: "Country",
    clutchLogo: {
      src: "/home/testimonials/clutch.png",
      alt: "Clutch",
      width: 860,
      height: 283,
    },
    starIcon: "/home/icons/star.svg",
    verifiedIcon: "/home/icons/check-circle.svg",
    items: [
      {
        quote: "“The team performed exactly as required for this project.”",
        body: "6sense HQ delivered a working UI, marking the project's success. The team was highly responsive to changes and updates, and they consistently delivered tasks on time. Their understanding of the project's intent and thorough competitive research was commendable.",
        avatar: {
          src: "/home/testimonials/avatar-1.png",
          alt: "",
          width: 153,
          height: 153,
        },
        project: ["Custom Software Development", "Web Development"],
        country: "USA",
        rating: "5/5",
        link: { label: READ_MORE, href: "/reviews" },
      },
      {
        quote:
          "“They've been responsive, collaborative, and quick to find a solution.”",
        body: "6sense HQ has consistently delivered high-quality work on schedule. Their communication is clear, proactive, and organized. Moreover, the team is responsive, flexible, and collaborative. They also provide valuable recommendations and feel like a true extension of the client's team.",
        avatar: {
          src: "/home/testimonials/avatar-2.png",
          alt: "",
          width: 144,
          height: 144,
        },
        project: ["Custom Software Development", "Web Development"],
        country: "USA",
        rating: "5/5",
        link: { label: READ_MORE, href: "/reviews" },
      },
    ] satisfies Testimonial[],
  } satisfies TestimonialsContent,

  // Who we work with — 11995:44528 (1440) / 11995:45524 (390); stacked states 11995:47727 / 12002:449
  industries: {
    heading: "Who we work with",
    subheading:
      "Whichever part of your world you operate in, we've already engineered in it — so the work starts on day one, not week three.",
    icon: { src: "/home/industries/icon.svg", width: 76.385, height: 76.385 },
    cta: ENGINEER_CTA,
    items: [
      {
        title: "EV charging & mobility",
        description: SERVICE_BLURB,
        image: {
          src: "/home/services/scale-maintain.jpg",
          alt: "",
          width: 4096,
          height: 2731,
        },
      },
      {
        title: "Utilities & energy",
        description: SERVICE_BLURB,
        image: {
          src: "/home/services/build.jpg",
          alt: "",
          width: 4096,
          height: 2696,
        },
        scrim: { from: "49.038%", to: "85.096%" },
      },
      {
        title: "Oil & gas data",
        description: SERVICE_BLURB,
        image: {
          src: "/home/industries/oil-gas.jpg",
          alt: "",
          width: 743,
          height: 495,
        },
      },
      {
        title: "Connected devices & IOT",
        description: SERVICE_BLURB,
        image: {
          src: "/home/industries/connected-devices.jpg",
          alt: "",
          width: 744,
          height: 558,
        },
        mobileImagePosition: "50% 80.9%",
      },
      {
        title: "Operations-heavy businesses",
        description: SERVICE_BLURB,
        image: {
          src: "/home/industries/operations.jpg",
          alt: "",
          width: 2480,
          height: 1395,
        },
        mobileImagePosition: "50% 84.9%",
      },
      {
        title: "Something adjacent?",
        description: SERVICE_BLURB,
        image: {
          src: "/home/industries/adjacent.jpg",
          alt: "",
          width: 496,
          height: 744,
        },
      },
    ] satisfies Industry[],
  },

  // Latest news from us — 11995:44606 (1440) / 11995:45605 (390)
  news: {
    heading: "Latest news from us",
    primaryCta: ENGINEER_CTA,
    secondaryCta: { label: "See All News", href: "/news" },
    items: [
      {
        title: "EV charging & mobility",
        description: SERVICE_BLURB,
        image: {
          src: "/home/news/mou-signing.png",
          alt: "6sense and Ogga teams holding signed MOU documents",
          width: 828,
          height: 521,
        },
        link: { label: READ_MORE, href: "/news" },
      },
      {
        title: "Utilities & energy",
        description: SERVICE_BLURB,
        image: {
          src: "/home/news/award-team.png",
          alt: "The 6sense team posing with an award at an event booth",
          width: 828,
          height: 526,
        },
        link: { label: READ_MORE, href: "/news" },
      },
      {
        title: "Oil & gas data",
        description: SERVICE_BLURB,
        image: {
          src: "/home/news/event-team.png",
          alt: "Members of the 6sense team at a conference stand",
          width: 828,
          height: 677,
        },
        link: { label: READ_MORE, href: "/news" },
      },
    ] satisfies NewsItem[],
  },

  // Insights from experts — 11995:44642 (1440) / 11995:45640 (390)
  insights: {
    heading: "Insights from experts",
    primaryCta: ENGINEER_CTA,
    secondaryCta: { label: "See All Insights", href: "/insights" },
    items: [
      {
        title: "How to Transition to Offshore Teams Without Losing Control",
        excerpt:
          "Stop scrolling, start hiring: 15 best offshore dev sites for 2026 with rates, vetting process, and quick picks. Tap in!",
        image: {
          src: "/home/insights/offshore-transition.png",
          alt: "",
          width: 1080,
          height: 567,
        },
        author: {
          name: "Nasif Sid",
          avatar: {
            src: "/home/insights/author-nasif.png",
            alt: "",
            width: 153,
            height: 153,
          },
        },
        readTime: "9 min reading",
        link: { label: READ_MORE, href: "/insights" },
      },
      {
        title: "15 Best Sites to Hire Offshore Developers in 2026",
        excerpt:
          "Optimize your 2026 offshore strategy with a Mirror Stack, Zero Trust security, and AI to scale execution while saving 40-70%.",
        image: {
          src: "/home/insights/offshore-sites.png",
          alt: "",
          width: 1080,
          height: 567,
        },
        author: {
          name: "Nasif Sid",
          avatar: {
            src: "/home/insights/author-nasif.png",
            alt: "",
            width: 153,
            height: 153,
          },
        },
        readTime: "9 min reading",
        link: { label: READ_MORE, href: "/insights" },
      },
      {
        title:
          "6sense HQ Alternatives: Best MVP Teams for Founders (2026 Comparison)",
        excerpt:
          "Compare 6sense HQ alternatives for MVP development in 2026 and find the best software team for your startup budget and goals.",
        image: {
          src: "/home/insights/mvp-alternatives.png",
          alt: "",
          width: 1200,
          height: 630,
        },
        author: {
          name: "AKM Ahsan",
          avatar: {
            src: "/home/insights/author-akm.png",
            alt: "",
            width: 153,
            height: 153,
          },
        },
        readTime: "9 min reading",
        link: { label: READ_MORE, href: "/insights" },
      },
    ] satisfies Insight[],
  },

  // FAQ — 11995:44700 (1440) / 11995:45698 (390)
  faq: {
    heading: "Frequently asked questions",
    expandAll: "Expand all",
    icons: { open: "/home/faq/minus.svg", closed: "/home/faq/plus.svg" },
    /** Figma shows the first two expanded. */
    defaultOpen: [0, 1],
    items: [
      {
        question: "Which parts of energy and mobility have you worked in?",
        answer:
          "EV charging (CSMS/OCPP, charge-point operations, driver and fleet billing), oil and gas data engineering, and connected-device platforms. If you operate adjacent energy or mobility infrastructure, the engineering problems usually rhyme. The technical review call is where we confirm fit.",
      },
      {
        question:
          "We already use third-party software for billing, scheduling, or CSMS. Where do you fit?",
        answer:
          "Usually in the gaps those tools leave: the settlement that doesn't reconcile against energy delivered, the integration that breaks when you add a hardware vendor, the workflow that still runs across spreadsheets and WhatsApp. We build around your existing stack rather than a rip-and-replace, unless replacing is genuinely the cheaper path.",
      },
      {
        question: "Can you work with OCPP and multiple charger vendors?",
        answer: null,
      },
      {
        question: "What does the free technical review actually give us?",
        answer: null,
      },
      {
        question: "How do you handle our data, credentials, and system access?",
        answer: null,
      },
      { question: "Do you only work in energy and mobility?", answer: null },
    ] satisfies FaqItem[],
  } satisfies FaqContent,

  // Closing CTA — 12113:3889 (1440) / 12113:4312 (390)
  cta: {
    heading: "Let's talk about what you're building.",
    body: "Book a free 30-minute consultation with a senior engineer who knows your industry. No obligation — you'll leave with a clear view of what to tackle first.",
    link: ENGINEER_CTA,
    image: {
      src: "/home/cta/misty-forest.png",
      alt: "",
      width: 1024,
      height: 681,
    },
    mobileImage: {
      src: "/home/cta/misty-forest-mobile.png",
      alt: "",
      width: 1024,
      height: 681,
    },
  },
} as const;
