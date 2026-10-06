import Image from "next/image";
import Link from "next/link";
import { brand } from "@/content/navigation";

type LogoProps = {
  onNavigate?: () => void;
};

/** 6sense mark + wordmark, laid out as in Figma (wordmark offset 27.09 / 6.2). */
export function Logo({ onNavigate }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={brand.homeLabel}
      onClick={onNavigate}
      className="relative block h-[32.117px] w-[126.08px] shrink-0 rounded-sm"
    >
      <Image
        src={brand.mark.src}
        alt={brand.mark.alt}
        width={brand.mark.width}
        height={brand.mark.height}
        className="absolute top-0 left-0 h-[32.117px] w-[19.447px]"
        priority
      />
      <Image
        src={brand.wordmark.src}
        alt=""
        width={brand.wordmark.width}
        height={brand.wordmark.height}
        className="absolute top-[6.2px] left-[27.09px] h-[21.635px] w-[98.99px]"
        priority
      />
    </Link>
  );
}
