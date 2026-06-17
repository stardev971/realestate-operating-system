"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import type { Kpi } from "@/lib/types";
import { InfoTooltip } from "./InfoTooltip";
import { formatDelta } from "@/lib/format";
import { cn } from "@/lib/utils";

export function KpiCard({ kpi, index = 0 }: { kpi: Kpi; index?: number }) {
  const trend = kpi.trend ?? "flat";
  const TrendIcon =
    trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  const trendColor =
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
      ? "text-rose-500"
      : "text-ink-muted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-card transition hover:shadow-cardhover"
    >
      <div className="flex items-center gap-1.5">
        <span className="text-[12px] font-medium text-ink-muted">
          {kpi.label}
        </span>
        {kpi.metricKey && <InfoTooltip metricKey={kpi.metricKey} />}
      </div>
      <div className="mt-2 text-[26px] font-bold leading-none tracking-tight text-ink">
        {kpi.value}
      </div>
      <div className="mt-2 flex items-center gap-2">
        {kpi.delta !== undefined && (
          <span
            className={cn("flex items-center gap-0.5 text-xs font-semibold", trendColor)}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            {formatDelta(kpi.delta)}
          </span>
        )}
        {kpi.sub && <span className="text-xs text-ink-muted">{kpi.sub}</span>}
      </div>
    </motion.div>
  );
}

export function KpiGrid({ kpis }: { kpis: Kpi[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      {kpis.map((kpi, i) => (
        <KpiCard key={kpi.id} kpi={kpi} index={i} />
      ))}
    </div>
  );
}
