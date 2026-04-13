import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.mattel.com" },
      { hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
