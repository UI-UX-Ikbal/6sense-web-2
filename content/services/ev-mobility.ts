import { aboutContent } from "@/content/about";
import { homeContent, orbitStates } from "@/content/home";
import { routes } from "@/content/navigation";
import type { FaqContent } from "@/content/types";
import type { CapabilityItem, ServicePageContent } from "./types";

/**
 * "Service - EV & Mobility money" copy, links and imagery.
 * Figma: desktop 12121:412, mobile 12167:524.
 */

const ENGINEER_CTA = { label: "Talk to an engineer", href: routes.contact };

const TREE_ICON = { src: "/about/tree-badge.svg", width: 32, height: 32 };
const TREE_ICON_DARK = {
  src: "/services/icons/ev/why-badge.svg",
  width: 32,
  height: 32,
};

const plugIcon = (name: string) => ({
  src: `/services/icons/ev/${name}.svg`,
  width: 52,
  height: 52,
});

const capabilities: readonly CapabilityItem[] = [
  {
    icon: plugIcon("cpu"),
    title: "Chargers, firmware & connectivity",
    body: "OCPP, multi-vendor charger behavior, firmware - cloud contracts, OTA updates, certification, imported hardware that won't connect",
  },
  {
    icon: plugIcon("cloud-check"),
    title: "Platforms & CSMS",
    body: "Extensions, migrations, uptime SLAs, energy reconciliation, and the integrations a packaged platform will never build for one customer",
  },
  {
    icon: plugIcon("identification-card"),
    title: "Drivers, identity & access",
    body: "Driver apps, RFID and identity, session authorisation, white-label and multi-tenant experiences",
  },
  {
    icon: plugIcon("globe"),
    title: "Roaming & interoperability",
    body: "OCPI and OICP, CDR clearing, protocol version drift, settlement between parties, dispute resolution",
  },
  {
    icon: plugIcon("receipt"),
    title: "Billing, tariffs & settlement",
    body: "Tariff logic, payment reconciliation, legacy billing integration, fleet billing, revenue share",
  },
  {
    icon: plugIcon("windmill"),
    title: "Grid, energy & load",
    body: "Smart charging, load management, demand response, flexibility markets, DER, metering, grid signal integration, forecasting",
  },
  {
    icon: plugIcon("truck-trailer"),
    title: "Fleet, depot & telematics",
    body: "Bay and plug allocation, charge scheduling, state-of-charge targets, smart scheduling, load management, cost allocation.",
  },
  {
    icon: plugIcon("sparkle"),
    title: "Data & AI",
    body: "Aggregated session, energy and availability data, ETL across inconsistent sources, multi-CPO data quality, forecasting, operational insight",
  },
];

const faq: FaqContent = {
  heading: "Frequently asked questions",
  expandAll: "Expand all",
  icons: homeContent.faq.icons,
  defaultOpen: [0, 1],
  items: [
    {
      question: "We already use a CSMS. Can you work with it?",
      answer:
        "Yes. That's most of what we do — integrations, billing workflows, data, driver and fleet capabilities, operational tooling, and reliability, built around a platform that already works.",
    },
    {
      question: "Do you build complete CSMS platforms from scratch?",
      answer:
        "That isn't the focus of this service. Our charging work is the engineering around, within, and between charging platforms, rather than competing as a turnkey CSMS vendor.",
    },
    {
      question:
        "Our imported chargers won't talk to our software properly. Is that something you do?",
      answer: null,
    },
    {
      question:
        "We have thousands of stations and no useful reporting. Can you help?",
      answer: null,
    },
    {
      question: "Can we start small before committing to something larger?",
      answer: null,
    },
    {
      question:
        "We already have an engineering team. Can you work alongside them?",
      answer: null,
    },
    {
      question:
        "Can you work with third-party platforms, APIs and charger vendors?",
      answer: null,
    },
  ],
};

export const evMobilityServiceContent = {
  path: routes.servicesEvMobility,
  meta: {
    title: "Software Engineering for EV & Mobility Companies",
    description:
      "You already run chargers, a platform, a fleet, or an app. We build the next piece alongside the team you have: integrations, billing, driver and fleet software, grid features, and data.",
  },

  // Hero — 12121:1108 (1440) / 12167:546 (390)
  hero: {
    heading: "Software Engineering for EV & Mobility companies",
    description: [
      "You already run chargers, a platform, a fleet, or an app. We build the next piece alongside the team you have.",
      "An integration that won't hold. A driver experience that needs rebuilding. A grid feature nobody has capacity for. A data layer that turns thousands of sessions into something you can act on.",
    ],
    primaryCta: ENGINEER_CTA,
    secondaryCta: {
      label: "See our EV & Mobility work",
      href: routes.caseStudyCos,
    },
    secondaryCtaMobileLabel: "How it works?",
    image: {
      src: "/services/ev-mobility/hero.jpg",
      alt: "Electricity pylons crossing a green field under a pale sky",
      width: 1024,
      height: 682,
    },
    mobileImage: {
      src: "/services/ev-mobility/hero-mobile.jpg",
      alt: "Electricity pylons at the edge of a green field under a pale sky",
      width: 1024,
      height: 682,
    },
    imageFit: "fill",
    mobileHeight: "tall",
    headingTone: "umber",
    rating: aboutContent.hero.rating,
    points: [
      "Chargers & firmware",
      "Platforms & integrations",
      "Roaming & billing",
      "Grid & energy",
      "Data & AI",
    ],
    pointsSpread: true,
  },

  sections: [
    // Where we work — 12121:493 / 12167:1327
    {
      type: "split",
      content: {
        id: "where-we-work",
        tone: "light",
        scale: "large",
        heading: "Where we work",
        headingAlign: "end",
        media: {
          shape: "leaf-short",
          image: {
            src: "/services/iot/why-components.jpg",
            alt: "Electronic components, sensors and an Arduino board laid out on a table",
            width: 4096,
            height: 2731,
          },
        },
        pointIcon: TREE_ICON,
        points: [
          {
            title: "We work with the charging platform you already use",
            body: [
              "and build the integrations, workflows, and software around it to make the whole system work better.",
            ],
          },
          {
            title: "A CSMS is one component of a larger system",
            body: [
              "chargers, firmware, drivers, identity, roaming, tariffs, payments, the grid, and the data underneath all of it. Most engineering problems live in the seams between those parts, not inside any one of them.",
            ],
          },
          {
            title: "We work around your platform",
            body: [
              "inside it, and between it and everything else it has to talk to.",
            ],
          },
        ],
      },
    },

    // Where we plug in — 12167:452 / 12167:1361
    {
      type: "grid",
      content: {
        id: "where-we-plug-in",
        heading: "Where we plug in",
        subheading: "Whatever the next piece is, it sits in one of these.",
        items: capabilities,
      },
    },

    // Why Your Built Keeps Falling Through — 12121:811 / 12167:2170
    {
      type: "split",
      content: {
        id: "why-it-falls-through",
        tone: "dark",
        heading: "Why Your Built Keeps Falling Through",
        narrowHeading: true,
        bulleted: true,
        media: {
          shape: "quarter",
          image: {
            src: "/services/ev-mobility/why-falling-through.jpg",
            alt: "A leaning utility pole in dry grass below a forested hill and a grey sky",
            width: 1074,
            height: 716,
          },
        },
        lead: "Three ways to get it done. Each one costs you something nobody mentions upfront.",
        pointIcon: TREE_ICON_DARK,
        points: [
          {
            title: "Hiring Additional Engineers Takes Months You Don't Have",
            body: [
              "Engineers who understand both OCPP, CDRs, load management, and production systems are rare and expensive. Hire the wrong fit, and you pay for the ramp-up.",
              "Recruiting takes months while the project waits.",
              "Short-term work often does not justify a permanent hire, so it gets delayed or pushed onto an already stretched team.",
              "When key engineers leave, critical system knowledge can leave with them.",
            ],
          },
          {
            title: "Nobody Owns The Space Between Your Systems",
            body: [
              "Every vendor owns their own box. CSMS, chargers, payments, roaming. Four vendors, four scopes.",
              "The failures happen between them. A session completes but produces no clean CDR. Energy delivered doesn't match energy billed.",
              "Each one points at the other. You become the integrator by default, without an integration team.",
              "The gap is yours alone. It's specific to your combination of systems, so it's on nobody's roadmap.",
            ],
          },
          {
            title: "White-Label Gets Expensive The Moment You Scale",
            body: [
              "At twenty chargers this is the right call. We'll tell you that ourselves. The economics invert as you grow.",
              "Per-charger licensing that's comfortable at 20 units is punishing at 2,000, on a three to five year contract, often paid upfront.",
              "You own nothing. Price doubles at renewal? Pay it, or pay to migrate your entire history into a system you don't know.",
            ],
          },
        ],
      },
    },

    // Mid-page CTA — 12166:622 / 12167:2204
    {
      type: "cta",
      content: {
        ...homeContent.cta,
        heading: "Still waiting on something that should already be built?",
        body: "Tell a senior engineer what's blocking you. You'll leave knowing what it takes, whether or not you work with us.",
        orbitStates,
      },
    },

    // Our Services — 12121:459 / 12167:1727 (same three cards as the homepage)
    {
      type: "offerings",
      content: {
        heading: "Our Services",
        icon: homeContent.services.icon,
        items: homeContent.services.items,
        initialActive: 1,
        spacious: true,
      },
    },

    // Proof — 12121:3378 / 12167:642
    {
      type: "proof",
      content: {
        study: homeContent.projects.items[0],
        badge: homeContent.projects.badge,
        mobileBadge: homeContent.projects.mobileBadge,
        primaryCta: ENGINEER_CTA,
        secondaryCta: homeContent.projects.secondaryCta,
      },
    },

    // FAQ — 12121:867 / 12167:2015
    { type: "faq", content: faq, size: "compact", insetAnswers: true },

    // Closing CTA — 12121:918 / 12167:2091
    {
      type: "cta",
      content: {
        ...homeContent.cta,
        heading: "You don't need a perfect specification before we start.",
        body: "Bring us the problem. We'll work out the engineering with you — what to build, what to extend, what to integrate, and what to leave alone.",
        orbitStates,
      },
    },
  ],
} satisfies ServicePageContent;
