import { useState, useMemo } from 'react';
import { FOOD_DATABASE } from '../../data/foods';
import { calcNutrition } from '../../utils/nutrition';
import type { MealType, Meal } from '../../types';
import { format } from 'date-fns';

interface Props {
  onAdd: (meal: Omit<Meal, 'id' | 'createdAt'>) => void;
  defaultDate?: string;
}

const MEAL_TYPES: { value: MealType; label: string }[] = [
  { value: 'breakfast', label: '朝食' },
  { value: 'lunch', label: '昼食' },
  { value: 'dinner', label: '夕食' },
  { value: 'snack', label: '間食' },
];

export function MealForm({ onAdd, defaultDate }: Props) {
  const today = defaultDate ?? format(new Date(), 'yyyy-MM-dd');
  const [date, setDate] = useState(today);
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [query, setQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<typeof FOOD_DATABASE[0] | null>(null);
  const [amount, setAmount] = useState('100');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(
    () =>
      query.length >= 1
        ? FOOD_DATABASE.filter((f) => f.name.includes(query)).slice(0, 8)
        : [],
    [query]
  );

  const nutrition = selectedFood ? calcNutrition(selectedFood, Number(amount) || 0) : null;

  const handleSelect = (food: typeof FOOD_DATABASE[0]) => {
    setSelectedFood(food);
    setQuery(food.name);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFood || !amount) return;
    const n = calcNutrition(selectedFood, Number(amount));
    onAdd({
      date,
      mealType,
      foodName: selectedFood.name,
      amount: Number(amount),
      ...n,
    });
    setQuery('');
    setSelectedFood(null);
    setAmount('100');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
      <h2 className="font-semibold text-slate-800">食事を追加</h2>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">日付</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">食事タイプ</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value as MealType)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {MEAL_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <label className="block text-xs text-slate-500 mb-1">食品名</label>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelectedFood(null); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="食品名を入力..."
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-20 w-full bg-white border border-slate-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
            {suggestions.map((f) => (
              <li
                key={f.name}
                onMouseDown={() => handleSelect(f)}
                className="px-3 py-2 text-sm hover:bg-emerald-50 cursor-pointer flex justify-between"
              >
                <span>{f.name}</span>
                <span className="text-slate-400 text-xs">{f.calories}kcal/100g</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block text-xs text-slate-500 mb-1">量 (g/ml)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />
      </div>

      {nutrition && (
        <div className="bg-emerald-50 rounded-lg px-4 py-3 grid grid-cols-4 gap-2 text-center text-sm">
          <div><div className="font-bold text-emerald-700">{nutrition.calories}</div><div className="text-slate-500 text-xs">kcal</div></div>
          <div><div className="font-bold text-blue-600">{nutrition.protein}g</div><div className="text-slate-500 text-xs">タンパク質</div></div>
          <div><div className="font-bold text-yellow-600">{nutrition.fat}g</div><div className="text-slate-500 text-xs">脂質</div></div>
          <div><div className="font-bold text-orange-500">{nutrition.carbs}g</div><div className="text-slate-500 text-xs">炭水化物</div></div>
        </div>
      )}

      <button
        type="submit"
        disabled={!selectedFood}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-medium rounded-lg py-2 transition-colors"
      >
        追加する
      </button>
    </form>
  );
}
