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

const configuredOrigins = [
  "http://localhost:3000",
  "http://172.20.10.3:3000",
  toOrigin(process.env.BETTER_AUTH_URL),
  toOrigin(process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`),
].filter((origin): origin is string => Boolean(origin));

const isAllowedHost = (host: string) => {
  const normalized = host.split(",")[0].trim().toLowerCase();
  if (normalized === "localhost:3000" || normalized === "172.20.10.3:3000") {
    return true;
  }
  if (process.env.VERCEL_URL === normalized) return true;
  const configuredHost = toOrigin(process.env.BETTER_AUTH_URL);
  if (configuredHost && new URL(configuredHost).host === normalized) {
    return true;
  }
  // Any Vercel preview/production deployment for this project.
  return /^[a-z0-9-]+\.vercel\.app$/.test(normalized);
};

export const auth = betterAuth({
  trustedOrigins: async (request) => {
    const origins = [...configuredOrigins];
    const host = request?.headers.get("x-forwarded-host")
      ?? request?.headers.get("host");
    if (host && isAllowedHost(host)) {
      const proto = request?.headers.get("x-forwarded-proto")?.split(",")[0].trim();
      const isLocal = host.startsWith("localhost") || host.startsWith("172.");
      origins.push(`${proto ?? (isLocal ? "http" : "https")}://${host.split(",")[0].trim()}`);
    }
    return origins;
  },
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
