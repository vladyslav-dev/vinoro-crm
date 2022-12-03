/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = withPWA({
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
  devIndicators: {
    buildActivity: false
  },
});
module.exports = nextConfig;