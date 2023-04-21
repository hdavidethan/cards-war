/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.OUTPUT ?? "export",
};

module.exports = nextConfig;
