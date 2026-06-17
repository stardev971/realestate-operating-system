"use client";

import { Activity } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiGrid } from "@/components/ui/KpiCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { AreaTrendChart, BarChartViz, DonutChart } from "@/components/charts/Charts";
import { useAiUsage } from "@/lib/hooks";
import { palette } from "@/lib/data/company";

export default function AiUsagePage() {
  const { data } = useAiUsage();

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Activity}
        title="AI Usage"
        subtitle="How the platform AI is being used — queries, insights, and value generated across modules."
      />

      <KpiGrid kpis={data.kpis} />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="AI Query Volume" subtitle="Queries and actions over time" metricKey="AI Queries" />
          <CardBody>
            <AreaTrendChart
              data={data.trend}
              series={[
                { key: "Queries", color: palette.brand },
                { key: "Actions", color: palette.green },
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Usage by Capability" subtitle="Share of AI workload" metricKey="Insights Generated" />
          <CardBody>
            <DonutChart data={data.models} valueLabel="Workload" valueFormatter={(v) => `${v}%`} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Usage by Module" subtitle="AI queries per intelligence module" metricKey="AI Queries" />
        <CardBody>
          <BarChartViz
            data={data.byModule as unknown as Array<Record<string, string | number>>}
            categoryKey="module"
            layout="vertical"
            height={300}
            series={[{ key: "queries", color: palette.brand }]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
