import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ChartColumn,
  Layers,
  GitBranch,
  Settings,
  TrendingUp,
  ChevronRight,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "Overview & insights",
  },
  {
    title: "Salary Benchmarking",
    url: "/benchmarking",
    icon: ChartColumn,
    description: "Market comparisons",
  },
  {
    title: "Pay Scale Design",
    url: "/payscale",
    icon: Layers,
    description: "Grade & band builder",
  },
  {
    title: "Remuneration Structure",
    url: "/remuneration",
    icon: GitBranch,
    description: "Comp components",
  },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal">
          <TrendingUp className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold text-sidebar-primary-foreground tracking-tight">
              CompIQ
            </span>
            <span className="text-[10px] text-sidebar-foreground/60 uppercase tracking-widest">
              Compensation Suite
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50 px-2 mb-2">
            Main Menu
          </p>
        )}
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);
            return (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  end={item.url === "/"}
                  title={collapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150",
                    isActive
                      ? "bg-teal text-sidebar-primary-foreground font-semibold"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon
                    size={18}
                    className={cn(
                      "shrink-0",
                      isActive ? "text-sidebar-primary-foreground" : ""
                    )}
                  />
                  {!collapsed && (
                    <div className="flex flex-1 flex-col min-w-0">
                      <span className="truncate">{item.title}</span>
                      {!isActive && (
                        <span className="text-[10px] text-sidebar-foreground/40 truncate">
                          {item.description}
                        </span>
                      )}
                    </div>
                  )}
                  {!collapsed && isActive && (
                    <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-2 space-y-2">
        {/* Settings */}
        <button
          title={collapsed ? "Settings" : undefined}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Settings size={18} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <PanelLeft size={16} className="shrink-0" />
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>

        {/* User card */}
        {!collapsed && (
          <div className="mt-1 rounded-lg bg-sidebar-accent/60 p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-6 w-6 rounded-full bg-teal/30 flex items-center justify-center">
                <span className="text-[10px] font-bold text-teal-light">MG</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-sidebar-accent-foreground">
                  Manager Portal
                </span>
                <span className="text-[10px] text-sidebar-foreground/50">
                  FY 2025 Active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
