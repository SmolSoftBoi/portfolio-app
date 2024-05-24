/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirects: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
