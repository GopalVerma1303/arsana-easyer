import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // output: "export",
  // output: 'export',
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v0.blob.com",
      },
    ],
  },
  // experimental: {
  //   appDir: true,
  // },

}
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/index.html",
  //       permanent: false,
  //     },
  //   ];
  // },

// if (process.env.NODE_ENV === 'development') {
//   await setupDevPlatform();
// }

module.exports = nextConfig;

// function redirects() {
//   throw new Error('Function not implemented.');
// }
