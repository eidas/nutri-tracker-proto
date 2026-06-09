import { Trash2 } from 'lucide-react';
import type { Meal, MealType } from '../../types';

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: '朝食',
  lunch: '昼食',
  dinner: '夕食',
  snack: '間食',
};

const MEAL_COLORS: Record<MealType, string> = {
  breakfast: 'bg-amber-100 text-amber-700',
  lunch: 'bg-sky-100 text-sky-700',
  dinner: 'bg-violet-100 text-violet-700',
  snack: 'bg-pink-100 text-pink-700',
};

interface Props {
  meals: Meal[];
  onDelete: (id: string) => void;
}

export function MealList({ meals, onDelete }: Props) {
  if (meals.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p className="text-4xl mb-3">🍽️</p>
        <p>食事が記録されていません</p>
      </div>
    );
  }

  const grouped = (['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((type) => ({
    type,
    items: meals.filter((m) => m.mealType === type),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-4">
      {grouped.map(({ type, items }) => (
        <div key={type}>
          <div className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${MEAL_COLORS[type]}`}>
            {MEAL_LABELS[type]}
          </div>
          <div className="space-y-2">
            {items.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 truncate">{meal.foodName}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {meal.amount}g · P {meal.protein}g · F {meal.fat}g · C {meal.carbs}g
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-3 shrink-0">
                  <span className="font-semibold text-emerald-600">{meal.calories} kcal</span>
                  <button
                    onClick={() => onDelete(meal.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
