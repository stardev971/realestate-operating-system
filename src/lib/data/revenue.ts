import type { Kpi, RegionRow, TimePoint } from "@/lib/types";
import { palette } from "./company";

export const revenueKpis: Kpi[] = [
  { id: "gross-revenue", label: "Gross Revenue", value: "$312M", delta: 9.1, trend: "up", sub: "trailing 12mo", metricKey: "Annual Revenue" },
  { id: "noi", label: "NOI", value: "$178M", delta: 7.2, trend: "up", sub: "57.1% margin", metricKey: "NOI" },
  { id: "opex", label: "Operating Expenses", value: "$134M", delta: 4.6, trend: "up", sub: "42.9% of rev", metricKey: "Operating Expenses" },
  { id: "debt-service", label: "Debt Service", value: "$61M", delta: 2.1, trend: "flat", sub: "1.92x DSCR", metricKey: "Debt Service" },
  { id: "ebitda", label: "EBITDA", value: "$169M", delta: 8.4, trend: "up", sub: "54.2% margin", metricKey: "EBITDA" },
  { id: "cash-flow", label: "Cash Flow", value: "$117M", delta: 6.8, trend: "up", sub: "levered FCF", metricKey: "Cash Flow" },
  { id: "rev-per-property", label: "Revenue / Property", value: "$2.5M", delta: 3.3, trend: "up", sub: "avg annual", metricKey: "Revenue per Property" },
  { id: "rev-per-sqft", label: "Revenue / Sq Ft", value: "$28.40", delta: 4.1, trend: "up", sub: "blended", metricKey: "Revenue per Sq Ft" },
];

export const revenueVsExpense: TimePoint[] = [
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

export const revenueByRegion: RegionRow[] = [
  { region: "Texas", properties: 28, revenue: 84200000, noi: 49800000, occupancy: 95.1 },
  { region: "California", properties: 19, revenue: 71600000, noi: 39200000, occupancy: 93.4 },
  { region: "Florida", properties: 16, revenue: 48300000, noi: 24100000, occupancy: 88.9 },
  { region: "New York", properties: 11, revenue: 53900000, noi: 31300000, occupancy: 91.0 },
  { region: "Georgia", properties: 9, revenue: 24600000, noi: 12700000, occupancy: 89.5 },
  { region: "Colorado", properties: 6, revenue: 19400000, noi: 11200000, occupancy: 94.4 },
  { region: "Arizona", properties: 8, revenue: 21100000, noi: 12300000, occupancy: 95.0 },
  { region: "North Carolina", properties: 6, revenue: 16800000, noi: 9300000, occupancy: 94.2 },
];

export const revenueByType = [
  { name: "Residential", value: 132, color: palette.brand },
  { name: "Commercial", value: 88, color: palette.blue },
  { name: "Retail", value: 41, color: palette.amber },
  { name: "Industrial", value: 36, color: palette.green },
  { name: "Hospitality", value: 15, color: palette.pink },
];

export const capRateByType = [
  { type: "Residential", capRate: 5.2 },
  { type: "Commercial", capRate: 6.3 },
  { type: "Retail", capRate: 6.8 },
  { type: "Industrial", capRate: 5.9 },
  { type: "Hospitality", capRate: 7.6 },
];

export const expenseBreakdown = [
  { name: "Property Operations", value: 41, color: palette.brand },
  { name: "Property Taxes", value: 28, color: palette.blue },
  { name: "Insurance", value: 14, color: palette.cyan },
  { name: "Management Fees", value: 19, color: palette.amber },
  { name: "Repairs & Maintenance", value: 22, color: palette.green },
  { name: "Utilities", value: 10, color: palette.pink },
];
