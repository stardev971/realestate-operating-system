import type { AiAction } from "@/lib/types";

export const aiActions: AiAction[] = [
  {
    id: "a1",
    title: "Increase rent on 14 below-market units",
    detail: "Highland Park Towers & Beacon Hill units are renting 8–11% under comparable market rate.",
    impact: "+$420K annual revenue",
    category: "Revenue",
    priority: "High",
    cta: "Apply rent adjustment",
  },
  {
    id: "a2",
    title: "Launch campaign for vacant industrial inventory",
    detail: "Empire Logistics Hub has 14 vacant units; demand signals are strong in the Las Vegas market.",
    impact: "+38 projected leads",
    category: "Marketing",
    priority: "High",
    cta: "Launch campaign",
  },
  {
    id: "a3",
    title: "Contact 32 expiring-lease customers",
    detail: "32 high-intent tenants have leases expiring within 45 days. Proactive outreach lifts renewals.",
    impact: "+$1.2M retained rent",
    category: "Leasing",
    priority: "High",
    cta: "Start outreach",
  },
  {
    id: "a4",
    title: "Review delayed Riverside Logistics Park",
    detail: "Project is 14 days behind schedule and trending toward a budget overrun with Vanguard Contractors.",
    impact: "Mitigate $2.1M risk",
    category: "Construction",
    priority: "Medium",
    cta: "Open project review",
  },
  {
    id: "a5",
    title: "Reallocate $8K marketing budget to Zillow",
    detail: "Zillow delivers the lowest CPL ($52) and highest ROI (5.2x). Shift from underperforming Brand Awareness.",
    impact: "+12% blended ROI",
    category: "Marketing",
    priority: "Medium",
    cta: "Reallocate budget",
  },
  {
    id: "a6",
    title: "Flag Coastal Bay Resort for asset review",
    detail: "Occupancy (78.4%) and asset score (68) are below benchmark; hospitality concentration is elevated.",
    impact: "Protect $158M asset value",
    category: "Investment",
    priority: "Medium",
    cta: "Schedule review",
  },
  {
    id: "a7",
    title: "Escalate 3 high-risk renewal accounts",
    detail: "Three tenants worth $1.6M in annual rent show declining satisfaction and low renewal intent.",
    impact: "Retain $1.6M rent",
    category: "Customer",
    priority: "Low",
    cta: "Assign to team",
  },
];

export const aiActionStats = {
  total: 112,
  highPriority: 38,
  potentialUpside: "$6.4M",
  actionsTaken: 74,
};
