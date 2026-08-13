import type { MetadataRoute } from "next";
import { itemPath, publishedContent } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "",
    "/genai",
    "/human-capital-ai",
    "/people-analytics",
    "/work",
    "/about",
    "/search",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const contentPages = publishedContent().map(({ meta }) => ({
    url: `${site.url}${itemPath(meta)}`,
    lastModified: meta.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...contentPages];
}
