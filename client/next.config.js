/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    esmExternals: 'loose',
  },
  // Remove static export to enable dynamic routing
  trailingSlash: true,
  // Enable standalone output for better compatibility
  output: 'standalone',
};

module.exports = nextConfig;