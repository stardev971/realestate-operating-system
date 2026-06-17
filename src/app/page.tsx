"use client";

import { LayoutDashboard, FileBarChart } from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/components/ui/KpiCard";
import { InsightRow } from "@/components/ui/InsightCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { AreaTrendChart, DonutChart, LineTrendChart } from "@/components/charts/Charts";
import { GeoMap } from "@/components/charts/GeoMap";
import { useExecutive } from "@/lib/hooks";
import { palette } from "@/lib/data/company";
import { useCompany } from "@/lib/activeCompany";
import { useDateRange } from "@/lib/dateRange";
import { rangeLabel } from "@/lib/scale";

export default function ExecutiveOverviewPage() {
  const { data } = useExecutive();
  const { company } = useCompany();
  const { range } = useDateRange();

  return (
    <div className="space-y-6">
      <PageHeader
        icon={LayoutDashboard}
        title="Executive Overview"
        subtitle={`Your entire real estate portfolio. One clear picture — every connected system, ${rangeLabel(
          range
        )}.`}
        action={
          <button className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700">
            <FileBarChart className="h-4 w-4" />
            Generate Report
          </button>
        }
      />

      {/* Hero strip */}
      <div className="overflow-hidden rounded-2xl gradient-brand px-6 py-5 text-white shadow-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-medium text-white/80">{company.name}</div>
            <div className="mt-1 text-2xl font-bold">{company.portfolioValue} portfolio across {company.states} states</div>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="text-2xl font-bold">{company.properties}</div>
              <div className="text-xs text-white/80">Properties</div>
            </div>
            <div>
              <div className="text-2xl font-bold">94.2%</div>
              <div className="text-xs text-white/80">Occupancy</div>
            </div>
            <div>
              <div className="text-2xl font-bold">$178M</div>
              <div className="text-xs text-white/80">NOI</div>
            </div>
          </div>
        </div>
      </div>

      <KpiGrid kpis={data.kpis} />

      <section>
        <SectionTitle>Executive Insights</SectionTitle>
        <InsightRow insights={data.insights} />
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Portfolio Performance Trend"
            subtitle="Revenue vs NOI vs Expenses ($M, trailing 12 months)"
            metricKey="NOI"
          />
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
          <CardHeader title="Revenue Breakdown" subtitle="By asset class ($M)" metricKey="Annual Revenue" />
          <CardBody>
            <DonutChart
              data={data.breakdown}
              valueLabel="Total $M"
              valueFormatter={(v) => `$${v}M`}
            />
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Geographic Distribution"
            subtitle="Portfolio value and occupancy by state"
            metricKey="Portfolio Value"
          />
          <CardBody>
            <GeoMap states={data.geo} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Occupancy Trend" subtitle="Monthly occupancy %" metricKey="Occupancy Rate" />
          <CardBody>
            <LineTrendChart
              data={data.occupancy}
              height={300}
              valueFormatter={(v) => `${v}%`}
              series={[{ key: "Occupancy", color: palette.brand }]}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
