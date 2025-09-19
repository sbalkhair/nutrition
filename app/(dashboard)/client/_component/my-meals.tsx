"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Flame, Timer, UtensilsCrossed } from "lucide-react";

import type { MealsType } from "../data/get-meals";

import { useRouter } from "next/navigation";
import type { FoodType } from "../../admin/foods-management/foods/data/get-foods";
import type { ServingUnitType } from "../../admin/foods-management/serving-units/data/get-serving-units";
import ButtonDeleteMeal from "./button-delete-meal";
import MealFoodItem from "./meal-food-item";

const MyMeals = ({
  meals,
  foods,
  servingUnits,
}: {
  meals: MealsType[];
  foods: FoodType[];
  servingUnits: ServingUnitType[];
}) => {
  const router = useRouter();
  const handelRefreshMyMeal = () => {
    console.log("delete");
    router.refresh();
  };
  return (
    <>
      <h1>My Meals</h1>
      {meals.length === 0 && (
        <div className="rounded-2xl border p-4 text-center">
          No meals added yet
        </div>
      )}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {meals.map((meal, index) => {
          const totalCalories = meal.mealFoods.reduce((acc, mealFood) => {
            const foodServingUnit = mealFood.food.foodServingUnits.find(
              (fsu) => fsu.servingUnitId === mealFood.servingUnit.id,
            );
            const grams = foodServingUnit?.grams || 1;
            const totalGrams = mealFood.amount * grams;
            const caloriesForFood =
              ((mealFood.food.calories || 0) / 100) * totalGrams;
            return acc + caloriesForFood;
          }, 0);
          return (
            <Card key={meal.id}>
              <CardHeader>
                <CardTitle className="mb-2 border-b pb-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-1 items-center justify-between">
                      <div className="bg-primary flex size-7 items-center justify-center rounded-full text-white">
                        <span>{index + 1}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Timer className="text-primary" />
                        <span>
                          {new Date(meal.dateTime).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ButtonDeleteMeal
                        meal={meal}
                        onMealDelete={handelRefreshMyMeal}
                      />
                    </div>
                  </div>
                </CardTitle>
                <CardDescription>Details of meal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <UtensilsCrossed className="text-primary" />{" "}
                      {meal.mealFoods.length} Food(s)
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="text-primary" />{" "}
                      {totalCalories.toFixed(0)} Kcal
                    </div>
                  </div>
                  {meal.mealFoods.map((food) => (
                    <MealFoodItem key={food.id} food={food} />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default MyMeals;
