/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    ANKICONNECT_PORT: 'http://127.0.0.1:8765'
  }
}

module.exports = nextConfig
