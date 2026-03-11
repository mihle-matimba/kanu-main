export interface Role {
  title: string;
  dept: string;
  level: string;
  internal: number;
  p25: number;
  p50: number;
  p75: number;
  headcount: number;
}

export const departments = [
  "All Departments",
  "Engineering",
  "Finance",
  "Marketing",
  "HR",
  "Operations",
  "Sales",
];

export const levels = [
  "All Levels",
  "Junior",
  "Mid",
  "Senior",
  "Lead",
  "Manager",
  "Director",
];

export const roles: Role[] = [
  { title: "Software Engineer", dept: "Engineering", level: "Mid", internal: 78000, p25: 72000, p50: 80000, p75: 91000, headcount: 45 },
  { title: "Senior Software Engineer", dept: "Engineering", level: "Senior", internal: 98000, p25: 92000, p50: 104000, p75: 118000, headcount: 38 },
  { title: "Engineering Lead", dept: "Engineering", level: "Lead", internal: 115000, p25: 110000, p50: 122000, p75: 138000, headcount: 12 },
  { title: "Finance Analyst", dept: "Finance", level: "Junior", internal: 52000, p25: 55000, p50: 62000, p75: 70000, headcount: 18 },
  { title: "Senior Finance Analyst", dept: "Finance", level: "Senior", internal: 72000, p25: 68000, p50: 76000, p75: 85000, headcount: 10 },
  { title: "Finance Manager", dept: "Finance", level: "Manager", internal: 94000, p25: 89000, p50: 99000, p75: 112000, headcount: 6 },
  { title: "Marketing Coordinator", dept: "Marketing", level: "Junior", internal: 44000, p25: 46000, p50: 52000, p75: 59000, headcount: 22 },
  { title: "Marketing Manager", dept: "Marketing", level: "Manager", internal: 78000, p25: 72000, p50: 82000, p75: 94000, headcount: 8 },
  { title: "HR Business Partner", dept: "HR", level: "Mid", internal: 62000, p25: 60000, p50: 68000, p75: 77000, headcount: 14 },
  { title: "HR Manager", dept: "HR", level: "Manager", internal: 84000, p25: 80000, p50: 90000, p75: 102000, headcount: 4 },
  { title: "Operations Analyst", dept: "Operations", level: "Mid", internal: 58000, p25: 56000, p50: 63000, p75: 72000, headcount: 34 },
  { title: "Operations Lead", dept: "Operations", level: "Lead", internal: 74000, p25: 70000, p50: 80000, p75: 90000, headcount: 9 },
  { title: "Sales Representative", dept: "Sales", level: "Junior", internal: 48000, p25: 45000, p50: 52000, p75: 60000, headcount: 42 },
  { title: "Senior Sales Executive", dept: "Sales", level: "Senior", internal: 72000, p25: 65000, p50: 74000, p75: 86000, headcount: 28 },
  { title: "Sales Director", dept: "Sales", level: "Director", internal: 138000, p25: 128000, p50: 145000, p75: 162000, headcount: 5 },
];

export function getCompaRatio(internal: number, p50: number): string {
  return ((internal / p50) * 100).toFixed(1);
}

export interface MarketPosition {
  label: string;
  color: string;
  icon: string;
}

export function getMarketPosition(
  internal: number,
  p25: number,
  p50: number,
  p75: number
): MarketPosition {
  if (internal < p25) return { label: "Below P25", color: "bg-rose-faint text-rose", icon: "TrendingDown" };
  if (internal < p50) return { label: "P25–P50", color: "bg-amber-faint text-amber", icon: "Minus" };
  if (internal < p75) return { label: "P50–P75", color: "bg-teal-faint text-teal", icon: "TrendingUp" };
  return { label: "Above P75", color: "bg-green-faint text-green", icon: "TrendingUp" };
}
