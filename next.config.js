/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ARCANA_APP_ADDRESS: process.env.NEXT_PUBLIC_ARCANA_APP_ADDRESS,
    INFURA_ID: process.env.INFURA_ID,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    QUICKNODE_KEY: process.env.QUICKNODE_KEY,
  }
}

module.exports = nextConfig
