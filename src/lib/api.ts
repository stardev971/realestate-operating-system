/**
 * Data-access layer. Today every function resolves a static demo dataset.
 * To connect a real backend, replace each body with a `fetch()` call that
 * returns the same shape — the hooks, components, and pages stay unchanged.
 */
import {
  executiveKpis,
  executiveInsights,
  portfolioTrend,
  revenueBreakdown,
  geoDistribution,
  occupancyTrend,
} from "./data/company";
import {
  revenueKpis,
  revenueVsExpense,
  revenueByRegion,
  revenueByType,
  capRateByType,
  expenseBreakdown,
} from "./data/revenue";
import {
  salesKpis,
  salesFunnel,
  salesTrend,
  topProjects,
  topAgents,
  salesByRegion,
  salesInsights,
} from "./data/sales";
import {
  leasingKpis,
  leaseExpiration,
  renewalTrend,
  rentRoll,
  renewalOpportunities,
} from "./data/leasing";
import { properties, portfolioComposition } from "./data/properties";
import {
  marketingKpis,
  channels,
  campaigns,
  leadSources,
  marketingTrend,
  marketingInsights,
} from "./data/marketing";
import {
  investmentKpis,
  funds,
  irrTrend,
  capitalAllocation,
  assetRanking,
  investmentInsights,
} from "./data/investment";
import {
  operationsKpis,
  workOrders,
  vendors,
  workOrderTrend,
} from "./data/operations";
import {
  constructionKpis,
  projects,
  budgetVsActual,
  contractorPerformance,
  constructionInsights,
} from "./data/construction";
import {
  customerKpis,
  satisfactionTrend,
  satisfactionBySegment,
  complaintCategories,
  renewalRisk,
  customerInsights,
} from "./data/customer";
import {
  connectedIntegrations,
  integrationCatalog,
  integrationStats,
} from "./data/integrations";
import { aiActions, aiActionStats } from "./data/aiActions";
import { reports } from "./data/reports";
import { alerts, alertStats } from "./data/alerts";
import {
  aiUsageKpis,
  aiUsageTrend,
  usageByModule,
  modelBreakdown,
} from "./data/aiUsage";
import { dataDictionary } from "./data/dataDictionary";
import { searchIndex, type SearchEntity } from "./data/search";

/**
 * Composed datasets, keyed by module. Exported so hooks can use them as
 * React Query `initialData` (avoids a loading flash for the static demo).
 */
export const datasets = {
  executive: {
    kpis: executiveKpis,
    insights: executiveInsights,
    trend: portfolioTrend,
    breakdown: revenueBreakdown,
    geo: geoDistribution,
    occupancy: occupancyTrend,
  },
  revenue: {
    kpis: revenueKpis,
    trend: revenueVsExpense,
    byRegion: revenueByRegion,
    byType: revenueByType,
    capRate: capRateByType,
    expenses: expenseBreakdown,
  },
  sales: {
    kpis: salesKpis,
    funnel: salesFunnel,
    trend: salesTrend,
    projects: topProjects,
    agents: topAgents,
    regions: salesByRegion,
    insights: salesInsights,
  },
  leasing: {
    kpis: leasingKpis,
    expiration: leaseExpiration,
    renewalTrend,
    rentRoll,
    opportunities: renewalOpportunities,
  },
  property: {
    properties,
    composition: portfolioComposition,
  },
  marketing: {
    kpis: marketingKpis,
    channels,
    campaigns,
    leadSources,
    trend: marketingTrend,
    insights: marketingInsights,
  },
  investment: {
    kpis: investmentKpis,
    funds,
    irrTrend,
    allocation: capitalAllocation,
    ranking: assetRanking,
    insights: investmentInsights,
  },
  operations: {
    kpis: operationsKpis,
    workOrders,
    vendors,
    trend: workOrderTrend,
  },
  construction: {
    kpis: constructionKpis,
    projects,
    budget: budgetVsActual,
    contractors: contractorPerformance,
    insights: constructionInsights,
  },
  customer: {
    kpis: customerKpis,
    trend: satisfactionTrend,
    segments: satisfactionBySegment,
    complaints: complaintCategories,
    risk: renewalRisk,
    insights: customerInsights,
  },
  integrations: {
    connected: connectedIntegrations,
    catalog: integrationCatalog,
    stats: integrationStats,
  },
  aiActions: { actions: aiActions, stats: aiActionStats },
  reports: { reports },
  alerts: { alerts, stats: alertStats },
  aiUsage: {
    kpis: aiUsageKpis,
    trend: aiUsageTrend,
    byModule: usageByModule,
    models: modelBreakdown,
  },
  dataDictionary: { metrics: dataDictionary },
};

const resolve = <T>(data: T): Promise<T> =>
  new Promise((res) => setTimeout(() => res(data), 0));

export const api = {
  executive: () => resolve(datasets.executive),
  revenue: () => resolve(datasets.revenue),
  sales: () => resolve(datasets.sales),
  leasing: () => resolve(datasets.leasing),
  property: () => resolve(datasets.property),
  marketing: () => resolve(datasets.marketing),
  investment: () => resolve(datasets.investment),
  operations: () => resolve(datasets.operations),
  construction: () => resolve(datasets.construction),
  customer: () => resolve(datasets.customer),
  integrations: () => resolve(datasets.integrations),
  aiActions: () => resolve(datasets.aiActions),
  reports: () => resolve(datasets.reports),
  alerts: () => resolve(datasets.alerts),
  aiUsage: () => resolve(datasets.aiUsage),
  dataDictionary: () => resolve(datasets.dataDictionary),
};

/** Lightweight client-side search over the demo index. */
export function searchEntities(query: string): SearchEntity[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex
    .filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.subtitle.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q)
    )
    .slice(0, 8);
}
