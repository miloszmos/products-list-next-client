/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["dummyjson.com"],
  },
};

module.exports = nextConfig;
