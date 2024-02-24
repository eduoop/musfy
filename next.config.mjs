/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.creativefabrica.com",
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
