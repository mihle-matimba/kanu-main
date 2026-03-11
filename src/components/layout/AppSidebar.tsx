import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ChartColumn,
  Layers,
  GitBranch,
  Users,
  Settings,
  ChevronRight,
  PanelLeft,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
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
  {
    title: "Profiles",
    url: "/profiles",
    icon: Users,
    description: "Individual profiling",
  },
  {
    title: "Job Roles",
    url: "/job-roles",
    icon: Briefcase,
    description: "Role management",
  },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  return (
    <aside
      className={cn(
        "relative flex flex-col h-full border-r border-white/5 transition-all duration-300 ease-in-out z-50 shadow-2xl overflow-hidden",
        "bg-gradient-to-b from-[#2e2e2e] via-[#242424] to-[#1a1a1a]", 
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Metallic Damascus Pattern Overlay with Truck Tire Tread Grooves */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="industrialDamascus">
            {/* Coarse base noise for Damascus texture */}
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="5" seed="1" result="foldedSteel" />
            
            {/* Creates grooved, straight distortions resembling a coarse truck tire tread with water ripples */}
            <feTurbulence type="turbulence" baseFrequency="0.1 0.005" numOctaves="1" seed="2" result="tireGrooves" />
            

            <feDisplacementMap in="foldedSteel" in2="tireGrooves" scale="25" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <rect width="100%" height="100%" filter="url(#industrialDamascus)" fill="transparent" />
        </svg>
      </div>

      {/* Logo / Brand Section */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-6 border-b border-white/5">
        <div className={cn(
          "flex shrink-0 items-center justify-center overflow-hidden rounded-lg transition-all duration-300",
          collapsed ? "h-8 w-8" : "h-14 w-full" 
        )}>
          <img 
            src="/assets/Logo.png" 
            alt="Logo" 
            className={cn(
              "h-full object-contain",
              !collapsed ? "w-full" : "w-auto"
            )}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 px-3 py-6 overflow-hidden">
        {!collapsed && (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 px-3 mb-4">
            Main Menu
          </p>
        )}
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.url);
            return (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  end={item.url === "/dashboard"}
                  title={collapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200 group",
                    isActive
                      ? "bg-white/10 text-white shadow-inner ring-1 ring-white/10"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      "shrink-0 transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-teal-400" : "text-gray-400"
                    )}
                  />
                  {!collapsed && (
                    <div className="flex flex-1 flex-col min-w-0">
                      <span className="truncate font-medium">{item.title}</span>
                      {!isActive && (
                        <span className="text-[10px] text-gray-500 truncate group-hover:text-gray-400">
                          {item.description}
                        </span>
                      )}
                    </div>
                  )}
                  {!collapsed && isActive && (
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / Actions */}
      <div className="relative z-10 mt-auto border-t border-white/5 p-3 space-y-1">
        <button
          aria-label="Settings"
          className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
        >
          <Settings size={18} className="shrink-0 group-hover:rotate-45 transition-transform duration-300" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </button>

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-500 hover:bg-white/5 hover:text-white transition-all"
        >
          <PanelLeft size={18} className={cn("shrink-0 transition-transform", collapsed && "rotate-180")} />
          {!collapsed && <span className="text-xs font-medium">Collapse View</span>}
        </button>

        {!collapsed && (
          <div className="mt-2 rounded-xl bg-gradient-to-r from-white/5 to-transparent p-3 ring-1 ring-white/5">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-teal-500/20 flex items-center justify-center ring-1 ring-teal-500/30">
                <span className="text-[10px] font-bold text-teal-400">MG</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-100">Manager Portal</span>
                <span className="text-[10px] text-gray-500">FY 2026 Active</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}