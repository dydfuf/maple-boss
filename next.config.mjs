import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
import { env } from "./env.mjs";

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return crypto.randomUUID();
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/boss",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-web-dev-smash.mapleboss.io",
      },
      {
        protocol: "https",
        hostname: "avatar.maplestory.nexon.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/proxy/api/:path*",
        destination: `${env.NEXT_PUBLIC_API_HOST}/api/:path*`,
      },
    ];
  },
});

export default config;
