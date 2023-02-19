/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ARCANA_APP_ID: process.env.NEXT_PUBLIC_ARCANA_APP_ID,
  }
}

module.exports = nextConfig
