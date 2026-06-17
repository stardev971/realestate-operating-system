import type {
  AgentRow,
  FunnelStage,
  Insight,
  Kpi,
  ProjectRow,
  RegionRow,
  TimePoint,
} from "@/lib/types";

export const salesKpis: Kpi[] = [
  { id: "new-leads", label: "New Leads", value: "1,842", delta: 11.4, trend: "up", sub: "this month", metricKey: "New Leads" },
  { id: "qualified-leads", label: "Qualified Leads", value: "624", delta: 8.7, trend: "up", sub: "33.9% of new", metricKey: "Qualified Leads" },
  { id: "tours", label: "Tours Scheduled", value: "312", delta: 6.2, trend: "up", sub: "this month", metricKey: "Tours Scheduled" },
  { id: "deals-closed", label: "Deals Closed", value: "86", delta: 14.1, trend: "up", sub: "this month", metricKey: "Deals Closed" },
  { id: "conversion", label: "Sales Conversion", value: "13.8%", delta: 1.9, trend: "up", sub: "lead → close", metricKey: "Sales Conversion Rate" },
  { id: "avg-deal", label: "Avg Deal Value", value: "$1.24M", delta: 3.6, trend: "up", sub: "blended", metricKey: "Avg Deal Value" },
  { id: "pipeline", label: "Sales Pipeline", value: "$860M", delta: 12.3, trend: "up", sub: "weighted", metricKey: "Pipeline Value" },
];

export const salesFunnel: FunnelStage[] = [
  { stage: "Lead", value: 1842 },
  { stage: "Qualified", value: 624 },
  { stage: "Tour", value: 312 },
  { stage: "Proposal", value: 184 },
  { stage: "Negotiation", value: 112 },
  { stage: "Closed", value: 86 },
];

export const salesTrend: TimePoint[] = [
  { label: "Jan", Leads: 1480, Closed: 64 },
  { label: "Feb", Leads: 1560, Closed: 69 },
  { label: "Mar", Leads: 1610, Closed: 72 },
  { label: "Apr", Leads: 1705, Closed: 77 },
  { label: "May", Leads: 1760, Closed: 81 },
  { label: "Jun", Leads: 1842, Closed: 86 },
];

export const topProjects: ProjectRow[] = [
  { project: "Highland Park Towers", location: "Dallas, TX", leads: 312, closed: 28, revenue: 34600000 },
  { project: "Maple Grove Residences", location: "Austin, TX", leads: 268, closed: 22, revenue: 26800000 },
  { project: "The Marlowe", location: "Los Angeles, CA", leads: 241, closed: 19, revenue: 31200000 },
  { project: "Aurora Heights", location: "Denver, CO", leads: 198, closed: 16, revenue: 18400000 },
  { project: "Magnolia Gardens", location: "Charlotte, NC", leads: 176, closed: 14, revenue: 15900000 },
];

export const topAgents: AgentRow[] = [
  { name: "Marcus Bell", region: "Texas", deals: 18, volume: 22400000, conversion: 21.3 },
  { name: "Sofia Nguyen", region: "California", deals: 15, volume: 24800000, conversion: 19.6 },
  { name: "Daniel Pierce", region: "Florida", deals: 13, volume: 16200000, conversion: 18.1 },
  { name: "Priya Anand", region: "Colorado", deals: 11, volume: 12900000, conversion: 17.8 },
  { name: "James Carter", region: "Georgia", deals: 9, volume: 9800000, conversion: 15.4 },
];

export const salesByRegion: RegionRow[] = [
  { region: "Texas", properties: 28, revenue: 61200000, noi: 0, occupancy: 0 },
  { region: "California", properties: 19, revenue: 55800000, noi: 0, occupancy: 0 },
  { region: "Florida", properties: 16, revenue: 33400000, noi: 0, occupancy: 0 },
  { region: "Colorado", properties: 6, revenue: 21900000, noi: 0, occupancy: 0 },
  { region: "Georgia", properties: 9, revenue: 18600000, noi: 0, occupancy: 0 },
];

export const salesInsights: Insight[] = [
  { id: "s1", icon: "trend", text: "Lead quality is up 8.7% — qualified-lead share reached a 12-month high.", tone: "positive" },
  { id: "s2", icon: "sparkles", text: "AI predicts Austin demand to rise 18% next quarter; prioritize Maple Grove inventory.", tone: "default" },
  { id: "s3", icon: "warning", text: "Bottleneck detected: proposal → negotiation conversion dropped to 61%.", tone: "warning" },
];
