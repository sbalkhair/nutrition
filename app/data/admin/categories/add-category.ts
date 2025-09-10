"use server";

import type { TApiResult } from "@/app/type";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import type z from "zod";
import { requireUser } from "../../shared/require-user";

export async function addCategory(
  category: z.infer<typeof categorySchema>,
): Promise<TApiResult> {
  try {
    await requireUser("Admin");

    const result = categorySchema.safeParse(category.name);

    if (!result) {
      return {
        status: "Fail",
        message: "Something went wrong when add category",
      };
    }
    const countNames = await prisma.category.count({
      where: { name: category.name },
    });

    if (countNames > 0) {
      return { status: "Fail", message: "The category already added" };
    }

    await prisma.category.create({ data: { name: category.name } });

    revalidatePath("/app/(dashboard)/admin/foods-management/categories");

    return { status: "Success", message: "Success Add Category" };
  } catch {
    return {
      status: "Fail",
      message: "Something went wrong when you add category ",
    };
  }
}
