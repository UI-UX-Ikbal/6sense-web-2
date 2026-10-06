"use client";

import Image from "next/image";
import { useId, useMemo } from "react";
import { formatTimeZoneLabel } from "@/lib/calendar";

type TimeZoneSelectProps = {
  label: string;
  /** Selected IANA zone; empty until the browser zone is known. */
  value: string;
  onChange: (timeZone: string) => void;
};

function supportedTimeZones(current: string): string[] {
  const zones = Intl.supportedValuesOf("timeZone");
  return current && !zones.includes(current) ? [current, ...zones] : zones;
}

/** "Time zone" control under the calendar: shows the zone with its current local time. */
export function TimeZoneSelect({
  label,
  value,
  onChange,
}: TimeZoneSelectProps) {
  const id = useId();
  const zones = useMemo(
    () => (value ? supportedTimeZones(value) : []),
    [value],
  );
  const now = new Date();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-brand">
        {label}
      </label>
      <div className="relative self-start">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={!value}
          className="max-w-full cursor-pointer appearance-none rounded-chip bg-transparent py-1 pr-7 text-sm text-brand transition-colors duration-200 hover:bg-lime motion-reduce:transition-none"
        >
          {zones.map((zone) => (
            <option key={zone} value={zone}>
              {zone === value ? formatTimeZoneLabel(zone, now) : zone}
            </option>
          ))}
        </select>
        <Image
          src="/icons/chevron-down-16.svg"
          alt=""
          width={16}
          height={16}
          className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
