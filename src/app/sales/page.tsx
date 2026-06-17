"use client";

import { TrendingUp } from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/components/ui/KpiCard";
import { InsightRow } from "@/components/ui/InsightCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { LineTrendChart } from "@/components/charts/Charts";
import { FunnelViz } from "@/components/charts/Misc";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { DetailDrawer, type DetailConfig } from "@/components/ui/DetailDrawer";
import { useSales } from "@/lib/hooks";
import { useState } from "react";
import { palette } from "@/lib/data/company";
import { formatCurrency, formatPercent } from "@/lib/format";
import type { AgentRow, ProjectRow } from "@/lib/types";

function buildProjectDetail(r: ProjectRow): DetailConfig {
  const conversion = r.leads > 0 ? (r.closed / r.leads) * 100 : 0;
  return {
    eyebrow: "Project",
    title: r.project,
    subtitle: r.location,
    badge: { text: `${r.closed} deals closed`, tone: "brand" },
    stats: [
      { label: "Leads", value: r.leads.toLocaleString() },
      { label: "Closed", value: r.closed.toLocaleString() },
      { label: "Revenue", value: formatCurrency(r.revenue, { compact: true }) },
      { label: "Conversion", value: `${conversion.toFixed(1)}%` },
    ],
    sections: [
      {
        title: "Pipeline",
        fields: [
          { label: "Total leads", value: r.leads.toLocaleString() },
          { label: "Deals closed", value: r.closed.toLocaleString() },
          { label: "Lead → close", value: `${conversion.toFixed(1)}%` },
          { label: "Revenue / deal", value: formatCurrency(Math.round(r.revenue / Math.max(r.closed, 1))) },
        ],
      },
    ],
    notes: [
      {
        tone: conversion >= 9 ? "positive" : "warning",
        text:
          conversion >= 9
            ? "Conversion is above the portfolio average — strong sales momentum."
            : "Conversion is trailing the portfolio average; review lead qualification.",
      },
    ],
    actionLabel: "Open project",
  };
}

function buildAgentDetail(r: AgentRow): DetailConfig {
  return {
    eyebrow: "Agent",
    title: r.name,
    subtitle: `${r.region} region`,
    badge: { text: `${r.conversion.toFixed(1)}% conversion`, tone: r.conversion >= 19 ? "green" : "amber" },
    stats: [
      { label: "Deals", value: r.deals.toLocaleString() },
      { label: "Volume", value: formatCurrency(r.volume, { compact: true }) },
      { label: "Conversion", value: formatPercent(r.conversion) },
      { label: "Avg deal", value: formatCurrency(Math.round(r.volume / Math.max(r.deals, 1)), { compact: true }) },
    ],
    sections: [
      {
        title: "Performance",
        fields: [
          { label: "Deals closed", value: r.deals.toLocaleString() },
          { label: "Total volume", value: formatCurrency(r.volume, { compact: true }) },
          { label: "Conversion rate", value: formatPercent(r.conversion) },
          { label: "Region", value: r.region },
        ],
      },
    ],
    notes: [
      {
        tone: r.conversion >= 19 ? "positive" : "default",
        text: `${r.name} closed ${r.deals} deals worth ${formatCurrency(
          r.volume,
          { compact: true }
        )} this period.`,
      },
    ],
    actionLabel: "Open agent profile",
  };
}

export default function SalesPage() {
  const { data } = useSales();
  const [detail, setDetail] = useState<DetailConfig | null>(null);

  const projectCols: Column<ProjectRow>[] = [
    { key: "project", header: "Project", render: (r) => <span className="font-medium text-ink">{r.project}</span> },
    { key: "location", header: "Location" },
    { key: "leads", header: "Leads", align: "right" },
    { key: "closed", header: "Closed", align: "right" },
    { key: "revenue", header: "Revenue", align: "right", render: (r) => formatCurrency(r.revenue, { compact: true }) },
  ];

  const agentCols: Column<AgentRow>[] = [
    { key: "name", header: "Agent", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "region", header: "Region" },
    { key: "deals", header: "Deals", align: "right" },
    { key: "volume", header: "Volume", align: "right", render: (r) => formatCurrency(r.volume, { compact: true }) },
    { key: "conversion", header: "Conv.", align: "right", render: (r) => formatPercent(r.conversion) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={TrendingUp}
        title="Sales Intelligence"
        subtitle="Pipeline, conversion, and performance for developers and brokerages."
      />

      <KpiGrid kpis={data.kpis} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Sales Funnel" subtitle="Lead → Qualified → Tour → Proposal → Negotiation → Closed" metricKey="Sales Conversion Rate" />
          <CardBody>
            <FunnelViz stages={data.funnel} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Leads vs Closed Deals" subtitle="Last 6 months" metricKey="Deals Closed" />
          <CardBody>
            <LineTrendChart
              data={data.trend}
              series={[
                { key: "Leads", color: palette.brand },
                { key: "Closed", color: palette.green },
              ]}
            />
          </CardBody>
        </Card>
      </div>

      <section>
        <SectionTitle>AI Insights</SectionTitle>
        <InsightRow insights={data.insights} />
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Top Projects" subtitle="By revenue contribution" />
          <div className="mt-3">
            <DataTable
              columns={projectCols}
              rows={data.projects}
              rowKey={(r) => r.project}
              onRowClick={(r) => setDetail(buildProjectDetail(r))}
            />
          </div>
        </Card>
        <Card>
          <CardHeader title="Top Agents" subtitle="By closed volume" />
          <div className="mt-3">
            <DataTable
              columns={agentCols}
              rows={data.agents}
              rowKey={(r) => r.name}
              onRowClick={(r) => setDetail(buildAgentDetail(r))}
            />
          </div>
        </Card>
      </div>

      <DetailDrawer config={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
