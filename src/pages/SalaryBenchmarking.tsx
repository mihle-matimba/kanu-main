import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  ReferenceLine,
} from "recharts";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  MapPin,
  Clock,
  X,
  LayoutGrid,
  List,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";
import {
  roles,
  departments,
  levels,
  getCompaRatio,
  getMarketPosition,
  type Role,
} from "@/data/benchmarking";
import { cn } from "@/lib/utils";

const positionIconMap = {
  TrendingUp,
  TrendingDown,
  Minus,
};

const statusStyles: Record<string, string> = {
  Active: "bg-green-faint text-green",
  "On Leave": "bg-amber-faint text-amber",
  Contract: "bg-teal-faint text-teal",
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; fill: string }>;
  label?: string;
};

function BenchmarkingTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const keyLabels: Record<string, string> = {
    internal: "Internal",
    p25: "P25",
    p50: "P50",
    p75: "P75",
  };
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-lg text-xs space-y-1">
      <p className="font-bold text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.fill }}>
          {keyLabels[entry.dataKey] ?? entry.dataKey}: R {entry.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const avatarColors = [
  "bg-teal/20 text-teal",
  "bg-amber/20 text-amber",
  "bg-navy-mid/30 text-navy-mid",
  "bg-green/20 text-green",
  "bg-rose/20 text-rose",
];

export default function SalaryBenchmarking() {
  const [dept, setDept] = useState("All Departments");
  const [level, setLevel] = useState("All Levels");
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>(roles[0]);
  const [activeRoleFilter, setActiveRoleFilter] = useState<string | null>(null);
  const [empView, setEmpView] = useState<"card" | "list">("card");

  const filtered = roles.filter((r) => {
    if (dept !== "All Departments" && r.dept !== dept) return false;
    if (level !== "All Levels" && r.level !== level) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const tableRows = activeRoleFilter
    ? filtered.filter((r) => r.title === activeRoleFilter)
    : filtered;

  const chartData = filtered.slice(0, 8).map((r) => ({
    name: r.title.length > 18 ? r.title.slice(0, 18) + "…" : r.title,
    internal: r.internal,
    p25: r.p25,
    p50: r.p50,
    p75: r.p75,
  }));

  const activeRoleData = activeRoleFilter
    ? roles.find((r) => r.title === activeRoleFilter)
    : null;

  const displayRole = activeRoleData ?? selectedRole;

  return (
    <div className="space-y-6">
      {/* Internal vs Market Percentiles — Bar Chart */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-foreground">Internal vs Market Percentiles</h3>
            <p className="text-xs text-muted-foreground">
              Comparing internal pay to P25, P50, P75 market data
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            {[
              { label: "Internal", color: "hsl(222,60%,25%)" },
              { label: "P25", color: "hsl(171,55%,72%)" },
              { label: "P50", color: "hsl(171,62%,52%)" },
              { label: "P75", color: "hsl(171,76%,34%)" },
            ].map(({ label, color }) => (
              <span key={label} className="flex items-center gap-1.5 text-muted-foreground">
                <span
                  className="h-2.5 w-2.5 rounded-sm inline-block"
                  style={{ backgroundColor: color }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={chartData}
            margin={{ top: 4, right: 4, bottom: 24, left: 0 }}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(218,20%,91%)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              angle={-25}
              textAnchor="end"
            />
            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<BenchmarkingTooltip />} />
            <Bar dataKey="p25" fill="hsl(171,55%,72%)" radius={[4, 4, 0, 0]} barSize={14} />
            <Bar dataKey="p50" fill="hsl(171,62%,52%)" radius={[4, 4, 0, 0]} barSize={14} />
            <Bar dataKey="p75" fill="hsl(171,76%,34%)" radius={[4, 4, 0, 0]} barSize={14} />
            <Bar dataKey="internal" fill="hsl(222,60%,25%)" radius={[4, 4, 0, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Role table */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        {/* Table header */}
        <div className="p-5 border-b border-border space-y-3">
          {/* Title + count */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground">Role Benchmarking Table</h3>
              <p className="text-xs text-muted-foreground">
                Select a role filter to view employees in that role
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">{tableRows.length}</span>{" "}
              {activeRoleFilter ? "role" : "roles"}
            </span>
          </div>

          {/* Search + dropdowns */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative flex-1 min-w-40">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search role titles…"
                className="pl-9 h-9 bg-muted/50 border-border text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select
              value={activeRoleFilter ?? "All Roles"}
              onValueChange={(val) => setActiveRoleFilter(val === "All Roles" ? null : val)}
            >
              <SelectTrigger className="w-48 h-9 bg-muted/50 border-border text-sm">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Roles">All Roles</SelectItem>
                {[...filtered]
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((role) => (
                    <SelectItem key={role.title} value={role.title}>
                      {role.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="w-44 h-9 bg-muted/50 border-border text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-36 h-9 bg-muted/50 border-border text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {levels.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Role", "Department", "Level", "Internal", "P25", "P50", "P75", "Compa-Ratio", "Position"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left text-xs font-semibold text-muted-foreground px-4 py-3"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((role) => {
                const ratio = getCompaRatio(role.internal, role.p50);
                const pos = getMarketPosition(role.internal, role.p25, role.p50, role.p75);
                const PosIcon = positionIconMap[pos.icon as keyof typeof positionIconMap];
                const isSelected = selectedRole.title === role.title;
                return (
                  <tr
                    key={role.title}
                    onClick={() => setSelectedRole(role)}
                    className={`border-b border-border cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-teal/5 border-l-2 border-l-teal"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-foreground">{role.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{role.dept}</td>
                    <td className="px-4 py-3 text-muted-foreground">{role.level}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      R {role.internal.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      R {role.p25.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      R {role.p50.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      R {role.p75.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-bold text-sm ${
                          parseFloat(ratio) >= 100
                            ? "text-green"
                            : parseFloat(ratio) < 90
                            ? "text-rose"
                            : "text-amber"
                        }`}
                      >
                        {ratio}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${pos.color}`}
                      >
                        <PosIcon size={11} />
                        {pos.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Employee panel — shown when a role is active */}
        {activeRoleData && (
          <div className="border-t border-border p-5 animate-fade-in">
            {/* Panel header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-teal/10 flex items-center justify-center">
                  <Users size={16} className="text-teal" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">
                    People in {activeRoleData.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {activeRoleData.dept} · {activeRoleData.level} ·{" "}
                    {activeRoleData.employees.length} shown
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex items-center rounded-lg border border-border bg-muted/40 p-0.5">
                  <button
                    onClick={() => setEmpView("card")}
                    title="Card view"
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                      empView === "card"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <LayoutGrid size={13} />
                    Cards
                  </button>
                  <button
                    onClick={() => setEmpView("list")}
                    title="List view"
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                      empView === "list"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <List size={13} />
                    List
                  </button>
                </div>

                <button
                  onClick={() => setActiveRoleFilter(null)}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <X size={13} /> Clear filter
                </button>
              </div>
            </div>

            {/* Card view */}
            {empView === "card" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {activeRoleData.employees.map((emp, i) => (
                  <div
                    key={emp.name}
                    className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={cn(
                        "h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-xs font-bold",
                        avatarColors[i % avatarColors.length]
                      )}
                    >
                      {initials(emp.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">{emp.name}</p>
                      <p className="text-xs font-medium text-teal mt-0.5">
                        R {emp.salary.toLocaleString()}
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <MapPin size={9} />
                          {emp.location}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock size={9} />
                          {emp.tenure}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full",
                        statusStyles[emp.status]
                      )}
                    >
                      {emp.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* List view */}
            {empView === "list" && (
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      {["Name", "Salary", "Location", "Tenure", "Status"].map((col) => (
                        <th
                          key={col}
                          className="text-left text-xs font-semibold text-muted-foreground px-4 py-3"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeRoleData.employees.map((emp, i) => (
                      <tr
                        key={emp.name}
                        className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                "h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold",
                                avatarColors[i % avatarColors.length]
                              )}
                            >
                              {initials(emp.name)}
                            </div>
                            <span className="font-semibold text-foreground">{emp.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-teal">
                          R {emp.salary.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin size={11} />
                            {emp.location}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {emp.tenure}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "text-[11px] font-semibold px-2.5 py-0.5 rounded-full",
                              statusStyles[emp.status]
                            )}
                          >
                            {emp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Role detail panel — driven by role dropdown filter or clicked row */}
      {displayRole && (() => {
        const r = displayRole;
        const pos = getMarketPosition(r.internal, r.p25, r.p50, r.p75);
        const PosIcon = positionIconMap[pos.icon as keyof typeof positionIconMap];
        const ratio = getCompaRatio(r.internal, r.p50);
        const gapData = [
          { label: "vs P25", gap: r.internal - r.p25 },
          { label: "vs P50", gap: r.internal - r.p50 },
          { label: "vs P75", gap: r.internal - r.p75 },
        ];
        const maxAbs = Math.max(...gapData.map((d) => Math.abs(d.gap)));
        const yPad = Math.ceil(maxAbs * 0.18);
        const yDomain = [-(maxAbs + yPad), maxAbs + yPad];
        const yTicks = [yDomain[0], Math.round(yDomain[0] / 2), 0, Math.round(yDomain[1] / 2), yDomain[1]];

        return (
          <div className="bg-card rounded-xl border border-border shadow-card animate-fade-in overflow-hidden">
            {/* Header strip */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="font-bold text-foreground text-base leading-tight">{r.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {r.dept} · {r.level} · {r.headcount} employees
                </p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${pos.color}`}>
                <PosIcon size={12} />
                {pos.label}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-border">

              {/* ── Left: Gap bar chart ── */}
              <div className="lg:col-span-3 p-5">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Internal vs Market Gap</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Positive = above percentile · Negative = below percentile
                    </p>
                  </div>
                  <div className="flex gap-3 text-[11px] text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm inline-block" style={{ background: "hsl(171,76%,34%)" }} />
                      Above
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm inline-block" style={{ background: "hsl(350,72%,54%)" }} />
                      Below
                    </span>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={gapData}
                    margin={{ top: 32, right: 16, bottom: 8, left: 4 }}
                    barCategoryGap="0%"
                    barSize={120}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(218,20%,91%)" vertical={false} />
                    <XAxis
                      dataKey="label"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fontWeight: 600, fill: "hsl(222,30%,40%)" }}
                    />
                    <YAxis
                      domain={yDomain}
                      ticks={yTicks}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "hsl(218,15%,55%)" }}
                      tickFormatter={(v) => v === 0 ? "R0" : `R${(v / 1000).toFixed(0)}k`}
                      width={44}
                    />
                    <Tooltip
                      cursor={{ fill: "hsl(218,20%,96%)" }}
                      formatter={(value: number) => [
                        `${value >= 0 ? "+" : ""}R ${Math.abs(value).toLocaleString()}`,
                        "Gap vs Internal",
                      ]}
                    />
                    <ReferenceLine y={0} stroke="hsl(218,20%,70%)" strokeWidth={1.5} />
                    <Bar dataKey="gap" radius={[6, 6, 0, 0]}>
                      <LabelList
                        dataKey="gap"
                        position="top"
                        formatter={(v: number) =>
                          `${v >= 0 ? "+" : ""}R ${(Math.abs(v) / 1000).toFixed(1)}k`
                        }
                        style={{ fontSize: 11, fontWeight: 700, fill: "hsl(222,30%,30%)" }}
                      />
                      {gapData.map((entry) => (
                        <Cell
                          key={entry.label}
                          fill={entry.gap >= 0 ? "hsl(171,76%,34%)" : "hsl(350,72%,54%)"}
                          fillOpacity={0.88}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* ── Right: Stats ── */}
              <div className="lg:col-span-2 p-5 flex flex-col gap-4">
                <p className="text-xs font-semibold text-foreground">Key Figures</p>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: "Internal Salary", val: `R ${r.internal.toLocaleString()}`, highlight: true },
                    { label: "Market P50",       val: `R ${r.p50.toLocaleString()}` },
                    {
                      label: "Compa-Ratio",
                      val: `${ratio}%`,
                      highlight: true,
                      accent:
                        parseFloat(ratio) >= 100 ? "text-green" :
                        parseFloat(ratio) < 90   ? "text-rose"  : "text-amber",
                    },
                    {
                      label: "Gap to P50",
                      val: `${r.internal >= r.p50 ? "+" : "-"}R ${Math.abs(r.p50 - r.internal).toLocaleString()}`,
                      accent: r.internal >= r.p50 ? "text-green" : "text-rose",
                    },
                  ].map(({ label, val, highlight, accent }) => (
                    <div key={label} className="bg-muted/50 rounded-xl p-3.5">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">{label}</p>
                      <p className={`text-sm mt-1 ${highlight ? "font-bold" : "font-semibold"} ${accent ?? "text-foreground"}`}>
                        {val}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Market range bar */}
                <div>
                  <p className="text-[10px] uppercase tracking-wide font-medium text-muted-foreground mb-2">Market Range</p>
                  <div className="relative h-10 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 flex">
                      <div className="flex-1" style={{ background: "hsl(171,55%,72%,0.4)" }} />
                      <div className="flex-1" style={{ background: "hsl(171,62%,52%,0.4)" }} />
                      <div className="flex-1" style={{ background: "hsl(171,76%,34%,0.4)" }} />
                    </div>
                    <div className="absolute inset-0 flex items-center px-2.5 justify-between">
                      <span className="text-[10px] font-semibold text-foreground/70">P25: R {r.p25.toLocaleString()}</span>
                      <span className="text-[10px] font-semibold text-foreground/70">P50: R {r.p50.toLocaleString()}</span>
                      <span className="text-[10px] font-semibold text-foreground/70">P75: R {r.p75.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
