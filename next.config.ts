import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "shop.mattel.com" },
      { hostname: "images.mattel.net" },
      { hostname: "i0.wp.com" },
      { hostname: "placehold.co" },
      { hostname: "toyhabits.com" },
    ],
  },
};

export default nextConfig;
