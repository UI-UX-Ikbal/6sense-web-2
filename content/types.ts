/** Content shapes shared by pages and `components/ui`. */

import type { Person } from "@/content/about";

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type LinkItem = { label: string; href: string };

export type SelectOption = { value: string; label: string };

/** One layer of a decorative icon cluster; geometry in px relative to the cluster. */
export type OrbitLayer = {
  src: string;
  size: number;
  left: number;
  top: number;
  opacity: number;
};

/** Image-backed card in an expanding card row (homepage services, About work). */
export type FeatureCardItem = {
  title: string;
  description: string;
  link: LinkItem;
  image: ImageAsset;
  /** Mobile (390) scrim stops; the ≥1024 stops follow the card's size slot. */
  scrim: { from: string; to: string };
  /** object-position below / from 1024 when Figma crops off-centre. */
  imagePosition?: { base?: string; lg?: string };
};

/**
 * Figma image crop inside a fixed box: the image's offset and size as percentages of the box,
 * so the same crop holds at every box size.
 */
export type ImageCrop = {
  left: string;
  top: string;
  width: string;
  height: string;
  /** Mirror horizontally (Figma flipped fill). */
  mirrored?: boolean;
};

/** Clutch review card ("Words from our clients"). */
export type Testimonial = {
  quote: string;
  body: string;
  avatar: ImageAsset;
  project: readonly string[];
  country: string;
  rating: string;
  link: LinkItem;
};

/** "Words from our clients" section: heading, shared card labels and the reviews. */
export type TestimonialsContent = {
  heading: string;
  verifiedLabel: string;
  projectLabel: string;
  countryLabel: string;
  clutchLogo: ImageAsset;
  starIcon: string;
  verifiedIcon: string;
  items: readonly Testimonial[];
};

/** "Speak directly with the people…" section (Book a meeting, Contact). */
export type HostsContent = {
  heading: string;
  link: LinkItem;
  followLabel: string;
  items: readonly Pick<
    Person,
    "name" | "role" | "portrait" | "crop" | "socials"
  >[];
};

/** `answer` is null where Figma shows the question collapsed with no copy yet. */
export type FaqItem = { question: string; answer: string | null };

/** FAQ accordion section (homepage, service pages). */
export type FaqContent = {
  heading: string;
  expandAll: string;
  icons: { open: string; closed: string };
  /** Indexes expanded on load (Figma shows these open). */
  defaultOpen: readonly number[];
  items: readonly FaqItem[];
};

/** Closing call-to-action band. */
export type CtaContent = {
  heading: string;
  body: string;
  link: LinkItem;
  image: ImageAsset;
  mobileImage: ImageAsset;
  orbitStates?: readonly (readonly OrbitLayer[])[];
};
