/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/jasminesjuices',
};

module.exports = nextConfig;
