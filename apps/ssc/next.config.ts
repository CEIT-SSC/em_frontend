import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../.."),
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


    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
