// @ts-check

const isDevelopment = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isDevelopment ? "standalone" : "export",
  images: {
    unoptimized: !isDevelopment,
    remotePatterns: [
      {
        protocol: "http",
        // @ts-ignore
        hostname: process.env.NEXT_PUBLIC_STRAPI_URL,
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  staticPageGenerationTimeout: 10000,
};

export default nextConfig;
