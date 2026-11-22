import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

// Better Auth derives `baseURL` from BETTER_AUTH_URL (or the incoming request
// on Vercel) when it isn't set explicitly. Trust the configured app URL plus
// the current Vercel deployment URL, otherwise registration is rejected with
// "Invalid origin" because the browser's origin isn't in trustedOrigins.
const toOrigin = (value?: string) => {
  if (!value) return undefined;
  try {
    return new URL(value.trim()).origin;
  } catch {
    return undefined;
  }
};

const trustedOrigins = [
  "http://localhost:3000",
  "http://172.20.10.3:3000",
  toOrigin(process.env.BETTER_AUTH_URL),
  toOrigin(process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`),
].filter((origin): origin is string => Boolean(origin));

export const auth = betterAuth({
  trustedOrigins,
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
