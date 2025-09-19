"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "../../../../shared/require-user";

export async function getCategories() {
  await requireUser("Admin");
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
    },
  });
}

export type CategoryType = Awaited<ReturnType<typeof getCategories>>[0];
