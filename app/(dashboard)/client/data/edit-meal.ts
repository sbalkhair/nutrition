'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const editMeal = async (
  id: string,
  data: {
    dateTime: Date;
    mealFoods: {
      foodId: string;
      servingUnitId: string;
      amount: number;
    }[];
  },
) => {
  try {
    await prisma.meal.update({
      where: {
        id,
      },
      data: {
        dateTime: data.dateTime,
        mealFoods: {
          deleteMany: {},
          create: data.mealFoods.map((food) => ({
            foodId: food.foodId,
            servingUnitId: food.servingUnitId,
            amount: food.amount,
          })),
        },
      },
    });
    revalidatePath('/client');
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      message: 'Failed to edit meal',
    };
  }
};
