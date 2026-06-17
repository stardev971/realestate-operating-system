# Real Estate Operating System (REOS)

> Executive operating layer for real estate organizations — a frontend-only demo.

REOS is the executive command center for CEOs, Founders, Managing Directors, Investment Leaders, and CXOs of real estate organizations. It consolidates property management, CRM, accounting, leasing, construction, investments, marketing, and customer systems into one clear executive view.

This is a **frontend-only** demo built with static, realistic demo data for the fictional **Northstar Real Estate Group** (125 properties, 14 states, $4.2B portfolio).

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom enterprise light theme, purple accent)
- **Recharts** for charts
- **@tanstack/react-query** as the data-access layer (static fetchers today, real APIs later)
- **Framer Motion** for subtle motion
- **lucide-react** icons

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Architecture

The app is designed so that real APIs can be connected later without touching pages:

```
src/
  app/                 # One route per intelligence module + platform page
  components/
    layout/            # Sidebar, TopHeader, AppShell
    ui/                # KpiCard, InfoTooltip, InsightCard, Card, Badge, DataTable
    charts/            # Recharts wrappers (area, line, donut, bar, funnel) + GeoMap
  lib/
    data/              # Static, typed demo datasets (one file per domain)
    api.ts             # Async fetchers — swap these for real endpoints
    hooks.ts           # React Query hooks consumed by pages
    types.ts           # Shared TypeScript types
    nav.ts             # Navigation config
    format.ts          # Number / currency / percent formatters
```

To connect a real backend, replace the body of each fetcher in `src/lib/api.ts`
with a `fetch()` call. The hooks, components, and pages stay the same.

## Modules

**Intelligence:** Executive Overview · Revenue & Portfolio Performance · Sales · Leasing · Property · Marketing · Investment · Operations · Construction · Customer · AI Action Center

**Platform:** Integrations · AI Usage · Reports · Alerts Center · Data Dictionary · Settings

All data is simulated for demonstration purposes.
