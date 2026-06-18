"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  Calendar,
  Bell,
  Sparkles,
  Building2,
  Check,
  User,
  Settings,
  LogOut,
  AlertTriangle,
  Info,
  CircleAlert,
  CalendarCheck,
} from "lucide-react";
import { searchEntities } from "@/lib/api";
import { searchSuggestions } from "@/lib/data/search";
import { alerts, alertStats } from "@/lib/data/alerts";
import { useDateRange, dateRanges } from "@/lib/dateRange";
import { useCompany } from "@/lib/activeCompany";
import { useAuth, DEMO_CREDENTIALS } from "@/lib/auth";
import { cn } from "@/lib/utils";

type Menu = "search" | "range" | "company" | "notifications" | "user" | null;

const severityStyle: Record<
  string,
  { icon: typeof Info; className: string }
> = {
  Critical: { icon: CircleAlert, className: "text-rose-500" },
  Warning: { icon: AlertTriangle, className: "text-amber-500" },
  Info: { icon: Info, className: "text-brand-500" },
};

export function TopHeader() {
  const router = useRouter();
  const { range, setRange } = useDateRange();
  const { company, companies, setCompany } = useCompany();
  const { logout } = useAuth();

  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState<Menu>(null);
  const rootRef = useRef<HTMLElement>(null);

  const results = query ? searchEntities(query) : [];
  const notifCount = alertStats.critical + alertStats.warning + alertStats.info;

  // Close any open menu when clicking outside the header.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMenu(null);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const toggle = (m: Menu) => setMenu((cur) => (cur === m ? null : m));

  function handleSignOut() {
    setMenu(null);
    logout();
    router.replace("/login");
  }

  return (
    <header
      ref={rootRef}
      className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-canvas/80 px-4 backdrop-blur md:px-6"
    >
      {/* Company switcher */}
      <div className="relative">
        <button
          onClick={() => toggle("company")}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-ink-soft shadow-sm transition hover:bg-slate-50"
        >
          <Building2 className="h-4 w-4 text-brand-600" />
          <span className="hidden sm:inline">{company.shortName} Co.</span>
          <ChevronDown className="h-3.5 w-3.5 text-ink-muted" />
        </button>
        {menu === "company" && (
          <div className="absolute left-0 top-12 z-40 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-pop">
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
              Switch portfolio
            </div>
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCompany(c.id);
                  setMenu(null);
                }}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50">
                  <Building2 className="h-4 w-4 text-brand-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-ink">{c.name}</div>
                  <div className="text-xs text-ink-muted">
                    {c.portfolioValue} · {c.properties} assets
                  </div>
                </div>
                {c.id === company.id && (
                  <Check className="h-4 w-4 text-brand-600" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Global AI search */}
      <div className="relative flex-1 max-w-2xl">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
          <Search className="h-4 w-4 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setMenu("search");
            }}
            onFocus={() => setMenu("search")}
            placeholder="Search properties, projects, tenants, insights…"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
          />
          <kbd className="hidden rounded border border-slate-200 bg-slate-50 px-1.5 text-[10px] text-ink-muted sm:block">
            /
          </kbd>
        </div>

        {menu === "search" && (
          <div className="absolute left-0 right-0 top-12 z-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-pop">
            {query && results.length > 0 && (
              <ul className="max-h-80 overflow-y-auto py-1">
                {results.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={r.href}
                      onClick={() => setMenu(null)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50"
                    >
                      <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-600">
                        {r.type}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-ink">
                          {r.title}
                        </span>
                        <span className="block text-xs text-ink-muted">
                          {r.subtitle}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {query && results.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-ink-muted">
                No matches for “{query}”.
              </div>
            )}

            {!query && (
              <div className="p-2">
                <div className="flex items-center gap-1.5 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                  <Sparkles className="h-3.5 w-3.5 text-brand-500" />
                  Try asking
                </div>
                <ul>
                  {searchSuggestions.map((s) => (
                    <li key={s}>
                      <button
                        onClick={() => setQuery(s)}
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-ink-soft hover:bg-slate-50"
                      >
                        <Search className="h-3.5 w-3.5 text-ink-muted" />
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Date selector */}
      <div className="relative hidden md:block">
        <button
          onClick={() => toggle("range")}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-ink-soft shadow-sm transition hover:bg-slate-50"
        >
          <Calendar className="h-4 w-4 text-ink-muted" />
          {range}
          <ChevronDown className="h-3.5 w-3.5 text-ink-muted" />
        </button>
        {menu === "range" && (
          <div className="absolute right-0 top-11 z-40 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-pop">
            {dateRanges.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setRange(d);
                  setMenu(null);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-slate-50",
                  d === range ? "font-semibold text-brand-600" : "text-ink-soft"
                )}
              >
                {d}
                {d === range && <Check className="h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Build-your-own CTA */}
      <a
        href="https://meetings-na2.hubspot.com/jay-sonavani"
        target="_blank"
        rel="noopener noreferrer"
        title="Book a call to build a similar operating system for your business"
        className="gradient-brand flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
      >
        <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
        <span className="hidden sm:inline">Book a Call</span>
      </a>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => toggle("notifications")}
          className="relative grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-ink-soft shadow-sm transition hover:bg-slate-50"
        >
          <Bell className="h-[18px] w-[18px]" />
          {notifCount > 0 && (
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
              {notifCount}
            </span>
          )}
        </button>
        {menu === "notifications" && (
          <div className="absolute right-0 top-12 z-40 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-pop">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <span className="text-sm font-semibold text-ink">
                Notifications
              </span>
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-600">
                {alertStats.critical} critical
              </span>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {alerts.slice(0, 5).map((a) => {
                const sev = severityStyle[a.severity] ?? severityStyle.Info;
                const Icon = sev.icon;
                return (
                  <li key={a.id}>
                    <Link
                      href="/alerts"
                      onClick={() => setMenu(null)}
                      className="flex gap-3 px-4 py-3 hover:bg-slate-50"
                    >
                      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", sev.className)} />
                      <span className="flex-1">
                        <span className="block text-[13px] font-medium text-ink">
                          {a.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-muted line-clamp-2">
                          {a.detail}
                        </span>
                        <span className="mt-1 block text-[11px] text-ink-muted/80">
                          {a.module} · {a.time}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/alerts"
              onClick={() => setMenu(null)}
              className="block border-t border-slate-100 px-4 py-2.5 text-center text-sm font-medium text-brand-600 hover:bg-slate-50"
            >
              View all alerts
            </Link>
          </div>
        )}
      </div>

      {/* User menu */}
      <div className="relative">
        <button
          onClick={() => toggle("user")}
          className="flex items-center gap-2 rounded-lg border border-transparent px-1.5 py-1 transition hover:border-slate-200 hover:bg-white"
        >
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-400 text-xs font-bold text-white">
            AR
          </div>
          <div className="hidden leading-tight lg:block">
            <div className="text-[13px] font-semibold text-ink">
              Alexandra Reed
            </div>
            <div className="text-[11px] text-ink-muted">
              Chief Executive Officer
            </div>
          </div>
          <ChevronDown className="hidden h-3.5 w-3.5 text-ink-muted lg:block" />
        </button>
        {menu === "user" && (
          <div className="absolute right-0 top-12 z-40 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-pop">
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-400 text-sm font-bold text-white">
                AR
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-ink">
                  Alexandra Reed
                </div>
                <div className="text-xs text-ink-muted">
                  {DEMO_CREDENTIALS.email}
                </div>
              </div>
            </div>
            <Link
              href="/profile"
              onClick={() => setMenu(null)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-soft hover:bg-slate-50"
            >
              <User className="h-4 w-4 text-ink-muted" />
              My Profile
            </Link>
            <Link
              href="/settings"
              onClick={() => setMenu(null)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-soft hover:bg-slate-50"
            >
              <Settings className="h-4 w-4 text-ink-muted" />
              Settings
            </Link>
            <div className="my-1 border-t border-slate-100" />
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
