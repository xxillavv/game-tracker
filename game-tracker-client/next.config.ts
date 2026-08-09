import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL('https://game-tracker-avatars.s3.eu-north-1.amazonaws.com/**')],
  }
};

export default nextConfig;
