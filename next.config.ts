import type { NextConfig } from "next";

const config: NextConfig = {
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 750, 1080, 1440, 1920, 2560],
  },
};

export default config;
