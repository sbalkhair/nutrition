"use server";

import type { TApiResult } from "@/app/type";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireUser } from "../../shared/require-user";
import type { CategoryType } from "./get-categories";

export async function deleteCategory(
  category: CategoryType,
): Promise<TApiResult> {
  await requireUser("Admin");
  try {
    await prisma.category.delete({ where: { id: category.id } });
    revalidatePath("/app/(dashboard)/admin/foods-management/categories");
    return {
      status: "Success",
      message: `Success Delete Category ${category.name}`,
    };
  } catch {
    return {
      status: "Fail",
      message: `Something went wrong when you delete category`,
    };
  }
}
