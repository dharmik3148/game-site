/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // async rewrites() {
  //   return [
  //     {
  //       source: "/uploads/:path*",
  //       destination: "/api/",
  //     },
  //   ];
  // },

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
