import type { NextConfig } from "next";

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  throw new Error("API_URL environment variable is not set");
}

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL('https://game-tracker-avatars.s3.eu-north-1.amazonaws.com/**')],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
