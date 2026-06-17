"use client";

import { HardHat } from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/components/ui/KpiCard";
import { InsightRow } from "@/components/ui/InsightCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { BarChartViz } from "@/components/charts/Charts";
import { ProgressBar } from "@/components/charts/Misc";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge, statusTone } from "@/components/ui/Badge";
import { DetailDrawer, type DetailConfig } from "@/components/ui/DetailDrawer";
import { useConstruction } from "@/lib/hooks";
import { useState } from "react";
import { palette } from "@/lib/data/company";
import { formatCurrency } from "@/lib/format";
import type { ConstructionProject } from "@/lib/types";

type Contractor = { contractor: string; projects: number; onTime: number; budgetVariance: number; rating: number };

function buildConstructionDetail(r: ConstructionProject): DetailConfig {
  const remaining = r.budget - r.spent;
  const spentPct = (r.spent / r.budget) * 100;
  return {
    eyebrow: "Project",
    title: r.name,
    subtitle: r.location,
    badge: {
      text: r.delayDays > 0 ? `${r.status} · ${r.delayDays}d late` : r.status,
      tone: statusTone(r.status),
    },
    stats: [
      { label: "Budget", value: formatCurrency(r.budget, { compact: true }) },
      { label: "Spent", value: formatCurrency(r.spent, { compact: true }) },
      { label: "Complete", value: `${r.percentComplete}%` },
      { label: "Target", value: r.completion },
    ],
    sections: [
      {
        title: "Budget & schedule",
        fields: [
          { label: "Total budget", value: formatCurrency(r.budget) },
          { label: "Spent to date", value: formatCurrency(r.spent) },
          { label: "Remaining", value: formatCurrency(remaining) },
          { label: "Budget used", value: `${spentPct.toFixed(0)}%` },
          { label: "Completion", value: `${r.percentComplete}%` },
          { label: "Target date", value: r.completion },
          { label: "Schedule", value: r.delayDays > 0 ? `${r.delayDays} days behind` : "On schedule" },
        ],
      },
    ],
    notes: [
      {
        tone:
          r.status === "Delayed"
            ? "critical"
            : r.status === "At Risk"
            ? "warning"
            : "positive",
        text:
          r.status === "Delayed"
            ? `Project is ${r.delayDays} days behind schedule — escalate to the construction lead.`
            : r.status === "At Risk"
            ? "Schedule or budget pressure detected; monitor closely."
            : "On track against budget and schedule.",
      },
    ],
    actionLabel: "Open project",
  };
}

function buildContractorDetail(r: Contractor): DetailConfig {
  return {
    eyebrow: "Contractor",
    title: r.contractor,
    subtitle: `${r.projects} active projects`,
    badge: {
      text: `${r.rating.toFixed(1)} ★`,
      tone: r.rating >= 4.5 ? "green" : r.rating >= 4 ? "amber" : "red",
    },
    stats: [
      { label: "Projects", value: r.projects.toLocaleString() },
      { label: "On-time", value: `${r.onTime}%` },
      { label: "Budget var.", value: `${r.budgetVariance > 0 ? "+" : ""}${r.budgetVariance}%` },
      { label: "Rating", value: `${r.rating.toFixed(1)} ★` },
    ],
    sections: [
      {
        title: "Reliability",
        fields: [
          { label: "Active projects", value: r.projects.toLocaleString() },
          { label: "On-time completion", value: `${r.onTime}%` },
          { label: "Budget variance", value: `${r.budgetVariance > 0 ? "+" : ""}${r.budgetVariance}%` },
          { label: "Quality rating", value: `${r.rating.toFixed(1)} / 5` },
        ],
      },
    ],
    notes: [
      {
        tone: r.onTime >= 90 && r.budgetVariance <= 0 ? "positive" : "warning",
        text:
          r.onTime >= 90 && r.budgetVariance <= 0
            ? "Consistently on time and on budget — a trusted partner."
            : "Watch schedule and budget adherence on current jobs.",
      },
    ],
    actionLabel: "Open contractor",
  };
}

export default function ConstructionPage() {
  const { data } = useConstruction();
  const [detail, setDetail] = useState<DetailConfig | null>(null);

  const projectCols: Column<ConstructionProject>[] = [
    { key: "name", header: "Project", render: (r) => (
      <div>
        <div className="font-medium text-ink">{r.name}</div>
        <div className="text-xs text-ink-muted">{r.location}</div>
      </div>
    ) },
    { key: "budget", header: "Budget", align: "right", render: (r) => formatCurrency(r.budget, { compact: true }) },
    { key: "spent", header: "Spent", align: "right", render: (r) => formatCurrency(r.spent, { compact: true }) },
    { key: "percentComplete", header: "Progress", render: (r) => (
      <div className="flex items-center gap-2">
        <ProgressBar
          value={r.percentComplete}
          tone={r.status === "Delayed" ? "red" : r.status === "At Risk" ? "amber" : "brand"}
          className="w-24"
        />
        <span className="text-xs text-ink-soft">{r.percentComplete}%</span>
      </div>
    ) },
    { key: "completion", header: "Target", align: "center" },
    { key: "status", header: "Status", align: "center", render: (r) => (
      <Badge tone={statusTone(r.status)} dot>
        {r.status}{r.delayDays > 0 ? ` · ${r.delayDays}d` : ""}
      </Badge>
    ) },
  ];

  const contractorCols: Column<Contractor>[] = [
    { key: "contractor", header: "Contractor", render: (r) => <span className="font-medium text-ink">{r.contractor}</span> },
    { key: "projects", header: "Projects", align: "right" },
    { key: "onTime", header: "On-Time %", align: "right", render: (r) => (
      <span className={r.onTime >= 90 ? "text-emerald-600" : r.onTime >= 80 ? "text-amber-600" : "text-rose-500"}>{r.onTime}%</span>
    ) },
    { key: "budgetVariance", header: "Budget Var.", align: "right", render: (r) => (
      <span className={r.budgetVariance <= 0 ? "text-emerald-600" : "text-rose-500"}>
        {r.budgetVariance > 0 ? "+" : ""}{r.budgetVariance}%
      </span>
    ) },
    { key: "rating", header: "Rating", align: "right", render: (r) => `${r.rating.toFixed(1)} ★` },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={HardHat}
        title="Construction Intelligence"
        subtitle="Budget vs actual, schedule tracking, and contractor performance across active projects."
      />

      <KpiGrid kpis={data.kpis} />

      <section>
        <SectionTitle>AI Insights</SectionTitle>
        <InsightRow insights={data.insights} />
      </section>

      <Card>
        <CardHeader title="Budget vs Actual" subtitle="Quarterly construction spend ($M)" metricKey="Budget Utilization" />
        <CardBody>
          <BarChartViz
            data={data.budget as unknown as Array<Record<string, string | number>>}
            valueFormatter={(v) => `$${v}M`}
            series={[
              { key: "Budget", color: palette.slate },
              { key: "Actual", color: palette.brand },
            ]}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Schedule Tracking" subtitle="Active project pipeline" metricKey="Active Projects" />
        <div className="mt-3">
          <DataTable
            columns={projectCols}
            rows={data.projects}
            rowKey={(r) => r.name}
            onRowClick={(r) => setDetail(buildConstructionDetail(r))}
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Contractor Performance" subtitle="Reliability and budget adherence" metricKey="Completion Forecast" />
        <div className="mt-3">
          <DataTable
            columns={contractorCols}
            rows={data.contractors}
            rowKey={(r) => r.contractor}
            onRowClick={(r) => setDetail(buildContractorDetail(r))}
          />
        </div>
      </Card>

      <DetailDrawer config={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
