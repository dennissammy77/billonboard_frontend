/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.ignored = ['**/node_modules/**', '**/.next/**', '**/logs/**'];
    return config;
  },
  images: { unoptimized: process.env.NODE_ENV === "development" },
}

module.exports = nextConfig
