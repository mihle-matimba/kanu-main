import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  DollarSign,
  House,
  Car,
  Heart,
  Gift,
  UtensilsCrossed,
  GraduationCap,
  Smartphone,
} from "lucide-react";
import { Switch } from "@/components/ui/Switch";
import { Slider } from "@/components/ui/Slider";
import {
  initialComponents,
  categoryLabels,
  categoryStyles,
  REFERENCE_CTC,
  type CompComponent,
  type Category,
} from "@/data/remuneration";

const iconMap = {
  DollarSign,
  House,
  Car,
  Heart,
  Gift,
  UtensilsCrossed,
  GraduationCap,
  Smartphone,
};

export default function RemunerationStructure() {
  const [components, setComponents] = useState<CompComponent[]>(initialComponents);
  const [selectedId, setSelectedId] = useState<string>("base");

  function toggleComponent(id: string, enabled: boolean) {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled } : c))
    );
  }

  function updatePercentage(id: string, value: number[]) {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, percentage: value[0] } : c))
    );
  }

  const active = components.filter((c) => c.enabled);
  const totalWeight = active.reduce((sum, c) => sum + c.percentage, 0);
  const taxableWeight = active
    .filter((c) => c.taxable)
    .reduce((sum, c) => sum + c.percentage, 0);

  const pieData = active.map((c) => ({
    name: c.label,
    value: c.percentage,
    fill: c.color,
  }));

  const radarData = [
    {
      subject: "Fixed Pay",
      value: active.filter((c) => c.category === "fixed").reduce((s, c) => s + c.percentage, 0),
    },
    {
      subject: "Variable Pay",
      value: active.filter((c) => c.category === "variable").reduce((s, c) => s + c.percentage, 0),
    },
    {
      subject: "Benefits",
      value: active.filter((c) => c.category === "benefit").reduce((s, c) => s + c.percentage, 0),
    },
    {
      subject: "Non-Taxable",
      value: active.filter((c) => !c.taxable).reduce((s, c) => s + c.percentage, 0),
    },
    { subject: "Market Align", value: 72 },
    { subject: "Completeness", value: Math.min(active.length * 11, 100) },
  ];

  const selectedComponent = components.find((c) => c.id === selectedId);

  return (
    <div className="space-y-6">
      {/* Summary stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Components", value: active.length, sub: `of ${components.length} total` },
          {
            label: "Total CTC Weight",
            value: `${totalWeight}%`,
            sub: totalWeight > 100 ? "⚠ Over 100%" : "of CTC allocated",
            warn: totalWeight > 100,
          },
          {
            label: "Annual CTC",
            value: `R ${(REFERENCE_CTC / 1000).toFixed(0)}k`,
            sub: "Reference package",
          },
          {
            label: "Taxable Share",
            value: `${taxableWeight}%`,
            sub: "Of total comp",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-4 shadow-card"
          >
            <p
              className={`text-2xl font-bold ${"warn" in stat && stat.warn ? "text-rose" : "text-foreground"}`}
            >
              {stat.value}
            </p>
            <p className="text-xs font-semibold text-foreground mt-0.5">{stat.label}</p>
            <p className="text-[11px] text-muted-foreground">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Main layout: component list + charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Component list (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-bold text-foreground">Compensation Components</h3>
              <p className="text-xs text-muted-foreground">
                Toggle and adjust each component's CTC weight
              </p>
            </div>
            <div className="divide-y divide-border">
              {components.map((comp) => {
                const Icon = iconMap[comp.icon as keyof typeof iconMap] ?? DollarSign;
                const isSelected = selectedId === comp.id;
                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedId(comp.id)}
                    className={`px-5 py-4 cursor-pointer transition-colors ${
                      isSelected ? "bg-muted/40" : "hover:bg-muted/20"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: comp.color + "20", color: comp.color }}
                      >
                        <Icon size={16} />
                      </div>

                      {/* Info + controls */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {comp.label}
                            </p>
                            <span
                              className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-sm ${
                                categoryStyles[comp.category as Category]
                              }`}
                            >
                              {categoryLabels[comp.category as Category]}
                            </span>
                            {!comp.taxable && (
                              <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground">
                                Non-Tax
                              </span>
                            )}
                          </div>
                          <Switch
                            checked={comp.enabled}
                            onCheckedChange={(checked) => toggleComponent(comp.id, checked)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        <p className="text-xs text-muted-foreground mb-2">
                          {comp.description}
                        </p>

                        {comp.enabled && (
                          <div className="flex items-center gap-3">
                            <Slider
                              min={1}
                              max={70}
                              step={1}
                              value={[comp.percentage]}
                              onValueChange={(val) => updatePercentage(comp.id, val)}
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1"
                            />
                            <span className="text-xs font-bold text-foreground w-10 text-right shrink-0">
                              {comp.percentage}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Charts + detail panel (1/3 width) */}
        <div className="space-y-4">
          {/* CTC Breakdown — Donut Chart */}
          <div className="bg-card rounded-xl border border-border p-5 shadow-card">
            <h3 className="font-bold text-foreground mb-1">CTC Breakdown</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Active components as % of CTC
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend list */}
            <div className="space-y-1.5 mt-1">
              {active.map((comp) => (
                <div key={comp.id} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span
                      className="h-2 w-2 rounded-sm shrink-0"
                      style={{ backgroundColor: comp.color }}
                    />
                    <span className="truncate max-w-28">{comp.label}</span>
                  </span>
                  <span className="font-semibold text-foreground shrink-0">
                    {comp.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Structure Health — Radar Chart */}
          <div className="bg-card rounded-xl border border-border p-5 shadow-card">
            <h3 className="font-bold text-foreground mb-3">Structure Health</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(218,20%,88%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  dataKey="value"
                  stroke="hsl(171,76%,34%)"
                  fill="hsl(171,76%,34%)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Selected component detail panel */}
          {selectedComponent && (
            <div className="bg-card rounded-xl border border-border p-5 shadow-card animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                {(() => {
                  const Icon =
                    iconMap[selectedComponent.icon as keyof typeof iconMap] ?? DollarSign;
                  return (
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: selectedComponent.color + "20",
                        color: selectedComponent.color,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                  );
                })()}
                <h4 className="font-bold text-sm text-foreground">
                  {selectedComponent.label}
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  {
                    l: "Annual Value",
                    v: `R ${Math.round((REFERENCE_CTC * selectedComponent.percentage) / 100).toLocaleString()}`,
                  },
                  {
                    l: "Monthly Value",
                    v: `R ${Math.round((REFERENCE_CTC * selectedComponent.percentage) / 1200).toLocaleString()}`,
                  },
                  { l: "CTC %", v: `${selectedComponent.percentage}%` },
                  { l: "Category", v: categoryLabels[selectedComponent.category] },
                  { l: "Taxable", v: selectedComponent.taxable ? "Yes" : "No" },
                ].map(({ l, v }) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-muted-foreground">{l}</span>
                    <span className="font-semibold text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
