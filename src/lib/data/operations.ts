import type { Kpi, TimePoint, VendorRow, WorkOrderRow } from "@/lib/types";

export const operationsKpis: Kpi[] = [
  { id: "open-wo", label: "Open Work Orders", value: "342", delta: -8.4, trend: "down", sub: "across portfolio", metricKey: "Open Work Orders" },
  { id: "resolution", label: "Avg Resolution Time", value: "18.4h", delta: -5.1, trend: "down", sub: "median 11h", metricKey: "Avg Resolution Time" },
  { id: "vendor-spend", label: "Vendor Spend", value: "$3.8M", delta: 3.2, trend: "up", sub: "this quarter", metricKey: "Vendor Spend" },
  { id: "maint-cost", label: "Maintenance Cost", value: "$1.42 /sf", delta: -2.0, trend: "down", sub: "annualized", metricKey: "Maintenance Cost" },
];

export const workOrders: WorkOrderRow[] = [
  { category: "HVAC", open: 86, avgResolution: 22.1, slaCompliance: 91.2 },
  { category: "Plumbing", open: 74, avgResolution: 16.4, slaCompliance: 94.6 },
  { category: "Electrical", open: 52, avgResolution: 19.8, slaCompliance: 92.0 },
  { category: "Appliance", open: 48, avgResolution: 14.2, slaCompliance: 96.1 },
  { category: "General", open: 82, avgResolution: 12.6, slaCompliance: 97.4 },
];

export const vendors: VendorRow[] = [
  { vendor: "Apex Mechanical", category: "HVAC", spend: 642000, rating: 4.7, onTime: 94.2 },
  { vendor: "ProFlow Plumbing", category: "Plumbing", spend: 418000, rating: 4.5, onTime: 96.0 },
  { vendor: "BrightSpark Electric", category: "Electrical", spend: 386000, rating: 4.3, onTime: 90.4 },
  { vendor: "GreenScape Grounds", category: "Landscaping", spend: 294000, rating: 4.8, onTime: 98.1 },
  { vendor: "ClearView Janitorial", category: "Janitorial", spend: 268000, rating: 4.1, onTime: 92.8 },
  { vendor: "SecureGuard Systems", category: "Security", spend: 312000, rating: 4.6, onTime: 95.3 },
];

export const workOrderTrend: TimePoint[] = [
  { label: "Jan", Opened: 412, Closed: 398 },
  { label: "Feb", Opened: 388, Closed: 401 },
  { label: "Mar", Opened: 401, Closed: 412 },
  { label: "Apr", Opened: 376, Closed: 389 },
  { label: "May", Opened: 362, Closed: 384 },
  { label: "Jun", Opened: 348, Closed: 371 },
];
