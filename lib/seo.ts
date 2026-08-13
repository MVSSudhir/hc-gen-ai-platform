import type { Metadata } from "next";
import { ogImage, site, verticalMeta } from "./site";
import { itemPath } from "./content";
import type { ContentItem } from "./validation";

function socialImages() {
  return [
    {
      url: ogImage.url,
      width: ogImage.width,
      height: ogImage.height,
      alt: ogImage.alt,
    },
  ];
}

/** Builds page metadata with canonical URL and OpenGraph tags. */
export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const { title, description, path, type = "website" } = options;
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_US",
      images: socialImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      images: [ogImage.url],
    },
  };
}

export function contentMetadata(meta: ContentItem): Metadata {
  const base = pageMetadata({
    title: meta.title,
    description: meta.description,
    path: itemPath(meta),
    type: "article",
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: meta.createdAt,
      modifiedTime: meta.updatedAt,
      authors: [site.name],
    },
  };
}

/* ----------------------------- JSON-LD builders ---------------------------- */

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.tagline,
    jobTitle: site.tagline,
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
    publisher: { "@type": "Person", name: site.name, url: site.url },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    image: `${site.url}${ogImage.url}`,
    mainEntityOfPage: `${site.url}${itemPath(meta)}`,
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
