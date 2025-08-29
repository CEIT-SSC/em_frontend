import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const nextConfig: NextConfig = {
  transpilePackages: ['@ssc/ui', '@ssc/utils', '@ssc/core'],
  experimental: {
    optimizePackageImports: ['antd']
  },
  images: {
    domains: []
  }
}

export default withNextIntl(nextConfig);
