import { Outlet, useLocation } from "react-router-dom";
import { Search, Bell, ChevronDown } from "lucide-react";
import AppSidebar from "./AppSidebar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Dashboard",
    subtitle: "Compensation overview & key metrics",
  },
  "/benchmarking": {
    title: "Salary Benchmarking",
    subtitle: "Compare roles against market data",
  },
  "/payscale": {
    title: "Pay Scale Designer",
    subtitle: "Build and manage pay grades & bands",
  },
  "/remuneration": {
    title: "Remuneration Structure",
    subtitle: "Configure total compensation components",
  },
};

export default function AppLayout() {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] ?? { title: "CompIQ", subtitle: "" };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-40 h-16 flex items-center justify-between gap-4 border-b border-border bg-card/90 backdrop-blur-sm px-6">
          {/* Page title */}
          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-foreground leading-tight">
              {meta.title}
            </h1>
            <p className="text-xs text-muted-foreground">{meta.subtitle}</p>
          </div>

          {/* Right-side actions */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search roles, grades…"
                className="pl-9 h-9 w-52 text-sm bg-muted/50 border-border focus-visible:ring-teal"
              />
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-teal" />
            </Button>

            {/* User button */}
            <button className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1.5 hover:bg-muted transition-colors">
              <div className="h-6 w-6 rounded-full bg-navy-mid flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-primary-foreground">
                  MG
                </span>
              </div>
              <span className="text-xs font-medium text-foreground hidden sm:block">
                Manager
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
