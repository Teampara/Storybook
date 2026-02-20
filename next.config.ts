import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We deploy inside /storybook, so all routes should start with this path.
  basePath: "/storybook",
};

export default nextConfig;
