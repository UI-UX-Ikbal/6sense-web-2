import { aboutContent } from "@/content/about";
import { homeContent, orbitStates } from "@/content/home";
import { routes } from "@/content/navigation";
import type { FaqContent } from "@/content/types";
import type { CapabilityItem, ServicePageContent } from "./types";

/**
 * "Service - Energy Software Development" copy, links and imagery.
 * Figma: desktop 12174:2675, mobile 12174:3457.
 */

const ENGINEER_CTA = { label: "Talk to an engineer", href: routes.contact };

const TREE_ICON = { src: "/about/tree-badge.svg", width: 32, height: 32 };
const TREE_ICON_DARK = {
  src: "/services/icons/ev/why-badge.svg",
  width: 32,
  height: 32,
};

const plugIcon = (name: string) => ({
  src: `/services/icons/energy/${name}.svg`,
  width: 52,
  height: 52,
});

const capabilities: readonly CapabilityItem[] = [
  {
    icon: plugIcon("billing"),
    title: "CIS, billing and settlement",
    body: "Rate and tariff logic, billing determinants, exception handling, reconciliation between billed and delivered, integration with legacy CIS",
  },
  {
    icon: plugIcon("meter"),
    title: "Meter and AMI data",
    body: "Interval data ingestion, validation and estimation, gap filling, head-end system integration, meter data at volume",
  },
  {
    icon: plugIcon("scada"),
    title: "SCADA, historians and telemetry",
    body: "Time-series ingestion, historian integration, tag mapping, operational dashboards, data out of OT and into analysis without touching control",
  },
  {
    icon: plugIcon("field"),
    title: "Field and outage operations",
    body: "Work orders, crew dispatch, mobile field workflows, asset inspection, outage records and restoration reporting",
  },
  {
    icon: plugIcon("grid"),
    title: "Grid, DER and forecasting",
    body: "DER data, load and generation forecasting, curtailment records, interconnection data, flexibility and demand response records",
  },
  {
    icon: plugIcon("regulatory"),
    title: "Regulatory and compliance reporting",
    body: "State and federal filing pipelines, emissions and ESG reporting, audit trails, the reports that currently take a person a week",
  },
  {
    icon: plugIcon("data"),
    title: "Data & AI",
    body: "ETL across inconsistent sources, data quality across systems that disagree, operational insight, document and filing extraction",
  },
];

const faq: FaqContent = {
  heading: "Frequently asked questions",
  expandAll: "Expand all",
  icons: homeContent.faq.icons,
  defaultOpen: [0, 1],
  items: [
    {
      question: "We already run a CIS, MDM, and historian. Where do you fit?",
      answer:
        "Usually between them. When interval data does not reconcile with billing, tags change between systems, or reporting still depends on spreadsheets, we build the integration and logic that connects the systems you already trust.",
    },
    {
      question: "How do you work with data from our OT environment?",
      answer:
        "We work through the access path your security architecture allows, typically using approved read-only data exposed through a historian, broker, DMZ, or other controlled boundary. We define that boundary with your team before any access or integration begins.",
    },
    {
      question: "Can you work in a NERC CIP-scoped environment?",
      answer: null,
    },
    {
      question:
        "Our data does not reconcile across systems. How do you fix the underlying issue?",
      answer: null,
    },
    {
      question: "What happens when a vendor upgrade changes an integration?",
      answer: null,
    },
    {
      question:
        "We have a fixed budget and a regulatory deadline. Can you commit to a date?",
      answer: null,
    },
    {
      question: "Can you work alongside our existing systems integrator?",
      answer: null,
    },
  ],
};

const proofStudy = homeContent.projects.items[1];

export const energySoftwareContent = {
  path: routes.servicesEnergy,
  meta: {
    title: "Energy Software Development for the Gaps Your Platforms Leave",
    description:
      "Build the missing layer in your energy technology stack. Senior engineers who understand CIS, meter data, SCADA, field operations, DER and regulatory reporting, working around the platforms you already run.",
  },

  // Hero — 12174:2704 (1440) / 12174:3480 (390)
  hero: {
    heading:
      "Energy software development for the gaps your existing platforms cannot solve.",
    description: [
      "Build the missing layer in your energy technology stack.",
      "Your energy stack may already work. But new tariffs, data sources, integrations, reporting needs, or operational changes keep creating engineering work around it.",
    ],
    primaryCta: ENGINEER_CTA,
    secondaryCta: {
      label: "See our energy work",
      href: proofStudy.link.href,
    },
    secondaryCtaMobileLabel: "How it works?",
    image: {
      src: "/services/energy/hero.jpg",
      alt: "Solar panels in a green field with a wind turbine behind them",
      width: 1024,
      height: 576,
    },
    mobileHeight: "xtall",
    headingTone: "umber",
    rating: aboutContent.hero.rating,
    points: [
      "CIS and billing",
      { label: "Meter & AMI data", mobileLabel: "Meter and AMI data" },
      { label: "SCADA & historians", mobileLabel: "SCADA and historians" },
      "Field and outage operations",
      { label: "Grid & DER", mobileLabel: "Grid and DER" },
      "Regulatory reporting",
      { label: "Data & AI", mobileLabel: "Data and AI" },
    ],
    pointsSpread: true,
    tightPoints: true,
  },

  sections: [
    // Why 6sense HQ for energy software — 12174:2747 / 12194:55567
    {
      type: "split",
      content: {
        id: "why-6sense-hq",
        tone: "light",
        airy: true,
        smallLead: true,
        heading: "Why 6sense HQ for\nenergy software",
        headingAlign: "end",
        media: {
          shape: "leaf-short",
          image: {
            src: "/services/energy/why.jpg",
            alt: "Wind turbines on a green hill under a cloudy sky",
            width: 716,
            height: 1074,
          },
        },
        lead: [
          "Bring in an engineering team that already understands the energy systems behind the software.",
          "Most dev teams understand code but not interval data, settlement logic, tag mapping, or why OT and IT cannot share a network. We built and run energy data infrastructure in production, so the first call starts at your problem.",
        ],
        pointIcon: TREE_ICON,
        points: [
          {
            title: "We work your existing stack.",
            body: [
              "Your CIS, MDM, historians, vendors, and platforms can stay in place.",
            ],
          },
          {
            title: "We do not sell a platform.",
            body: [
              "There is no platform bias so we have no reason to talk you out of yours.",
            ],
          },
          {
            title: "Senior engineers who stay on the system.",
            body: [
              "You keep the context without repeated handoffs or ramp-up.",
            ],
          },
        ],
      },
    },

    // Where we plug in — 12174:2780 / 12174:3556
    {
      type: "grid",
      content: {
        id: "where-we-plug-in",
        heading: "Where we plug in",
        subheading: "Whatever the next piece is, it sits in one of these.",
        items: capabilities,
      },
    },

    // Why the work keeps stalling — 12174:2940 / 12174:3716
    {
      type: "split",
      content: {
        id: "why-work-stalls",
        tone: "dark",
        heading: "Why the work keeps stalling",
        narrowHeading: true,
        bulleted: true,
        media: {
          shape: "quarter",
          image: {
            src: "/services/energy/stalling.jpg",
            alt: "A leaning utility pole in dry grass below a forested hill and a grey sky",
            width: 1074,
            height: 716,
          },
        },
        lead: "Most delays come back to four things. Each costs you something nobody mentions upfront.",
        pointIcon: TREE_ICON_DARK,
        points: [
          {
            title: "Hiring takes months you do not have.",
            body: [
              "Energy-domain engineers are hard to find",
              "Short projects rarely justify a permanent hire",
              "When key people leave, system knowledge often leaves with them",
            ],
          },
          {
            title: "Nobody owns the space between your systems.",
            body: [
              "CIS, MDM, historian, and reporting platforms often have different owners",
              "Data can move through the stack without reconciling cleanly",
              "The issue falls between vendor scopes and your team ends up coordinating the fix",
            ],
          },
          {
            title: "A generalist dev shop starts by learning your industry.",
            body: [
              "Early weeks go into understanding tariffs, VEE, settlement, and system context",
              "That slows down the engineering work that actually matters",
            ],
          },
          {
            title:
              "Replacing the platform is a two-year answer to a two-month problem.",
            body: [
              "The real issue may be one integration, workflow, or filing",
              "Replacing the whole system can take years",
              "The original problem still needs solving now",
            ],
          },
        ],
        footnote:
          "If something important has been waiting too long, bring it to us.",
      },
    },

    // Mid-page CTA — 12174:2973 / 12174:3749
    {
      type: "cta",
      content: {
        ...homeContent.cta,
        heading: "Not sure whether it is an integration, a fix, or a rebuild?",
        body: "That is the call. A senior engineer looks at what you run and tells you what is worth touching first, whether or not you work with us.",
        orbitStates,
      },
    },

    // Where we work — 12194:54888 / 12194:56026
    {
      type: "split",
      content: {
        id: "where-we-work",
        tone: "light",
        airy: true,
        smallLead: true,
        bulleted: true,
        heading: "What Changes When You Work With 6sense HQ",
        media: {
          shape: "leaf-short",
          position: "50% 85%",
          image: {
            src: "/services/energy/work.jpg",
            alt: "A dirt path winding through green hills under a blue sky",
            width: 716,
            height: 1074,
          },
        },
        lead: "The same four problems, with a clearer path forward.",
        pointIcon: TREE_ICON,
        points: [
          {
            title: "The work can start without a long hiring cycle",
            body: [
              "Add engineering capacity without making a permanent hire",
              "Bring in people who already understand the energy context",
              "Keep system knowledge with the team, not one individual",
            ],
          },
          {
            title: "The gaps between systems become part of the scope.",
            body: [
              "We can work across CIS, MDM, historians, reporting, and the logic between them",
              "Integration and reconciliation issues do not have to sit between vendor boundaries",
              "Your team spends less time coordinating who owns the problem",
            ],
          },
          {
            title: "Less time goes into domain ramp-up.",
            body: [
              "Interval data, VEE, settlement, tag mapping, and OT/IT boundaries are already familiar",
              "The conversation starts with the business problem and the engineering constraint",
            ],
          },
          {
            title: "Small problems can stay small.",
            body: [
              "If the issue is one integration, workflow, or filing, we scope around that",
              "Existing platforms and vendors can stay in place",
              "You keep control of the code and data we build around them",
            ],
          },
        ],
        actions: { primary: ENGINEER_CTA },
      },
    },

    // Use Cases — 12194:54970 / 12194:56172
    {
      type: "split",
      content: {
        id: "use-cases",
        tone: "dark",
        airy: true,
        regularTitles: true,
        heading: "Use Cases",
        narrowHeading: true,
        media: {
          shape: "quarter",
          position: "50% 63.6%",
          image: {
            src: "/services/energy/use-cases.jpg",
            alt: "A yellow telecom mast beside a small hut in a field below blue mountains",
            width: 716,
            height: 1073,
          },
        },
        pointIcon: TREE_ICON_DARK,
        points: [
          {
            title: "Meter data and billing are not reconciling.",
            body: [
              "Energy is being delivered, but exceptions still have to be checked by hand before the bill goes out. We build the reconciliation layer that compares both systems, flags mismatches, and gives the billing team a clear queue to resolve.",
            ],
          },
          {
            title: "Regulatory filing still depends on manual work.",
            body: [
              "Data has to be collected from several systems, checked against filing rules, and assembled by hand. We build the reporting pipeline that collects, validates, prepares, and retains the full audit trail.",
            ],
          },
          {
            title: "Your systems store data in various formats.",
            body: [
              "Operations, finance, and reporting may all be working from slightly different versions of the same information. We build a shared data layer that standardizes those sources so everyone works from the same numbers.",
            ],
          },
          {
            title: "Your team needs to work in areas with poor connectivity.",
            body: [
              "Work orders, inspections, or asset updates cannot stop because a device loses signal. We build offline-capable workflows that keep working in the field and sync cleanly when connectivity returns.",
            ],
          },
          {
            title: "Your core systems function, but not well together.",
            body: [
              "A legacy system, a newer platform, and the tools around them may all be doing their jobs separately. We build the integration and business logic that connects them without replacing what already works.",
            ],
          },
          {
            title: "Your team is extracting data from documents manually.",
            body: [
              "Invoices, permits, statements, and regulatory documents still need someone to find and rekey the right values. We build the extraction workflow that moves that data directly into the system where it is needed.",
            ],
          },
        ],
      },
    },

    // How We Work With You — 12174:3055 / 12174:3829 (same three cards as the homepage)
    {
      type: "offerings",
      content: {
        heading: "How We Work With You",
        icon: homeContent.services.icon,
        items: homeContent.services.items,
        initialActive: 0,
        spacious: true,
        cta: ENGINEER_CTA,
        brandHeadingFromLg: true,
      },
    },

    // Proof — 12174:3099 / 12174:3873
    {
      type: "proof",
      content: {
        study: proofStudy,
        badge: homeContent.projects.badge,
        mobileBadge: homeContent.projects.mobileBadge,
        primaryCta: ENGINEER_CTA,
        secondaryCta: homeContent.projects.secondaryCta,
      },
    },

    // FAQ — 12174:3260 / 12194:56633
    { type: "faq", content: faq, size: "compact", insetAnswers: true },

    // Closing CTA — 12174:3318 / 12174:4091
    {
      type: "cta",
      content: {
        ...homeContent.cta,
        heading: "No specification is needed to start.",
        body: "Bring us the reconciliation that keeps failing, the filing that eats a week, or the two systems that will not talk.",
        orbitStates,
      },
    },
  ],
} satisfies ServicePageContent;
