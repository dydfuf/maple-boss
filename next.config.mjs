import withBundleAnalyzer from "@next/bundle-analyzer"
import withPlugins from "next-compose-plugins"
import { env } from "./env.mjs"

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], {
    generateBuildId: async () => {
        // You can, for example, get the latest git commit hash here
        return crypto.randomUUID()
      },
})

export default config
