/** Content shapes for service pages built with `ServicePageTemplate`. */

import type { CaseStudy } from "@/content/home";
import type {
  CtaContent,
  FaqContent,
  FeatureCardItem,
  ImageAsset,
  ImageCrop,
  LinkItem,
} from "@/content/types";

export type IconAsset = { src: string; width: number; height: number };

export type ServicePageMeta = { title: string; description: string };

export type ServiceHeroContent = {
  heading: string;
  /** One paragraph, or several. */
  description: string | readonly string[];
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  /** Label for the secondary CTA below 768 when Figma words it differently. */
  secondaryCtaMobileLabel?: string;
  /** Hero height below 768: default 828; "tall" 872 (EV & Mobility 12167:546); "xtall" 956 (Energy 12174:3480). */
  mobileHeight?: "tall" | "xtall";
  /** Separate photo below 768 when Figma uses a different crop. */
  mobileImage?: ImageAsset;
  /** "fill" stretches the photo to the hero box like Figma's unconstrained fill (EV & Mobility). */
  imageFit?: "cover" | "fill";
  /** Photo anchor from 1024: top (default) or centre like Figma's plain object-cover (AI Automation). */
  imageAnchor?: "center";
  /** Title colour: ochre (IoT) or the darker umber (EV & Mobility). */
  headingTone?: "ochre" | "umber";
  /** 8px gaps in the stacked checklist below 1024 instead of 16 (Energy 12194:55487). */
  tightPoints?: boolean;
  /** Spread the checklist across the full row from 1024 instead of centring it. */
  pointsSpread?: boolean;
  image: ImageAsset;
  /** Extra zoom over object-cover from 1024 (Figma crops tighter than "cover"). */
  imageZoom?: number;
  rating: { image: ImageAsset; crop: ImageCrop };
  points: readonly HeroPoint[];
};

/** Checklist item; `mobileLabel` where the 390 frame words it differently ("&" vs "and"). */
export type HeroPoint = string | { label: string; mobileLabel: string };

/** "Our … Services" row of expanding image cards. */
export type ServiceOfferingsContent = {
  heading: string;
  icon: IconAsset;
  items: readonly FeatureCardItem[];
  /** Card in the large slot by default (Figma shows the middle one). */
  initialActive: number;
  /** 36px heading-to-cards gap below 1024 instead of 32px (EV & Mobility 12167:1727). */
  spacious?: boolean;
  /** Button beside the heading from 1024, full-width under the cards below (Energy 12194:55061 / 12194:56515). */
  cta?: LinkItem;
  /** Brand-teal heading from 1024 (Energy desktop); the base foreground below and by default. */
  brandHeadingFromLg?: boolean;
};

/** Image + copy split section. `leaf`: 537×522 with two rounded corners; `quarter`: square, one corner. */
export type SplitMedia = {
  image: ImageAsset;
  shape: "leaf" | "leaf-short" | "quarter";
  /** object-position when Figma crops off-centre (Energy "Where we work" 50% 85%). */
  position?: string;
};

/** `title` is omitted where Figma sets the point as body copy only (AI Automation "Where we work"). */
export type SplitPoint = { title?: string; body: readonly string[] };

export type SplitSectionContent = {
  id: string;
  /** light: surface background, icon markers. dark: deep-brand background, numbered markers. */
  tone: "light" | "dark";
  /** "\n" forces a line break (Figma sets some titles on two fixed lines). */
  heading: string;
  headingAlign?: "start" | "end";
  /** Narrow (430) heading column instead of the full 537 media column. */
  narrowHeading?: boolean;
  /** large: 36px heading and 20/16 points at every width (EV & Mobility "Where we work"). */
  scale?: "large";
  /** Point bodies render as a bullet list instead of paragraphs. */
  bulleted?: boolean;
  /** Wider gaps (48px) between heading, image and copy below 1024, like Figma's Energy frames. */
  airy?: boolean;
  /** Point titles in regular weight instead of bold (Energy "Use Cases"). */
  regularTitles?: boolean;
  /** Point bodies in the base foreground instead of the subtle grey (AI Automation "Where we work"). */
  strongBody?: boolean;
  /** Point bodies at 16 below 1024 too, where no lead paragraph sets the scale (12365:5761). */
  bigBody?: boolean;
  /** Bold point titles on the dark tone's icon list (AI Automation "Why" sections). */
  boldTitles?: boolean;
  /** 48px section padding below 1024 instead of 64 (AI Automation 12365:5631 / 5761). */
  tightMobile?: boolean;
  /** Lead paragraph(s) at 16 → 18 instead of 18 → 20. */
  smallLead?: boolean;
  /** Copy column 502 wide instead of 581 (AI Automation "Where we work"). */
  narrowCopy?: boolean;
  /** Copy column fills the row instead of the 581 column. */
  wideCopy?: boolean;
  media: SplitMedia;
  lead?: string | readonly string[];
  /** Icon badge per point (light tone); dark tone numbers the points. */
  pointIcon?: IconAsset;
  points: readonly SplitPoint[];
  footnote?: string;
  actions?: { primary: LinkItem; secondary?: LinkItem };
};

export type CapabilityItem = { icon: IconAsset; title: string; body: string };

/** Heading + subheading over a grid of icon cards (EV & Mobility "Where we plug in"). */
export type CapabilityGridContent = {
  id: string;
  heading: string;
  /** Omitted where Figma leaves the subheading empty (AI Automation "What we build"). */
  subheading?: string;
  /** 18/14 card type below 1024 instead of 20/16 (AI Automation 12401:323). */
  compactText?: boolean;
  items: readonly CapabilityItem[];
};

export type StepItem = { title: string; body: string; icon: IconAsset };

export type StepsContent = {
  id: string;
  heading: string;
  subheading: string;
  steps: readonly StepItem[];
};

/** Heading block above the proof card ("AI in production"): title beside intro paragraphs. */
export type ProofHeading = { title: string; paragraphs: readonly string[] };

export type ProofContent = {
  /** 16px gap between the tech groups below 1024 (AI Automation 12365:4964). */
  roomyGroups?: boolean;
  heading?: ProofHeading;
  study: CaseStudy;
  badge: IconAsset;
  mobileBadge: IconAsset;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
};

/** Page body below the hero, in display order. */
export type ServiceSection =
  | { type: "offerings"; content: ServiceOfferingsContent }
  | { type: "split"; content: SplitSectionContent }
  | { type: "proof"; content: ProofContent }
  | { type: "steps"; content: StepsContent }
  | { type: "grid"; content: CapabilityGridContent }
  | {
      type: "faq";
      content: FaqContent;
      size?: "compact" | "large" | "mixed";
      insetAnswers?: boolean;
    }
  | { type: "cta"; content: CtaContent };

export type ServicePageContent = {
  meta: ServicePageMeta;
  path: string;
  hero: ServiceHeroContent;
  sections: readonly ServiceSection[];
};
