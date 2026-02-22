/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
        port: '',
        pathname: '**'
      }
    ],
    qualities: [25, 75],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noai, noimageai'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
