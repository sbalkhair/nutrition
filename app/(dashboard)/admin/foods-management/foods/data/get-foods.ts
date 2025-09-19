"use server";

import { requireSession } from "@/app/(dashboard)/shared/require-user";
import { prisma } from "@/lib/prisma";

export async function getFoods() {
  await requireSession();
  return prisma.food.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      calories: true,
      fat: true,
      categoryId: true,
      fiber: true,
      name: true,
      protein: true,
      sugar: true,
      carbohydrates: true,
      foodServingUnits: {
        select: {
          id: true,
          servingUnit: true,
          grams: true,
        },
      },
    },
  });
}

export type FoodType = Awaited<ReturnType<typeof getFoods>>[0];
