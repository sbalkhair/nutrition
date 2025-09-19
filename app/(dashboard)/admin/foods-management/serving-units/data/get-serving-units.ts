"use server";

import { prisma } from "@/lib/prisma";

export async function getServingUnits() {
  // await requireUser("Admin");
  return await prisma.servingUnit.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });
}

export type ServingUnitType = Awaited<ReturnType<typeof getServingUnits>>[0];
