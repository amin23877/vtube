import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wt.pool2jibi.com",
      },
    ],
  },
};

export default nextConfig;
