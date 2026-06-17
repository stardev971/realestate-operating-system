import {
  TrendingUp,
  AlertTriangle,
  Mail,
  Megaphone,
  Sparkles,
  Building2,
  DollarSign,
  type LucideIcon,
} from "lucide-react";
import type { Insight } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconMap: Record<Insight["icon"], LucideIcon> = {
  trend: TrendingUp,
  warning: AlertTriangle,
  mail: Mail,
  megaphone: Megaphone,
  sparkles: Sparkles,
  building: Building2,
  dollar: DollarSign,
};

const toneMap: Record<NonNullable<Insight["tone"]>, string> = {
  default: "text-brand-600 bg-brand-50",
  positive: "text-emerald-600 bg-emerald-50",
  warning: "text-amber-600 bg-amber-50",
  critical: "text-rose-600 bg-rose-50",
};

export function InsightCard({ insight }: { insight: Insight }) {
  const Icon = iconMap[insight.icon];
  const tone = toneMap[insight.tone ?? "default"];

  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-3.5">
      <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg", tone)}>
        <Icon className="h-4 w-4" />
      </span>
      <p className="text-[13px] leading-relaxed text-ink-soft">{insight.text}</p>
    </div>
  );
}

export function InsightRow({ insights }: { insights: Insight[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {insights.map((i) => (
        <InsightCard key={i.id} insight={i} />
      ))}
    </div>
  );
}
