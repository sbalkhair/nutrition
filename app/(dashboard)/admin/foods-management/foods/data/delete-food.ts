"use server";

import { prisma } from "@/lib/prisma";
import type { TApiResult } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { requireUser } from "../../../../shared/require-user";
import type { FoodType } from "./get-foods";

export async function deleteFood(food: FoodType): Promise<TApiResult> {
  await requireUser("Admin");

  try {
    await prisma.food.delete({
      where: { id: food.id },
    });
    revalidatePath("/app/data/admin/foods");
    return { status: "Success", message: `Success Delete  ${food.name}` };
  } catch (error) {
    console.log(error);
    return { status: "Fail", message: "Something went wrong when delete food" };
  }
}
