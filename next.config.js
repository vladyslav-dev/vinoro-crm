const withPWA = require('next-pwa')

const nextConfig = withPWA({
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
  devIndicators: {
    buildActivity: false
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
})

module.exports = nextConfig
