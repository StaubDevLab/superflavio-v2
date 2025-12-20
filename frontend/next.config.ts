import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "superflavio-api.local",
        pathname: "/assets/*",
      },
      {
        protocol: "http",
        hostname: "directus",
        port: "8055",
        pathname: "/assets/*",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
