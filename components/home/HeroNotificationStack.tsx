"use client";

import Image from "next/image";
import type { HeroNotification } from "@/content/home";
import { useAutoCycle } from "@/lib/hooks";

const CYCLE_MS = 3200;

/** Stack slots, front to back (Figma 12012:1194 / 12012:1187 / 12012:1180: 349, 317, 285 wide). */
const slotClasses = [
  "z-30 w-full translate-y-0",
  "z-20 w-[90.83%] -translate-y-6.5",
  "z-10 w-[81.66%] -translate-y-11.25",
] as const;

type HeroNotificationStackProps = {
  /** Back-to-front, as layered in Figma. */
  notifications: readonly HeroNotification[];
};

/**
 * Decorative glass "notification" cards over the hero image. The front card rotates to the
 * back on a timer (Figma states 12012:1179 → 11995:46086 → 12117:4595); static under reduced motion.
 * Scaled to 64.5% at 390, matching the mobile frame (12012:1225).
 */
export function HeroNotificationStack({
  notifications,
}: HeroNotificationStackProps) {
  const count = notifications.length;
  const step = useAutoCycle(count, CYCLE_MS);

  return (
    <div
      aria-hidden
      className="absolute bottom-1.5 left-1/2 h-41.25 w-notification origin-bottom -translate-x-1/2 scale-[0.6447] md:bottom-5.5 md:scale-100"
    >
      {notifications.map((item, index) => {
        // Position from the front: the last item starts in front.
        const fromFront = count - 1 - index;
        const slot = (fromFront - step + count) % count;
        return (
          <div
            key={item.name}
            className={`absolute bottom-0 left-1/2 flex h-notification-card -translate-x-1/2 flex-col gap-2 rounded-card bg-glass p-4 text-fg backdrop-blur-glass transition-[width,translate] duration-700 ease-out motion-reduce:transition-none ${slotClasses[slot] ?? slotClasses[2]}`}
          >
            <div className="flex items-center gap-2">
              <Image
                src={item.avatar.src}
                alt={item.avatar.alt}
                width={item.avatar.width}
                height={item.avatar.height}
                className="size-7 rounded-full"
              />
              <p className="text-sm">{item.name}</p>
            </div>
            <p className="text-base font-semibold">{item.title}</p>
            <p className="h-5 truncate text-xs">{item.body}</p>
          </div>
        );
      })}
    </div>
  );
}
