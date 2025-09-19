"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartPie, ChartSpline, Flame, UtensilsCrossed } from "lucide-react";

import { DatePicker } from "@/components/ui/date-picker";
import { useEffect, useState } from "react";
import { type FoodType } from "../../admin/foods-management/foods/data/get-foods";
import { type ServingUnitType } from "../../admin/foods-management/serving-units/data/get-serving-units";
import { getMeals, type MealsType } from "../data/get-meals";
import ButtonAddMeal from "./button-add-meal";
import MyMeals from "./my-meals";

type ClientFilterMealProps = {
  foods: FoodType[];
  servingUnits: ServingUnitType[];
  initialMeals: MealsType[];
};

const ClientFilterMeal = ({
  foods,
  servingUnits,
  initialMeals,
}: ClientFilterMealProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [meals, setMeals] = useState<MealsType[]>(initialMeals);

  useEffect(() => {
    setMeals(initialMeals);
  }, [initialMeals]);

  const [totalNutrients, setTotalNutrients] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
  });

  const calculateNutrients = (meals: MealsType[]) => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let fiber = 0;
    let sugar = 0;

    meals.forEach((meal) => {
      meal.mealFoods.forEach((mealFoodItem) => {
        const foodServingUnit = mealFoodItem.food.foodServingUnits.find(
          (fsu) => fsu.servingUnitId === mealFoodItem.servingUnit.id,
        );
        const grams = foodServingUnit?.grams || 0;

        calories +=
          ((mealFoodItem.food?.calories || 0) / 100) *
            mealFoodItem.amount *
            grams || 0;
        protein +=
          ((mealFoodItem.food.protein || 0) / 100) *
            mealFoodItem.amount *
            grams || 0;
        carbs +=
          ((mealFoodItem.food.carbohydrates || 0) / 100) *
            mealFoodItem.amount *
            grams || 0;
        fat +=
          ((mealFoodItem.food.fat || 0) / 100) * mealFoodItem.amount * grams ||
          0;
        fiber +=
          ((mealFoodItem.food.fiber || 0) / 100) *
            mealFoodItem.amount *
            grams || 0;
        sugar +=
          ((mealFoodItem.food.sugar || 0) / 100) *
            mealFoodItem.amount *
            grams || 0;
      });
    });

    setTotalNutrients({
      calories: parseFloat(calories.toFixed(2)),
      protein: parseFloat(protein.toFixed(2)),
      carbs: parseFloat(carbs.toFixed(2)),
      fat: parseFloat(fat.toFixed(2)),
      fiber: parseFloat(fiber.toFixed(2)),
      sugar: parseFloat(sugar.toFixed(2)),
    });
  };

  useEffect(() => {
    calculateNutrients(meals);
  }, [meals]);

  const handleFilter = () => {
    if (date) {
      getMeals(date).then((newMeals) => {
        setMeals(newMeals);
      });
    } else {
      getMeals(new Date()).then((newMeals) => {
        setMeals(newMeals);
      });
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
          <h2>Filter By Date</h2>
          <DatePicker date={date} setDate={setDate} />
          <Button variant="outline" type="button" onClick={handleFilter}>
            Filter
          </Button>
        </div>
        <ButtonAddMeal
          foods={foods}
          servingUnits={servingUnits}
          onMealAdded={() => handleFilter()}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-1 border-b pb-2">
              <Flame className="text-primary" /> Total Calories
            </CardTitle>
            <CardDescription>Total Calories consume</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="flex items-center gap-2 text-lg">
              <span className="text-3xl font-bold">
                {totalNutrients.calories.toFixed(0)}
              </span>{" "}
              <span>Kcal</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-1 border-b pb-2">
              <ChartPie className="text-primary" /> Macro nutrients
            </CardTitle>
            <CardDescription>Info of Micro food</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 text-center">
              <div className="flex items-center justify-between space-y-1 md:flex-row">
                <span className="font-semibold">Protein</span>
                <div className="flex items-center">
                  <span className="mx-auto font-bold">
                    {totalNutrients.protein.toFixed(1)}
                  </span>
                  <span>g</span>
                </div>
              </div>

              <div className="flex items-center justify-between space-y-1">
                <span className="font-semibold">Carbs</span>
                <div className="flex items-center">
                  <span className="mx-auto font-bold">
                    {totalNutrients.carbs.toFixed(1)}
                  </span>
                  <span>g</span>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-between space-y-1">
                <span className="font-semibold">Fat</span>
                <div className="flex items-center">
                  <span className="mx-auto font-bold">
                    {totalNutrients.fat.toFixed(1)}
                  </span>
                  <span>g</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-1 border-b pb-2 font-bold">
              <UtensilsCrossed className="text-primary" /> Male Summary
            </CardTitle>
            <CardDescription>Summary of you meals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Total Meals</h3>
                <span>{meals.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Total Food Items</h3>
                <span>
                  {meals.reduce((acc, meal) => acc + meal.mealFoods.length, 0)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Last Meal</h3>
                <span>
                  {meals.length > 0 &&
                    new Date(
                      meals[meals.length - 1].dateTime,
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-1 border-b pb-2">
              <ChartSpline className="text-primary" /> Additional Nutrients
            </CardTitle>
            <CardDescription>Info of Micro food</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 text-center">
              <div className="flex flex-row items-center justify-between space-y-1">
                <span className="font-semibold">Fiber</span>
                <div className="flex items-center">
                  <span className="mx-auto font-bold">
                    {totalNutrients.fiber.toFixed(1)}
                  </span>
                  <span>g</span>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between space-y-1">
                <span className="font-semibold">Sugar</span>
                <div className="flex items-center">
                  <span className="mx-auto font-bold">
                    {totalNutrients.sugar.toFixed(1)}
                  </span>
                  <span>g</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <MyMeals meals={meals} foods={foods} servingUnits={servingUnits} />
      </div>
    </div>
  );
};

export default ClientFilterMeal;
