"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { mealSchema, type MealSchemaType } from "@/lib/schemas";
import type { TApiResult } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireUser } from "../../shared/require-user";

export async function addMeal(meal: MealSchemaType): Promise<TApiResult> {
  await requireUser("Client");
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      redirect("/sign-in");
    }
    const data = mealSchema.parse(meal);

    await prisma.meal.create({
      data: {
        userId: session.user.id,
        dateTime: data.dateTime.toISOString(),
        mealFoods: {
          create: data.mealFoods.map((m) => ({
            amount: m.amount,
            foodId: m.foodId,
            servingUnitId: m.servingUnitId,
          })),
        },
      },
    });
    revalidatePath("/client");

    return { status: "Success", message: "Success add meal" };
  } catch {
    return { status: "Fail", message: "Something wrong when you add meal" };
  }
}
