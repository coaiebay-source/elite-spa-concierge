import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@electric-sql/pglite"],
  outputFileTracingIncludes: {
    "/**/*": ["./node_modules/@electric-sql/pglite/dist/**/*"],
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
