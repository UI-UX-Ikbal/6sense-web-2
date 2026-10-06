import Image from "next/image";
import type { ImageAsset, ImageCrop } from "@/content/types";

type CroppedImageProps = {
  image: ImageAsset;
  crop: ImageCrop;
  /** Sizes the box (width / height / radius); the crop scales with it. */
  className?: string;
  sizes: string;
  preload?: boolean;
};

/** Reproduces a Figma cropped image fill: the image is offset and scaled inside a clipping box. */
export function CroppedImage({
  image,
  crop,
  className = "",
  sizes,
  preload = false,
}: CroppedImageProps) {
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`.trim()}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        preload={preload}
        className={`absolute max-w-none ${crop.mirrored ? "-scale-x-100" : ""}`}
        style={{
          // Figma mirrors the whole box, so the crop offset mirrors too: right edge = left.
          left: crop.mirrored
            ? `calc(100% - (${crop.left}) - (${crop.width}))`
            : crop.left,
          top: crop.top,
          width: crop.width,
          height: crop.height,
        }}
      />
    </div>
  );
}
