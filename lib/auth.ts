import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  trustedOrigins: ["http://172.20.10.3:3000"],
  baseURL: "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      mobile: { type: "string", required: true },
      role: { type: "string", required: false, default: "USER" },
    },
  },
  emailAndPassword: { enabled: true, autoSignIn: true },
  plugins: [nextCookies()],
});
