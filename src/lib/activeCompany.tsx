"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CompanyProfile {
  id: string;
  name: string;
  shortName: string;
  portfolioValue: string;
  properties: number;
  states: number;
}

/** Portfolios available in the company switcher. */
export const companies: CompanyProfile[] = [
  {
    id: "northstar",
    name: "Northstar Real Estate Group",
    shortName: "Northstar",
    portfolioValue: "$4.2B",
    properties: 125,
    states: 14,
  },
  {
    id: "meridian",
    name: "Meridian Property Holdings",
    shortName: "Meridian",
    portfolioValue: "$2.7B",
    properties: 86,
    states: 9,
  },
  {
    id: "harborline",
    name: "Harborline Capital Partners",
    shortName: "Harborline",
    portfolioValue: "$6.1B",
    properties: 173,
    states: 21,
  },
];

const STORAGE_KEY = "reos.company";

interface CompanyCtx {
  company: CompanyProfile;
  companies: CompanyProfile[];
  setCompany: (id: string) => void;
}

const Ctx = createContext<CompanyCtx | null>(null);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState(companies[0].id);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && companies.some((c) => c.id === saved)) setId(saved);
  }, []);

  const setCompany = (next: string) => {
    setId(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const company = companies.find((c) => c.id === id) ?? companies[0];

  return (
    <Ctx.Provider value={{ company, companies, setCompany }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCompany() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompany must be used within a CompanyProvider");
  return ctx;
}
