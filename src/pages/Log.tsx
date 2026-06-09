import { useState } from 'react';
import { format } from 'date-fns';
import { useMeals } from '../hooks/useMeals';
import { MealForm } from '../components/MealLog/MealForm';
import { MealList } from '../components/MealLog/MealList';
import { ProgressBar } from '../components/common/ProgressBar';

export function Log() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [viewDate, setViewDate] = useState(today);
  const { addMeal, getMealsByDate, deleteMeal, getSummaryByDate, goals } = useMeals();
  const meals = getMealsByDate(viewDate);
  const summary = getSummaryByDate(viewDate);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">食事記録</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MealForm onAdd={addMeal} defaultDate={viewDate} />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-600 font-medium shrink-0">表示日：</label>
            <input
              type="date"
              value={viewDate}
              onChange={(e) => setViewDate(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* 栄養サマリー */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-slate-700 text-sm">摂取サマリー</h3>
            <ProgressBar value={summary.calories} max={goals.dailyCalories} label="カロリー (kcal)" color="bg-emerald-500" />
            <ProgressBar value={summary.protein} max={goals.protein} label="タンパク質 (g)" color="bg-blue-500" />
            <ProgressBar value={summary.fat} max={goals.fat} label="脂質 (g)" color="bg-yellow-500" />
            <ProgressBar value={summary.carbs} max={goals.carbs} label="炭水化物 (g)" color="bg-orange-400" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-700 mb-4">食事リスト</h2>
        <MealList meals={meals} onDelete={deleteMeal} />
      </div>
    </div>
  );
}
