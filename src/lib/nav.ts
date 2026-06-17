import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  KeyRound,
  Building2,
  Megaphone,
  PieChart,
  Wrench,
  HardHat,
  Users,
  Sparkles,
  Plug,
  Activity,
  FileText,
  Bell,
  BookOpen,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    title: "Intelligence Modules",
    items: [
      { label: "Executive Overview", href: "/", icon: LayoutDashboard },
      { label: "Revenue & Portfolio", href: "/revenue", icon: DollarSign },
      { label: "Sales Intelligence", href: "/sales", icon: TrendingUp },
      { label: "Leasing Intelligence", href: "/leasing", icon: KeyRound },
      { label: "Property Intelligence", href: "/property", icon: Building2 },
      { label: "Marketing Intelligence", href: "/marketing", icon: Megaphone },
      { label: "Investment Intelligence", href: "/investment", icon: PieChart },
      { label: "Operations Intelligence", href: "/operations", icon: Wrench },
      { label: "Construction Intelligence", href: "/construction", icon: HardHat },
      { label: "Customer Intelligence", href: "/customer", icon: Users },
      {
        label: "AI Action Center",
        href: "/ai-action-center",
        icon: Sparkles,
        badge: "112",
      },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "Integrations", href: "/integrations", icon: Plug },
      { label: "AI Usage", href: "/ai-usage", icon: Activity },
      { label: "Reports", href: "/reports", icon: FileText },
      { label: "Alerts Center", href: "/alerts", icon: Bell, badge: "8" },
      { label: "Data Dictionary", href: "/data-dictionary", icon: BookOpen },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];
