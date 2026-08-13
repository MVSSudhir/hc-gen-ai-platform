import type { NextConfig } from "next";

const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "hc-gen-ai-platform";
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  // Fully static site: every page is pre-rendered at build time and served
  // as plain HTML/CSS/JS. No server runtime.
  output: "export",
  // GitHub Pages only serves `about/index.html` for `/about/`, not `about.html`.
  trailingSlash: isGitHubPages,
  ...(basePath ? { basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // next/image optimization requires a server; the site uses plain <img>
    // or statically sized images instead.
    unoptimized: true,
  },
};

export default nextConfig;
