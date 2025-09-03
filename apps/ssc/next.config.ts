import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": __dirname,
    };
    return config;
  },
  async rewrites() {
    return [
      // {
      //   source: "/api/:path*", // The incoming request path in your Next.js app
      //   destination: "https://aut-ssc.ir/api/:path*", // The actual backend URL
      // },
    ];
  },
};

export default nextConfig;
