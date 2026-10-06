import Link from "next/link";
import type { ComponentProps } from "react";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "outline-dark"
  | "soft"
  | "inverse"
  | "light"
  | "outline-inverse";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-[11px] text-button backdrop-blur-button transition-colors duration-200 motion-reduce:transition-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-inverse hover:bg-brand-deep",
  outline:
    "border border-brand py-[10px] text-brand hover:bg-brand hover:text-inverse",
  "outline-dark":
    "border border-black py-[10px] text-black hover:bg-black hover:text-inverse",
  soft: "bg-pill text-brand hover:bg-brand hover:text-inverse",
  inverse: "bg-inverse text-brand hover:bg-pill",
  light: "bg-inverse text-black hover:bg-pill",
  "outline-inverse":
    "border border-inverse-line py-[10px] text-inverse hover:bg-inverse hover:text-brand",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  className = "",
) {
  return `${base} ${variants[variant]} ${className}`.trim();
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

/** Pill CTA ("Contact Us Container" in Figma) rendered as a link. */
export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
