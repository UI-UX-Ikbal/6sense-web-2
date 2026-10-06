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
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  image: ImageAsset;
  /** Extra zoom over object-cover from 1024 (Figma crops tighter than "cover"). */
  imageZoom?: number;
  rating: { image: ImageAsset; crop: ImageCrop };
  points: readonly string[];
};

/** "Our … Services" row of expanding image cards. */
export type ServiceOfferingsContent = {
  heading: string;
  icon: IconAsset;
  items: readonly FeatureCardItem[];
  /** Card in the large slot by default (Figma shows the middle one). */
  initialActive: number;
};

/** Image + copy split section. `leaf`: 537×522 with two rounded corners; `quarter`: square, one corner. */
export type SplitMedia = {
  image: ImageAsset;
  shape: "leaf" | "quarter";
  /** object-position when Figma crops off-centre. */
  position?: string;
};

export type SplitPoint = { title: string; body: readonly string[] };

export type SplitSectionContent = {
  id: string;
  /** light: surface background, icon markers. dark: deep-brand background, numbered markers. */
  tone: "light" | "dark";
  heading: string;
  headingAlign?: "start" | "end";
  /** Narrow (430) heading column instead of the full 537 media column. */
  narrowHeading?: boolean;
  /** Copy column fills the row instead of the 581 column. */
  wideCopy?: boolean;
  media: SplitMedia;
  lead?: string;
  /** Icon badge per point (light tone); dark tone numbers the points. */
  pointIcon?: IconAsset;
  points: readonly SplitPoint[];
  footnote?: string;
  actions?: { primary: LinkItem; secondary: LinkItem };
};

export type StepItem = { title: string; body: string; icon: IconAsset };

export type StepsContent = {
  id: string;
  heading: string;
  subheading: string;
  steps: readonly StepItem[];
};

export type ProofContent = {
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
  | { type: "faq"; content: FaqContent }
  | { type: "cta"; content: CtaContent };

export type ServicePageContent = {
  meta: ServicePageMeta;
  path: string;
  hero: ServiceHeroContent;
  sections: readonly ServiceSection[];
};
