"use client";

import { KeyRound } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/components/ui/KpiCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { BarChartViz, LineTrendChart } from "@/components/charts/Charts";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { DetailDrawer, type DetailConfig } from "@/components/ui/DetailDrawer";
import { useLeasing } from "@/lib/hooks";
import { useState } from "react";
import { palette } from "@/lib/data/company";
import { formatCurrency, formatPercent } from "@/lib/format";
import type { RentRollRow } from "@/lib/types";

type Opportunity = {
  tenant: string;
  property: string;
  expires: string;
  sqft: number;
  annualRent: number;
  intent: string;
};

function buildRentRollDetail(r: RentRollRow): DetailConfig {
  const occupancy = (r.leased / r.units) * 100;
  const annualRent = r.monthlyRent * 12;
  return {
    eyebrow: "Rent roll",
    title: r.property,
    subtitle: `${r.leased} of ${r.units} units leased`,
    badge: {
      text: `${formatPercent(r.collected)} collected`,
      tone: r.collected >= 98 ? "green" : "amber",
    },
    stats: [
      { label: "Occupancy", value: formatPercent(occupancy) },
      { label: "Monthly rent", value: formatCurrency(r.monthlyRent, { compact: true }) },
      { label: "Collected", value: formatPercent(r.collected) },
      { label: "Delinquent", value: formatCurrency(r.delinquent, { compact: true }) },
    ],
    sections: [
      {
        title: "Lease & collections",
        fields: [
          { label: "Total units", value: r.units.toLocaleString() },
          { label: "Leased units", value: r.leased.toLocaleString() },
          { label: "Vacant units", value: (r.units - r.leased).toLocaleString() },
          { label: "Monthly rent", value: formatCurrency(r.monthlyRent) },
          { label: "Annualized rent", value: formatCurrency(annualRent, { compact: true }) },
          { label: "Collection rate", value: formatPercent(r.collected) },
          { label: "Delinquent balance", value: formatCurrency(r.delinquent) },
        ],
      },
    ],
    notes: [
      {
        tone: r.collected >= 98 ? "positive" : "warning",
        text:
          r.collected >= 98
            ? "Collections are healthy and above the 98% target."
            : `Collections are below target with ${formatCurrency(
                r.delinquent
              )} delinquent — prioritize follow-up.`,
      },
    ],
    actionLabel: "Open rent roll",
  };
}

function buildOpportunityDetail(r: Opportunity): DetailConfig {
  const tone =
    r.intent === "High" ? "green" : r.intent === "Medium" ? "amber" : "red";
  return {
    eyebrow: "Renewal opportunity",
    title: r.tenant,
    subtitle: `${r.property} · expires ${r.expires}`,
    badge: { text: `${r.intent} intent`, tone },
    stats: [
      { label: "Sq ft", value: r.sqft.toLocaleString() },
      { label: "Annual rent", value: formatCurrency(r.annualRent, { compact: true }) },
      { label: "Expires", value: r.expires },
      { label: "Rent / sq ft", value: formatCurrency(Math.round(r.annualRent / r.sqft)) },
    ],
    sections: [
      {
        title: "Lease",
        fields: [
          { label: "Tenant", value: r.tenant },
          { label: "Property", value: r.property },
          { label: "Leased area", value: `${r.sqft.toLocaleString()} sq ft` },
          { label: "Annual rent", value: formatCurrency(r.annualRent) },
          { label: "Expiration", value: r.expires },
          { label: "Renewal intent", value: r.intent },
        ],
      },
    ],
    notes: [
      {
        tone: r.intent === "High" ? "positive" : r.intent === "Low" ? "critical" : "warning",
        text:
          r.intent === "High"
            ? "High renewal intent — prepare a renewal offer to lock in the term."
            : r.intent === "Low"
            ? "Low renewal intent and high value at risk — escalate to retention team."
            : "Moderate intent — engage early to improve renewal odds.",
      },
    ],
    actionLabel: "Open lease",
  };
}

export default function LeasingPage() {
  const { data } = useLeasing();
  const [detail, setDetail] = useState<DetailConfig | null>(null);

  const rentCols: Column<RentRollRow>[] = [
    { key: "property", header: "Property", render: (r) => <span className="font-medium text-ink">{r.property}</span> },
    { key: "units", header: "Units", align: "right" },
    { key: "leased", header: "Leased", align: "right" },
    { key: "monthlyRent", header: "Monthly Rent", align: "right", render: (r) => formatCurrency(r.monthlyRent, { compact: true }) },
    {
      key: "collected",
      header: "Collected",
      align: "right",
      render: (r) => (
        <span className={r.collected >= 98 ? "text-emerald-600" : "text-amber-600"}>
          {formatPercent(r.collected)}
        </span>
      ),
    },
    { key: "delinquent", header: "Delinquent", align: "right", render: (r) => formatCurrency(r.delinquent) },
  ];

  const oppCols: Column<Opportunity>[] = [
    { key: "tenant", header: "Tenant", render: (r) => <span className="font-medium text-ink">{r.tenant}</span> },
    { key: "property", header: "Property" },
    { key: "expires", header: "Expires", align: "center" },
    { key: "sqft", header: "Sq Ft", align: "right", render: (r) => r.sqft.toLocaleString() },
    { key: "annualRent", header: "Annual Rent", align: "right", render: (r) => formatCurrency(r.annualRent, { compact: true }) },
    {
      key: "intent",
      header: "Intent",
      align: "center",
      render: (r) => (
        <Badge tone={r.intent === "High" ? "green" : r.intent === "Medium" ? "amber" : "red"} dot>
          {r.intent}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={KeyRound}
        title="Leasing Intelligence"
        subtitle="Renewals, expirations, vacancy forecasting, and rent collection across the portfolio."
      />

      <KpiGrid kpis={data.kpis} />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Lease Expiration Calendar" subtitle="Leases reaching end of term by month" metricKey="Expiring Leases" />
          <CardBody>
            <BarChartViz
              data={data.expiration as unknown as Array<Record<string, string | number>>}
              categoryKey="month"
              series={[{ key: "leases", color: palette.brand }]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Renewal & Vacancy" subtitle="Renewal rate vs vacancy (%)" metricKey="Renewal Rate" />
          <CardBody>
            <LineTrendChart
              data={data.renewalTrend}
              valueFormatter={(v) => `${v}%`}
              series={[
                { key: "Renewals", color: palette.green },
                { key: "Vacancy", color: palette.red },
              ]}
            />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Rent Roll Summary" subtitle="Collection performance by property" metricKey="Rent Collection Rate" />
        <div className="mt-3">
          <DataTable
            columns={rentCols}
            rows={data.rentRoll}
            rowKey={(r) => r.property}
            onRowClick={(r) => setDetail(buildRentRollDetail(r))}
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Renewal Opportunities" subtitle="High-value leases expiring soon" metricKey="Lease Renewals" />
        <div className="mt-3">
          <DataTable
            columns={oppCols}
            rows={data.opportunities}
            rowKey={(r) => r.tenant}
            onRowClick={(r) => setDetail(buildOpportunityDetail(r))}
          />
        </div>
      </Card>

      <DetailDrawer config={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
