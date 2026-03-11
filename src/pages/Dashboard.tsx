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
  gradeDistributionData,
  recentActivityData,
  activityStatusStyles,
} from "@/data/dashboard";
import heroBanner from "../../assets/hero-banner-Ak053so-.jpg";

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
        className="relative rounded-2xl overflow-hidden h-44 flex items-end"
        style={{
          backgroundImage: `url(${heroBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-transparent" />
        <div className="relative z-10 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-light mb-1">
            FY 2025 — Q2 Report
          </p>
          <h2 className="text-2xl font-bold text-primary-foreground leading-tight">
            Compensation Intelligence
            <br />
            at a Glance
          </h2>
        </div>
      </div>

      {/* KPI stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap];
          return (
            <div
              key={card.label}
              className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-lg-custom transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${card.color}`}>
                  <Icon size={18} />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    card.up ? "text-green" : "text-amber"
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
        {/* Salary vs Market Trend — Area Chart */}
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
                { label: "Market P50", color: "hsl(38,92%,50%)" },
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
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={salaryTrendData}
              margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(171,76%,34%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(171,76%,34%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="mktGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38,92%,50%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(38,92%,50%)" stopOpacity={0} />
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
                stroke="hsl(38,92%,50%)"
                fill="url(#mktGrad)"
                strokeWidth={2}
                strokeDasharray="4 3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pay Grade Distribution — Pie Chart */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <h3 className="font-bold text-foreground mb-1">Pay Grade Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Employee headcount by grade band
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={gradeDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {gradeDistributionData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {gradeDistributionData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span
                    className="h-2 w-2 rounded-sm inline-block"
                    style={{ backgroundColor: entry.fill }}
                  />
                  {entry.name}
                </span>
                <span className="font-semibold text-foreground">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dept Avg Salary + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Average Salary by Department — Bar Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-foreground">Average Salary by Department</h3>
              <p className="text-xs text-muted-foreground">
                Annual base salary · FY 2025
              </p>
            </div>
            <ChartNoAxesColumn size={16} className="text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={departmentSalaryData}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              barSize={28}
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
              <li key={item.role} className="flex items-start gap-3 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.dept} · {item.time}
                  </p>
                </div>
                <span
                  className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    activityStatusStyles[item.status]
                  }`}
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
