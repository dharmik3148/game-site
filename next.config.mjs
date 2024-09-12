/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: "build",

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "popygames.com",
      },
    ],
  },
};

export default nextConfig;
