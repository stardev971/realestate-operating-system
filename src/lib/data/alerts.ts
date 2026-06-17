import type { AlertItem } from "@/lib/types";

export const alerts: AlertItem[] = [
  { id: "al1", severity: "Critical", title: "Occupancy below threshold", detail: "Coastal Bay Resort occupancy dropped to 78.4%, below the 85% portfolio threshold.", time: "32 min ago", module: "Property" },
  { id: "al2", severity: "Critical", title: "Construction project delayed", detail: "Heritage Place Build-Out is now 21 days behind schedule with budget risk.", time: "1 hour ago", module: "Construction" },
  { id: "al3", severity: "Critical", title: "Revenue decline detected", detail: "Pacific Crest Mall revenue fell 6.4% MoM amid rising retail vacancy.", time: "3 hours ago", module: "Revenue" },
  { id: "al4", severity: "Warning", title: "Leases expiring soon", detail: "32 high-value leases expire within 45 days representing $1.2M in annual rent.", time: "5 hours ago", module: "Leasing" },
  { id: "al5", severity: "Warning", title: "Budget overrun risk", detail: "Riverside Logistics Park is trending 4% over approved budget.", time: "8 hours ago", module: "Construction" },
  { id: "al6", severity: "Warning", title: "Integration sync failed", detail: "CoStar listing feed failed to sync 4 hours ago; health dropped to 31%.", time: "4 hours ago", module: "Integrations" },
  { id: "al7", severity: "Info", title: "New lead milestone reached", detail: "Marketing generated 418 qualified leads this month — a new portfolio record.", time: "Yesterday", module: "Marketing" },
  { id: "al8", severity: "Info", title: "New property acquired", detail: "Northstar Industrial Partners closed on Quantum Logistics Hub in Reno, NV.", time: "2 days ago", module: "Investment" },
];

export const alertStats = {
  critical: 3,
  warning: 3,
  info: 2,
};
