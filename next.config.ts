import type { NextConfig } from "next";

// ponytail: Turbopack + iCloud Downloads path hangs first compile; webpack + unoptimized images fixes local dev
const fastDev = process.env.LOUP_FAST_DEV === "1";

const nextConfig: NextConfig = {
  output: "standalone",
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
