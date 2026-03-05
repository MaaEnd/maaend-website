import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "end.shallow.ink",
      },
      {
        protocol: "https",
        hostname: "assets.zmdmap.com",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
