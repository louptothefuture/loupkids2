import type { NextConfig } from "next";

// ponytail: Turbopack + iCloud Downloads path hangs first compile; webpack + unoptimized images fixes local dev
const fastDev = process.env.LOUP_FAST_DEV === "1";

const nextConfig: NextConfig = {
  images: {
    unoptimized: fastDev,
    remotePatterns: [
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "static1.squarespace.com" },
      { protocol: "http", hostname: "static1.squarespace.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/blog/:slug", destination: "/journal/:slug", permanent: true },
      { source: "/pricing", destination: "/shop/loup", permanent: true },
      { source: "/story", destination: "/about", permanent: true },
      { source: "/store", destination: "/shop", permanent: true },
      { source: "/store/:path*", destination: "/shop/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
