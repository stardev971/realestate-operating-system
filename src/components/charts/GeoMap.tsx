"use client";

import { useState } from "react";
import type { GeoState } from "@/lib/data/company";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Lightweight stylized geographic distribution. Markers are positioned on an
 * abstract US field by approximate x/y and sized by portfolio value. (A real
 * deployment can swap this for a Mapbox / react-simple-maps choropleth.)
 */
export function GeoMap({ states }: { states: GeoState[] }) {
  const [hover, setHover] = useState<string | null>(null);
  const maxVal = Math.max(...states.map((s) => s.value));

  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-xl border border-slate-200/70 bg-gradient-to-br from-slate-50 to-brand-50/40">
        {/* dotted grid backdrop */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.5]">
          <defs>
            <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="#c7cbe0" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {states.map((s) => {
          const size = 16 + (s.value / maxVal) * 34;
          const isHot = s.occupancy >= 94;
          return (
            <div
              key={s.code}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              onMouseEnter={() => setHover(s.code)}
              onMouseLeave={() => setHover(null)}
            >
              <div
                className={cn(
                  "flex cursor-pointer items-center justify-center rounded-full font-semibold text-white shadow-md transition",
                  isHot ? "bg-brand-500/90" : "bg-blue-500/80",
                  hover === s.code && "ring-4 ring-brand-200"
                )}
                style={{ width: size, height: size, fontSize: Math.max(size / 4, 8) }}
              >
                {s.code}
              </div>
              {hover === s.code && (
                <div className="absolute left-1/2 top-[calc(100%+6px)] z-20 w-40 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-2.5 text-left shadow-pop">
                  <div className="text-xs font-semibold text-ink">{s.state}</div>
                  <div className="mt-1 flex justify-between text-[11px] text-ink-muted">
                    <span>Properties</span>
                    <span className="font-medium text-ink-soft">{s.properties}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-ink-muted">
                    <span>Value</span>
                    <span className="font-medium text-ink-soft">
                      ${formatCompact(s.value * 1_000_000)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-ink-muted">
                    <span>Occupancy</span>
                    <span className="font-medium text-ink-soft">{s.occupancy}%</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-lg bg-white/80 px-2.5 py-1.5 text-[10px] backdrop-blur">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-brand-500" /> ≥94% occ
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> &lt;94% occ
          </span>
        </div>
      </div>

      {/* Ranked list */}
      <ul className="space-y-1.5 self-center">
        {[...states]
          .sort((a, b) => b.value - a.value)
          .slice(0, 7)
          .map((s) => (
            <li
              key={s.code}
              onMouseEnter={() => setHover(s.code)}
              onMouseLeave={() => setHover(null)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-2.5 py-1.5 transition",
                hover === s.code ? "bg-brand-50" : "hover:bg-slate-50"
              )}
            >
              <span className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-[10px] font-bold text-ink-soft">
                {s.code}
              </span>
              <span className="flex-1 text-[13px] text-ink-soft">{s.state}</span>
              <span className="text-[13px] font-semibold text-ink">
                ${formatCompact(s.value * 1_000_000)}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
