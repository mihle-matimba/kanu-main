# CompIQ — Compensation Suite

A compensation intelligence dashboard built with React, TypeScript, Vite, and Tailwind CSS.

## Project Structure

```
src/
  main.tsx                    # React app entry point
  App.tsx                     # Root component with router setup
  index.css                   # Global styles + CSS design tokens

  pages/
    Dashboard.tsx             # / — Overview, KPI cards, charts
    SalaryBenchmarking.tsx    # /benchmarking — Role vs market data
    PayScaleDesign.tsx        # /payscale — Grade & band builder
    RemunerationStructure.tsx # /remuneration — CTC component builder
    NotFound.tsx              # * — 404 page

  components/
    layout/
      AppLayout.tsx           # Shared layout wrapper (header + outlet)
      AppSidebar.tsx          # Collapsible sidebar navigation
    ui/
      Button.tsx              # Reusable button component
      Input.tsx               # Reusable text input
      Select.tsx              # Radix-based select dropdown
      Slider.tsx              # Radix-based range slider
      Switch.tsx              # Radix-based toggle switch

  data/
    dashboard.ts              # KPI stats, chart data, activity feed
    benchmarking.ts           # Role data, market percentiles, helpers
    payscale.ts               # Grade band data, chart colours
    remuneration.ts           # CTC component definitions

  lib/
    utils.ts                  # cn() Tailwind class merge utility
```

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** — dev server & bundler
- **React Router DOM v6** — client-side routing
- **Tailwind CSS v3** — utility-first styling with custom design tokens
- **Recharts** — AreaChart, BarChart, PieChart, RadarChart
- **Lucide React** — icon library
- **Radix UI** — accessible UI primitives (Select, Switch, Slider)

## Running the App

```
npm run dev
```

Runs on port **5000** via Vite.

## Deployment

Configured as a **static** deployment using `vite build`. Output goes to `dist/`.
