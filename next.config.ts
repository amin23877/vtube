import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wt.pool2jibi.com",
      },
      {
        protocol: "https",
        hostname: "api.vee-tube.com",
      },
    ],
  },
};

export default nextConfig;
