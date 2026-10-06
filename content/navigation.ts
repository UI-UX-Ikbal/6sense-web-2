/**
 * Site navigation content (Header + Footer).
 * Copy source: Figma "Header" section (12215:3985) and Footer (11995:44751 / 11995:45749).
 */

export type NavLink = {
  label: string;
  href: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type MenuLinkGroup = {
  /** Small muted label above the links. Omitted for plain link lists (e.g. Resources). */
  heading?: string;
  links: NavLink[];
};

export type HelpStep = {
  title: string;
  description: string;
};

export type ProvenWorkItem = {
  client: string;
  summary: string;
  link: NavLink;
};

export type MegaMenu = {
  groups: MenuLinkGroup[];
  cta?: NavLink;
  howWeHelp?: {
    heading: string;
    steps: HelpStep[];
  };
  provenWork?: {
    heading: string;
    items: ProvenWorkItem[];
  };
};

export type NavItem =
  | { id: string; label: string; href: string; menu?: never }
  | { id: string; label: string; href?: never; menu: MegaMenu };

export type SocialLink = NavLink & { icon: string };

export type FooterColumn = {
  heading: string;
  links: NavLink[];
};

export const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
  bookAMeeting: "/book-a-meeting",
  privacyPolicy: "/privacy-policy",
  terms: "/terms-and-conditions",
  caseStudyCos: "/case-studies/cos",
  servicesIot: "/services/iot",
} as const;

const readCaseStudy = "Read Case Study";
const howWeHelpHeading = "HOW WE HELP";
const provenWorkHeading = "OUR PROVEN WORK";

export const brand = {
  homeLabel: "6sense HQ home",
  mark: {
    src: "/brand/6sense-mark.svg",
    alt: "",
    width: 19.4473,
    height: 32.1173,
  },
  wordmark: {
    src: "/brand/6sense-wordmark.svg",
    alt: "6sense",
    width: 98.9905,
    height: 21.6346,
  },
} satisfies Record<string, ImageAsset | string>;

export const headerContent = {
  skipLinkLabel: "Skip to content",
  primaryNavLabel: "Primary",
  mobileNavLabel: "Mobile",
  openMenuLabel: "Open menu",
  closeMenuLabel: "Close menu",
  primaryCta: { label: "Contact Us", href: routes.contact },
  icons: {
    chevron: "/icons/chevron-down-16.svg",
    chevronActive: "/icons/chevron-down-16-active.svg",
    chevronMobile: "/icons/chevron-down-24.svg",
    menu: "/icons/menu.svg",
    close: "/icons/close.svg",
    stepCircle: "/icons/step-circle.svg",
  },
} as const;

export const navItems: NavItem[] = [
  {
    id: "energy-mobility",
    label: "Energy & Mobility Solutions",
    menu: {
      groups: [
        {
          heading: "Utilities & Energy We Work With",
          links: [
            {
              label: "Energy Management Platforms",
              href: "/services/energy-management-platforms",
            },
            {
              label: "EV Charging & eMobility",
              href: "/services/ev-charging-emobility",
            },
          ],
        },
        {
          heading: "Industrial IoT We Work With",
          links: [
            {
              label: "IoT Platform Providers",
              href: "/services/iot-platform-providers",
            },
            {
              label: "Connected Equipment Manufacturers",
              href: "/services/connected-equipment-manufacturers",
            },
            {
              label: "Telemetry & Monitoring Platforms",
              href: "/services/telemetry-monitoring-platforms",
            },
          ],
        },
      ],
      cta: {
        label: "Explore Energy & Mobility",
        href: "/services/energy-mobility",
      },
      howWeHelp: {
        heading: howWeHelpHeading,
        steps: [
          {
            title: "Modernize operations & workflows",
            description:
              "Automate processes across charging and energy systems.",
          },
          {
            title: "Build platforms, integrations & data systems",
            description:
              "CSMS, billing, ETL, APIs, telemetry and operational platforms.",
          },
          {
            title: "Stabilize & run existing platforms",
            description:
              "Audit, harden, modernize and operate business-critical software.",
          },
        ],
      },
      provenWork: {
        heading: provenWorkHeading,
        items: [
          {
            client: "PEAKETL",
            summary: "Energy Data & ETL",
            link: { label: readCaseStudy, href: "/case-studies/peaketl" },
          },
          {
            client: "ChargeOnSite",
            summary: "EV Charging Platform",
            link: { label: readCaseStudy, href: routes.caseStudyCos },
          },
        ],
      },
    },
  },
  {
    id: "ai-automation",
    label: "AI & Automation Solutions",
    menu: {
      groups: [
        {
          heading: "AI Automation We Work With",
          links: [
            {
              label: "AI Automation Company",
              href: "/services/ai-automation-company",
            },
            {
              label: "AI Automation Consulting",
              href: "/services/ai-automation-consulting",
            },
            {
              label: "AI Agent Development Services",
              href: "/services/ai-agent-development",
            },
            {
              label: "AI Integration Services",
              href: "/services/ai-integration",
            },
          ],
        },
        {
          heading: "Workflow & Process Automation We Work With",
          links: [
            {
              label: "Workflow Automation Services",
              href: "/services/workflow-automation",
            },
            {
              label: "Process Automation Services",
              href: "/services/process-automation",
            },
            {
              label: "Business Process Automation Services",
              href: "/services/business-process-automation",
            },
            {
              label: "Data Workflow Automation",
              href: "/services/data-workflow-automation",
            },
          ],
        },
      ],
      cta: {
        label: "Explore Service & Data Work",
        href: "/services/ai-automation",
      },
      howWeHelp: {
        heading: howWeHelpHeading,
        steps: [
          {
            title: "Modernize operations & workflows",
            description:
              "Remove repetitive work and connect the processes your teams run every day.",
          },
          {
            title: "Build platforms, integrations & data systems",
            description:
              "Internal software, ETL, APIs and reporting tied to how the business actually operates.",
          },
          {
            title: "Stabilize & run existing platforms",
            description:
              "Audit, harden, modernize and operate software that already carries the business.",
          },
        ],
      },
      provenWork: {
        heading: provenWorkHeading,
        items: [
          {
            client: "Jeter AI",
            summary: "AI product engineering",
            link: { label: readCaseStudy, href: "/case-studies/jeter-ai" },
          },
          {
            client: "Pattern50",
            summary: "Internal operational software",
            link: { label: readCaseStudy, href: "/case-studies/pattern50" },
          },
        ],
      },
    },
  },
  {
    id: "resources",
    label: "Resources",
    menu: {
      groups: [
        {
          links: [
            { label: "Case studies", href: routes.caseStudyCos },
            { label: "Expert insights", href: "/insights" },
            { label: "Latest news", href: "/news" },
          ],
        },
      ],
    },
  },
  { id: "company", label: "Company", href: routes.about },
];

export const footerContent = {
  contact: {
    addressLines: ["House 15, Road 4, Block G, Banasree,", "Dhaka, Bangladesh"],
    email: "hello@6sensehq.com",
    icons: {
      address: "/footer/map-pin-line.svg",
      email: "/footer/envelope-simple-open.svg",
    },
  },
  socialNavLabel: "Social media",
  /** TODO(content): Figma has no social URLs — replace "#" placeholders. */
  socials: [
    { label: "Facebook", href: "#", icon: "/footer/facebook.svg" },
    { label: "LinkedIn", href: "#", icon: "/footer/linkedin.svg" },
    { label: "YouTube", href: "#", icon: "/footer/youtube.svg" },
    { label: "X", href: "#", icon: "/footer/x.svg" },
  ] satisfies SocialLink[],
  columns: [
    {
      heading: "Company",
      links: [
        { label: "About Us", href: routes.about },
        { label: "Blog", href: "/blog" },
        { label: "Case Studies", href: routes.caseStudyCos },
        { label: "Contact Us", href: routes.contact },
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "Dedicated Team", href: "/services/dedicated-team" },
        {
          label: "Offshore Development",
          href: "/services/offshore-development",
        },
        { label: "Staff Augmentation", href: "/services/staff-augmentation" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: routes.privacyPolicy },
        { label: "Terms & Conditions", href: routes.terms },
      ],
    },
  ] satisfies FooterColumn[],
  copyright: "© 2025 6sense Technologies All rights reserved.",
  badges: {
    clutch: {
      src: "/footer/clutch-badge.png",
      alt: "Reviewed on Clutch — 5 rating",
      width: 131,
      height: 32,
    },
    basis: {
      src: "/footer/basis-badge.png",
      alt: "BASIS — Bangladesh Association of Software & Information Services",
      width: 90,
      height: 33,
    },
  } satisfies Record<string, ImageAsset>,
  wordmark: {
    text: "6SenseHQ",
    mobile: {
      src: "/brand/6sensehq-wordmark-footer-mobile.svg",
      alt: "",
      width: 388,
      height: 58,
    },
  },
} as const;
