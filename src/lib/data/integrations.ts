import type { Integration } from "@/lib/types";
import { palette } from "./company";

export const connectedIntegrations: Integration[] = [
  { id: "salesforce", name: "Salesforce", category: "CRM & Brokerage", status: "Connected", health: 99, lastSync: "6 min ago", records: 482104, initials: "SF", color: "#00a1e0" },
  { id: "yardi", name: "Yardi", category: "Property Management", status: "Connected", health: 98, lastSync: "12 min ago", records: 1284067, initials: "Y", color: "#0b6e4f" },
  { id: "appfolio", name: "AppFolio", category: "Property Management", status: "Connected", health: 97, lastSync: "9 min ago", records: 642318, initials: "AF", color: "#1f6feb" },
  { id: "quickbooks", name: "QuickBooks", category: "Accounting", status: "Connected", health: 100, lastSync: "21 min ago", records: 318442, initials: "QB", color: "#2ca01c" },
  { id: "hubspot", name: "HubSpot", category: "CRM & Brokerage", status: "Connected", health: 96, lastSync: "14 min ago", records: 211908, initials: "HS", color: "#ff7a59" },
  { id: "procore", name: "Procore", category: "Construction", status: "Syncing", health: 92, lastSync: "Syncing now…", records: 98412, initials: "P", color: "#f47e42" },
  { id: "google-ads", name: "Google Ads", category: "Marketing", status: "Connected", health: 99, lastSync: "18 min ago", records: 64210, initials: "GA", color: "#4285f4" },
  { id: "zillow", name: "Zillow", category: "Listings", status: "Connected", health: 95, lastSync: "24 min ago", records: 142880, initials: "Z", color: "#006aff" },
  { id: "costar", name: "CoStar", category: "Listings", status: "Error", health: 31, lastSync: "Failed 4h ago", records: 54021, initials: "CS", color: "#1b3a5b" },
  { id: "docusign", name: "DocuSign", category: "Documents & eSignature", status: "Connected", health: 98, lastSync: "33 min ago", records: 88216, initials: "DS", color: "#ffcc22" },
  { id: "slack", name: "Slack", category: "Communication", status: "Connected", health: 99, lastSync: "3 min ago", records: 41122, initials: "SL", color: "#611f69" },
  { id: "buildium", name: "Buildium", category: "Property Management", status: "Connected", health: 94, lastSync: "27 min ago", records: 198440, initials: "B", color: "#3b5bdb" },
];

export interface CatalogItem {
  name: string;
  blurb: string;
  initials: string;
  color: string;
  popular?: boolean;
}

export interface CatalogCategory {
  category: string;
  items: CatalogItem[];
}

export const integrationCatalog: CatalogCategory[] = [
  {
    category: "CRM & Brokerage",
    items: [
      { name: "Salesforce", blurb: "Deals, contacts & pipeline sync", initials: "SF", color: "#00a1e0", popular: true },
      { name: "HubSpot", blurb: "Marketing & sales CRM", initials: "HS", color: "#ff7a59" },
      { name: "Follow Up Boss", blurb: "Real estate lead management", initials: "FB", color: "#2b6cb0" },
      { name: "BoomTown", blurb: "Lead generation & CRM", initials: "BT", color: "#e53e3e" },
      { name: "kvCORE", blurb: "Brokerage platform & IDX", initials: "KV", color: "#1a202c" },
    ],
  },
  {
    category: "Property Management",
    items: [
      { name: "Yardi", blurb: "Property accounting & operations", initials: "Y", color: "#0b6e4f", popular: true },
      { name: "AppFolio", blurb: "Residential & commercial PM", initials: "AF", color: "#1f6feb" },
      { name: "Buildium", blurb: "Rental & association management", initials: "B", color: "#3b5bdb" },
      { name: "Entrata", blurb: "Multifamily operating system", initials: "EN", color: "#d63384" },
      { name: "MRI Software", blurb: "Real estate & investment mgmt", initials: "MR", color: "#0f5c8c" },
    ],
  },
  {
    category: "Accounting",
    items: [
      { name: "QuickBooks", blurb: "Books, AP/AR & financials", initials: "QB", color: "#2ca01c", popular: true },
      { name: "NetSuite", blurb: "ERP & financial consolidation", initials: "NS", color: "#1f3a5f" },
      { name: "Sage Intacct", blurb: "Real estate accounting & GL", initials: "SI", color: "#00d639" },
    ],
  },
  {
    category: "Marketing",
    items: [
      { name: "Google Ads", blurb: "Search & display campaigns", initials: "GA", color: "#4285f4" },
      { name: "Meta Ads", blurb: "Facebook & Instagram ads", initials: "MA", color: "#0866ff" },
      { name: "LinkedIn Ads", blurb: "B2B commercial campaigns", initials: "LI", color: "#0a66c2" },
      { name: "Mailchimp", blurb: "Email marketing & automation", initials: "MC", color: "#ffe01b" },
      { name: "ActiveCampaign", blurb: "Lead nurture & automation", initials: "AC", color: "#356ae6" },
    ],
  },
  {
    category: "Listings",
    items: [
      { name: "Zillow", blurb: "Residential listing syndication", initials: "Z", color: "#006aff" },
      { name: "Realtor.com", blurb: "Listings & lead capture", initials: "RC", color: "#d92228" },
      { name: "Apartments.com", blurb: "Multifamily marketplace", initials: "AP", color: "#00a0df" },
      { name: "LoopNet", blurb: "Commercial listings", initials: "LN", color: "#0b3c5d" },
      { name: "CoStar", blurb: "Commercial market data", initials: "CS", color: "#1b3a5b" },
    ],
  },
  {
    category: "Construction",
    items: [
      { name: "Procore", blurb: "Construction project management", initials: "P", color: "#f47e42", popular: true },
      { name: "Autodesk Construction Cloud", blurb: "Design & build collaboration", initials: "AU", color: "#0696d7" },
      { name: "Buildertrend", blurb: "Residential construction mgmt", initials: "BT", color: "#2e7d32" },
    ],
  },
  {
    category: "Documents & eSignature",
    items: [
      { name: "DocuSign", blurb: "Lease & contract eSignature", initials: "DS", color: "#ffcc22" },
      { name: "Dropbox", blurb: "Document storage & sharing", initials: "DB", color: "#0061ff" },
      { name: "Google Drive", blurb: "Cloud documents", initials: "GD", color: "#1fa463" },
      { name: "SharePoint", blurb: "Enterprise document mgmt", initials: "SP", color: "#0078d4" },
    ],
  },
  {
    category: "Communication",
    items: [
      { name: "Slack", blurb: "Team messaging & alerts", initials: "SL", color: "#611f69" },
      { name: "Microsoft Teams", blurb: "Collaboration & meetings", initials: "MT", color: "#5059c9" },
      { name: "RingCentral", blurb: "Cloud phone & messaging", initials: "RC", color: "#ff7a00" },
    ],
  },
];

export const integrationStats = {
  connected: 12,
  syncing: 1,
  errors: 1,
  records: connectedIntegrations.reduce((sum, i) => sum + i.records, 0),
};

export { palette };
