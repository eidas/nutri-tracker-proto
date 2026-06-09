import { useState } from 'react';
import { format } from 'date-fns';
import { useMeals } from '../hooks/useMeals';
import type { Goals } from '../types';

export function Settings() {
  const { goals, setGoals, weights, addWeight } = useMeals();
  const [form, setForm] = useState<Goals>({ ...goals });
  const [weightInput, setWeightInput] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setGoals(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleWeightAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weightInput) return;
    addWeight(Number(weightInput));
    setWeightInput('');
  };

  const recentWeights = [...weights].reverse().slice(0, 10);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">設定</h1>

      {/* 目標設定 */}
      <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold text-slate-700">1日の目標</h2>
        {([
          { key: 'dailyCalories', label: 'カロリー', unit: 'kcal' },
          { key: 'protein', label: 'タンパク質', unit: 'g' },
          { key: 'fat', label: '脂質', unit: 'g' },
          { key: 'carbs', label: '炭水化物', unit: 'g' },
        ] as const).map(({ key, label, unit }) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-28 text-sm text-slate-600 shrink-0">{label}</label>
            <input
              type="number"
              value={form[key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
              min="0"
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <span className="text-sm text-slate-500 w-8">{unit}</span>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg py-2 transition-colors"
        >
          {saved ? '保存しました ✓' : '保存する'}
        </button>
      </form>

      {/* 体重記録 */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold text-slate-700">体重記録</h2>
        <form onSubmit={handleWeightAdd} className="flex gap-2">
          <input
            type="number"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            placeholder="今日の体重 (kg)"
            step="0.1"
            min="0"
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            記録
          </button>
        </form>
        {recentWeights.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-slate-500 uppercase">履歴</h3>
            {recentWeights.map((w) => (
              <div key={w.date} className="flex justify-between text-sm border-b border-slate-100 pb-1">
                <span className="text-slate-500">{format(new Date(w.date), 'yyyy/MM/dd')}</span>
                <span className="font-medium">{w.weight} kg</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
