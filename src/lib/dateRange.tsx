"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type RangeKey =
  | "Last 7 days"
  | "Last 30 days"
  | "Last quarter"
  | "Year to date";

export const dateRanges: RangeKey[] = [
  "Last 7 days",
  "Last 30 days",
  "Last quarter",
  "Year to date",
];

const STORAGE_KEY = "reos.range";

interface DateRangeCtx {
  range: RangeKey;
  setRange: (r: RangeKey) => void;
}

const Ctx = createContext<DateRangeCtx | null>(null);

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [range, setRangeState] = useState<RangeKey>("Last 30 days");

  // Restore the last selection so the experience persists across navigation.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as RangeKey | null;
    if (saved && dateRanges.includes(saved)) setRangeState(saved);
  }, []);

  const setRange = (r: RangeKey) => {
    setRangeState(r);
    localStorage.setItem(STORAGE_KEY, r);
  };

  return <Ctx.Provider value={{ range, setRange }}>{children}</Ctx.Provider>;
}

export function useDateRange() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useDateRange must be used within a DateRangeProvider");
  return ctx;
}
