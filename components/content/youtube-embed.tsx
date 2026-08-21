"use client";

import Image from "next/image";
import { useState } from "react";

export function YouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className="aspect-video overflow-hidden rounded-md bg-ink">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-md bg-ink text-left"
      aria-label={`Play video: ${title}`}
    >
      <Image
        src={thumbnail}
        alt=""
        fill
        sizes="(min-width: 640px) 36rem, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-foreground/95 text-ink shadow-lift transition-transform duration-300 group-hover:scale-105">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.5v13l11-6.5L8 5.5Z" />
          </svg>
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 p-3 text-sm font-medium text-ink-foreground">
        {title}
      </span>
    </button>
  );
}
