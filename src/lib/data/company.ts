import type {
  BreakdownSlice,
  Insight,
  Kpi,
  TimePoint,
} from "@/lib/types";

export const company = {
  name: "Northstar Real Estate Group",
  shortName: "Northstar",
  tagline: "Real Estate Operating System",
  portfolioValue: "$4.2B",
  properties: 125,
  states: 14,
  user: {
    name: "Alexandra Reed",
    title: "Chief Executive Officer",
    initials: "AR",
  },
};

export const palette = {
  brand: "#6c5ce7",
  brandSoft: "#8b7cff",
  green: "#22c55e",
  greenSoft: "#4ade80",
  amber: "#f59e0b",
  red: "#ef4444",
  blue: "#3b82f6",
  cyan: "#06b6d4",
  pink: "#ec4899",
  slate: "#64748b",
};

/** Executive Overview — top KPI cards. */
export const executiveKpis: Kpi[] = [
  {
    id: "portfolio-value",
    label: "Portfolio Value",
    value: "$4.2B",
    delta: 6.4,
    trend: "up",
    sub: "125 assets",
    metricKey: "Portfolio Value",
  },
  {
    id: "annual-revenue",
    label: "Annual Revenue",
    value: "$312M",
    delta: 9.1,
    trend: "up",
    sub: "rental + sales",
    metricKey: "Annual Revenue",
  },
  {
    id: "noi",
    label: "Net Operating Income",
    value: "$178M",
    delta: 7.2,
    trend: "up",
    sub: "57.1% margin",
    metricKey: "NOI",
  },
  {
    id: "occupancy",
    label: "Occupancy Rate",
    value: "94.2%",
    delta: 3.8,
    trend: "up",
    sub: "QoQ",
    metricKey: "Occupancy Rate",
  },
  {
    id: "leasing-velocity",
    label: "Leasing Velocity",
    value: "128",
    delta: 4.5,
    trend: "up",
    sub: "units / month",
    metricKey: "Leasing Velocity",
  },
  {
    id: "pipeline-value",
    label: "Pipeline Value",
    value: "$860M",
    delta: 12.3,
    trend: "up",
    sub: "weighted",
    metricKey: "Pipeline Value",
  },
  {
    id: "cash-position",
    label: "Cash Position",
    value: "$72M",
    delta: -2.1,
    trend: "down",
    sub: "available",
    metricKey: "Cash Position",
  },
  {
    id: "construction-exposure",
    label: "Construction Exposure",
    value: "$410M",
    delta: 1.4,
    trend: "flat",
    sub: "18 active projects",
    metricKey: "Construction Exposure",
  },
];

export const executiveInsights: Insight[] = [
  {
    id: "i1",
    icon: "trend",
    text: "Occupancy increased 3.8% quarter-over-quarter across the portfolio.",
    tone: "positive",
  },
  {
    id: "i2",
    icon: "building",
    text: "Dallas portfolio generating the highest NOI growth at +14.2%.",
    tone: "positive",
  },
  {
    id: "i3",
    icon: "warning",
    text: "32 units expected to become vacant within 45 days.",
    tone: "warning",
  },
  {
    id: "i4",
    icon: "warning",
    text: "Riverside Logistics Park construction delayed by 14 days.",
    tone: "warning",
  },
  {
    id: "i5",
    icon: "megaphone",
    text: "Marketing spend generated 418 qualified leads this month.",
    tone: "default",
  },
  {
    id: "i6",
    icon: "sparkles",
    text: "AI detected an underperforming asset requiring executive review.",
    tone: "critical",
  },
];

/** Portfolio Performance Trend — Revenue vs NOI vs Expenses (monthly, $M). */
export const portfolioTrend: TimePoint[] = [
  { label: "Jul", Revenue: 23.8, NOI: 13.1, Expenses: 10.7 },
  { label: "Aug", Revenue: 24.6, NOI: 13.6, Expenses: 11.0 },
  { label: "Sep", Revenue: 25.1, NOI: 14.2, Expenses: 10.9 },
  { label: "Oct", Revenue: 25.9, NOI: 14.6, Expenses: 11.3 },
  { label: "Nov", Revenue: 26.4, NOI: 15.1, Expenses: 11.3 },
  { label: "Dec", Revenue: 27.8, NOI: 16.0, Expenses: 11.8 },
  { label: "Jan", Revenue: 26.9, NOI: 15.4, Expenses: 11.5 },
  { label: "Feb", Revenue: 27.3, NOI: 15.7, Expenses: 11.6 },
  { label: "Mar", Revenue: 28.6, NOI: 16.5, Expenses: 12.1 },
  { label: "Apr", Revenue: 29.2, NOI: 16.9, Expenses: 12.3 },
  { label: "May", Revenue: 30.1, NOI: 17.4, Expenses: 12.7 },
  { label: "Jun", Revenue: 31.0, NOI: 18.0, Expenses: 13.0 },
];

export const revenueBreakdown: BreakdownSlice[] = [
  { name: "Residential", value: 132, color: palette.brand },
  { name: "Commercial", value: 88, color: palette.blue },
  { name: "Retail", value: 41, color: palette.amber },
  { name: "Industrial", value: 36, color: palette.green },
  { name: "Hospitality", value: 15, color: palette.pink },
];

export interface GeoState {
  state: string;
  code: string;
  properties: number;
  value: number; // $M portfolio value
  occupancy: number;
  x: number; // approx % position on a simplified US map
  y: number;
}

export const geoDistribution: GeoState[] = [
  { state: "Texas", code: "TX", properties: 28, value: 940, occupancy: 95.1, x: 47, y: 73 },
  { state: "California", code: "CA", properties: 19, value: 820, occupancy: 93.4, x: 12, y: 52 },
  { state: "Florida", code: "FL", properties: 16, value: 560, occupancy: 96.0, x: 78, y: 82 },
  { state: "New York", code: "NY", properties: 11, value: 480, occupancy: 92.2, x: 82, y: 33 },
  { state: "Georgia", code: "GA", properties: 9, value: 295, occupancy: 94.5, x: 73, y: 66 },
  { state: "Arizona", code: "AZ", properties: 8, value: 240, occupancy: 93.8, x: 22, y: 66 },
  { state: "Illinois", code: "IL", properties: 7, value: 230, occupancy: 91.6, x: 60, y: 42 },
  { state: "Colorado", code: "CO", properties: 6, value: 205, occupancy: 95.3, x: 37, y: 50 },
  { state: "North Carolina", code: "NC", properties: 6, value: 180, occupancy: 94.9, x: 77, y: 56 },
  { state: "Washington", code: "WA", properties: 5, value: 175, occupancy: 92.9, x: 15, y: 18 },
  { state: "Nevada", code: "NV", properties: 4, value: 120, occupancy: 90.8, x: 18, y: 50 },
  { state: "Tennessee", code: "TN", properties: 3, value: 95, occupancy: 95.6, x: 66, y: 58 },
  { state: "Ohio", code: "OH", properties: 2, value: 60, occupancy: 91.2, x: 70, y: 42 },
  { state: "Oregon", code: "OR", properties: 1, value: 30, occupancy: 93.0, x: 13, y: 28 },
];

export const occupancyTrend: TimePoint[] = [
  { label: "Jul", Occupancy: 90.4 },
  { label: "Aug", Occupancy: 90.9 },
  { label: "Sep", Occupancy: 91.3 },
  { label: "Oct", Occupancy: 91.8 },
  { label: "Nov", Occupancy: 92.0 },
  { label: "Dec", Occupancy: 92.6 },
  { label: "Jan", Occupancy: 92.4 },
  { label: "Feb", Occupancy: 92.9 },
  { label: "Mar", Occupancy: 93.3 },
  { label: "Apr", Occupancy: 93.7 },
  { label: "May", Occupancy: 94.0 },
  { label: "Jun", Occupancy: 94.2 },
];
