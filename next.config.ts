/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  basePath: '/jasminesjuices',
  assetPrefix: '/jasminesjuices/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};


module.exports = nextConfig
