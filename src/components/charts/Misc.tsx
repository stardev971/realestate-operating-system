"use client";

import { motion } from "framer-motion";
import type { FunnelStage } from "@/lib/types";
import { palette } from "@/lib/data/company";
import { cn } from "@/lib/utils";

const funnelColors = [
  palette.brand,
  "#7a6bee",
  palette.blue,
  palette.cyan,
  palette.green,
  palette.amber,
];

export function FunnelViz({ stages }: { stages: FunnelStage[] }) {
  const top = stages[0]?.value ?? 1;
  return (
    <div className="space-y-2.5">
      {stages.map((s, i) => {
        const width = Math.max((s.value / top) * 100, 14);
        const prev = i === 0 ? s.value : stages[i - 1].value;
        const conv = i === 0 ? 100 : (s.value / prev) * 100;
        return (
          <div key={s.stage} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs font-medium text-ink-soft">
              {s.stage}
            </span>
            <div className="relative h-9 flex-1 overflow-hidden rounded-lg bg-slate-50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                className="flex h-full items-center rounded-lg px-3"
                style={{ background: funnelColors[i % funnelColors.length] }}
              >
                <span className="text-xs font-semibold text-white">
                  {s.value.toLocaleString()}
                </span>
              </motion.div>
            </div>
            <span className="w-12 shrink-0 text-right text-xs font-medium text-ink-muted">
              {conv.toFixed(0)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ProgressBar({
  value,
  tone = "brand",
  className,
}: {
  value: number; // 0-100
  tone?: "brand" | "green" | "amber" | "red";
  className?: string;
}) {
  const toneMap = {
    brand: "bg-brand-500",
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-rose-500",
  } as const;
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}>
      <div
        className={cn("h-full rounded-full", toneMap[tone])}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}
