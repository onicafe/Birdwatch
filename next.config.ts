import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // structural changes
  },
  // turbopack root is valid in 16.1.x
  turbopack: {
    root: process.cwd(),
  }
};

export default nextConfig;
