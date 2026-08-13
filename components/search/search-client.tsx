"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SearchRecord } from "@/lib/search";
import { labelize } from "@/lib/taxonomy";

const verticalOrder = [
  "genai",
  "human-capital-ai",
  "people-analytics",
  "work",
] as const;

const verticalLabels: Record<string, string> = {
  genai: "GenAI",
  "human-capital-ai": "Human Capital AI",
  "people-analytics": "People Analytics",
  work: "Work",
};

export function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(paramQuery);
  const [records, setRecords] = useState<SearchRecord[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Search index ${res.status}`);
        return res.json() as Promise<SearchRecord[]>;
      })
      .then((data) => {
        if (!cancelled) {
          setRecords(Array.isArray(data) ? data : []);
          setLoadError(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRecords([]);
          setLoadError(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    const id = window.setTimeout(() => {
      const current = new URLSearchParams(window.location.search).get("q") ?? "";
      if (trimmed === current) return;
      const params = trimmed ? `?q=${encodeURIComponent(trimmed)}` : "";
      router.replace(`/search${params}`, { scroll: false });
    }, 250);
    return () => window.clearTimeout(id);
  }, [query, router]);

  const fuse = useMemo(() => {
    if (!records) return null;
    return new Fuse(records, {
      keys: [
        { name: "title", weight: 3 },
        { name: "description", weight: 1.5 },
        { name: "tags", weight: 1 },
        { name: "keywords", weight: 1 },
        { name: "contentType", weight: 0.5 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }, [records]);

  const results = useMemo(() => {
    if (!fuse || query.trim().length < 2) return [];
    return fuse.search(query.trim(), { limit: 30 }).map((r) => r.item);
  }, [fuse, query]);

  const grouped = useMemo(
    () =>
      verticalOrder
        .map((vertical) => ({
          vertical,
          label: verticalLabels[vertical],
          items: results.filter((r) => r.vertical === vertical),
        }))
        .filter((group) => group.items.length > 0),
    [results],
  );

  return (
    <div>
      <label htmlFor="site-search" className="sr-only">
        Search the knowledge base
      </label>
      <input
        ref={inputRef}
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search concepts, use cases, metrics…"
        autoComplete="off"
        enterKeyHint="search"
        className="w-full border-b border-border-strong bg-transparent pb-3 font-serif text-2xl font-medium tracking-tight outline-none placeholder:text-faint focus:border-accent sm:text-3xl"
      />

      <div aria-live="polite" className="mt-10">
        {records === null && (
          <p className="text-sm text-faint">Loading search index…</p>
        )}

        {loadError && (
          <p className="text-muted">
            Search is unavailable right now. Try again in a moment, or browse
            from the homepage.
          </p>
        )}

        {query.trim().length >= 2 &&
          records &&
          !loadError &&
          results.length === 0 && (
            <p className="text-muted">No results for “{query.trim()}”.</p>
          )}

        {grouped.map((group) => (
          <section key={group.vertical} className="mb-10">
            <h2 className="mb-3 eyebrow text-muted">{group.label}</h2>
            <ul>
              {group.items.map((item) => (
                <li
                  key={item.url}
                  className="border-b border-border py-4 first:border-t"
                >
                  <Link
                    href={item.url}
                    className="text-lg font-medium tracking-tight transition-colors hover:text-accent"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                  <p className="mt-1.5 text-xs text-faint">
                    {labelize(item.contentType)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {query.trim().length < 2 && !loadError && records && (
          <p className="text-sm text-faint">
            Search across GenAI concepts, Human Capital AI use cases, People
            Analytics metrics, methods and dashboards, and selected work.
          </p>
        )}
      </div>
    </div>
  );
}
