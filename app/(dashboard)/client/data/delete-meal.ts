'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteMeal = async (id: string) => {
  try {
    await prisma.meal.delete({
      where: {
        id,
      },
    });
    revalidatePath('/client');
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      message: 'Failed to delete meal',
    };
  }
};
