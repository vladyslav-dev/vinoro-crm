// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  devIndicators: {
    buildActivity: false
  },
}

module.exports = nextConfig
