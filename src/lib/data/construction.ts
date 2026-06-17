import type {
  ConstructionProject,
  Insight,
  Kpi,
  TimePoint,
} from "@/lib/types";

export const constructionKpis: Kpi[] = [
  { id: "active-projects", label: "Active Projects", value: "18", delta: 2.0, trend: "up", sub: "$410M exposure", metricKey: "Active Projects" },
  { id: "budget-util", label: "Budget Utilization", value: "82.4%", delta: 3.1, trend: "up", sub: "of approved", metricKey: "Budget Utilization" },
  { id: "delayed", label: "Delayed Projects", value: "3", delta: 1.0, trend: "up", sub: "of 18 active", metricKey: "Delayed Projects" },
  { id: "completion", label: "Completion Forecast", value: "94%", delta: -1.2, trend: "down", sub: "on-time rate", metricKey: "Completion Forecast" },
];

export const projects: ConstructionProject[] = [
  { name: "Highland Park Phase II", location: "Dallas, TX", budget: 84000000, spent: 61200000, percentComplete: 73, status: "On Track", delayDays: 0, completion: "Q1 2027" },
  { name: "Riverside Logistics Park", location: "Phoenix, AZ", budget: 52000000, spent: 44800000, percentComplete: 86, status: "Delayed", delayDays: 14, completion: "Q4 2026" },
  { name: "Aurora Heights Tower", location: "Denver, CO", budget: 67000000, spent: 38900000, percentComplete: 58, status: "On Track", delayDays: 0, completion: "Q3 2027" },
  { name: "Seaside Promenade Expansion", location: "San Diego, CA", budget: 41000000, spent: 36100000, percentComplete: 88, status: "At Risk", delayDays: 6, completion: "Q3 2026" },
  { name: "Metro Center Renovation", location: "Atlanta, GA", budget: 28000000, spent: 14200000, percentComplete: 51, status: "On Track", delayDays: 0, completion: "Q2 2027" },
  { name: "Quantum Logistics Hub", location: "Reno, NV", budget: 38000000, spent: 35900000, percentComplete: 94, status: "On Track", delayDays: 0, completion: "Q3 2026" },
  { name: "Heritage Place Build-Out", location: "Nashville, TN", budget: 22000000, spent: 9800000, percentComplete: 44, status: "Delayed", delayDays: 21, completion: "Q4 2027" },
  { name: "Union Station Retrofit", location: "Denver, CO", budget: 31000000, spent: 28400000, percentComplete: 91, status: "On Track", delayDays: 0, completion: "Q3 2026" },
];

export const budgetVsActual: TimePoint[] = [
  { label: "Q1", Budget: 96, Actual: 92 },
  { label: "Q2", Budget: 104, Actual: 108 },
  { label: "Q3", Budget: 112, Actual: 116 },
  { label: "Q4", Budget: 98, Actual: 101 },
];

export const contractorPerformance = [
  { contractor: "Summit Builders", projects: 5, onTime: 96, budgetVariance: -1.2, rating: 4.8 },
  { contractor: "Cornerstone Construction", projects: 4, onTime: 88, budgetVariance: 3.4, rating: 4.4 },
  { contractor: "Vanguard Contractors", projects: 3, onTime: 74, budgetVariance: 8.1, rating: 3.9 },
  { contractor: "Pinnacle Group", projects: 3, onTime: 92, budgetVariance: 1.0, rating: 4.6 },
  { contractor: "Ironclad Developments", projects: 3, onTime: 81, budgetVariance: 5.2, rating: 4.1 },
];

export const constructionInsights: Insight[] = [
  { id: "c1", icon: "warning", text: "Heritage Place Build-Out is 21 days behind schedule — escalate with Vanguard Contractors.", tone: "critical" },
  { id: "c2", icon: "trend", text: "Quantum Logistics Hub tracking 2% under budget and ahead of schedule.", tone: "positive" },
  { id: "c3", icon: "sparkles", text: "AI forecasts a 94% on-time completion rate for the active pipeline.", tone: "default" },
];
