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

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
      <Suspense>
        <SearchClient />
      </Suspense>
    </div>
  );
}
