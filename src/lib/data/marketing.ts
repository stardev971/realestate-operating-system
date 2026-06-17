import type {
  CampaignRow,
  ChannelRow,
  Insight,
  Kpi,
  TimePoint,
} from "@/lib/types";
import { palette } from "./company";

export const marketingKpis: Kpi[] = [
  { id: "leads", label: "Leads Generated", value: "1,842", delta: 11.4, trend: "up", sub: "this month", metricKey: "Leads Generated" },
  { id: "cpl", label: "Cost Per Lead", value: "$48", delta: -6.3, trend: "down", sub: "blended", metricKey: "Cost Per Lead" },
  { id: "cpa", label: "Cost Per Acquisition", value: "$1,030", delta: -4.1, trend: "down", sub: "per close", metricKey: "Cost Per Acquisition" },
  { id: "roi", label: "Campaign ROI", value: "4.2x", delta: 8.9, trend: "up", sub: "blended", metricKey: "Campaign ROI" },
  { id: "traffic", label: "Website Traffic", value: "284K", delta: 9.6, trend: "up", sub: "monthly visits", metricKey: "Website Traffic" },
  { id: "tour-bookings", label: "Tour Bookings", value: "312", delta: 6.2, trend: "up", sub: "this month", metricKey: "Tour Bookings" },
];

export const channels: ChannelRow[] = [
  { channel: "Google Ads", spend: 31200, leads: 486, tours: 92, roi: 4.8, color: palette.blue },
  { channel: "Meta Ads", spend: 24800, leads: 412, tours: 71, roi: 4.1, color: palette.brand },
  { channel: "Zillow", spend: 18600, leads: 358, tours: 64, roi: 5.2, color: palette.green },
  { channel: "LinkedIn", spend: 14200, leads: 168, tours: 38, roi: 3.4, color: palette.cyan },
  { channel: "Realtor.com", spend: 11900, leads: 224, tours: 31, roi: 4.6, color: palette.amber },
  { channel: "Apartments.com", spend: 9400, leads: 194, tours: 16, roi: 4.0, color: palette.pink },
];

export const campaigns: CampaignRow[] = [
  { campaign: "Highland Park Launch", channel: "Google Ads", spend: 18400, leads: 286, cpl: 64, roi: 5.4, status: "Active" },
  { campaign: "Austin Multifamily Q2", channel: "Meta Ads", spend: 14200, leads: 241, cpl: 59, roi: 4.6, status: "Active" },
  { campaign: "Commercial Lease Retarget", channel: "LinkedIn", spend: 9800, leads: 118, cpl: 83, roi: 3.2, status: "Active" },
  { campaign: "Coastal Bay Recovery", channel: "Zillow", spend: 7600, leads: 164, cpl: 46, roi: 5.1, status: "Active" },
  { campaign: "Brand Awareness", channel: "Meta Ads", spend: 6200, leads: 88, cpl: 70, roi: 2.4, status: "Paused" },
  { campaign: "Industrial Vacancy Push", channel: "Realtor.com", spend: 5400, leads: 96, cpl: 56, roi: 4.3, status: "Active" },
];

export const leadSources = [
  { name: "Paid Search", value: 486, color: palette.blue },
  { name: "Paid Social", value: 500, color: palette.brand },
  { name: "Listing Sites", value: 776, color: palette.green },
  { name: "Organic", value: 218, color: palette.amber },
  { name: "Referral", value: 162, color: palette.pink },
];

export const marketingTrend: TimePoint[] = [
  { label: "Jan", Spend: 92, Leads: 1480 },
  { label: "Feb", Spend: 96, Leads: 1560 },
  { label: "Mar", Spend: 101, Leads: 1610 },
  { label: "Apr", Spend: 104, Leads: 1705 },
  { label: "May", Spend: 108, Leads: 1760 },
  { label: "Jun", Spend: 110, Leads: 1842 },
];

export const marketingInsights: Insight[] = [
  { id: "m1", icon: "megaphone", text: "Zillow delivers the lowest cost-per-lead ($52) and highest ROI (5.2x) — shift budget here.", tone: "positive" },
  { id: "m2", icon: "sparkles", text: "AI recommends reallocating $8K from Brand Awareness to Highland Park Launch.", tone: "default" },
  { id: "m3", icon: "warning", text: "LinkedIn CPL rose 14% MoM; creative refresh recommended.", tone: "warning" },
];
