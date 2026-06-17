import type {
  Kpi,
  LeaseExpiry,
  RentRollRow,
  TimePoint,
} from "@/lib/types";

export const leasingKpis: Kpi[] = [
  { id: "active-leases", label: "Active Leases", value: "8,642", delta: 2.4, trend: "up", sub: "across portfolio", metricKey: "Active Leases" },
  { id: "renewals", label: "Lease Renewals", value: "412", delta: 5.1, trend: "up", sub: "this quarter", metricKey: "Lease Renewals" },
  { id: "expiring", label: "Expiring Leases", value: "286", delta: -3.2, trend: "down", sub: "next 90 days", metricKey: "Expiring Leases" },
  { id: "vacancy-forecast", label: "Vacancy Forecast", value: "5.8%", delta: -0.6, trend: "down", sub: "45-day", metricKey: "Vacancy Forecast" },
  { id: "renewal-rate", label: "Renewal Rate", value: "73.4%", delta: 2.8, trend: "up", sub: "trailing 12mo", metricKey: "Renewal Rate" },
  { id: "collection-rate", label: "Rent Collection", value: "97.9%", delta: 0.4, trend: "up", sub: "on-time", metricKey: "Rent Collection Rate" },
];

export const leaseExpiration: LeaseExpiry[] = [
  { month: "Jul", leases: 64, sqft: 142000, atRiskRent: 1840000 },
  { month: "Aug", leases: 78, sqft: 168000, atRiskRent: 2120000 },
  { month: "Sep", leases: 92, sqft: 201000, atRiskRent: 2680000 },
  { month: "Oct", leases: 71, sqft: 156000, atRiskRent: 1990000 },
  { month: "Nov", leases: 58, sqft: 121000, atRiskRent: 1540000 },
  { month: "Dec", leases: 86, sqft: 188000, atRiskRent: 2410000 },
  { month: "Jan", leases: 102, sqft: 224000, atRiskRent: 2960000 },
  { month: "Feb", leases: 67, sqft: 139000, atRiskRent: 1820000 },
];

export const renewalTrend: TimePoint[] = [
  { label: "Q1", Renewals: 71.2, Vacancy: 6.8 },
  { label: "Q2", Renewals: 72.0, Vacancy: 6.4 },
  { label: "Q3", Renewals: 72.6, Vacancy: 6.1 },
  { label: "Q4", Renewals: 73.4, Vacancy: 5.8 },
];

export const rentRoll: RentRollRow[] = [
  { property: "Northstar Tower", units: 420, leased: 405, monthlyRent: 2360000, collected: 98.6, delinquent: 31000 },
  { property: "Beacon Hill Residences", units: 312, leased: 305, monthlyRent: 1180000, collected: 99.1, delinquent: 11000 },
  { property: "The Marlowe", units: 280, leased: 265, monthlyRent: 1650000, collected: 97.4, delinquent: 42000 },
  { property: "Park Avenue Suites", units: 340, leased: 308, monthlyRent: 2600000, collected: 96.8, delinquent: 84000 },
  { property: "Highland Park Towers", units: 268, leased: 263, monthlyRent: 1440000, collected: 99.3, delinquent: 9000 },
  { property: "Lakeshore Lofts", units: 198, leased: 182, monthlyRent: 968000, collected: 95.9, delinquent: 39000 },
  { property: "Willow Creek Apartments", units: 224, leased: 209, monthlyRent: 1366000, collected: 97.8, delinquent: 28000 },
  { property: "Magnolia Gardens", units: 256, leased: 248, monthlyRent: 1008000, collected: 98.9, delinquent: 11000 },
];

export const renewalOpportunities = [
  { tenant: "Apex Legal Group", property: "Northstar Tower", expires: "Aug 2026", sqft: 24000, annualRent: 1080000, intent: "High" },
  { tenant: "Brightwave Media", property: "Tech Ridge Campus", expires: "Sep 2026", sqft: 18500, annualRent: 740000, intent: "Medium" },
  { tenant: "Coastal Outfitters", property: "Harbor Point Retail", expires: "Jul 2026", sqft: 9200, annualRent: 410000, intent: "Low" },
  { tenant: "Meridian Health", property: "Gateway Office Plaza", expires: "Oct 2026", sqft: 31000, annualRent: 1240000, intent: "High" },
  { tenant: "Summit Robotics", property: "Riverside Logistics Park", expires: "Nov 2026", sqft: 56000, annualRent: 1680000, intent: "High" },
];
