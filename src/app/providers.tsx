"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { AuthProvider } from "@/lib/auth";
import { CompanyProvider } from "@/lib/activeCompany";
import { DateRangeProvider } from "@/lib/dateRange";

/**
 * App-wide providers. React Query is wired up here so that the static demo
 * datasets can be swapped for real API endpoints later without touching the
 * pages — only the fetchers in `src/lib/api.ts` need to change.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <CompanyProvider>
          <DateRangeProvider>{children}</DateRangeProvider>
        </CompanyProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
