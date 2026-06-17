/** Shared domain types for REOS demo data. */

export type Trend = "up" | "down" | "flat";

export interface Kpi {
  id: string;
  label: string;
  value: string;
  rawValue?: number;
  delta?: number; // percent change vs prior period
  trend?: Trend;
  sub?: string; // small secondary text (e.g. "38.1% margin")
  metricKey?: string; // links to the data dictionary tooltip
}

export interface Insight {
  id: string;
  icon: "trend" | "warning" | "mail" | "megaphone" | "sparkles" | "building" | "dollar";
  text: string;
  tone?: "default" | "positive" | "warning" | "critical";
}

export interface TimePoint {
  label: string; // e.g. month label
  [series: string]: string | number;
}

export interface BreakdownSlice {
  name: string;
  value: number;
  color: string;
}

export type AssetType =
  | "Residential"
  | "Commercial"
  | "Industrial"
  | "Retail"
  | "Hospitality";

export type RiskLevel = "Low" | "Moderate" | "Elevated" | "High";

export interface Property {
  id: string;
  name: string;
  city: string;
  state: string;
  type: AssetType;
  units: number;
  occupancy: number; // percent
  revenue: number; // annual
  noi: number; // annual
  assetScore: number; // 0-100
  risk: RiskLevel;
  capRate: number; // percent
}

export interface RegionRow {
  region: string;
  properties: number;
  revenue: number;
  noi: number;
  occupancy: number;
}

export interface FunnelStage {
  stage: string;
  value: number;
}

export interface AgentRow {
  name: string;
  region: string;
  deals: number;
  volume: number;
  conversion: number;
}

export interface ProjectRow {
  project: string;
  location: string;
  leads: number;
  closed: number;
  revenue: number;
}

export interface LeaseExpiry {
  month: string;
  leases: number;
  sqft: number;
  atRiskRent: number;
}

export interface RentRollRow {
  property: string;
  units: number;
  leased: number;
  monthlyRent: number;
  collected: number; // percent
  delinquent: number; // dollars
}

export interface CampaignRow {
  campaign: string;
  channel: string;
  spend: number;
  leads: number;
  cpl: number;
  roi: number;
  status: "Active" | "Paused" | "Ended";
}

export interface ChannelRow {
  channel: string;
  spend: number;
  leads: number;
  tours: number;
  roi: number;
  color: string;
}

export interface FundRow {
  fund: string;
  strategy: string;
  aum: number;
  irr: number;
  moic: number;
  dpi: number;
  status: "Investing" | "Harvesting" | "Fully Realized";
}

export interface WorkOrderRow {
  category: string;
  open: number;
  avgResolution: number; // hours
  slaCompliance: number; // percent
}

export interface VendorRow {
  vendor: string;
  category: string;
  spend: number;
  rating: number;
  onTime: number; // percent
}

export interface ConstructionProject {
  name: string;
  location: string;
  budget: number;
  spent: number;
  percentComplete: number;
  status: "On Track" | "At Risk" | "Delayed" | "Complete";
  delayDays: number;
  completion: string;
}

export interface SatisfactionRow {
  segment: string;
  satisfaction: number;
  nps: number;
  complaints: number;
  renewalIntent: number;
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  status: "Connected" | "Syncing" | "Error";
  health: number; // percent
  lastSync: string;
  records: number;
  initials: string;
  color: string;
}

export interface AiAction {
  id: string;
  title: string;
  detail: string;
  impact: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  cta: string;
}

export interface ReportItem {
  id: string;
  name: string;
  description: string;
  cadence: string;
  updated: string;
  icon: "trend" | "building" | "dollar" | "mail" | "warning" | "sparkles";
}

export interface AlertItem {
  id: string;
  severity: "Critical" | "Warning" | "Info";
  title: string;
  detail: string;
  time: string;
  module: string;
}

export interface MetricDef {
  metric: string;
  formula: string;
  sources: string[];
  meaning: string;
  category: string;
}
