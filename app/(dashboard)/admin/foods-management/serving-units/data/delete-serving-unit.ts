"use server";

import { prisma } from "@/lib/prisma";
import type { TApiResult } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { requireUser } from "../../../../shared/require-user";
import type { ServingUnitType } from "./get-serving-units";

export async function deleteServingUnit(
  servingUnit: ServingUnitType,
): Promise<TApiResult> {
  await requireUser("Admin");
  try {
    await prisma.servingUnit.delete({ where: { id: servingUnit.id } });
    revalidatePath("/app/(dashboard)/admin/foods-management/serving-units");
    return {
      status: "Success",
      message: `Success Delete Serving unit ${servingUnit.name}`,
    };
  } catch {
    return {
      status: "Fail",
      message: `Something went wrong when you delete serving unit`,
    };
  }
}
