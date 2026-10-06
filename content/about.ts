import { footerContent, routes } from "@/content/navigation";
import type {
  FeatureCardItem,
  ImageAsset,
  ImageCrop,
  LinkItem,
} from "@/content/types";
import { orbitStates } from "@/content/home";

/**
 * About page copy, links and imagery.
 * Figma: desktop 12263:1647, mobile 12263:2288.
 */

export type Person = {
  name: string;
  role: string;
  quote: string;
  portrait: ImageAsset;
  /** Same crop at 113px (1440) and 157px (390). */
  crop: ImageCrop;
  socials: readonly SocialProfile[];
};

export type SocialProfile = LinkItem & { icon: string };

const TREE_BADGE = { src: "/about/tree-badge.svg", width: 32, height: 32 };
const TREE_BADGE_DARK = {
  src: "/about/tree-badge-dark.svg",
  width: 32,
  height: 32,
};

const socialHref = (label: string) =>
  footerContent.socials.find((social) => social.label === label)?.href ?? "#";

/** TODO(content): Figma has no personal profile URLs — these reuse the footer's placeholders. */
const personSocials = (name: string): SocialProfile[] => [
  {
    label: `${name} on Facebook`,
    href: socialHref("Facebook"),
    icon: "/about/facebook-badge.svg",
  },
  {
    label: `${name} on LinkedIn`,
    href: socialHref("LinkedIn"),
    icon: "/about/linkedin-badge.svg",
  },
];

export const aboutContent = {
  meta: {
    title: "About",
    description:
      "6sense HQ builds where software can have a wider impact: senior engineers working directly with the people behind energy, mobility, and connected-product companies.",
  },

  // Hero — 12291:3416 (1440) / 12293:4266 (390)
  hero: {
    /** Figma breaks the line after "where" at 1440 only. */
    heading: ["We build where", "software can have a wider impact."],
    description:
      "Energy and connected-product projects often involve multiple vendors, platforms, and teams. The more layers involved, the easier it is for context to get lost.",
    image: {
      src: "/about/hero-power-plant.png",
      alt: "Power station chimney and wind turbine beside a large solar farm",
      width: 1024,
      height: 683,
    } satisfies ImageAsset,
    points: [
      "Collaborate with senior engineers.",
      "Aligned with product owners & goals.",
      "No account managers or middle layers.",
      "Engineers understand the domain & logic.",
    ],
    rating: {
      image: {
        src: "/about/clutch-rating.png",
        alt: "Reviewed on Clutch: five stars, 5.0 rating",
        width: 2500,
        height: 1406,
      } satisfies ImageAsset,
      crop: {
        left: "-10.87%",
        top: "-64.41%",
        width: "129.35%",
        height: "243.37%",
      } satisfies ImageCrop,
    },
  },

  // "We believe" — 12263:1725 (1440) / 12263:2354 (390)
  belief: {
    heading: "We believe",
    image: {
      src: "/about/dam-leaf.png",
      alt: "Hydroelectric dam between forested hills under a blue sky",
      width: 870,
      height: 670,
    } satisfies ImageAsset,
    lead: "Better systems should create less waste.",
    icon: TREE_BADGE,
    points: [
      "In energy and mobility, software does more than support a product. It influences how infrastructure is used, how resources are managed, and how efficiently operations run.",
      "When those systems work better, the impact goes beyond software. Less waste, fewer inefficiencies, and better use of the infrastructure already in place",
    ],
  },

  // "Why 6sense HQ exists" — 12263:1828 (1440) / 12263:2457 (390)
  why: {
    heading: "Why 6sense HQ exists",
    image: {
      src: "/about/forest-path.jpg",
      alt: "Footpath through a sunlit pine forest",
      width: 578,
      height: 867,
    } satisfies ImageAsset,
    lead: "We want to be closer to the people building that change.",
    icon: TREE_BADGE_DARK,
    points: [
      "Complex energy projects often pass through several layers before the engineers doing the work ever speak to the people who understand the actual problem.",
      "Context gets diluted along the way. We built 6sense HQ around a more direct relationship: technical people working alongside the people responsible for the product, operation, and outcome.",
    ],
  },

  // "Not just a sector we talk about." — 12263:1886 (1440) / 12263:2514 (390)
  work: {
    heading: "Not just a sector we talk about.",
    subheading: "Our work reflects that choice",
    icon: {
      src: "/home/services/service-icon.svg",
      width: 76.385,
      height: 76.385,
    },
    items: [
      {
        title: "ChargeOnSite",
        description:
          "We have worked with its team since 2022, helping build and evolve the software behind a live EV charging network.",
        link: { label: "How we build?", href: "/services/build-software" },
        image: {
          src: "/about/chargeonsite.jpg",
          alt: "Row of EV chargers beside a parked electric car",
          width: 1015,
          height: 687,
        },
        scrim: { from: "34.22%", to: "69.276%" },
      },
      {
        title: "PeakETL",
        description:
          "Our work in energy data deals with the difficult reality of bringing fragmented operational and regulatory information into systems people can actually use.",
        link: { label: "How we fix?", href: "/services/fix-and-stabilize" },
        image: {
          src: "/about/peaketl.jpg",
          alt: "Refinery chimneys lit up at dusk",
          width: 831,
          height: 555,
        },
        scrim: { from: "22.106%", to: "63.504%" },
        imagePosition: { base: "82.6% 50%", lg: "82.6% 50%" },
      },
      {
        title: "Connected systems",
        description:
          "We have also worked where software meets physical products, devices, firmware, and real-world behaviour.",
        link: {
          label: "How we maintain?",
          href: "/services/scale-and-maintain",
        },
        image: {
          src: "/about/connected-systems.jpg",
          alt: "Wind turbines on a green hillside",
          width: 480,
          height: 720,
        },
        scrim: { from: "42.308%", to: "59.638%" },
        imagePosition: { base: "50% 67.7%", lg: "50% 90.2%" },
      },
    ] satisfies FeatureCardItem[],
    footnote:
      "These are different products, but they are connected by the kind of problems we chose to spend our engineering time on.",
    cta: {
      label: "Explore our work",
      href: routes.caseStudyCos,
    } satisfies LinkItem,
  },

  // "The people behind 6sense HQ" — 12293:4078 (1440) / 12263:2387 (390)
  people: {
    heading: "The people behind 6sense HQ",
    subheading: "The people accountable for that choice.",
    followLabel: "Follow on",
    items: [
      {
        name: "Nasif Sid",
        role: "CEO",
        quote:
          "“Our ambition is not simply to build more software. It is to put our engineering behind companies improving how energy, mobility, and infrastructure work.”",
        portrait: {
          src: "/about/nasif-sid.png",
          alt: "Portrait of Nasif Sid",
          width: 640,
          height: 853,
        },
        crop: {
          left: "-9.36%",
          top: "-17.8%",
          width: "140.46%",
          height: "187.21%",
          mirrored: true,
        },
        socials: personSocials("Nasif Sid"),
      },
      {
        name: "AKM Ahsan",
        role: "CTO",
        quote:
          "“The most meaningful engineering happens when better software leads to better use of infrastructure, data, and resources. That is what makes this space worth building for.”",
        portrait: {
          src: "/about/akm-ahsan.png",
          alt: "Portrait of AKM Ahsan",
          width: 540,
          height: 720,
        },
        crop: {
          left: "-38.17%",
          top: "-24.1%",
          width: "152.69%",
          height: "203.59%",
        },
        socials: personSocials("AKM Ahsan"),
      },
    ] satisfies Person[],
  },

  // Closing CTA — 12263:2149 (1440) / 12263:2489 (390); same band and imagery as the homepage.
  cta: {
    heading: "Building something that belongs in this future?",
    body: "Talk directly with our CEO and CTO about what you are building, where you are stuck, and whether we are the right people to help.",
    link: { label: "Start a Conversation", href: routes.contact },
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
    orbitStates,
  },
} as const;
