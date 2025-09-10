"use server";

import type { TApiResult } from "@/app/type";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import type z from "zod";
import { requireUser } from "../../shared/require-user";

export async function editCategory(
  category: z.infer<typeof categorySchema>,
): Promise<TApiResult> {
  try {
    await requireUser("Admin");

    const result = categorySchema.safeParse(category);

    if (!result.success) {
      return { status: "Fail", message: "Invalid category name" };
    }

    await prisma.category.update({
      where: { id: category.id },
      data: { name: category.name },
    });

    revalidatePath("/app/(dashboard)/admin/foods-management/categories");

    return { status: "Success", message: "Category updated successfully" };
  } catch {
    return {
      status: "Fail",
      message: "Something went wrong when edit category",
    };
  }
}
