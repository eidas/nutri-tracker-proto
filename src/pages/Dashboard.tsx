import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useMeals } from '../hooks/useMeals';
import { ProgressBar } from '../components/common/ProgressBar';
import { MacroPieChart } from '../components/Dashboard/MacroPieChart';
import { WeeklyCalorieChart } from '../components/Dashboard/WeeklyCalorieChart';
import { MealList } from '../components/MealLog/MealList';

export function Dashboard() {
  const { goals, getSummaryByDate, getWeeklyCalories, getMealsByDate, deleteMeal } = useMeals();
  const today = format(new Date(), 'yyyy-MM-dd');
  const summary = getSummaryByDate(today);
  const todayMeals = getMealsByDate(today);
  const weeklyData = getWeeklyCalories();
  const dateLabel = format(new Date(), 'M月d日（E）', { locale: ja });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">ダッシュボード</h1>
        <p className="text-slate-500 text-sm">{dateLabel}</p>
      </div>

      {/* 今日のカロリー */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-slate-700">今日のカロリー</h2>
          <div className="text-center py-2">
            <span className="text-5xl font-bold text-emerald-600">{summary.calories}</span>
            <span className="text-slate-500 ml-2">/ {goals.dailyCalories} kcal</span>
          </div>
          <ProgressBar value={summary.calories} max={goals.dailyCalories} />
          <div className="grid grid-cols-3 gap-3 text-center text-sm pt-2">
            <div>
              <div className="font-bold text-blue-600">{summary.protein}g</div>
              <div className="text-slate-500 text-xs">タンパク質</div>
              <ProgressBar value={summary.protein} max={goals.protein} color="bg-blue-500" showValue={false} />
            </div>
            <div>
              <div className="font-bold text-yellow-600">{summary.fat}g</div>
              <div className="text-slate-500 text-xs">脂質</div>
              <ProgressBar value={summary.fat} max={goals.fat} color="bg-yellow-500" showValue={false} />
            </div>
            <div>
              <div className="font-bold text-orange-500">{summary.carbs}g</div>
              <div className="text-slate-500 text-xs">炭水化物</div>
              <ProgressBar value={summary.carbs} max={goals.carbs} color="bg-orange-400" showValue={false} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="font-semibold text-slate-700 mb-2">PFCバランス（kcal）</h2>
          <MacroPieChart summary={summary} />
        </div>
      </div>

      {/* 週次グラフ */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-700 mb-4">週次カロリー推移</h2>
        <WeeklyCalorieChart data={weeklyData} goal={goals.dailyCalories} />
      </div>

      {/* 今日の食事 */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-700 mb-4">今日の食事</h2>
        <MealList meals={todayMeals} onDelete={deleteMeal} />
      </div>
    </div>
  );
}
