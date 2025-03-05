import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  // output: 'export',
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  experimental: {
    appDir: true,
  },
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/index.html",
//         permanent: false,
//       },
//     ];
//   },
// }

// if (process.env.NODE_ENV === 'development') {
//   await setupDevPlatform();
// }
env: {
  DATABASE_URL: process.env.DATABASE_URL,
},

module.exports = nextConfig