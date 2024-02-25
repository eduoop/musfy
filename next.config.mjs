/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      serverActions: true,
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
