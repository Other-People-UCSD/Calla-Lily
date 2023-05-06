/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/20(..)/:slug',
        destination: '/:slug',
        permanent: true,
      }
    ]
  },
}

module.exports = nextConfig
