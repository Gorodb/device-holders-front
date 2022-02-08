const withPlugins = require('next-compose-plugins')
const withSvgr = require('next-plugin-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: { domains: ['*', 'localhost'] }
}

module.exports = withPlugins([withSvgr], nextConfig)
