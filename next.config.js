const withPlugins = require('next-compose-plugins')
const withSvgr = require('next-plugin-svgr');
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {domains: ['localhost', '10.50.168.65', '10.50.168.65:3001']},
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "mixins";`
  },
  experimental: {
    outputStandalone: true,
  },
}

module.exports = withPlugins([withSvgr], nextConfig)
