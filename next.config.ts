import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['svix'],
  transpilePackages: ['@react-pdf/renderer'],
  // Turbopack optimization
  turbopack: {
    resolveAlias: {
      'svix': 'svix',
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };
    return config;
  },
};

export default nextConfig;
