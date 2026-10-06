import { aboutContent } from "@/content/about";
import { homeContent, orbitStates } from "@/content/home";
import { routes } from "@/content/navigation";
import type { FaqContent, FeatureCardItem } from "@/content/types";
import type { ServicePageContent } from "./types";

/**
 * "Service - IoT Software Development" copy, links and imagery.
 * Figma: desktop 12110:419, mobile 12110:831 (frame named "Case Study- COS - 390px").
 */

const STEPS_ID = "the-right-way";

const ENGINEER_CTA = { label: "Talk to an engineer", href: routes.contact };
const HOW_IT_WORKS = { label: "How it works?", href: `#${STEPS_ID}` };
const IOT_LEAD =
  "IoT systems span firmware, connectivity, cloud infrastructure, data, and business applications. The complexity usually appears in the way those layers interact, especially as the system moves from prototype to production.";

const TREE_ICON = { src: "/about/tree-badge.svg", width: 32, height: 32 };
const [scaleCard, buildCard, fixCard] = homeContent.services.items;
const aiEngineStudy = homeContent.projects.items[2];

const offerings: readonly FeatureCardItem[] = [
  { ...scaleCard, title: "Scale & Maintain IoT Software" },
  { ...buildCard, title: "Build IoT Software" },
  { ...fixCard, title: "Fix & Stabilize IoT Software" },
];

const faq: FaqContent = {
  heading: "Frequently asked questions",
  expandAll: "Expand all",
  icons: homeContent.faq.icons,
  defaultOpen: [0, 1],
  items: [
    {
      question:
        "We already use AWS IoT, Azure IoT Hub, ThingsBoard, or another IoT platform. Can you work with it?",
      answer:
        "Yes. We can build around an existing IoT platform rather than replacing a foundation that already works. That may include provisioning, telemetry, OTA workflows, device management, applications, integrations, or product-specific business logic.",
    },
    {
      question: "Do you sell an IoT platform?",
      answer:
        "No. Our IoT software development work sits around, within, and between the device platforms you already use. That allows the architecture to follow your product requirements rather than a platform we need to sell.",
    },
    {
      question: "Do you work on firmware as well as cloud software?",
      answer: null,
    },
    {
      question:
        "Our devices are already deployed. Does that limit what you can change?",
      answer: null,
    },
    {
      question:
        "Can you work alongside our existing firmware or hardware team?",
      answer: null,
    },
    {
      question: "What happens when a hardware vendor changes device behaviour?",
      answer: null,
    },
  ],
};

export const iotServiceContent = {
  path: routes.servicesIot,
  meta: {
    title: "IoT Software Development Services for Connected Products",
    description:
      "Your devices are already in the field. We build and extend the software between the device and the business, from firmware and OTA to device cloud, telemetry, fleet management, and integrations.",
  },

  // Hero — 12110:446 (1440) / 12110:854 (390)
  hero: {
    heading: "IoT Software Development Services for Connected Products",
    description:
      "Your devices are already in the field. We build and extend the software between the device and the business, from firmware and OTA to device cloud, telemetry, fleet management, and integrations.",
    primaryCta: ENGINEER_CTA,
    secondaryCta: HOW_IT_WORKS,
    image: {
      src: "/services/iot/hero.jpg",
      alt: "Two children at a wooden bench with a tablet, an OTA device box and a solar panel in a wheat field at sunset",
      width: 1376,
      height: 768,
    },
    // Figma fill is 119.82% wide at 1440 vs 102.9% for object-cover.
    imageZoom: 1.1645,
    rating: aboutContent.hero.rating,
    points: [
      "Firmware & OTA · connectivity & protocols · device cloud · ",
      "Telemetry · fleet management · integrations · data & AI",
    ],
  },

  sections: [
    // Our IoT Software Development Services — 12110:1701 / 12110:2710
    {
      type: "offerings",
      content: {
        heading: "Our IoT Software Development Services",
        icon: homeContent.services.icon,
        items: offerings,
        initialActive: 1,
      },
    },

    // Why 6sense HQ… — 12110:478 / 12110:886
    {
      type: "split",
      content: {
        id: "why-6sense-hq",
        tone: "light",
        heading: "Why 6sense HQ for IoT Software Development Services",
        headingAlign: "end",
        media: {
          shape: "leaf",
          image: {
            src: "/services/iot/why-components.jpg",
            alt: "Electronic components, sensors and an Arduino board laid out on a table",
            width: 4096,
            height: 2731,
          },
        },
        lead: IOT_LEAD,
        pointIcon: TREE_ICON,
        points: [
          {
            title: "Works with your existing stack with no platform bias.",
            body: [
              "Keep your hardware, IoT platform, vendors, and internal team. We build around what the product needs.",
            ],
          },
          {
            title: "Engineering across the connected stack.",
            body: [
              "Device, cloud, data, and integrations stay part of the same conversation.",
            ],
          },
          {
            title: "Continuity that keeps systems maintainable.",
            body: [
              "IoT products often pass through multiple developers, and context gets lost with every handover. We stay close to the system, so the codebase remains easier to maintain and evolve.",
            ],
          },
        ],
        footnote:
          "Our experience with production IoT systems allows us to focus early on the architecture, constraints, and requirements specific to your product.",
        actions: { primary: ENGINEER_CTA, secondary: HOW_IT_WORKS },
      },
    },

    // Proof — 12110:1821 / 12110:2826
    {
      type: "proof",
      content: {
        study: {
          ...aiEngineStudy,
          tone: "dark",
          image: {
            src: "/services/iot/proof-ai-engine.jpg",
            alt: "A man carrying a laughing woman piggyback across a dry plain below misty hills",
            width: 2479,
            height: 1655,
          },
          scrim:
            "linear-gradient(180deg, rgb(0 0 0 / 0) 38.462%, rgb(0 0 0 / 0.4) 84.135%)",
          imagePosition: "50% 8.8%",
        },
        badge: homeContent.projects.badge,
        mobileBadge: homeContent.projects.mobileBadge,
        primaryCta: ENGINEER_CTA,
        secondaryCta: homeContent.projects.secondaryCta,
      },
    },

    // Built for companies where… — 12110:2017 / 12110:922
    {
      type: "split",
      content: {
        id: "built-for",
        tone: "dark",
        heading:
          "Built for companies where physical devices and software have to behave as one system.",
        wideCopy: true,
        media: {
          shape: "quarter",
          position: "100% 50%",
          image: {
            src: "/services/iot/built-engineers.jpg",
            alt: "Two engineers wiring a circuit board beside a rugged laptop and a robotic arm",
            width: 1376,
            height: 768,
          },
        },
        points: [
          {
            title: "Connected-equipment manufacturers",
            body: [
              "You have the hardware. We help build and scale the software around it, from device communication and OTA to cloud management and customer applications.",
            ],
          },
          {
            title: "Telemetry and monitoring platforms",
            body: [
              "You need reliable ingestion, device state, alerts, reporting, and visibility across mixed hardware.",
            ],
          },
          {
            title: "Industrial IoT and IoT platform companies",
            body: [
              "The product is already running, but the roadmap is larger than the engineering capacity available.",
            ],
          },
          {
            title: "Fleet and asset operators",
            body: [
              "You have devices across sites and large volumes of telemetry, but the operational value is still difficult to extract.",
            ],
          },
          {
            title: "Energy and utility device operators",
            body: [
              "Meters, grid devices, DER, telemetry, and reporting have to connect reliably with the systems around them.",
            ],
          },
          {
            title: "Teams moving from pilot to rollout",
            body: [
              "The first devices proved the idea. Production now needs provisioning, OTA, observability, support workflows, and architecture built for a fleet.",
            ],
          },
          {
            title:
              "Reviewing the security and update path for a connected product?",
            body: [
              "Talk through firmware, OTA, SBOMs, vulnerability handling, and device-cloud architecture with an engineer who works across the connected stack.",
            ],
          },
        ],
      },
    },

    // Why What Got You Here… — 12110:2455 / 12110:3402
    {
      type: "split",
      content: {
        id: "why-scale",
        tone: "light",
        heading: "Why What Got You Here Won't Get You to Scale",
        media: {
          shape: "leaf",
          image: {
            src: "/services/iot/scale-switchgear.jpg",
            alt: "A long aisle of electrical switchgear cabinets in an industrial hall",
            width: 1073,
            height: 617,
          },
        },
        lead: IOT_LEAD,
        pointIcon: TREE_ICON,
        points: [
          {
            title: "It was built for a demo, so it fights you at scale.",
            body: [
              "Every pilot shortcut is now a wall — you can't add devices without something breaking.",
            ],
          },
          {
            title:
              "It has no owner for the space between device, cloud, and business.",
            body: [
              "Hardware vendor stops at the device. Your platform stops at the cloud. Your ERP stops at the invoice.",
              "Everything specific to your product falls in the gap — so you referee three vendors on your own time.",
            ],
          },
          {
            title: "It's lost the people who understood it.",
            body: [
              "Enough hands have touched the code that changes take weeks, and every fix risks a new break.",
            ],
          },
        ],
      },
    },

    // The Right Way — 12110:2347 / 12110:3524
    {
      type: "steps",
      content: {
        id: STEPS_ID,
        heading: "The Right Way",
        subheading: "The same three problems, engineered out — in order.",
        steps: [
          {
            title: "Step 1",
            body: "Rebuild the rollout as a rollout. We start where scale breaks: provisioning, OTA campaigns, buffering, and monitoring, engineered for a fleet and tested against field conditions — not a bench. The pilot stops behaving like a pilot.",
            icon: {
              src: "/services/icons/step-wrench.svg",
              width: 48,
              height: 48,
            },
          },
          {
            title: "Step 2",
            body: "Take ownership of the gap. With the fleet stable, the space between device, cloud, and business systems becomes our scope. When telemetry lands but the invoice doesn't, tracing it is our problem — not a fix you coordinate across three vendors.",
            icon: {
              src: "/services/icons/step-puzzle.svg",
              width: 48,
              height: 48,
            },
          },
          {
            title: "Step 3",
            body: "Stay close to the system. Once it runs, the same senior engineers stay on the codebase — so context isn't lost between handoffs and the system keeps evolving over time, without unnecessary rewrites.",
            icon: {
              src: "/services/icons/step-shield.svg",
              width: 48,
              height: 48,
            },
          },
        ],
      },
    },

    // IoT Software Development Use Cases — 12110:2615 / 12110:3469
    {
      type: "split",
      content: {
        id: "use-cases",
        tone: "dark",
        heading: "IoT Software Development Use Cases",
        narrowHeading: true,
        media: {
          shape: "quarter",
          image: {
            src: "/services/iot/use-cases-tablet.jpg",
            alt: "A technician using a tablet beside a yellow industrial control panel",
            width: 1074,
            height: 716,
          },
        },
        points: [
          {
            title:
              "Your OTA process works in testing but struggles once devices are deployed.",
            body: [
              "Connectivity changes in the field. Updates can be interrupted, devices can disappear during a rollout, and different firmware versions may remain active at the same time.The update workflow has to account for the fleet that actually exists.",
            ],
          },
          {
            title:
              "A new hardware vendor behaves differently from the devices already supported.",
            body: [
              "Telemetry formats, device states, timing, or protocol behaviour may not match what the rest of the platform expects. A normalization or integration layer can isolate those differences from the systems upstream.",
            ],
          },
          {
            title:
              "You collect large amounts of device data but still cannot answer operational questions.",
            body: [
              "Telemetry may be split between device platforms, databases, vendor systems, dashboards, and spreadsheets. The challenge becomes turning those sources into one reliable operational view.",
            ],
          },
          {
            title:
              "Your device platform was designed for one customer and now serves many.",
            body: [
              "Each customer may require separate data, permissions, configuration, branding, or reporting. That introduces a multi-tenancy problem that did not exist in the original product.",
            ],
          },
          {
            title:
              "Your pilot worked, but rollout keeps exposing new problems.",
            body: [
              "Provisioning, fleet health, monitoring, update campaigns, buffering, support workflows, and failure recovery become more important as deployment grows.",
            ],
          },
          {
            title:
              "Your devices and business systems still operate separately.",
            body: [
              "Telemetry reaches the cloud, but billing, work orders, accounting, customer portals, or other workflows still depend on manual steps. The missing piece is often the integration and business logic between them.",
            ],
          },
          {
            title:
              "Your connected product behaves differently in software than it does in the real world.",
            body: [
              "Mobile applications cannot be developed entirely against assumptions. Real-device testing exposes differences in Bluetooth behaviour, firmware state, connectivity, timing, and physical-device responses that software-only testing does not.",
            ],
          },
        ],
      },
    },

    // FAQ — 12110:677 / 12110:1079
    { type: "faq", content: faq },

    // CTA — 12117:4415 / 12117:4569 (same band as the homepage)
    { type: "cta", content: { ...homeContent.cta, orbitStates } },
  ],
} satisfies ServicePageContent;
