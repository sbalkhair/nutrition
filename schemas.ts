import z from "zod";

export const registerAccountSchema = z
  .object({
    name: z.string().min(3, { message: "Full name is required" }),
    mobile: z
      .string()
      .startsWith("05", { message: "Phone must start by 05" })
      .min(10, { message: "Phone number must be 10 numbers" })
      .max(10, { message: "Phone number must be 10 numbers" }),

    email: z.email({ message: "Email is Required" }),
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
  email: z.email({ message: "Email is Required" }),
  password: z.string().min(1, { message: "Password is Required" }),
});

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { error: "Name is require" }),
});
