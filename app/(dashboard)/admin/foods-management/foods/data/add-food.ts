"use server";

import { prisma } from "@/lib/prisma";
import { foodSchema, type FoodSchemaType } from "@/lib/schemas";
import type { TApiResult } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { requireUser } from "../../../../shared/require-user";

export async function addFood(food: FoodSchemaType): Promise<TApiResult> {
  await requireUser("Admin");

  try {
    const data = foodSchema.parse(food);

    const countFoods = await prisma.food.count({ where: { name: food.name } });

    if (countFoods > 0) {
      return { status: "Fail", message: "Food already added" };
    }

    await prisma.food.create({
      data: {
        name: food.name,
        calories: food.calories,
        categoryId: food.categoryId,
        carbohydrates: food.carbohydrates,
        fat: food.fat,
        fiber: food.fiber,
        protein: food.protein,
        sugar: food.sugar,
        foodServingUnits: {
          create: data.servings.map((s) => ({
            servingUnitId: s.servingUnitId,
            grams: s.grams,
          })),
        },
      },
    });

    revalidatePath("/app/(dashboard)/admin/foods-management/foods");

    return { status: "Success", message: "Success Add Food" };
  } catch {
    return { status: "Fail", message: "Something went wrong when add food" };
  }
}
