"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { metricMap } from "@/lib/data/dataDictionary";

/**
 * Hoverable info icon that surfaces the data-dictionary definition for a
 * metric — formula, source systems, and business meaning. This is the single
 * source of truth behind every "how it's calculated" tooltip in the app.
 */
export function InfoTooltip({ metricKey }: { metricKey: string }) {
  const [open, setOpen] = useState(false);
  const def = metricMap[metricKey];
  if (!def) return null;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={`How ${def.metric} is calculated`}
        className="text-ink-muted/70 transition hover:text-brand-500"
      >
        <Info className="h-3.5 w-3.5" />
      </button>

      {open && (
        <span className="absolute left-1/2 top-6 z-50 w-72 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-pop">
          <span className="block text-[13px] font-semibold text-ink">
            {def.metric} — how it&apos;s calculated
          </span>
          <span className="mt-1.5 block rounded-md bg-slate-50 px-2 py-1 font-mono text-[11px] text-ink-soft">
            {def.formula}
          </span>

          <span className="mt-2.5 block text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
            Source systems
          </span>
          <span className="mt-1 flex flex-wrap gap-1">
            {def.sources.map((s) => (
              <span
                key={s}
                className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-600"
              >
                {s}
              </span>
            ))}
          </span>

          <span className="mt-2.5 block text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
            What it means
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
            {def.meaning}
          </span>
        </span>
      )}
    </span>
  );
}
