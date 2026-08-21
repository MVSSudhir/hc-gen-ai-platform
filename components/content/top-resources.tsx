"use client";

import { useEffect, useId, useRef, useState } from "react";
import { YouTubeEmbed } from "@/components/content/youtube-embed";
import {
  MAX_TOPIC_RESOURCES,
  youtubeIdFromUrl,
  type LearningResource,
} from "@/lib/learning-resource";

const kindLabel: Record<LearningResource["kind"], string> = {
  video: "Video",
  article: "Article",
  docs: "Docs",
  paper: "Paper",
};

function ResourceBody({
  resource,
  index,
}: {
  resource: LearningResource;
  index: number;
}) {
  return (
    <>
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-sm italic text-faint tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="eyebrow text-faint">{kindLabel[resource.kind]}</span>
        <span className="text-[13px] text-faint">{resource.publisher}</span>
      </div>
      <p className="mt-1.5 text-[1.0625rem] font-medium leading-snug tracking-tight">
        {resource.title}
        {youtubeIdFromUrl(resource.url) ? (
          <span className="ml-2 text-sm font-normal text-accent">Play</span>
        ) : null}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        <span className="text-faint">Why this resource. </span>
        {resource.why}
      </p>
      {resource.covers.length > 0 ? (
        <div className="mt-3">
          <p className="eyebrow text-faint">Covers in this concept</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {resource.covers.map((term) => (
              <li
                key={term}
                className="rounded-full border border-border bg-surface px-2.5 py-1 text-[12px] text-muted"
              >
                {term}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export function TopResources({
  resources,
  heading = "Top resources",
}: {
  resources: LearningResource[];
  heading?: string;
}) {
  const items = resources.slice(0, MAX_TOPIC_RESOURCES);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const [video, setVideo] = useState<{ id: string; title: string } | null>(
    null,
  );

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (video) node.showModal();
    else node.close();
  }, [video]);

  useEffect(() => {
    if (!video) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [video]);

  if (!items.length) return null;

  return (
    <section id="resources" className="border-t border-border py-8">
      <div className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-10">
        <h2 className="eyebrow pt-1 text-muted">{heading}</h2>
        <ol className="space-y-3">
          {items.map((resource, index) => {
            const youtubeId = youtubeIdFromUrl(resource.url);
            const body = <ResourceBody resource={resource} index={index} />;

            return (
              <li key={`${resource.url}-${index}`}>
                {youtubeId ? (
                  <button
                    type="button"
                    onClick={() =>
                      setVideo({ id: youtubeId, title: resource.title })
                    }
                    className="panel w-full p-5 text-left transition-all hover:shadow-lift"
                  >
                    {body}
                  </button>
                ) : (
                  <a
                    href={resource.url}
                    className="panel block p-5 transition-all hover:shadow-lift"
                  >
                    {body}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        onClose={() => setVideo(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setVideo(null);
        }}
        className="m-auto w-[min(56rem,calc(100vw-1.5rem))] max-w-none border border-ink-border bg-ink p-0 text-ink-foreground shadow-lift backdrop:bg-ink/70"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
          <h3 id={headingId} className="min-w-0 truncate font-medium">
            {video?.title ?? "Video"}
          </h3>
          <button
            type="button"
            onClick={() => setVideo(null)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-ink-soft hover:text-ink-foreground"
            aria-label="Close video"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        {video ? (
          <YouTubeEmbed videoId={video.id} title={video.title} autoPlay />
        ) : null}
      </dialog>
    </section>
  );
}
