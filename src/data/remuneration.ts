export type Category = "fixed" | "variable" | "benefit";

export interface CompComponent {
  id: string;
  label: string;
  description: string;
  percentage: number;
  enabled: boolean;
  icon: string;
  color: string;
  category: Category;
  taxable: boolean;
}

export const initialComponents: CompComponent[] = [
  {
    id: "base",
    label: "Basic Salary",
    description: "Core fixed monthly remuneration",
    percentage: 60,
    enabled: true,
    icon: "DollarSign",
    color: "hsl(222,60%,30%)",
    category: "fixed",
    taxable: true,
  },
  {
    id: "housing",
    label: "Housing Allowance",
    description: "Employer contribution to housing costs",
    percentage: 12,
    enabled: true,
    icon: "House",
    color: "hsl(171,76%,34%)",
    category: "fixed",
    taxable: true,
  },
  {
    id: "transport",
    label: "Transport Allowance",
    description: "Travel and commuting reimbursement",
    percentage: 5,
    enabled: true,
    icon: "Car",
    color: "hsl(171,55%,52%)",
    category: "fixed",
    taxable: true,
  },
  {
    id: "medical",
    label: "Medical Aid",
    description: "Employer medical scheme contribution",
    percentage: 6,
    enabled: true,
    icon: "Heart",
    color: "hsl(345,80%,55%)",
    category: "benefit",
    taxable: false,
  },
  {
    id: "pension",
    label: "Pension / Provident",
    description: "Retirement fund contribution",
    percentage: 7,
    enabled: true,
    icon: "Gift",
    color: "hsl(38,92%,50%)",
    category: "benefit",
    taxable: false,
  },
  {
    id: "bonus",
    label: "Performance Bonus",
    description: "Annual performance-linked incentive",
    percentage: 8,
    enabled: true,
    icon: "DollarSign",
    color: "hsl(152,60%,40%)",
    category: "variable",
    taxable: true,
  },
  {
    id: "meals",
    label: "Meal Allowance",
    description: "Monthly subsidy for meals on duty",
    percentage: 2,
    enabled: false,
    icon: "UtensilsCrossed",
    color: "hsl(280,60%,55%)",
    category: "fixed",
    taxable: true,
  },
  {
    id: "training",
    label: "Training & Development",
    description: "Education and skills development budget",
    percentage: 2,
    enabled: false,
    icon: "GraduationCap",
    color: "hsl(200,80%,45%)",
    category: "benefit",
    taxable: false,
  },
  {
    id: "phone",
    label: "Cell Phone Allowance",
    description: "Mobile communication reimbursement",
    percentage: 1,
    enabled: false,
    icon: "Smartphone",
    color: "hsl(32,90%,48%)",
    category: "fixed",
    taxable: true,
  },
];

export const categoryLabels: Record<Category, string> = {
  fixed: "Fixed",
  variable: "Variable",
  benefit: "Benefit",
};

export const categoryStyles: Record<Category, string> = {
  fixed: "bg-teal-faint text-teal",
  variable: "bg-green-faint text-green",
  benefit: "bg-amber-faint text-amber",
};

export const REFERENCE_CTC = 500000;
