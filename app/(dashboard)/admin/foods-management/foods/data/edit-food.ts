"use server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { foodSchema, type FoodSchemaType } from "@/lib/schemas";
import type { TApiResult } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { requireUser } from "../../../../shared/require-user";

export async function editFood(food: FoodSchemaType): Promise<TApiResult> {
  try {
    await requireUser("Admin");

    const result = foodSchema.safeParse(food);

    if (!result.success) {
      return { status: "Fail", message: result.error.message };
    }

    if (!result.data.id) {
      return { status: "Fail", message: "Food ID is required for editing" };
    }

    const { id, servings, ...rest } = result.data;

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const food = await tx.food.update({
        where: { id },
        data: rest,
      });

      await tx.foodServingUnit.deleteMany({
        where: { foodId: id },
      });
      if (servings.length > 0) {
        await tx.foodServingUnit.createMany({
          data: servings.map((serving) => ({
            foodId: id,
            servingUnitId: serving.servingUnitId,
            grams: serving.grams,
          })),
        });
      }

      return food;
    });

    revalidatePath("/app/(dashboard)/admin/foods-management/foods");

    return { status: "Success", message: "Food updated successfully" };
  } catch {
    return {
      status: "Fail",
      message: "Something went wrong when editing the food",
    };
  }
}
