import z from "zod";

export const registerAccountSchema = z
  .object({
    name: z.string().min(3, { message: "Full name is required" }).trim(),
    mobile: z
      .string()
      .startsWith("05", { message: "Phone must start by 05" })

      .min(10, { message: "Phone number must be 10 numbers" })
      .max(10, { message: "Phone number must be 10 numbers" })
      .trim(),
    email: z.email({ message: "Email is Required" }).trim(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { error: "Confirm password Required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email({ message: "Email is Required" }).trim(),
  password: z.string().min(1, { message: "Password is Required" }),
});

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { error: "Name is require" }).trim(),
});

export const servingUnitSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { error: "Nama of unit is require" }).trim(),
});
export const foodSchema = z.object({
  id: z.string().optional(),
  categoryId: z.string().min(1, { message: "Category Required" }),
  name: z.string().min(1, { message: "food is required" }).trim(),
  calories: z.number().nullable().optional(),
  protein: z.number().nullable().optional(),
  fat: z.number().nullable().optional(),
  carbohydrates: z.number().nullable().optional(),
  fiber: z.number().nullable().optional(),
  sugar: z.number().nullable().optional(),
  servings: z.array(
    z.object({
      servingUnitId: z.string().min(1, { error: "Serving unit is required" }),
      grams: z.number().min(1, { error: "Grams must be great than 0" }),
    }),
  ),
});

export const mealSchema = z.object({
  dateTime: z.date({ error: "Data Meal Required" }),
  mealFoods: z.array(
    z.object({
      foodId: z.string().min(1, { error: "Food is required" }),
      servingUnitId: z.string().min(1, { error: "unit required" }),
      amount: z
        .number()
        .min(0, "Amount must be between 0 and 9999")
        .max(9999, { error: "Amount must be between 0 and 9999" }),
    }),
  ),
});

const rangeSchema = z
  .tuple([z.number().min(0), z.number().max(9999)])
  .refine(([min, max]) => min <= max, {
    message: "min value must be <= max",
  });

export const filterFoodScheme = z.object({
  categoryId: z.string().optional(),
  caloriesRange: rangeSchema,
  proteinRange: rangeSchema,
  fatRange: rangeSchema,
  carbohydrateRange: rangeSchema,
  fiberRange: rangeSchema,
  sugarRange: rangeSchema,
});

export type RegisterSchemaType = z.infer<typeof registerAccountSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type CategorySchemaType = z.infer<typeof categorySchema>;
export type ServingUnitSchemaType = z.infer<typeof servingUnitSchema>;
export type FoodSchemaType = z.infer<typeof foodSchema>;
export type FilterFoodSchemaType = z.infer<typeof filterFoodScheme>;
export type MealSchemaType = z.infer<typeof mealSchema>;
