"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, CalendarCheck, ArrowRight } from "lucide-react";
import { navSections } from "@/lib/nav";
import { company } from "@/lib/data/company";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200/70 bg-white lg:flex">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand shadow-sm">
          <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-bold text-ink">REOS</div>
          <div className="text-[11px] text-ink-muted">{company.tagline}</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {navSections.map((section) => (
          <div key={section.title} className="mb-5">
            <div className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted/70">
              {section.title}
            </div>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                        active
                          ? "bg-brand-50 text-brand-700"
                          : "text-ink-soft hover:bg-slate-50 hover:text-ink"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0",
                          active
                            ? "text-brand-600"
                            : "text-ink-muted group-hover:text-ink-soft"
                        )}
                        strokeWidth={2}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                            active
                              ? "bg-brand-600 text-white"
                              : "bg-rose-100 text-rose-600"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Build-your-own CTA */}
      <div className="px-3 pb-3">
        <div className="gradient-brand relative overflow-hidden rounded-xl p-3.5 shadow-sm">
          <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
          <div className="relative">
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-white">
              <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
              Want an OS like this?
            </div>
            <p className="mt-1 text-[11px] leading-snug text-white/80">
              We build custom operating systems for your business.
            </p>
            <a
              href="https://meetings-na2.hubspot.com/jay-sonavani"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 flex items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[12px] font-semibold text-brand-700 shadow-sm transition hover:bg-white/90"
            >
              Book a Call
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer status */}
      <div className="border-t border-slate-200/70 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-ink-soft">
            Connected Platforms
          </span>
          <span className="text-xs font-bold text-brand-600">12 live</span>
        </div>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                i === 8 ? "bg-rose-400" : "bg-emerald-400"
              )}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
