const withPlugins = require('next-compose-plugins')
const withSvgr = require('next-plugin-svgr');
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: { domains: ['*', 'localhost'] },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "mixins";`
  }
}

module.exports = withPlugins([withSvgr], nextConfig)
