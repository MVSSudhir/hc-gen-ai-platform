import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: every page is pre-rendered at build time and served
  // as plain HTML/CSS/JS from Cloudflare. No server runtime.
  output: "export",
  trailingSlash: false,
  images: {
    // next/image optimization requires a server; the site uses plain <img>
    // or statically sized images instead.
    unoptimized: true,
  },
};

export default nextConfig;
