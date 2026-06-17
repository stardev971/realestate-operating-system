import type { Insight, Kpi, SatisfactionRow, TimePoint } from "@/lib/types";

export const customerKpis: Kpi[] = [
  { id: "satisfaction", label: "Tenant Satisfaction", value: "4.4 / 5", delta: 2.3, trend: "up", sub: "12,400 responses", metricKey: "Tenant Satisfaction" },
  { id: "nps", label: "NPS Score", value: "52", delta: 4.0, trend: "up", sub: "+6 YoY", metricKey: "NPS Score" },
  { id: "complaints", label: "Open Complaints", value: "68", delta: -12.4, trend: "down", sub: "−9 this month", metricKey: "Open Complaints" },
  { id: "renewal-intent", label: "Renewal Intent", value: "76.8%", delta: 1.9, trend: "up", sub: "survey-based", metricKey: "Renewal Intent" },
];

export const satisfactionTrend: TimePoint[] = [
  { label: "Jan", Satisfaction: 4.2, NPS: 46 },
  { label: "Feb", Satisfaction: 4.2, NPS: 47 },
  { label: "Mar", Satisfaction: 4.3, NPS: 49 },
  { label: "Apr", Satisfaction: 4.3, NPS: 50 },
  { label: "May", Satisfaction: 4.4, NPS: 51 },
  { label: "Jun", Satisfaction: 4.4, NPS: 52 },
];

export const satisfactionBySegment: SatisfactionRow[] = [
  { segment: "Residential", satisfaction: 4.5, nps: 58, complaints: 28, renewalIntent: 79.2 },
  { segment: "Commercial", satisfaction: 4.3, nps: 49, complaints: 19, renewalIntent: 74.6 },
  { segment: "Retail", satisfaction: 4.2, nps: 44, complaints: 12, renewalIntent: 71.8 },
  { segment: "Industrial", satisfaction: 4.6, nps: 61, complaints: 6, renewalIntent: 82.4 },
  { segment: "Hospitality", satisfaction: 4.0, nps: 38, complaints: 18, renewalIntent: 66.1 },
];

export const complaintCategories = [
  { category: "Maintenance Delay", count: 24 },
  { category: "Noise", count: 14 },
  { category: "Billing", count: 12 },
  { category: "Amenities", count: 9 },
  { category: "Parking", count: 6 },
  { category: "Other", count: 3 },
];

export const renewalRisk = [
  { tenant: "Coastal Outfitters", property: "Harbor Point Retail", risk: "High", reason: "Below-market satisfaction + lease expiring", value: 410000 },
  { tenant: "Atlas Freight", property: "Empire Logistics Hub", risk: "Moderate", reason: "Two unresolved complaints", value: 980000 },
  { tenant: "Lumen Studios", property: "Cypress Point Offices", risk: "High", reason: "Renewal intent dropped to 41%", value: 620000 },
  { tenant: "Verde Markets", property: "Galleria Shops", risk: "Moderate", reason: "Pricing sensitivity flagged", value: 540000 },
];

export const customerInsights: Insight[] = [
  { id: "cu1", icon: "trend", text: "NPS climbed to 52 (+6 YoY), led by Industrial and Residential segments.", tone: "positive" },
  { id: "cu2", icon: "warning", text: "Hospitality satisfaction (4.0) lags the portfolio — Coastal Bay drives most complaints.", tone: "warning" },
  { id: "cu3", icon: "sparkles", text: "AI flagged 3 high-value tenants at renewal risk worth $1.6M in annual rent.", tone: "critical" },
];
