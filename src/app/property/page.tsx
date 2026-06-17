"use client";

import { useMemo, useState } from "react";
import { Building2 } from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/components/ui/KpiCard";
import { InsightRow } from "@/components/ui/InsightCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge, statusTone } from "@/components/ui/Badge";
import {
  DetailDrawer,
  type DetailConfig,
  type DetailNote,
} from "@/components/ui/DetailDrawer";
import { useProperty } from "@/lib/hooks";
import { formatCurrency, formatPercent } from "@/lib/format";
import type { AssetType, Insight, Kpi, Property } from "@/lib/types";
import { cn } from "@/lib/utils";

function buildPropertyDetail(p: Property): DetailConfig {
  const occupied = Math.round((p.units * p.occupancy) / 100);
  const margin = (p.noi / p.revenue) * 100;
  const notes: DetailNote[] = [];
  if (p.occupancy < 85) {
    notes.push({
      tone: "critical",
      text: "Occupancy is below the 85% portfolio threshold — flagged for executive review.",
    });
  } else if (p.risk === "High" || p.risk === "Elevated") {
    notes.push({
      tone: "warning",
      text: `Risk level is ${p.risk}. Monitor NOI and lease exposure over the next two quarters.`,
    });
  } else {
    notes.push({
      tone: "positive",
      text: "Performing in line with or above portfolio benchmarks.",
    });
  }
  notes.push({
    tone: "default",
    text: `NOI margin of ${margin.toFixed(1)}% at a ${formatPercent(
      p.capRate
    )} cap rate.`,
  });

  return {
    eyebrow: `Property · ${p.id}`,
    title: p.name,
    subtitle: `${p.city}, ${p.state} · ${p.type}`,
    badge: { text: `${p.risk} risk`, tone: statusTone(p.risk) },
    stats: [
      { label: "Occupancy", value: formatPercent(p.occupancy) },
      { label: "Asset score", value: `${p.assetScore}/100` },
      { label: "Cap rate", value: formatPercent(p.capRate) },
      { label: "Units", value: p.units.toLocaleString() },
    ],
    sections: [
      {
        title: "Financials",
        fields: [
          { label: "Annual revenue", value: formatCurrency(p.revenue, { compact: true }) },
          { label: "Net operating income", value: formatCurrency(p.noi, { compact: true }) },
          { label: "NOI margin", value: `${margin.toFixed(1)}%` },
          { label: "Revenue / unit", value: formatCurrency(Math.round(p.revenue / p.units)) },
        ],
      },
      {
        title: "Occupancy & units",
        fields: [
          { label: "Total units", value: p.units.toLocaleString() },
          { label: "Occupied", value: occupied.toLocaleString() },
          { label: "Vacant", value: (p.units - occupied).toLocaleString() },
          { label: "Occupancy rate", value: formatPercent(p.occupancy) },
        ],
      },
    ],
    notes,
    actionLabel: "Open asset record",
  };
}

const propertyInsights: Insight[] = [
  { id: "p1", icon: "warning", text: "Coastal Bay Resort & Pacific Crest Mall require intervention — both below benchmark occupancy.", tone: "critical" },
  { id: "p2", icon: "trend", text: "12 assets are outperforming benchmark NOI by more than 15%.", tone: "positive" },
  { id: "p3", icon: "sparkles", text: "Revenue optimization: 14 units across Highland Park & Beacon Hill priced below market.", tone: "default" },
];

const filters: Array<AssetType | "All"> = ["All", "Residential", "Commercial", "Industrial", "Retail", "Hospitality"];

export default function PropertyPage() {
  const { data } = useProperty();
  const [filter, setFilter] = useState<AssetType | "All">("All");
  const [detail, setDetail] = useState<DetailConfig | null>(null);

  const rows = useMemo(
    () => (filter === "All" ? data.properties : data.properties.filter((p) => p.type === filter)),
    [data.properties, filter]
  );

  const kpis: Kpi[] = useMemo(() => {
    const all = data.properties;
    const totalUnits = all.reduce((s, p) => s + p.units, 0);
    const occupied = Math.round(all.reduce((s, p) => s + (p.units * p.occupancy) / 100, 0));
    const avgScore = Math.round(all.reduce((s, p) => s + p.assetScore, 0) / all.length);
    return [
      { id: "total", label: "Total Properties", value: "125", delta: 4.2, trend: "up", sub: "across portfolio", metricKey: "Portfolio Value" },
      { id: "occupied", label: "Occupied Units", value: occupied.toLocaleString(), delta: 2.1, trend: "up", sub: `of ${totalUnits.toLocaleString()}`, metricKey: "Occupancy Rate" },
      { id: "vacant", label: "Vacant Units", value: (totalUnits - occupied).toLocaleString(), delta: -3.4, trend: "down", sub: "available", metricKey: "Vacancy Forecast" },
      { id: "maint", label: "Maintenance Requests", value: "342", delta: -8.4, trend: "down", sub: "open work orders", metricKey: "Open Work Orders" },
      { id: "score", label: "Asset Health Score", value: `${avgScore}`, delta: 1.6, trend: "up", sub: "portfolio avg / 100", metricKey: "Portfolio Value" },
    ];
  }, [data.properties]);

  const columns: Column<Property>[] = [
    { key: "name", header: "Property", render: (r) => (
      <div>
        <div className="font-medium text-ink">{r.name}</div>
        <div className="text-xs text-ink-muted">{r.type}</div>
      </div>
    ) },
    { key: "city", header: "Location", render: (r) => `${r.city}, ${r.state}` },
    { key: "occupancy", header: "Occupancy", align: "right", render: (r) => (
      <span className={r.occupancy >= 93 ? "text-emerald-600" : r.occupancy >= 85 ? "text-amber-600" : "text-rose-500"}>
        {formatPercent(r.occupancy)}
      </span>
    ) },
    { key: "revenue", header: "Revenue", align: "right", render: (r) => formatCurrency(r.revenue, { compact: true }) },
    { key: "noi", header: "NOI", align: "right", render: (r) => formatCurrency(r.noi, { compact: true }) },
    { key: "assetScore", header: "Score", align: "right", render: (r) => (
      <span className="font-semibold text-ink">{r.assetScore}</span>
    ) },
    { key: "risk", header: "Risk", align: "center", render: (r) => (
      <Badge tone={statusTone(r.risk)} dot>{r.risk}</Badge>
    ) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Building2}
        title="Property Intelligence"
        subtitle="Asset-level performance, health scores, and risk across all 125 properties."
      />

      <KpiGrid kpis={kpis} />

      <section>
        <SectionTitle>AI Insights</SectionTitle>
        <InsightRow insights={propertyInsights} />
      </section>

      <Card>
        <CardHeader
          title="Portfolio"
          subtitle={`${rows.length} of ${data.properties.length} assets shown`}
          action={
            <div className="flex flex-wrap gap-1.5">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition",
                    filter === f
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-ink-soft hover:bg-slate-200"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        />
        <div className="mt-3">
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(r) => r.id}
            onRowClick={(r) => setDetail(buildPropertyDetail(r))}
          />
        </div>
      </Card>

      <DetailDrawer config={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
