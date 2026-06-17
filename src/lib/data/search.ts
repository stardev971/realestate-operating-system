export interface SearchEntity {
  id: string;
  type: "Property" | "Project" | "Investor" | "Tenant" | "Deal" | "Insight" | "Report";
  title: string;
  subtitle: string;
  href: string;
}

export const searchIndex: SearchEntity[] = [
  { id: "se1", type: "Property", title: "Northstar Tower", subtitle: "Dallas, TX · Commercial · 96.4% occ", href: "/property" },
  { id: "se2", type: "Property", title: "Coastal Bay Resort", subtitle: "Tampa, FL · Hospitality · underperforming", href: "/property" },
  { id: "se3", type: "Property", title: "Highland Park Towers", subtitle: "Dallas, TX · Residential · 98.2% occ", href: "/property" },
  { id: "se4", type: "Project", title: "Riverside Logistics Park", subtitle: "Phoenix, AZ · Delayed 14 days", href: "/construction" },
  { id: "se5", type: "Project", title: "Aurora Heights Tower", subtitle: "Denver, CO · 58% complete", href: "/construction" },
  { id: "se6", type: "Investor", title: "Northstar Value-Add II", subtitle: "Value-Add fund · 21.4% IRR", href: "/investment" },
  { id: "se7", type: "Investor", title: "Northstar Opportunistic III", subtitle: "Opportunistic · 26.8% IRR", href: "/investment" },
  { id: "se8", type: "Tenant", title: "Apex Legal Group", subtitle: "Northstar Tower · lease expires Aug 2026", href: "/leasing" },
  { id: "se9", type: "Tenant", title: "Summit Robotics", subtitle: "Riverside Logistics Park · high renewal intent", href: "/leasing" },
  { id: "se10", type: "Deal", title: "Highland Park Launch", subtitle: "$34.6M revenue · 28 closed", href: "/sales" },
  { id: "se11", type: "Insight", title: "Underperforming asset detected", subtitle: "AI flagged Coastal Bay Resort for review", href: "/ai-action-center" },
  { id: "se12", type: "Insight", title: "Dallas portfolio highest NOI growth", subtitle: "+14.2% QoQ", href: "/" },
  { id: "se13", type: "Report", title: "CEO Weekly Summary", subtitle: "Updated 2 hours ago", href: "/reports" },
  { id: "se14", type: "Report", title: "Investor Report", subtitle: "Quarterly · fund performance", href: "/reports" },
  { id: "se15", type: "Property", title: "Tech Ridge Campus", subtitle: "Austin, TX · Commercial · 97.2% occ", href: "/property" },
];

export const searchSuggestions = [
  "Show underperforming properties in Texas",
  "Which asset generated highest NOI this quarter?",
  "Leases expiring in the next 45 days",
  "Top performing marketing channel by ROI",
  "Construction projects behind schedule",
];
