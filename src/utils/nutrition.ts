import type { FoodItem } from '../data/foods';

export function calcNutrition(food: FoodItem, amount: number) {
  const ratio = amount / 100;
  return {
    calories: Math.round(food.calories * ratio),
    protein: Math.round(food.protein * ratio * 10) / 10,
    fat: Math.round(food.fat * ratio * 10) / 10,
    carbs: Math.round(food.carbs * ratio * 10) / 10,
  };
}
