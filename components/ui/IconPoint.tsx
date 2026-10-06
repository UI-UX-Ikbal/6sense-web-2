import Image from "next/image";
import type { ReactNode } from "react";

type IconPointProps = {
  icon: { src: string; width: number; height: number };
  children: ReactNode;
  className?: string;
};

/** List item led by a 32px round icon badge, 12px gap (Figma "Frame 1000002579/80"). */
export function IconPoint({ icon, children, className = "" }: IconPointProps) {
  return (
    <li className={`flex items-start gap-3 ${className}`.trim()}>
      <Image
        src={icon.src}
        alt=""
        width={icon.width}
        height={icon.height}
        className="size-8 shrink-0"
      />
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  );
}
