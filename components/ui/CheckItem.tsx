import Image from "next/image";
import type { ReactNode } from "react";

export type CheckTone = "success" | "brand";

const icons: Record<CheckTone, string> = {
  success: "/home/icons/check-success.svg",
  brand: "/home/icons/check-brand.svg",
};

type CheckItemProps = {
  children: ReactNode;
  tone?: CheckTone;
  /** Icon-to-text gap: 6px (default) or 8px (About hero). */
  gap?: "tight" | "loose";
  className?: string;
};

/** List item with a check mark (Figma "Check" 16×16 in a 24px-tall slot). */
export function CheckItem({
  children,
  tone = "success",
  gap = "tight",
  className = "",
}: CheckItemProps) {
  return (
    <li
      className={`flex items-start ${gap === "loose" ? "gap-2" : "gap-1.5"} ${className}`.trim()}
    >
      <span aria-hidden className="flex h-6 w-4 shrink-0 items-center">
        <Image src={icons[tone]} alt="" width={13.5} height={10} />
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  );
}
