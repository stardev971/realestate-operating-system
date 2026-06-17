"use client";

import {
  FileText,
  TrendingUp,
  Building2,
  DollarSign,
  Mail,
  AlertTriangle,
  Sparkles,
  FileDown,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useReports } from "@/lib/hooks";
import type { ReportItem } from "@/lib/types";

const iconMap: Record<ReportItem["icon"], LucideIcon> = {
  trend: TrendingUp,
  building: Building2,
  dollar: DollarSign,
  mail: Mail,
  warning: AlertTriangle,
  sparkles: Sparkles,
};

const exportFormats = ["PDF", "Excel", "PPT"];

export default function ReportsPage() {
  const { data } = useReports();

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FileText}
        title="Reports Center"
        subtitle="Prebuilt executive reports, ready to export and share with stakeholders and investors."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.reports.map((r) => {
          const Icon = iconMap[r.icon];
          return (
            <Card key={r.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50">
                  <Icon className="h-5 w-5 text-brand-600" />
                </div>
                <Badge tone="neutral">{r.cadence}</Badge>
              </div>
              <h3 className="mt-3 text-[15px] font-semibold text-ink">{r.name}</h3>
              <p className="mt-1 flex-1 text-[13px] leading-relaxed text-ink-muted">
                {r.description}
              </p>
              <div className="mt-3 text-[11px] text-ink-muted">Updated {r.updated}</div>
              <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
                <span className="text-[11px] font-medium text-ink-muted">Export</span>
                {exportFormats.map((f) => (
                  <button
                    key={f}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-ink-soft transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                  >
                    <FileDown className="h-3 w-3" />
                    {f}
                  </button>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
