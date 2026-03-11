import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Plus, PenLine, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  initialGrades,
  chartColors,
  calcSpreadPercent,
  type Grade,
} from "@/data/payscale";

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; fill?: string; stroke?: string }>;
  label?: string;
};

function PayScaleTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const keyLabels: Record<string, string> = {
    min: "Minimum",
    mid: "Midpoint",
    max: "Maximum",
  };
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-lg text-xs space-y-1">
      <p className="font-bold text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.fill || entry.stroke }}>
          {keyLabels[entry.dataKey] ?? entry.dataKey}: R {entry.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function PayScaleDesign() {
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<Grade>>({});

  const chartData = grades.map((g) => ({
    name: g.grade,
    min: g.min,
    mid: g.mid,
    max: g.max,
  }));

  function startEdit(grade: Grade) {
    setEditingId(grade.id);
    setEditValues({
      grade: grade.grade,
      min: grade.min,
      mid: grade.mid,
      max: grade.max,
      headcount: grade.headcount,
    });
  }

  function saveEdit(id: number) {
    setGrades((prev) => prev.map((g) => (g.id === id ? { ...g, ...editValues } : g)));
    setEditingId(null);
    setEditValues({});
  }

  function addGrade() {
    const last = grades[grades.length - 1];
    const min = Math.round(last.max * 0.9);
    const mid = Math.round(min * 1.25);
    const max = Math.round(min * 1.5);
    setGrades((prev) => [
      ...prev,
      {
        id: Date.now(),
        grade: `Grade ${prev.length + 1}`,
        min,
        mid,
        max,
        headcount: 0,
      },
    ]);
  }

  function deleteGrade(id: number) {
    setGrades((prev) => prev.filter((g) => g.id !== id));
  }

  const totalGrades = grades.length;
  const salaryMin = grades[0]?.min ?? 0;
  const salaryMax = grades[grades.length - 1]?.max ?? 0;
  const avgSpread =
    grades.reduce((sum, g) => sum + parseFloat(calcSpreadPercent(g.min, g.max)), 0) /
    grades.length;
  const overlaps = grades.reduce((count, g, i) => {
    if (i === 0) return count;
    return g.min < grades[i - 1].max ? count + 1 : count;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Grades", value: totalGrades, note: "Pay grades defined" },
          {
            label: "Salary Range",
            value: `R ${(salaryMin / 1000).toFixed(0)}k–R ${(salaryMax / 1000).toFixed(0)}k`,
            note: "Min to max",
          },
          {
            label: "Avg Spread %",
            value: `${avgSpread.toFixed(0)}%`,
            note: "Range width avg",
          },
          { label: "Grade Overlaps", value: overlaps, note: "Grades with overlap" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-4 shadow-card"
          >
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs font-semibold text-foreground mt-0.5">{stat.label}</p>
            <p className="text-[11px] text-muted-foreground">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* Pay Scale Visualization — Bar Chart */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-foreground">Pay Scale Visualization</h3>
            <p className="text-xs text-muted-foreground">
              Min · Midpoint · Max salary bands across all grades
            </p>
          </div>
          <div className="flex gap-3 text-xs">
            {[
              { label: "Min", color: chartColors.min },
              { label: "Mid", color: chartColors.mid },
              { label: "Max", color: chartColors.max },
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
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(218,20%,91%)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<PayScaleTooltip />} />
            <Bar dataKey="min" fill={chartColors.min} radius={[4, 4, 0, 0]} barSize={14} />
            <Bar dataKey="mid" fill={chartColors.mid} radius={[4, 4, 0, 0]} barSize={14} />
            <Bar dataKey="max" fill={chartColors.max} radius={[4, 4, 0, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Grade Table */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="font-bold text-foreground">Grade Table</h3>
            <p className="text-xs text-muted-foreground">
              Click the edit icon to modify any grade inline
            </p>
          </div>
          <Button
            size="sm"
            onClick={addGrade}
            className="bg-teal text-accent-foreground hover:bg-teal-light text-xs gap-1.5"
          >
            <Plus size={14} />
            Add Grade
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Grade", "Minimum", "Midpoint", "Maximum", "Spread %", "Headcount", "Actions"].map(
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
              {grades.map((grade) => {
                const isEditing = editingId === grade.id;
                const spread = calcSpreadPercent(
                  isEditing ? (editValues.min ?? grade.min) : grade.min,
                  isEditing ? (editValues.max ?? grade.max) : grade.max
                );
                return (
                  <tr
                    key={grade.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    {/* Grade name */}
                    <td className="px-4 py-2.5">
                      {isEditing ? (
                        <Input
                          value={editValues.grade ?? ""}
                          onChange={(e) =>
                            setEditValues((prev) => ({ ...prev, grade: e.target.value }))
                          }
                          className="h-8 text-xs w-28"
                        />
                      ) : (
                        <span className="font-semibold text-foreground">{grade.grade}</span>
                      )}
                    </td>

                    {/* Min / Mid / Max */}
                    {(["min", "mid", "max"] as const).map((field) => (
                      <td key={field} className="px-4 py-2.5">
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editValues[field] ?? 0}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                [field]: Number(e.target.value),
                              }))
                            }
                            className="h-8 text-xs w-28"
                          />
                        ) : (
                          <span className="text-foreground">
                            R {grade[field].toLocaleString()}
                          </span>
                        )}
                      </td>
                    ))}

                    {/* Spread */}
                    <td className="px-4 py-2.5">
                      <span
                        className={`text-xs font-semibold ${
                          parseFloat(spread) > 60 ? "text-amber" : "text-teal"
                        }`}
                      >
                        {spread}%
                      </span>
                    </td>

                    {/* Headcount */}
                    <td className="px-4 py-2.5">
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editValues.headcount ?? 0}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              headcount: Number(e.target.value),
                            }))
                          }
                          className="h-8 text-xs w-20"
                        />
                      ) : (
                        <span className="text-muted-foreground">{grade.headcount}</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <Button
                            size="sm"
                            onClick={() => saveEdit(grade.id)}
                            className="h-7 text-xs bg-teal text-accent-foreground hover:bg-teal-light"
                          >
                            Save
                          </Button>
                        ) : (
                          <button
                            onClick={() => startEdit(grade)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <PenLine size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteGrade(grade.id)}
                          className="text-muted-foreground hover:text-rose transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
