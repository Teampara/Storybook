import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This makes sure every route starts with /storybook in production.
  // Example: / becomes /storybook and /about becomes /storybook/about.
  basePath: "/storybook",
};

export default nextConfig;
