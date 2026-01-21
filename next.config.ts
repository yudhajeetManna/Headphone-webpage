import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true, // Enable Gzip compression
  images: {
    formats: ['image/avif', 'image/webp'], // Prefer modern formats
  },
};

export default nextConfig;
