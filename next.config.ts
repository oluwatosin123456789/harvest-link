import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep Turbopack inside this project when another lockfile exists above it.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
