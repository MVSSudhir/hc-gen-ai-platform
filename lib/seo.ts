import type { Metadata } from "next";
import { site, verticalMeta } from "./site";
import { itemPath } from "./content";
import type { ContentItem } from "./validation";

/** Builds page metadata with canonical URL and OpenGraph tags. */
export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const { title, description, path } = options;
  return {
    title,
    description,
    alternates: { canonical: `${site.url}${path}` },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url: `${site.url}${path}`,
      siteName: site.name,
      type: "article",
    },
  };
}

export function contentMetadata(meta: ContentItem): Metadata {
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: itemPath(meta),
  });
}

/* ----------------------------- JSON-LD builders ---------------------------- */

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.contributor,
    url: site.url,
    email: site.email,
    description: `Contributor to ${site.name}`,
    ...(site.linkedin || site.github
      ? { sameAs: [site.linkedin, site.github].filter(Boolean) }
      : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    contributor: {
      "@type": "Person",
      name: site.contributor,
    },
  };
}

export function articleJsonLd(meta: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    url: `${site.url}${itemPath(meta)}`,
    datePublished: meta.createdAt,
    dateModified: meta.updatedAt,
    author: { "@type": "Person", name: site.contributor, url: site.url },
  };
}

export function breadcrumbJsonLd(meta: ContentItem) {
  const vertical = verticalMeta[meta.vertical];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: vertical.label,
        item: `${site.url}${vertical.path}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.title,
        item: `${site.url}${itemPath(meta)}`,
      },
    ],
  };
}
