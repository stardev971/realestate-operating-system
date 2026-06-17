"use client";

import { Wrench } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/components/ui/KpiCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { BarChartViz, LineTrendChart } from "@/components/charts/Charts";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { DetailDrawer, type DetailConfig } from "@/components/ui/DetailDrawer";
import { useOperations } from "@/lib/hooks";
import { useState } from "react";
import { palette } from "@/lib/data/company";
import { formatCurrency, formatPercent } from "@/lib/format";
import type { VendorRow, WorkOrderRow } from "@/lib/types";

function buildWorkOrderDetail(r: WorkOrderRow): DetailConfig {
  return {
    eyebrow: "Work orders",
    title: r.category,
    subtitle: "Maintenance category detail",
    badge: {
      text: `${formatPercent(r.slaCompliance)} SLA`,
      tone: r.slaCompliance >= 95 ? "green" : "amber",
    },
    stats: [
      { label: "Open", value: r.open.toLocaleString() },
      { label: "Avg resolution", value: `${r.avgResolution}h` },
      { label: "SLA compliance", value: formatPercent(r.slaCompliance) },
    ],
    sections: [
      {
        title: "Service level",
        fields: [
          { label: "Category", value: r.category },
          { label: "Open work orders", value: r.open.toLocaleString() },
          { label: "Avg resolution time", value: `${r.avgResolution} hours` },
          { label: "SLA compliance", value: formatPercent(r.slaCompliance) },
        ],
      },
    ],
    notes: [
      {
        tone: r.slaCompliance >= 95 ? "positive" : "warning",
        text:
          r.slaCompliance >= 95
            ? "Meeting SLA targets for this category."
            : "Below the 95% SLA target — consider adding vendor capacity.",
      },
    ],
    actionLabel: "Open work orders",
  };
}

function buildVendorDetail(r: VendorRow): DetailConfig {
  return {
    eyebrow: "Vendor",
    title: r.vendor,
    subtitle: r.category,
    badge: {
      text: `${r.rating.toFixed(1)} ★`,
      tone: r.rating >= 4.5 ? "green" : r.rating >= 4 ? "amber" : "red",
    },
    stats: [
      { label: "Spend", value: formatCurrency(r.spend) },
      { label: "Rating", value: `${r.rating.toFixed(1)} ★` },
      { label: "On-time", value: formatPercent(r.onTime) },
    ],
    sections: [
      {
        title: "Vendor",
        fields: [
          { label: "Category", value: r.category },
          { label: "Total spend", value: formatCurrency(r.spend) },
          { label: "Quality rating", value: `${r.rating.toFixed(1)} / 5` },
          { label: "On-time delivery", value: formatPercent(r.onTime) },
        ],
      },
    ],
    notes: [
      {
        tone: r.onTime >= 90 && r.rating >= 4.5 ? "positive" : "default",
        text:
          r.onTime >= 90 && r.rating >= 4.5
            ? "Reliable, high-quality vendor — a preferred partner."
            : "Performance is acceptable; monitor on-time delivery on upcoming jobs.",
      },
    ],
    actionLabel: "Open vendor",
  };
}

export default function OperationsPage() {
  const { data } = useOperations();
  const [detail, setDetail] = useState<DetailConfig | null>(null);

  const woCols: Column<WorkOrderRow>[] = [
    { key: "category", header: "Category", render: (r) => <span className="font-medium text-ink">{r.category}</span> },
    { key: "open", header: "Open", align: "right" },
    { key: "avgResolution", header: "Avg Resolution", align: "right", render: (r) => `${r.avgResolution}h` },
    { key: "slaCompliance", header: "SLA Compliance", align: "right", render: (r) => (
      <span className={r.slaCompliance >= 95 ? "text-emerald-600" : "text-amber-600"}>{formatPercent(r.slaCompliance)}</span>
    ) },
  ];

  const vendorCols: Column<VendorRow>[] = [
    { key: "vendor", header: "Vendor", render: (r) => <span className="font-medium text-ink">{r.vendor}</span> },
    { key: "category", header: "Category" },
    { key: "spend", header: "Spend", align: "right", render: (r) => formatCurrency(r.spend) },
    { key: "rating", header: "Rating", align: "right", render: (r) => `${r.rating.toFixed(1)} ★` },
    { key: "onTime", header: "On-Time", align: "right", render: (r) => formatPercent(r.onTime) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Wrench}
        title="Operations Intelligence"
        subtitle="Work orders, resolution times, vendor performance, and SLA compliance."
      />

      <KpiGrid kpis={data.kpis} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Work Order Trends" subtitle="Opened vs closed by month" metricKey="Open Work Orders" />
          <CardBody>
            <LineTrendChart
              data={data.trend}
              series={[
                { key: "Opened", color: palette.amber },
                { key: "Closed", color: palette.green },
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Open Work Orders by Category" subtitle="Current backlog" metricKey="Avg Resolution Time" />
          <CardBody>
            <BarChartViz
              data={data.workOrders as unknown as Array<Record<string, string | number>>}
              categoryKey="category"
              series={[{ key: "open", color: palette.brand }]}
            />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="SLA Compliance by Category" subtitle="Resolution and compliance detail" metricKey="Avg Resolution Time" />
        <div className="mt-3">
          <DataTable
            columns={woCols}
            rows={data.workOrders}
            rowKey={(r) => r.category}
            onRowClick={(r) => setDetail(buildWorkOrderDetail(r))}
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Vendor Performance" subtitle="Spend, rating, and reliability" metricKey="Vendor Spend" />
        <div className="mt-3">
          <DataTable
            columns={vendorCols}
            rows={data.vendors}
            rowKey={(r) => r.vendor}
            onRowClick={(r) => setDetail(buildVendorDetail(r))}
          />
        </div>
      </Card>

      <DetailDrawer config={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
