export interface FoodItem {
  name: string;
  calories: number; // per 100g
  protein: number;
  fat: number;
  carbs: number;
}

export const FOOD_DATABASE: FoodItem[] = [
  // 主食
  { name: '白米（炊いた）', calories: 168, protein: 2.5, fat: 0.3, carbs: 37.1 },
  { name: '食パン（6枚切り1枚=60g）', calories: 264, protein: 9.3, fat: 4.4, carbs: 46.7 },
  { name: 'パスタ（茹でた）', calories: 150, protein: 5.2, fat: 0.9, carbs: 30.3 },
  { name: 'うどん（茹でた）', calories: 105, protein: 2.6, fat: 0.4, carbs: 21.6 },
  { name: 'ラーメン（麺のみ）', calories: 149, protein: 5.2, fat: 0.6, carbs: 28.3 },
  { name: 'そば（茹でた）', calories: 130, protein: 4.8, fat: 1.0, carbs: 26.0 },
  { name: 'オートミール', calories: 380, protein: 13.7, fat: 5.7, carbs: 69.1 },
  // タンパク質
  { name: '鶏胸肉（皮なし）', calories: 108, protein: 22.3, fat: 1.5, carbs: 0.0 },
  { name: '鶏もも肉（皮なし）', calories: 127, protein: 19.0, fat: 5.0, carbs: 0.0 },
  { name: '鮭', calories: 133, protein: 22.3, fat: 4.1, carbs: 0.1 },
  { name: 'まぐろ（赤身）', calories: 125, protein: 26.4, fat: 1.4, carbs: 0.1 },
  { name: '卵（1個=50g）', calories: 151, protein: 12.3, fat: 10.3, carbs: 0.3 },
  { name: '豆腐（木綿）', calories: 72, protein: 6.6, fat: 4.2, carbs: 1.6 },
  { name: '豆腐（絹ごし）', calories: 56, protein: 4.9, fat: 3.0, carbs: 2.0 },
  { name: '納豆（1パック=45g）', calories: 200, protein: 16.5, fat: 10.0, carbs: 12.1 },
  { name: '豚ロース', calories: 263, protein: 19.3, fat: 19.2, carbs: 0.2 },
  { name: '牛もも肉', calories: 183, protein: 21.3, fat: 10.7, carbs: 0.4 },
  { name: 'ツナ缶（水煮）', calories: 71, protein: 16.0, fat: 0.7, carbs: 0.0 },
  // 乳製品
  { name: '牛乳', calories: 67, protein: 3.3, fat: 3.8, carbs: 4.8 },
  { name: 'ギリシャヨーグルト', calories: 59, protein: 10.0, fat: 0.4, carbs: 3.6 },
  { name: 'プレーンヨーグルト', calories: 62, protein: 3.6, fat: 3.0, carbs: 4.9 },
  { name: 'チーズ（プロセス）', calories: 339, protein: 22.7, fat: 26.0, carbs: 1.3 },
  // 野菜
  { name: 'ブロッコリー', calories: 33, protein: 4.3, fat: 0.5, carbs: 5.2 },
  { name: 'ほうれん草', calories: 20, protein: 2.2, fat: 0.4, carbs: 3.1 },
  { name: 'キャベツ', calories: 23, protein: 1.3, fat: 0.2, carbs: 5.2 },
  { name: 'トマト', calories: 19, protein: 0.7, fat: 0.1, carbs: 4.7 },
  { name: 'きゅうり', calories: 14, protein: 1.0, fat: 0.1, carbs: 3.0 },
  { name: '玉ねぎ', calories: 37, protein: 1.0, fat: 0.1, carbs: 8.8 },
  { name: 'にんじん', calories: 39, protein: 0.7, fat: 0.1, carbs: 9.3 },
  // 果物
  { name: 'バナナ（1本=100g）', calories: 86, protein: 1.1, fat: 0.2, carbs: 22.5 },
  { name: 'りんご', calories: 61, protein: 0.2, fat: 0.2, carbs: 16.2 },
  { name: 'みかん', calories: 46, protein: 0.7, fat: 0.1, carbs: 12.0 },
  // 加工食品
  { name: 'サラダチキン（100g）', calories: 113, protein: 24.3, fat: 1.3, carbs: 0.0 },
  { name: 'プロテインバー', calories: 200, protein: 20.0, fat: 7.0, carbs: 20.0 },
  { name: 'おにぎり（塩）', calories: 179, protein: 2.7, fat: 0.3, carbs: 40.1 },
  { name: 'カップ麺（1個=80g）', calories: 350, protein: 8.0, fat: 14.0, carbs: 50.0 },
  { name: 'コンビニサンドイッチ', calories: 280, protein: 12.0, fat: 10.0, carbs: 35.0 },
  // 飲み物
  { name: 'プロテインシェイク', calories: 120, protein: 24.0, fat: 2.0, carbs: 5.0 },
  { name: 'オレンジジュース', calories: 47, protein: 0.7, fat: 0.1, carbs: 11.5 },
  // 調味料・その他
  { name: 'オリーブオイル', calories: 921, protein: 0.0, fat: 100.0, carbs: 0.0 },
  { name: 'マヨネーズ', calories: 703, protein: 1.5, fat: 76.0, carbs: 3.6 },
  { name: 'ドレッシング（フレンチ）', calories: 377, protein: 0.4, fat: 38.0, carbs: 10.0 },
];
