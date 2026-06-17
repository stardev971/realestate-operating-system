"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Activity } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import { useAuth } from "@/lib/auth";

/** Routes that render without the app chrome and without requiring sign-in. */
const PUBLIC_ROUTES = ["/login"];

function Splash() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas">
      <div className="flex flex-col items-center gap-3">
        <div className="grid h-11 w-11 animate-pulse place-items-center rounded-xl gradient-brand shadow-sm">
          <Activity className="h-6 w-6 text-white" strokeWidth={2.5} />
        </div>
        <div className="text-sm font-medium text-ink-muted">Loading REOS…</div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { authed, hydrated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!hydrated) return;
    if (!authed && !isPublic) router.replace("/login");
    if (authed && isPublic) router.replace("/");
  }, [authed, hydrated, isPublic, pathname, router]);

  // Login (and other public routes) render bare — no sidebar/header.
  if (isPublic) return <>{children}</>;

  // Wait for persisted auth state before deciding what to show.
  if (!hydrated) return <Splash />;

  // Unauthenticated access to a protected page: show splash while redirecting.
  if (!authed) return <Splash />;

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar />
      <div className="lg:pl-64">
        <TopHeader />
        <main className="mx-auto max-w-[1500px] px-4 py-6 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
