import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
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
