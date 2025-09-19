"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireUser } from "../../shared/require-user";

export async function getMeals(date: Date) {
  await requireUser("Client");
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  const meals = await prisma.meal.findMany({
    orderBy: {
      dateTime: "asc",
    },
    where: {
      userId: session.user.id,
      dateTime: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      id: true,
      dateTime: true,
      mealFoods: {
        include: {
          food: {
            include: {
              foodServingUnits: {
                select: {
                  servingUnitId: true,
                  grams: true,
                },
              },
            },
          },
          servingUnit: true,
        },
      },
    },
  });

  return meals;
}

export type MealsType = Awaited<ReturnType<typeof getMeals>>[0];
