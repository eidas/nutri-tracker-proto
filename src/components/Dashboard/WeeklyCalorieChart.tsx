import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Props {
  data: { date: string; calories: number }[];
  goal: number;
}

export function WeeklyCalorieChart({ data, goal }: Props) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(v) => [`${v} kcal`, 'カロリー']} />
        <ReferenceLine y={goal} stroke="#10b981" strokeDasharray="4 4" label={{ value: '目標', fill: '#10b981', fontSize: 11 }} />
        <Bar dataKey="calories" fill="#6ee7b7" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
