type FoodType = {
  food: {
    food: {
      foodServingUnits: {
        servingUnitId: string;
        grams: number | null;
      }[];
    } & {
      name: string;
      id: string;
      createdAt: Date;
      updatedAt: Date;
      calories: number | null;
      protein: number | null;
      fat: number | null;
      carbohydrates: number | null;
      fiber: number | null;
      sugar: number | null;
      categoryId: string | null;
      mealId: string | null;
    };
    servingUnit: {
      name: string;
      id: string;
      createdAt: Date;
      updatedAt: Date;
    };
  } & {
    foodId: string;
    servingUnitId: string;
    amount: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    mealId: string;
  };
};
const MealFoodItem = ({ food }: FoodType) => {
  const foodServingUnit = food.food.foodServingUnits.find(
    (fsu) => fsu.servingUnitId === food.servingUnit.id,
  );
  const grams = foodServingUnit?.grams || 0;

  const calculatedCalories =
    ((food.food.calories || 0) / 100) * food.amount * grams;
  const calculatedProtein =
    ((food.food.protein || 0) / 100) * food.amount * grams;
  const calculatedCarbohydrates =
    ((food.food.carbohydrates || 0) / 100) * food.amount * grams;
  const calculatedFat = ((food.food.fat || 0) / 100) * food.amount * grams;
  const calculatedSugar = ((food.food.sugar || 0) / 100) * food.amount * grams;
  const calculatedFiber = ((food.food.fiber || 0) / 100) * food.amount * grams;

  return (
    <div className="space-y-2 rounded-2xl border p-4">
      <div className="flex items-center gap-2">
        <h2 className="font-bold"> {food.food.name}</h2>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-5 space-y-1 border-b px-4 py-2">
          <span>Serving Unit</span>
          <span>{`${food.amount} ${food.servingUnit.name}`}</span>
        </div>
        <div className="flex items-center justify-between gap-5 space-y-1 border-b px-4 py-1">
          <span>Calories</span>
          <span>{calculatedCalories.toFixed(0)}</span>
        </div>
        <div className="flex items-center justify-between gap-5 space-y-1 border-b px-4 py-1">
          <span>Protein</span>
          <span>{calculatedProtein.toFixed(1)}</span>
        </div>
        <div className="flex items-center justify-between gap-5 space-y-1 border-b px-4 py-1">
          <span>Carbs</span>
          <span>{calculatedCarbohydrates.toFixed(1)}</span>
        </div>
        <div className="flex items-center justify-between gap-5 space-y-1 border-b px-4 py-1">
          <span>Fat</span>
          <span>{calculatedFat.toFixed(1)}</span>
        </div>
        <div className="flex items-center justify-between gap-5 space-y-1 border-b px-4 py-1">
          <span>Fiber</span>
          <span>{calculatedFiber.toFixed(1)}</span>
        </div>

        <div className="flex items-center justify-between gap-5 space-y-1 border-b px-4 py-1">
          <span>Sugar</span>
          <span>{calculatedSugar.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MealFoodItem;
