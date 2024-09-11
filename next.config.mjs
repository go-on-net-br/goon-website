// @ts-check

const isDevelopment = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isDevelopment ? "standalone" : "export",
  images: {
    unoptimized: !isDevelopment,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ogui.ca",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "goon.net.br",
        pathname: "/uploads/**",
      },
    ],
  },
  staticPageGenerationTimeout: 10000,
};

export default nextConfig;
