"use server";

import { prisma } from "@/lib/prisma";
import { servingUnitSchema, type ServingUnitSchemaType } from "@/lib/schemas";
import type { TApiResult } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { requireUser } from "../../../../shared/require-user";

export async function editServingUnit(
  servingUnit: ServingUnitSchemaType,
): Promise<TApiResult> {
  try {
    await requireUser("Admin");

    const result = servingUnitSchema.safeParse(servingUnit);

    if (!result.success) {
      return { status: "Fail", message: "Invalid serving unit name" };
    }

    await prisma.servingUnit.update({
      where: { id: result.data.id },
      data: { name: result.data.name },
    });

    revalidatePath("/app/(dashboard)/admin/foods-management/serving-units");

    return { status: "Success", message: "Serving Unit updated successfully" };
  } catch {
    return {
      status: "Fail",
      message: "Something went wrong when edit serving unit",
    };
  }
}
