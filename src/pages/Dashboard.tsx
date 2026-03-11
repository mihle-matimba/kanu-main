import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  TrendingUp,
  CircleCheck,
  TriangleAlert,
  ChartNoAxesColumn,
} from "lucide-react";
import {
  statCards,
  salaryTrendData,
  departmentSalaryData,
  recentActivityData,
  activityStatusStyles,
} from "@/data/dashboard";

/** * UPDATED GRADING SYSTEM: Teal Monochromatic Scale
 */
const gradeDistributionData = [
  { name: "A Band – Unskilled / Operational", value: 35, fill: "#0f766e" }, // Teal-700
  { name: "B Band – Semi-skilled / Clerical", value: 25, fill: "#0d9488" }, // Teal-600
  { name: "C Band – Skilled / Supervisory", value: 20, fill: "#14b8a6" }, // Teal-500
  { name: "D Band – Middle Management", value: 12, fill: "#2dd4bf" }, // Teal-400
  { name: "E Band – Senior Management", value: 5, fill: "#5eead4" },  // Teal-300
  { name: "F Band – Executives / Leadership", value: 3, fill: "#99f6e4" },  // Teal-200
];

const iconMap = {
  Users,
  TrendingUp,
  CircleCheck,
  TriangleAlert,
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
};

function SalaryTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: R {entry.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

function DeptTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          Avg Salary: R {entry.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-sm border border-border/50 bg-white"
        style={{
          backgroundImage: `url('/assets/New%20Banner.jpeg')`,
          backgroundSize: 'auto 100%',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          minHeight: '200px',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20" />

        <div className="relative z-10 px-8 py-7 w-full max-w-2xl flex flex-col justify-between gap-4">
          {/* Welcome block */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-600 mb-2">
              Good day
            </p>
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Welcome back,
            </h1>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight"
              style={{ color: 'hsl(171,76%,28%)' }}>
              Sthembiso Nkomo
            </h1>
          </div>

          {/* Divider + report tag */}
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-slate-300" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              FY 2026 — Q1 Report
            </p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              Compensation Intelligence at a Glance
            </span>
          </div>
        </div>
      </div>

      {/* KPI stat cards - Back to Teal highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap];
          const colorClass = "bg-teal-500/10 text-teal-600";
          
          return (
            <div
              key={card.label}
              className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-lg-custom transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                  <Icon size={18} />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    card.up ? "text-teal-600" : "text-amber-600"
                  }`}
                >
                  {card.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground tracking-tight">
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Salary trend + Pay Grade Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Salary vs Market Trend — Area Chart (Teal Theme) */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-foreground">Salary vs Market Trend</h3>
              <p className="text-xs text-muted-foreground">
                Avg base salary vs market median (P50)
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              {[
                { label: "Company Avg", color: "hsl(171,76%,34%)" },
                { label: "Market P50", color: "#94a3b8" },
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
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={salaryTrendData}
              margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(171,76%,34%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(171,76%,34%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218,20%,91%)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<SalaryTooltip />} />
              <Area
                type="monotone"
                dataKey="avg"
                name="Company Avg"
                stroke="hsl(171,76%,34%)"
                fill="url(#avgGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="market"
                name="Market P50"
                stroke="#94a3b8"
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="4 3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pay Grade Distribution — Pie Chart (Teal Theme) */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <h3 className="font-bold text-foreground mb-1">Pay Grade Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Employee headcount by grade band
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={gradeDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {gradeDistributionData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-4">
            {gradeDistributionData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-2 text-muted-foreground max-w-[80%]">
                  <span
                    className="h-2 w-2 rounded-sm inline-block shrink-0"
                    style={{ backgroundColor: entry.fill }}
                  />
                  <span className="truncate">{entry.name}</span>
                </span>
                <span className="font-semibold text-foreground">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dept Avg Salary + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Average Salary by Department — Bar Chart (Teal Theme) */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-foreground">Average Salary by Department</h3>
              <p className="text-xs text-muted-foreground">
                Annual base salary · FY 2026
              </p>
            </div>
            <ChartNoAxesColumn size={16} className="text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={departmentSalaryData}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              barSize={32}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218,20%,91%)" vertical={false} />
              <XAxis
                dataKey="dept"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<DeptTooltip />} />
              <Bar
                dataKey="avg"
                fill="hsl(171,76%,34%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-bold text-foreground">Recent Activity</h3>
            <p className="text-xs text-muted-foreground">Latest compensation events</p>
          </div>
          <ul className="divide-y divide-border">
            {recentActivityData.map((item) => (
              <li key={item.role} className="flex items-start gap-3 px-5 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.dept} · {item.time}
                  </p>
                </div>
                <span
                  className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-100`}
                >
                  {item.action}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}