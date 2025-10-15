import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  env: {
    GAME_CRAFT_SSC_EVENT_ID: process.env.GAME_CRAFT_SSC_EVENT_ID,
  },
  transpilePackages: ["@ssc/ui", "@ssc/utils", "@ssc/core"],
  modularizeImports: {
    antd: {
      transform: "antd/lib/{{member}}",
    },
  },
  images: {
    domains: ["api.ceit-ssc.ir"],
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
