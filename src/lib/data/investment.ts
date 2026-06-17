import type { FundRow, Insight, Kpi, TimePoint } from "@/lib/types";
import { palette } from "./company";

export const investmentKpis: Kpi[] = [
  { id: "aum", label: "AUM", value: "$4.2B", delta: 6.4, trend: "up", sub: "across 6 funds", metricKey: "AUM" },
  { id: "irr", label: "Portfolio IRR", value: "18.6%", delta: 1.2, trend: "up", sub: "net, since inception", metricKey: "Portfolio IRR" },
  { id: "equity", label: "Equity Invested", value: "$1.9B", delta: 4.1, trend: "up", sub: "deployed", metricKey: "Equity Invested" },
  { id: "debt", label: "Debt Exposure", value: "$2.3B", delta: 2.0, trend: "flat", sub: "54.8% LTV", metricKey: "Debt Exposure" },
  { id: "projected", label: "Projected Returns", value: "$680M", delta: 9.3, trend: "up", sub: "5-yr forecast", metricKey: "Projected Returns" },
  { id: "yield", label: "Distribution Yield", value: "7.1%", delta: 0.3, trend: "up", sub: "annualized", metricKey: "Distribution Yield" },
];

export const funds: FundRow[] = [
  { fund: "Northstar Core Fund I", strategy: "Core", aum: 1240000000, irr: 14.2, moic: 1.6, dpi: 0.9, status: "Harvesting" },
  { fund: "Northstar Value-Add II", strategy: "Value-Add", aum: 980000000, irr: 21.4, moic: 1.9, dpi: 0.6, status: "Investing" },
  { fund: "Northstar Opportunistic III", strategy: "Opportunistic", aum: 720000000, irr: 26.8, moic: 2.2, dpi: 0.3, status: "Investing" },
  { fund: "Northstar Income Fund", strategy: "Core-Plus", aum: 610000000, irr: 12.6, moic: 1.4, dpi: 1.1, status: "Harvesting" },
  { fund: "Northstar Industrial Partners", strategy: "Sector", aum: 430000000, irr: 23.1, moic: 1.8, dpi: 0.5, status: "Investing" },
  { fund: "Northstar Legacy Fund", strategy: "Core", aum: 220000000, irr: 11.8, moic: 1.7, dpi: 1.7, status: "Fully Realized" },
];

export const irrTrend: TimePoint[] = [
  { label: "2021", IRR: 13.4, Benchmark: 11.0 },
  { label: "2022", IRR: 15.1, Benchmark: 11.8 },
  { label: "2023", IRR: 16.8, Benchmark: 12.4 },
  { label: "2024", IRR: 17.9, Benchmark: 12.9 },
  { label: "2025", IRR: 18.6, Benchmark: 13.2 },
];

export const capitalAllocation = [
  { name: "Residential", value: 1520, color: palette.brand },
  { name: "Commercial", value: 1080, color: palette.blue },
  { name: "Industrial", value: 760, color: palette.green },
  { name: "Retail", value: 480, color: palette.amber },
  { name: "Hospitality", value: 360, color: palette.pink },
];

export const assetRanking = [
  { asset: "Northstar Tower", fund: "Core Fund I", irr: 24.6, value: 290000000 },
  { asset: "Tech Ridge Campus", fund: "Value-Add II", irr: 28.9, value: 198000000 },
  { asset: "Crossroads Fulfillment", fund: "Industrial Partners", irr: 27.4, value: 142000000 },
  { asset: "Park Avenue Suites", fund: "Core Fund I", irr: 16.2, value: 312000000 },
  { asset: "Coastal Bay Resort", fund: "Opportunistic III", irr: 9.1, value: 158000000 },
];

export const investmentInsights: Insight[] = [
  { id: "iv1", icon: "sparkles", text: "Capital deployment opportunity: $180M dry powder in Value-Add II ahead of Sun Belt acquisitions.", tone: "default" },
  { id: "iv2", icon: "building", text: "Acquisition recommendation: industrial assets in DFW show 27%+ IRR potential.", tone: "positive" },
  { id: "iv3", icon: "warning", text: "Diversification score is 78/100 — hospitality concentration slightly elevated.", tone: "warning" },
];
