"use client";

import { DollarSign } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/components/ui/KpiCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { AreaTrendChart, DonutChart, BarChartViz } from "@/components/charts/Charts";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { useRevenue } from "@/lib/hooks";
import { palette } from "@/lib/data/company";
import { formatCurrency, formatPercent } from "@/lib/format";
import type { RegionRow } from "@/lib/types";

export default function RevenuePage() {
  const { data } = useRevenue();

  const columns: Column<RegionRow>[] = [
    { key: "region", header: "Region", render: (r) => <span className="font-medium text-ink">{r.region}</span> },
    { key: "properties", header: "Properties", align: "right" },
    { key: "revenue", header: "Revenue", align: "right", render: (r) => formatCurrency(r.revenue, { compact: true }) },
    { key: "noi", header: "NOI", align: "right", render: (r) => formatCurrency(r.noi, { compact: true }) },
    {
      key: "occupancy",
      header: "Occupancy",
      align: "right",
      render: (r) => (
        <span className={r.occupancy >= 93 ? "text-emerald-600" : "text-amber-600"}>
          {formatPercent(r.occupancy)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={DollarSign}
        title="Revenue & Portfolio Performance"
        subtitle="Financial command center — revenue, NOI, expenses, and returns across the portfolio."
      />

      <KpiGrid kpis={data.kpis} />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Revenue · NOI · Expenses" subtitle="Trailing 12 months ($M)" metricKey="NOI" />
          <CardBody>
            <AreaTrendChart
              data={data.trend}
              valueFormatter={(v) => `$${v}M`}
              series={[
                { key: "Revenue", color: palette.brand },
                { key: "NOI", color: palette.green },
                { key: "Expenses", color: palette.amber },
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Revenue by Property Type" subtitle="Annual ($M)" metricKey="Annual Revenue" />
          <CardBody>
            <DonutChart data={data.byType} valueLabel="Total $M" valueFormatter={(v) => `$${v}M`} />
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Cap Rate Analysis" subtitle="By asset class (%)" metricKey="Portfolio Value" />
          <CardBody>
            <BarChartViz
              data={data.capRate as unknown as Array<Record<string, string | number>>}
              categoryKey="type"
              valueFormatter={(v) => `${v}%`}
              series={[{ key: "capRate", color: palette.brand }]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Expense Analysis" subtitle="Operating expense breakdown ($M)" metricKey="Operating Expenses" />
          <CardBody>
            <DonutChart data={data.expenses} valueLabel="Total $M" valueFormatter={(v) => `$${v}M`} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Revenue by Region" subtitle="Portfolio ranking across regions" metricKey="Revenue per Property" />
        <div className="mt-3">
          <DataTable columns={columns} rows={data.byRegion} rowKey={(r) => r.region} />
        </div>
      </Card>
    </div>
  );
}
