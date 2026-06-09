import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { NutritionSummary } from '../../types';

interface Props {
  summary: NutritionSummary;
}

const COLORS = ['#3b82f6', '#f59e0b', '#f97316'];

export function MacroPieChart({ summary }: Props) {
  const data = [
    { name: 'タンパク質', value: Math.round(summary.protein * 4) },
    { name: '脂質', value: Math.round(summary.fat * 9) },
    { name: '炭水化物', value: Math.round(summary.carbs * 4) },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
        データなし
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => [`${v} kcal`]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
