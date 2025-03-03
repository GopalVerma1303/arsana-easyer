/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/index.html",
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig;