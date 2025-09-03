import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
