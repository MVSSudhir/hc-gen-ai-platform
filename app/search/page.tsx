import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "@/components/search/search-client";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Search",
  description:
    "Search across GenAI concepts, Human Capital AI use cases and People Analytics references.",
  path: "/search",
});

function SearchFallback() {
  return (
    <div>
      <div className="h-10 border-b border-border-strong" />
      <p className="mt-10 text-sm text-faint">Loading search…</p>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
      <Suspense fallback={<SearchFallback />}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
