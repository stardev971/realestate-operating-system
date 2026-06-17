import type { Kpi, TimePoint } from "@/lib/types";

export const aiUsageKpis: Kpi[] = [
  { id: "queries", label: "AI Queries", value: "18,420", delta: 22.6, trend: "up", sub: "this month", metricKey: "AI Queries" },
  { id: "actions", label: "Actions Executed", value: "74", delta: 14.0, trend: "up", sub: "one-click", metricKey: "Actions Executed" },
  { id: "insights", label: "Insights Generated", value: "1,284", delta: 9.8, trend: "up", sub: "across modules", metricKey: "Insights Generated" },
  { id: "value", label: "Value Identified", value: "$6.4M", delta: 18.2, trend: "up", sub: "potential upside", metricKey: "Value Identified" },
];

export const aiUsageTrend: TimePoint[] = [
  { label: "Jan", Queries: 12400, Actions: 48 },
  { label: "Feb", Queries: 13600, Actions: 52 },
  { label: "Mar", Queries: 14800, Actions: 58 },
  { label: "Apr", Queries: 15900, Actions: 63 },
  { label: "May", Queries: 16800, Actions: 69 },
  { label: "Jun", Queries: 18420, Actions: 74 },
];

export const usageByModule = [
  { module: "Property Intelligence", queries: 4210 },
  { module: "Revenue & Portfolio", queries: 3680 },
  { module: "Leasing Intelligence", queries: 2940 },
  { module: "Marketing Intelligence", queries: 2510 },
  { module: "Investment Intelligence", queries: 1980 },
  { module: "Construction Intelligence", queries: 1640 },
  { module: "Customer Intelligence", queries: 1460 },
];

export const modelBreakdown = [
  { name: "Insight Generation", value: 42, color: "#6c5ce7" },
  { name: "Forecasting", value: 26, color: "#3b82f6" },
  { name: "Natural Language Search", value: 18, color: "#22c55e" },
  { name: "Recommendations", value: 14, color: "#f59e0b" },
];
