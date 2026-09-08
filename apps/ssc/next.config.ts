import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // turbopack: {
  // resolveAlias: {
  //   "~": __dirname,
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*", // The incoming request path in your Next.js app
  //       destination: "https://aut-ssc.ir/:path*", // The actual backend URL
  //     },
  //   ];
  // },
  
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trustseal.enamad.ir",
      },
      {
        protocol: "http",
        hostname: "api.ceit-ssc.ir",
      },
    ],
  },

};

export default nextConfig;
