import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  transpilePackages: ["@ssc/ui", "@ssc/utils", "@ssc/core"],
  modularizeImports: {
    antd: {
      transform: "antd/lib/{{member}}",
    },
  },
  images: {
    domains: [],
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
