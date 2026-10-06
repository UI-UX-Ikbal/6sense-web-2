import { aboutContent } from "@/content/about";
import { homeContent, orbitStates } from "@/content/home";
import { routes } from "@/content/navigation";
import type { FaqContent } from "@/content/types";
import type { CapabilityItem, ServicePageContent } from "./types";

/**
 * "Service - AI Automation Company" copy, links and imagery.
 * Figma: desktop 12356:280, mobile 12356:921. The three "Where we work" frames and the two
 * "Why Your Built Keeps Falling Through" frames carry different copy, so each is its own section.
 */

const ENGINEER_CTA = { label: "Talk to an engineer", href: routes.contact };
const WORK_CTA = {
  label: "See our AI & automation work",
  href: routes.caseStudyCos,
};

const TREE_ICON = { src: "/about/tree-badge.svg", width: 32, height: 32 };
const TREE_ICON_DARK = {
  src: "/services/icons/ev/why-badge.svg",
  width: 32,
  height: 32,
};

const buildIcon = (name: string) => ({
  src: `/services/icons/ai/${name}.svg`,
  width: 52,
  height: 52,
});

const capabilities: readonly CapabilityItem[] = [
  {
    icon: buildIcon("workflow"),
    title: "Process & Workflow Automation",
    body: "We automate multi-step processes across applications, teams, and data sources.\nThe solution can include workflow logic, queues, approval steps, AI components, system integrations, and exception handling.",
  },
  {
    icon: buildIcon("document-search"),
    title: "Document & Data Automation",
    body: "Information from forms, emails, PDFs, invoices, and other documents can be extracted, classified, validated, and passed into downstream systems. Uncertain results can be routed for review before further processing.",
  },
  {
    icon: buildIcon("robot"),
    title: "AI Agents & Assistants",
    body: "Task-specific agents can be built around defined responsibilities, permitted data, system access, and business rules. Typical applications include information retrieval, research, processing, routing, and internal operational support.",
  },
  {
    icon: buildIcon("braces"),
    title: "System Integrations",
    body: "Automation can connect with CRM, ERP, support platforms, billing systems, databases, internal applications, and external APIs.",
  },
  {
    icon: buildIcon("gauge"),
    title: "Reliability & Monitoring",
    body: "Production workflows can include logging, retries, alerts, validation, and failure handling so operational problems remain visible.",
  },
  {
    icon: buildIcon("sliders"),
    title: "Usage & Cost Control",
    body: "Model usage can be monitored and limited where required, while standard software logic can handle tasks that do not need AI.",
  },
];

const faq: FaqContent = {
  heading: "Frequently asked questions",
  expandAll: "Expand all",
  icons: homeContent.faq.icons,
  defaultOpen: [0, 1],
  items: [
    {
      question: "Isn't this just Zapier, Make, or n8n?",
      answer:
        "Not necessarily.\nThose platforms can be effective for straightforward workflows. More complex processes may require custom software when they involve several systems, stricter validation, higher reliability requirements, complex business rules, or deeper monitoring.\nWe determine the implementation based on the process rather than starting with a preferred tool.",
    },
    {
      question: "Do we need AI for the entire process?",
      answer:
        "No.\nMost production workflows combine standard software, business rules, APIs, automation, and AI.\nAI is used where capabilities such as interpretation, classification, or generation provide a practical advantage.",
    },
    { question: "Can you work with our existing automation?", answer: null },
    { question: "Can you build AI agents?", answer: null },
    { question: "How do you handle inaccurate AI output?", answer: null },
    { question: "Can you integrate with our current systems?", answer: null },
    { question: "Who owns the software?", answer: null },
    { question: "How are AI running costs managed?", answer: null },
  ],
};

export const aiAutomationServiceContent = {
  path: routes.servicesAiAutomation,
  // Figma has no meta copy: title and description are taken from the hero.
  meta: {
    title: "AI Automation Company for Real Operations",
    description:
      "6sense HQ builds AI-enabled workflows, agents, integrations, and data automation for businesses moving beyond proof-of-concept automation.",
  },

  // Hero — 12356:315 (1440) / 12356:944 (390)
  hero: {
    heading: "AI automation for real operations",
    description: [
      "6sense HQ builds AI-enabled workflows, agents, integrations, and data automation for businesses moving beyond proof-of-concept automation.",
      "Each solution is engineered around the process it supports, including system integrations, business rules, validation, fallback handling, monitoring, and human review where required.",
      "The result is automation designed to operate reliably with real business data and production systems.",
    ],
    primaryCta: ENGINEER_CTA,
    secondaryCta: WORK_CTA,
    image: {
      src: "/services/ai-automation/hero.jpg",
      alt: "An engineer in a hard hat and hi-vis vest holds a tablet in a wheat field at sunset, beside a connected device box",
      width: 1024,
      height: 633,
    },
    imageAnchor: "center",
    mobileHeight: "tall",
    headingTone: "umber",
    rating: aboutContent.hero.rating,
    points: [],
  },

  sections: [
    // From process to production — 12356:519 / 12365:4701 (same three cards as the homepage)
    {
      type: "offerings",
      content: {
        heading: "From process to production",
        icon: homeContent.services.icon,
        items: homeContent.services.items,
        initialActive: 0,
      },
    },

    // AI should fit the process — 12356:358 / 12365:4888
    {
      type: "split",
      content: {
        id: "ai-fits-the-process",
        tone: "light",
        heading: "AI should fit the process",
        headingAlign: "end",
        airy: true,
        smallLead: true,
        strongBody: true,
        narrowCopy: true,
        media: {
          shape: "leaf-short",
          image: {
            src: "/services/ai-automation/where-fit-process.jpg",
            alt: "A road winding through a dense green forest",
            width: 716,
            height: 551,
          },
        },
        lead: "Effective automation starts with understanding the workflow, the systems involved, and the decisions the process needs to make.",
        pointIcon: TREE_ICON,
        points: [
          {
            body: [
              "Some steps are well suited to AI, including document extraction, classification, summarization, and recommendation. Others are better handled through standard software logic, APIs, or predefined business rules.",
            ],
          },
          {
            body: [
              "The architecture should reflect the level of accuracy, control, and reliability required by the process.",
            ],
          },
          {
            body: [
              "Where the consequences of an incorrect result are higher, the workflow can include validation, confidence thresholds, exception handling, approval steps, or human review.",
            ],
          },
          {
            body: [
              "AI becomes one component of the system rather than the entire system.",
            ],
          },
        ],
      },
    },

    // AI in production — 12356:563 / 12356:1191 (same case study as the homepage's third card)
    {
      type: "proof",
      content: {
        roomyGroups: true,
        heading: {
          title: "AI in production",
          paragraphs: [
            "One of our automation projects involved a multi-step process where information was collected, reviewed, processed, and entered manually across several systems.",
            "The workflow was redesigned so repetitive extraction, routing, and validation could run automatically, while human review remained in the parts of the process that still required judgment.",
          ],
        },
        study: {
          ...homeContent.projects.items[2],
          // Figma's 390 card: zoomed crop, bottom-only scrim, dark meta line.
          mobile: {
            crop: {
              left: "-129.4%",
              top: "-17.7%",
              width: "389.58%",
              height: "120.27%",
            },
            scrim:
              "linear-gradient(180deg, rgb(0 0 0 / 0) 7.212%, rgb(0 0 0 / 0.4) 82%)",
            darkMeta: true,
          },
        },
        badge: homeContent.projects.badge,
        mobileBadge: homeContent.projects.mobileBadge,
        primaryCta: ENGINEER_CTA,
        secondaryCta: homeContent.projects.secondaryCta,
      },
    },

    // What we build — 12356:391 / 12356:1020
    {
      type: "grid",
      content: {
        id: "what-we-build",
        heading: "What we build",
        compactText: true,
        items: capabilities,
      },
    },

    // Common signs that a process is ready for automation — 12356:461 / 12365:5297
    {
      type: "split",
      content: {
        id: "ready-for-automation",
        tone: "dark",
        heading: "Common signs that a process is ready for automation",
        narrowHeading: true,
        airy: true,
        boldTitles: true,
        media: {
          shape: "quarter",
          image: {
            src: "/services/ai-automation/why-ready.png",
            alt: "A blue river winding through a green gorge below a hydroelectric plant",
            width: 716,
            height: 716,
          },
        },
        pointIcon: TREE_ICON_DARK,
        points: [
          {
            title: "Repetitive Data Handling",
            body: [
              "Teams repeatedly read, enter, check, or transfer the same types of information between systems.",
            ],
          },
          {
            title: "High-Volume Processing",
            body: [
              "A manual workflow becomes difficult to manage as the number of requests, records, or transactions grows.",
            ],
          },
          {
            title: "Document-Heavy Workflows",
            body: [
              "Forms, emails, PDFs, and other unstructured inputs need to be reviewed before the next step can begin.",
            ],
          },
          {
            title: "Manual Triage",
            body: [
              "Requests, tickets, records, or cases are categorized and routed by people before work starts.",
            ],
          },
          {
            title: "Reporting & Reconciliation",
            body: [
              "Information has to be collected from several sources before it can be used for reporting or decision-making.",
            ],
          },
          {
            title: "Existing Automation Needs Improvement",
            body: [
              "A workflow already exists but requires stronger validation, monitoring, exception handling, or integration.",
            ],
          },
        ],
      },
    },

    // Moving automation into production — 12356:1992 / 12365:5550
    {
      type: "split",
      content: {
        id: "moving-into-production",
        tone: "light",
        heading: "Moving automation into production",
        headingAlign: "end",
        airy: true,
        smallLead: true,
        strongBody: true,
        narrowCopy: true,
        media: {
          shape: "leaf-short",
          image: {
            src: "/services/ai-automation/where-production.jpg",
            alt: "A dark car parked on a field beside a wind turbine under a cloudy sky",
            width: 716,
            height: 551,
          },
        },
        lead: "A workflow that performs well in testing may still require additional engineering before it can support day-to-day operations.",
        pointIcon: TREE_ICON,
        points: [
          {
            body: [
              "Business data may arrive incomplete, duplicated, delayed, inconsistent, or in an unexpected format. External services can become unavailable, APIs can change, and downstream systems can reject otherwise valid requests.",
            ],
          },
          {
            body: [
              "Production automation therefore needs clear handling for these situations.",
            ],
          },
          {
            body: [
              "Depending on the workflow, that may include input validation, retry logic, fallback behaviour, exception queues, human review, monitoring, and controlled failure states.",
            ],
          },
          {
            body: [
              "The exact controls depend on how the automation is used and the impact of an incorrect or incomplete result.",
            ],
          },
        ],
      },
    },

    // Typical AI automation projects — 12356:2163 / 12365:5631
    {
      type: "split",
      content: {
        id: "typical-projects",
        tone: "dark",
        heading: "Typical AI automation projects",
        narrowHeading: true,
        airy: true,
        boldTitles: true,
        tightMobile: true,
        media: {
          shape: "quarter",
          image: {
            src: "/services/ai-automation/why-projects.png",
            alt: "Electricity pylons on a wooded hill under a pale orange sky",
            width: 716,
            height: 716,
          },
        },
        pointIcon: TREE_ICON_DARK,
        points: [
          {
            title: "Document Processing",
            body: [
              "Extract and structure information from forms, invoices, PDFs, emails, and other business documents.",
            ],
          },
          {
            title: "Support Triage",
            body: [
              "Classify incoming requests, add context, and route them to the relevant workflow or team.",
            ],
          },
          {
            title: "Data Extraction & Reconciliation",
            body: [
              "Collect information across systems, compare records, identify mismatches, and surface exceptions.",
            ],
          },
          {
            title: "Internal AI Assistants",
            body: [
              "Provide employees with controlled access to internal information and defined operational tasks.",
            ],
          },
          {
            title: "Reporting Automation",
            body: [
              "Collect and process the information required for operational and management reporting.",
            ],
          },
          {
            title: "Review & Approval Workflows",
            body: [
              "Automate routine processing while retaining human approval where judgment or accountability is required.",
            ],
          },
          {
            title: "Automation Hardening",
            body: [
              "Improve an existing automation by strengthening its integrations, validation, monitoring, and exception handling.",
            ],
          },
        ],
      },
    },

    // Define how exceptions are handled — 12356:2087 / 12365:5761
    {
      type: "split",
      content: {
        id: "handling-exceptions",
        tone: "light",
        heading: "Define how exceptions are handled",
        headingAlign: "end",
        airy: true,
        strongBody: true,
        bigBody: true,
        narrowCopy: true,
        tightMobile: true,
        media: {
          shape: "leaf-short",
          image: {
            src: "/services/ai-automation/where-exceptions.jpg",
            alt: "A road curving through a green pine forest",
            width: 716,
            height: 551,
          },
        },
        pointIcon: TREE_ICON,
        points: [
          {
            body: [
              "Not every result should continue through a workflow automatically.",
            ],
          },
          {
            body: [
              "Low-confidence outputs can be sent for review. Failed integrations can trigger retries or alerts. Deterministic rules can replace AI where the answer should always follow a fixed condition.",
            ],
          },
          {
            body: [
              "Higher-impact actions can also require approval before completion.",
            ],
          },
          {
            body: [
              "These controls are defined according to the business rules and risk level of the process rather than applied as a standard template.",
            ],
          },
        ],
      },
    },

    // FAQ — 12356:724 / 12356:1351
    { type: "faq", content: faq, size: "mixed", insetAnswers: true },

    // CTA — 12356:782 / 12356:1409
    {
      type: "cta",
      content: {
        ...homeContent.cta,
        heading: "Discuss your automation needs.",
        body: [
          "If you have a manual workflow, an existing automation that needs improvement, or an AI capability that needs to operate inside a production system, we can review the process and technical requirements with you.",
          "A 30-minute conversation with our CEO and CTO can help clarify the systems involved, where AI is useful, and what the first engineering step should be.",
        ],
        link: ENGINEER_CTA,
        secondaryLink: WORK_CTA,
        tallOnMobile: true,
        imageFit: "fill",
        orbitStates,
      },
    },
  ],
} satisfies ServicePageContent;
