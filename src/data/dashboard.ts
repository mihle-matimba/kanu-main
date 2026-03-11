export const statCards = [
  {
    label: "Total Employees",
    value: "1,248",
    change: "+3.2%",
    up: true,
    icon: "Users",
    color: "bg-teal-faint text-teal",
  },
  {
    label: "Avg. Base Salary",
    value: "R 68,400",
    change: "+5.8%",
    up: true,
    icon: "TrendingUp",
    color: "bg-teal-faint text-teal",
  },
  {
    label: "Pay Equity Score",
    value: "87 / 100",
    change: "+4 pts",
    up: true,
    icon: "CircleCheck",
    color: "bg-green-faint text-green",
  },
  {
    label: "Roles Below P50",
    value: "34",
    change: "-12%",
    up: false,
    icon: "TriangleAlert",
    color: "bg-amber-faint text-amber",
  },
];

export const salaryTrendData = [
  { month: "Jan", avg: 62000, market: 64000 },
  { month: "Feb", avg: 63200, market: 64500 },
  { month: "Mar", avg: 64800, market: 65200 },
  { month: "Apr", avg: 65100, market: 65800 },
  { month: "May", avg: 66400, market: 66900 },
  { month: "Jun", avg: 67200, market: 67500 },
  { month: "Jul", avg: 68000, market: 68200 },
  { month: "Aug", avg: 68400, market: 68600 },
];

export const departmentSalaryData = [
  { dept: "Engineering", avg: 92000, headcount: 312 },
  { dept: "Finance", avg: 78000, headcount: 87 },
  { dept: "Marketing", avg: 65000, headcount: 143 },
  { dept: "HR", avg: 58000, headcount: 56 },
  { dept: "Operations", avg: 62000, headcount: 204 },
  { dept: "Sales", avg: 71000, headcount: 189 },
];

export const gradeDistributionData = [
  { name: "Grade 1–3", value: 18, fill: "#0d9488" },
  { name: "Grade 4–6", value: 34, fill: "#14b8a6" },
  { name: "Grade 7–9", value: 28, fill: "#2dd4bf" },
  { name: "Grade 10+", value: 20, fill: "#99f6e4" },
];

export const recentActivityData = [
  {
    role: "Senior Software Engineer",
    dept: "Engineering",
    action: "Benchmarked",
    time: "2h ago",
    status: "above",
  },
  {
    role: "Marketing Manager",
    dept: "Marketing",
    action: "Grade Updated",
    time: "4h ago",
    status: "match",
  },
  {
    role: "Finance Analyst",
    dept: "Finance",
    action: "Below P50",
    time: "Yesterday",
    status: "below",
  },
  {
    role: "HR Business Partner",
    dept: "HR",
    action: "Benchmarked",
    time: "Yesterday",
    status: "match",
  },
  {
    role: "Operations Lead",
    dept: "Operations",
    action: "Grade Updated",
    time: "2d ago",
    status: "above",
  },
];

export const activityStatusStyles: Record<string, string> = {
  above: "bg-green-faint text-green",
  match: "bg-teal-faint text-teal",
  below: "bg-amber-faint text-amber",
};
