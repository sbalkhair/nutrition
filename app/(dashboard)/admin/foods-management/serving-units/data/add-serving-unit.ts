"use server";

import { prisma } from "@/lib/prisma";
import { servingUnitSchema, type ServingUnitSchemaType } from "@/lib/schemas";
import type { TApiResult } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { requireUser } from "../../../../shared/require-user";

export async function addServingUnit(
  servingUnit: ServingUnitSchemaType,
): Promise<TApiResult> {
  try {
    await requireUser("Admin");

    const result = servingUnitSchema.safeParse(servingUnit);

    if (!result.success) {
      return {
        status: "Fail",
        message: result.error.message,
      };
    }
    const countServingUnit = await prisma.servingUnit.count({
      where: { name: result.data.name },
    });

    if (countServingUnit > 0) {
      return { status: "Fail", message: "The Serving unit already added" };
    }

    await prisma.servingUnit.create({ data: { name: result.data.name } });

    revalidatePath("/app/(dashboard)/admin/foods-management/serving-units");

    return { status: "Success", message: "Success Add Serving unit" };
  } catch {
    return {
      status: "Fail",
      message: "Something went wrong when you add serving unit ",
    };
  }
}
