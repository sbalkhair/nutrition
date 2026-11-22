import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // enable type routes
  typedRoutes: true,
  allowedDevOrigins: ["http://172.20.10.3:3000"],
};

export default nextConfig;
