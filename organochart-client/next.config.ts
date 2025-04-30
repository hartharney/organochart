import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    config.resolve.alias["@"] = isServer
      ? path.resolve(__dirname, "src")
      : path.resolve(__dirname, "src");

    return config;
  },
};

export default nextConfig;
