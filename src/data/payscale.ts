export interface Grade {
  id: number;
  grade: string;
  min: number;
  mid: number;
  max: number;
  headcount: number;
}

export const initialGrades: Grade[] = [
  { id: 1, grade: "A Band – Unskilled / operational work", min: 28000, mid: 34000, max: 40000, headcount: 42 },
  { id: 2, grade: "B Band – Semi-skilled / clerical", min: 34000, mid: 41600, max: 49200, headcount: 68 },
  { id: 3, grade: "C Band – Skilled / supervisory", min: 40000, mid: 49200, max: 58400, headcount: 85 },
  { id: 4, grade: "D Band – Middle management", min: 48000, mid: 59200, max: 70400, headcount: 102 },
  { id: 5, grade: "E Band – Senior management", min: 58000, mid: 72000, max: 86000, headcount: 94 },
  { id: 6, grade: "F Band – Executives / strategic leadership", min: 70000, mid: 87000, max: 104000, headcount: 78 },
];

export const chartColors = {
  min: "hsl(171,60%,62%)",
  mid: "hsl(171,76%,34%)",
  max: "hsl(222,60%,25%)",
};

export function calcSpreadPercent(min: number, max: number): string {
  return (((max - min) / min) * 100).toFixed(0);
}
