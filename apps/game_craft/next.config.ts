import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@ssc/ui', '@ssc/utils', '@ssc/core'],
  experimental: {
    optimizePackageImports: ['antd']
  },
  images: {
    domains: []
  }
}

export default nextConfig
