export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Meal {
  id: string;
  date: string; // YYYY-MM-DD
  mealType: MealType;
  foodName: string;
  amount: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  createdAt: string;
}

export interface Goals {
  dailyCalories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface WeightRecord {
  date: string;
  weight: number;
}

export interface NutritionSummary {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}
