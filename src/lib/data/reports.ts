import type { ReportItem } from "@/lib/types";

export const reports: ReportItem[] = [
  { id: "r1", name: "CEO Weekly Summary", description: "One-page executive digest of portfolio health, revenue, and key risks.", cadence: "Weekly", updated: "2 hours ago", icon: "sparkles" },
  { id: "r2", name: "Portfolio Performance Report", description: "Revenue, NOI, occupancy, and cap rates across all assets and regions.", cadence: "Monthly", updated: "Yesterday", icon: "trend" },
  { id: "r3", name: "Leasing Report", description: "Renewals, expirations, vacancy forecast, and rent collection detail.", cadence: "Monthly", updated: "3 days ago", icon: "building" },
  { id: "r4", name: "Occupancy Report", description: "Occupancy trends and vacancy projections by property and segment.", cadence: "Weekly", updated: "1 day ago", icon: "building" },
  { id: "r5", name: "Revenue Report", description: "Gross revenue, NOI, EBITDA, and cash flow with variance analysis.", cadence: "Monthly", updated: "Yesterday", icon: "dollar" },
  { id: "r6", name: "Asset Health Report", description: "Asset scores, risk levels, and intervention recommendations.", cadence: "Quarterly", updated: "1 week ago", icon: "warning" },
  { id: "r7", name: "Construction Status Report", description: "Budget vs actual, schedule tracking, and contractor performance.", cadence: "Bi-weekly", updated: "4 days ago", icon: "warning" },
  { id: "r8", name: "Investor Report", description: "Fund performance, IRR, distributions, and capital allocation for LPs.", cadence: "Quarterly", updated: "2 weeks ago", icon: "dollar" },
  { id: "r9", name: "Marketing Performance Report", description: "Channel attribution, CPL, ROI, and campaign-level results.", cadence: "Monthly", updated: "Yesterday", icon: "mail" },
];
