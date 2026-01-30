import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // For Docker deployment
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
