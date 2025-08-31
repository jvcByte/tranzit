import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  // Configure external packages for server components
  serverExternalPackages: ['pg'],
};

export default nextConfig;
