"use client";

import Image from "next/image";
import type { OrbitLayer } from "@/content/types";
import { useAutoCycle } from "@/lib/hooks";

const CYCLE_MS = 2600;

type IconOrbitProps = {
  states: readonly (readonly OrbitLayer[])[];
  className?: string;
};

/**
 * Decorative icon cluster (tree → fuel pump → car) that cross-fades between the three
 * Figma states (12049:3993, 11995:46858, 11995:46912). Used on the mission card and CTA band;
 * holds the first state under reduced motion.
 */
export function IconOrbit({ states, className = "" }: IconOrbitProps) {
  const active = useAutoCycle(states.length, CYCLE_MS);

  return (
    <div aria-hidden className={`h-23.5 w-31 ${className}`.trim()}>
      {states.map((layers, index) => (
        <div
          key={layers[0]?.src ?? index}
          className={`absolute inset-0 transition-[opacity,scale] duration-700 ease-out motion-reduce:transition-none ${
            index === active ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          {layers.map((layer) => (
            <Image
              key={layer.src}
              src={layer.src}
              alt=""
              width={Math.round(layer.size)}
              height={Math.round(layer.size)}
              className="absolute max-w-none"
              style={{
                left: layer.left,
                top: layer.top,
                width: layer.size,
                height: layer.size,
                opacity: layer.opacity,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
