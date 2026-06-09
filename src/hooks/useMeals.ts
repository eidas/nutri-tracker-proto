import { useLocalStorage } from './useLocalStorage';
import type { Meal, Goals, WeightRecord, NutritionSummary } from '../types';
import { format } from 'date-fns';

const DEFAULT_GOALS: Goals = {
  dailyCalories: 2000,
  protein: 150,
  fat: 65,
  carbs: 250,
};

export function useMeals() {
  const [meals, setMeals] = useLocalStorage<Meal[]>('meals', []);
  const [goals, setGoals] = useLocalStorage<Goals>('goals', DEFAULT_GOALS);
  const [weights, setWeights] = useLocalStorage<WeightRecord[]>('weights', []);

  const addMeal = (meal: Omit<Meal, 'id' | 'createdAt'>) => {
    const newMeal: Meal = {
      ...meal,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setMeals((prev) => [...prev, newMeal]);
  };

  const deleteMeal = (id: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const getMealsByDate = (date: string): Meal[] =>
    meals.filter((m) => m.date === date);

  const getSummaryByDate = (date: string): NutritionSummary =>
    getMealsByDate(date).reduce(
      (acc, m) => ({
        calories: acc.calories + m.calories,
        protein: acc.protein + m.protein,
        fat: acc.fat + m.fat,
        carbs: acc.carbs + m.carbs,
      }),
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );

  const getWeeklyCalories = () => {
    const result: { date: string; calories: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = format(d, 'yyyy-MM-dd');
      result.push({ date: format(d, 'M/d'), calories: getSummaryByDate(dateStr).calories });
    }
    return result;
  };

  const addWeight = (weight: number) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setWeights((prev) => {
      const filtered = prev.filter((w) => w.date !== today);
      return [...filtered, { date: today, weight }].sort((a, b) =>
        a.date.localeCompare(b.date)
      );
    });
  };

  return {
    meals,
    goals,
    setGoals,
    weights,
    addMeal,
    deleteMeal,
    getMealsByDate,
    getSummaryByDate,
    getWeeklyCalories,
    addWeight,
  };
}
