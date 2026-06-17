"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, datasets } from "./api";
import { useDateRange } from "./dateRange";
import { applyRange } from "./scale";

/**
 * React Query hooks. Each provides `initialData` from the static dataset so
 * pages always render with data while still going through the query cache —
 * when `api.*` is pointed at a real endpoint, loading/refetch behavior is
 * already wired up.
 *
 * Every hook also re-derives its data from the active header date range, so a
 * change to "Last 7 days" / "Last quarter" / "Year to date" flows through to
 * KPIs, trend charts, and breakdowns across the whole app.
 */
function useScoped<T>(key: string, queryFn: () => Promise<T>, initialData: T) {
  const { range } = useDateRange();
  const query = useQuery({ queryKey: [key], queryFn, initialData });
  const data = useMemo(
    () => applyRange(query.data ?? initialData, range),
    [query.data, range, initialData]
  );
  return { ...query, data };
}

export const useExecutive = () =>
  useScoped("executive", api.executive, datasets.executive);
export const useRevenue = () =>
  useScoped("revenue", api.revenue, datasets.revenue);
export const useSales = () => useScoped("sales", api.sales, datasets.sales);
export const useLeasing = () =>
  useScoped("leasing", api.leasing, datasets.leasing);
export const useProperty = () =>
  useScoped("property", api.property, datasets.property);
export const useMarketing = () =>
  useScoped("marketing", api.marketing, datasets.marketing);
export const useInvestment = () =>
  useScoped("investment", api.investment, datasets.investment);
export const useOperations = () =>
  useScoped("operations", api.operations, datasets.operations);
export const useConstruction = () =>
  useScoped("construction", api.construction, datasets.construction);
export const useCustomer = () =>
  useScoped("customer", api.customer, datasets.customer);
export const useIntegrations = () =>
  useScoped("integrations", api.integrations, datasets.integrations);
export const useAiActions = () =>
  useScoped("aiActions", api.aiActions, datasets.aiActions);
export const useReports = () =>
  useScoped("reports", api.reports, datasets.reports);
export const useAlerts = () => useScoped("alerts", api.alerts, datasets.alerts);
export const useAiUsage = () =>
  useScoped("aiUsage", api.aiUsage, datasets.aiUsage);
export const useDataDictionary = () =>
  useScoped("dataDictionary", api.dataDictionary, datasets.dataDictionary);
