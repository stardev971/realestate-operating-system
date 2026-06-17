"use client";

import { PieChart } from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/components/ui/KpiCard";
import { InsightRow } from "@/components/ui/InsightCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { DonutChart, LineTrendChart } from "@/components/charts/Charts";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge, statusTone } from "@/components/ui/Badge";
import { DetailDrawer, type DetailConfig } from "@/components/ui/DetailDrawer";
import { useInvestment } from "@/lib/hooks";
import { useState } from "react";
import { palette } from "@/lib/data/company";
import { formatCurrency, formatPercent } from "@/lib/format";
import type { FundRow } from "@/lib/types";

type AssetRank = { asset: string; fund: string; irr: number; value: number };

function buildFundDetail(r: FundRow): DetailConfig {
  return {
    eyebrow: "Fund",
    title: r.fund,
    subtitle: r.strategy,
    badge: { text: r.status, tone: statusTone(r.status) },
    stats: [
      { label: "AUM", value: formatCurrency(r.aum, { compact: true }) },
      { label: "IRR", value: formatPercent(r.irr) },
      { label: "MOIC", value: `${r.moic.toFixed(1)}x` },
      { label: "DPI", value: `${r.dpi.toFixed(1)}x` },
    ],
    sections: [
      {
        title: "Returns",
        fields: [
          { label: "Strategy", value: r.strategy },
          { label: "Assets under management", value: formatCurrency(r.aum, { compact: true }) },
          { label: "Net IRR", value: formatPercent(r.irr) },
          { label: "MOIC", value: `${r.moic.toFixed(1)}x` },
          { label: "DPI (realized)", value: `${r.dpi.toFixed(1)}x` },
          { label: "Status", value: r.status },
        ],
      },
    ],
    notes: [
      {
        tone: r.irr >= 18 ? "positive" : r.irr >= 12 ? "default" : "warning",
        text:
          r.irr >= 18
            ? "Outperforming target returns — a top vehicle in the portfolio."
            : r.irr >= 12
            ? "Returns are in line with the benchmark."
            : "Returns are below target; review asset-level performance.",
      },
    ],
    actionLabel: "Open fund",
  };
}

function buildRankDetail(r: AssetRank): DetailConfig {
  return {
    eyebrow: "Asset",
    title: r.asset,
    subtitle: `Held in ${r.fund}`,
    badge: {
      text: `${formatPercent(r.irr)} IRR`,
      tone: r.irr >= 20 ? "green" : r.irr >= 12 ? "neutral" : "red",
    },
    stats: [
      { label: "IRR", value: formatPercent(r.irr) },
      { label: "Value", value: formatCurrency(r.value, { compact: true }) },
    ],
    sections: [
      {
        title: "Position",
        fields: [
          { label: "Asset", value: r.asset },
          { label: "Fund", value: r.fund },
          { label: "Net IRR", value: formatPercent(r.irr) },
          { label: "Current value", value: formatCurrency(r.value) },
        ],
      },
    ],
    notes: [
      {
        tone: r.irr >= 20 ? "positive" : r.irr >= 12 ? "default" : "critical",
        text:
          r.irr >= 20
            ? "Top-quartile performer driving fund returns."
            : r.irr >= 12
            ? "Performing in line with expectations."
            : "Underperforming — evaluate hold vs. disposition.",
      },
    ],
    actionLabel: "Open asset",
  };
}

export default function InvestmentPage() {
  const { data } = useInvestment();
  const [detail, setDetail] = useState<DetailConfig | null>(null);

  const fundCols: Column<FundRow>[] = [
    { key: "fund", header: "Fund", render: (r) => (
      <div>
        <div className="font-medium text-ink">{r.fund}</div>
        <div className="text-xs text-ink-muted">{r.strategy}</div>
      </div>
    ) },
    { key: "aum", header: "AUM", align: "right", render: (r) => formatCurrency(r.aum, { compact: true }) },
    { key: "irr", header: "IRR", align: "right", render: (r) => (
      <span className="font-semibold text-emerald-600">{formatPercent(r.irr)}</span>
    ) },
    { key: "moic", header: "MOIC", align: "right", render: (r) => `${r.moic.toFixed(1)}x` },
    { key: "dpi", header: "DPI", align: "right", render: (r) => `${r.dpi.toFixed(1)}x` },
    { key: "status", header: "Status", align: "center", render: (r) => (
      <Badge tone={statusTone(r.status)} dot>{r.status}</Badge>
    ) },
  ];

  const rankCols: Column<AssetRank>[] = [
    { key: "asset", header: "Asset", render: (r) => <span className="font-medium text-ink">{r.asset}</span> },
    { key: "fund", header: "Fund" },
    { key: "irr", header: "IRR", align: "right", render: (r) => (
      <span className={r.irr >= 20 ? "text-emerald-600 font-semibold" : r.irr >= 12 ? "text-ink-soft" : "text-rose-500"}>
        {formatPercent(r.irr)}
      </span>
    ) },
    { key: "value", header: "Value", align: "right", render: (r) => formatCurrency(r.value, { compact: true }) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={PieChart}
        title="Investment Intelligence"
        subtitle="Fund performance, IRR, capital allocation, and returns for REIT and PE strategies."
      />

      <KpiGrid kpis={data.kpis} />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="IRR Analysis" subtitle="Portfolio IRR vs benchmark (%)" metricKey="Portfolio IRR" />
          <CardBody>
            <LineTrendChart
              data={data.irrTrend}
              valueFormatter={(v) => `${v}%`}
              series={[
                { key: "IRR", color: palette.brand },
                { key: "Benchmark", color: palette.slate },
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Capital Allocation" subtitle="By asset class ($M)" metricKey="Equity Invested" />
          <CardBody>
            <DonutChart data={data.allocation} valueLabel="Total $M" valueFormatter={(v) => `$${v}M`} />
          </CardBody>
        </Card>
      </div>

      <section>
        <SectionTitle>AI Insights</SectionTitle>
        <InsightRow insights={data.insights} />
      </section>

      <Card>
        <CardHeader title="Fund Performance" subtitle="Across all investment vehicles" metricKey="AUM" />
        <div className="mt-3">
          <DataTable
            columns={fundCols}
            rows={data.funds}
            rowKey={(r) => r.fund}
            onRowClick={(r) => setDetail(buildFundDetail(r))}
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Asset Performance Ranking" subtitle="Top and bottom performers by IRR" metricKey="Projected Returns" />
        <div className="mt-3">
          <DataTable
            columns={rankCols}
            rows={data.ranking}
            rowKey={(r) => r.asset}
            onRowClick={(r) => setDetail(buildRankDetail(r))}
          />
        </div>
      </Card>

      <DetailDrawer config={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
