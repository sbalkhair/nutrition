import { prisma } from "@/lib/prisma";

export const getDashboardStats = async () => {
  const [foodCount, mealsCount, userCount, categoryCount] = await Promise.all([
    prisma.food.count(),
    prisma.meal.count(),
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.category.count(),
  ]);

  return { foodCount, mealsCount, userCount, categoryCount };
};
