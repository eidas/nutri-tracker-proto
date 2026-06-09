import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMeals } from '../hooks/useMeals';
import { MealList } from '../components/MealLog/MealList';

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { getSummaryByDate, getMealsByDate, deleteMeal, goals } = useMeals();

  const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
  const startPad = getDay(days[0]); // 0=Sun

  const getColor = (cal: number, goal: number) => {
    if (cal === 0) return '';
    const ratio = cal / goal;
    if (ratio > 1.1) return 'bg-red-100 text-red-700';
    if (ratio >= 0.9) return 'bg-emerald-100 text-emerald-700';
    return 'bg-sky-100 text-sky-700';
  };

  const selectedStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
  const selectedMeals = selectedStr ? getMealsByDate(selectedStr) : [];
  const selectedSummary = selectedStr ? getSummaryByDate(selectedStr) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">カレンダー</h1>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        {/* 月ナビ */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-slate-100 rounded-lg">
            <ChevronLeft size={20} />
          </button>
          <span className="font-semibold text-slate-800">
            {format(currentMonth, 'yyyy年M月', { locale: ja })}
          </span>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-slate-100 rounded-lg">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* 曜日ヘッダー */}
        <div className="grid grid-cols-7 mb-2">
          {['日', '月', '火', '水', '木', '金', '土'].map((d) => (
            <div key={d} className="text-center text-xs font-medium text-slate-500 py-1">{d}</div>
          ))}
        </div>

        {/* 日付グリッド */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startPad }).map((_, i) => <div key={`pad-${i}`} />)}
          {days.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const summary = getSummaryByDate(dateStr);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            const colorClass = getColor(summary.calories, goals.dailyCalories);

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(day)}
                className={`rounded-lg p-1 text-center transition-all border-2 ${
                  isSelected ? 'border-emerald-500' : 'border-transparent'
                } ${isToday ? 'ring-1 ring-slate-400' : ''} hover:bg-slate-50`}
              >
                <div className={`text-xs font-medium mb-0.5 w-6 h-6 flex items-center justify-center rounded-full mx-auto ${isToday ? 'bg-slate-800 text-white' : 'text-slate-700'}`}>
                  {format(day, 'd')}
                </div>
                {summary.calories > 0 && (
                  <div className={`text-[10px] rounded px-0.5 ${colorClass}`}>
                    {summary.calories}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 凡例 */}
        <div className="flex gap-3 mt-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-100 inline-block" />目標達成</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-sky-100 inline-block" />不足</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 inline-block" />超過</span>
        </div>
      </div>

      {/* 選択日の詳細 */}
      {selectedDate && (
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="font-semibold text-slate-700 mb-1">
            {format(selectedDate, 'M月d日（E）', { locale: ja })}の食事
          </h2>
          {selectedSummary && selectedSummary.calories > 0 && (
            <p className="text-sm text-slate-500 mb-4">
              合計 {selectedSummary.calories} kcal · P {selectedSummary.protein}g · F {selectedSummary.fat}g · C {selectedSummary.carbs}g
            </p>
          )}
          <MealList meals={selectedMeals} onDelete={deleteMeal} />
        </div>
      )}
    </div>
  );
}
