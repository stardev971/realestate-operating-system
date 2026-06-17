"use client";

import { Users } from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/components/ui/KpiCard";
import { InsightRow } from "@/components/ui/InsightCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { BarChartViz, LineTrendChart } from "@/components/charts/Charts";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge, statusTone } from "@/components/ui/Badge";
import { DetailDrawer, type DetailConfig } from "@/components/ui/DetailDrawer";
import { useCustomer } from "@/lib/hooks";
import { useState } from "react";
import { palette } from "@/lib/data/company";
import { formatCurrency, formatPercent } from "@/lib/format";
import type { SatisfactionRow } from "@/lib/types";

type RiskRow = { tenant: string; property: string; risk: string; reason: string; value: number };

function buildSegmentDetail(r: SatisfactionRow): DetailConfig {
  return {
    eyebrow: "Tenant segment",
    title: r.segment,
    subtitle: "Satisfaction & loyalty overview",
    badge: { text: `NPS ${r.nps}`, tone: r.nps >= 50 ? "green" : "amber" },
    stats: [
      { label: "Satisfaction", value: `${r.satisfaction.toFixed(1)} / 5` },
      { label: "NPS", value: `${r.nps}` },
      { label: "Complaints", value: `${r.complaints}` },
      { label: "Renewal intent", value: formatPercent(r.renewalIntent) },
    ],
    sections: [
      {
        title: "Experience metrics",
        fields: [
          { label: "Satisfaction score", value: `${r.satisfaction.toFixed(1)} / 5` },
          { label: "Net promoter score", value: `${r.nps}` },
          { label: "Open complaints", value: `${r.complaints}` },
          { label: "Renewal intent", value: formatPercent(r.renewalIntent) },
        ],
      },
    ],
    notes: [
      {
        tone: r.nps >= 55 ? "positive" : r.nps >= 45 ? "default" : "warning",
        text:
          r.nps >= 55
            ? `${r.segment} tenants are highly loyal — among the strongest segments in the portfolio.`
            : r.nps >= 45
            ? `${r.segment} loyalty is steady; watch complaint volume.`
            : `${r.segment} loyalty lags the portfolio — prioritize service recovery.`,
      },
    ],
    actionLabel: "Open segment",
  };
}

function buildRiskDetail(r: RiskRow): DetailConfig {
  return {
    eyebrow: "Renewal risk",
    title: r.tenant,
    subtitle: r.property,
    badge: { text: `${r.risk} risk`, tone: statusTone(r.risk) },
    stats: [
      { label: "Annual rent", value: formatCurrency(r.value, { compact: true }) },
      { label: "Risk level", value: r.risk },
    ],
    sections: [
      {
        title: "Account",
        fields: [
          { label: "Tenant", value: r.tenant },
          { label: "Property", value: r.property },
          { label: "Annual rent at risk", value: formatCurrency(r.value) },
          { label: "Risk level", value: r.risk },
        ],
      },
      {
        title: "Why flagged",
        content: <p className="text-sm text-ink-soft">{r.reason}</p>,
      },
    ],
    notes: [
      {
        tone: r.risk === "High" ? "critical" : "warning",
        text: `${formatCurrency(
          r.value
        )} in annual rent is at risk. Recommend proactive outreach from the retention team.`,
      },
    ],
    actionLabel: "Open tenant",
  };
}

export default function CustomerPage() {
  const { data } = useCustomer();
  const [detail, setDetail] = useState<DetailConfig | null>(null);

  const segCols: Column<SatisfactionRow>[] = [
    { key: "segment", header: "Segment", render: (r) => <span className="font-medium text-ink">{r.segment}</span> },
    { key: "satisfaction", header: "Satisfaction", align: "right", render: (r) => `${r.satisfaction.toFixed(1)} / 5` },
    { key: "nps", header: "NPS", align: "right", render: (r) => (
      <span className={r.nps >= 50 ? "text-emerald-600 font-semibold" : "text-ink-soft"}>{r.nps}</span>
    ) },
    { key: "complaints", header: "Complaints", align: "right" },
    { key: "renewalIntent", header: "Renewal Intent", align: "right", render: (r) => formatPercent(r.renewalIntent) },
  ];

  const riskCols: Column<RiskRow>[] = [
    { key: "tenant", header: "Tenant", render: (r) => <span className="font-medium text-ink">{r.tenant}</span> },
    { key: "property", header: "Property" },
    { key: "reason", header: "Reason", render: (r) => <span className="text-ink-muted">{r.reason}</span> },
    { key: "value", header: "Annual Rent", align: "right", render: (r) => formatCurrency(r.value, { compact: true }) },
    { key: "risk", header: "Risk", align: "center", render: (r) => (
      <Badge tone={statusTone(r.risk)} dot>{r.risk}</Badge>
    ) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Users}
        title="Customer Intelligence"
        subtitle="Tenant satisfaction, NPS, complaints, and renewal-risk detection."
      />

      <KpiGrid kpis={data.kpis} />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Satisfaction & NPS Trend" subtitle="Tenant satisfaction (1–5) and NPS" metricKey="NPS Score" />
          <CardBody>
            <LineTrendChart
              data={data.trend}
              series={[
                { key: "Satisfaction", color: palette.brand },
                { key: "NPS", color: palette.green },
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Complaint Analysis" subtitle="Open complaints by category" metricKey="Open Complaints" />
          <CardBody>
            <BarChartViz
              data={data.complaints as unknown as Array<Record<string, string | number>>}
              categoryKey="category"
              layout="vertical"
              height={260}
              series={[{ key: "count", color: palette.amber }]}
            />
          </CardBody>
        </Card>
      </div>

      <section>
        <SectionTitle>AI Insights</SectionTitle>
        <InsightRow insights={data.insights} />
      </section>

      <Card>
        <CardHeader title="Satisfaction by Segment" subtitle="Across asset classes" metricKey="Tenant Satisfaction" />
        <div className="mt-3">
          <DataTable
            columns={segCols}
            rows={data.segments}
            rowKey={(r) => r.segment}
            onRowClick={(r) => setDetail(buildSegmentDetail(r))}
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Renewal Risk Detection" subtitle="AI-flagged tenants at risk of churn" metricKey="Renewal Intent" />
        <div className="mt-3">
          <DataTable
            columns={riskCols}
            rows={data.risk}
            rowKey={(r) => r.tenant}
            onRowClick={(r) => setDetail(buildRiskDetail(r))}
          />
        </div>
      </Card>

      <DetailDrawer config={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
