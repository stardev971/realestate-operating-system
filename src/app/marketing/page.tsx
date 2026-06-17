"use client";

import { Megaphone } from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/components/ui/KpiCard";
import { InsightRow } from "@/components/ui/InsightCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { DonutChart, LineTrendChart } from "@/components/charts/Charts";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge, statusTone } from "@/components/ui/Badge";
import { DetailDrawer, type DetailConfig } from "@/components/ui/DetailDrawer";
import { useMarketing } from "@/lib/hooks";
import { useState } from "react";
import { palette } from "@/lib/data/company";
import { formatCurrency } from "@/lib/format";
import type { CampaignRow, ChannelRow } from "@/lib/types";

function buildChannelDetail(r: ChannelRow): DetailConfig {
  const cpl = r.leads > 0 ? r.spend / r.leads : 0;
  const tourRate = r.leads > 0 ? (r.tours / r.leads) * 100 : 0;
  return {
    eyebrow: "Channel",
    title: r.channel,
    subtitle: "Acquisition channel performance",
    badge: { text: `${r.roi.toFixed(1)}x ROI`, tone: r.roi >= 4.5 ? "green" : "amber" },
    stats: [
      { label: "Spend", value: formatCurrency(r.spend) },
      { label: "Leads", value: r.leads.toLocaleString() },
      { label: "Tours", value: r.tours.toLocaleString() },
      { label: "ROI", value: `${r.roi.toFixed(1)}x` },
    ],
    sections: [
      {
        title: "Efficiency",
        fields: [
          { label: "Total spend", value: formatCurrency(r.spend) },
          { label: "Leads generated", value: r.leads.toLocaleString() },
          { label: "Tours booked", value: r.tours.toLocaleString() },
          { label: "Cost per lead", value: formatCurrency(Math.round(cpl)) },
          { label: "Lead → tour", value: `${tourRate.toFixed(1)}%` },
          { label: "Return on spend", value: `${r.roi.toFixed(1)}x` },
        ],
      },
    ],
    notes: [
      {
        tone: r.roi >= 4.5 ? "positive" : "warning",
        text:
          r.roi >= 4.5
            ? `${r.channel} is one of the most efficient channels — consider scaling budget.`
            : `${r.channel} ROI is below the 4.5x benchmark; review targeting and creative.`,
      },
    ],
    actionLabel: "Open channel",
  };
}

function buildCampaignDetail(r: CampaignRow): DetailConfig {
  return {
    eyebrow: "Campaign",
    title: r.campaign,
    subtitle: `${r.channel} channel`,
    badge: { text: r.status, tone: statusTone(r.status) },
    stats: [
      { label: "Spend", value: formatCurrency(r.spend) },
      { label: "Leads", value: r.leads.toLocaleString() },
      { label: "Cost / lead", value: `$${r.cpl}` },
      { label: "ROI", value: `${r.roi.toFixed(1)}x` },
    ],
    sections: [
      {
        title: "Campaign",
        fields: [
          { label: "Channel", value: r.channel },
          { label: "Status", value: r.status },
          { label: "Spend", value: formatCurrency(r.spend) },
          { label: "Leads", value: r.leads.toLocaleString() },
          { label: "Cost per lead", value: `$${r.cpl}` },
          { label: "Return on spend", value: `${r.roi.toFixed(1)}x` },
        ],
      },
    ],
    notes: [
      {
        tone: r.roi >= 4 ? "positive" : r.status === "Paused" ? "warning" : "default",
        text:
          r.roi >= 4
            ? "Strong performer — a candidate for additional budget."
            : "ROI is modest; test new creative or audiences before scaling.",
      },
    ],
    actionLabel: "Open campaign",
  };
}

export default function MarketingPage() {
  const { data } = useMarketing();
  const [detail, setDetail] = useState<DetailConfig | null>(null);

  const channelCols: Column<ChannelRow>[] = [
    { key: "channel", header: "Channel", render: (r) => (
      <span className="flex items-center gap-2 font-medium text-ink">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
        {r.channel}
      </span>
    ) },
    { key: "spend", header: "Spend", align: "right", render: (r) => formatCurrency(r.spend) },
    { key: "leads", header: "Leads", align: "right" },
    { key: "tours", header: "Tours", align: "right" },
    { key: "roi", header: "ROI", align: "right", render: (r) => (
      <span className={r.roi >= 4.5 ? "text-emerald-600 font-semibold" : "text-ink-soft"}>{r.roi.toFixed(1)}x</span>
    ) },
  ];

  const campaignCols: Column<CampaignRow>[] = [
    { key: "campaign", header: "Campaign", render: (r) => <span className="font-medium text-ink">{r.campaign}</span> },
    { key: "channel", header: "Channel" },
    { key: "spend", header: "Spend", align: "right", render: (r) => formatCurrency(r.spend) },
    { key: "leads", header: "Leads", align: "right" },
    { key: "cpl", header: "CPL", align: "right", render: (r) => `$${r.cpl}` },
    { key: "roi", header: "ROI", align: "right", render: (r) => `${r.roi.toFixed(1)}x` },
    { key: "status", header: "Status", align: "center", render: (r) => (
      <Badge tone={statusTone(r.status)} dot>{r.status}</Badge>
    ) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Megaphone}
        title="Marketing Intelligence"
        subtitle="Channel performance, attribution, and lead-source analysis across every campaign."
      />

      <KpiGrid kpis={data.kpis} />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Spend vs Leads" subtitle="Marketing spend ($K) and leads generated" metricKey="Campaign ROI" />
          <CardBody>
            <LineTrendChart
              data={data.trend}
              series={[
                { key: "Spend", color: palette.amber },
                { key: "Leads", color: palette.brand },
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Lead Source Analysis" subtitle="Leads by source" metricKey="Leads Generated" />
          <CardBody>
            <DonutChart data={data.leadSources} valueLabel="Total leads" />
          </CardBody>
        </Card>
      </div>

      <section>
        <SectionTitle>AI Insights</SectionTitle>
        <InsightRow insights={data.insights} />
      </section>

      <Card>
        <CardHeader title="Channel Attribution" subtitle="Performance by acquisition channel" metricKey="Cost Per Lead" />
        <div className="mt-3">
          <DataTable
            columns={channelCols}
            rows={data.channels}
            rowKey={(r) => r.channel}
            onRowClick={(r) => setDetail(buildChannelDetail(r))}
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Campaign Performance" subtitle="Active and recent campaigns" metricKey="Cost Per Acquisition" />
        <div className="mt-3">
          <DataTable
            columns={campaignCols}
            rows={data.campaigns}
            rowKey={(r) => r.campaign}
            onRowClick={(r) => setDetail(buildCampaignDetail(r))}
          />
        </div>
      </Card>

      <DetailDrawer config={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
