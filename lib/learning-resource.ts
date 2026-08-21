export const learningResourceKinds = [
  "video",
  "article",
  "docs",
  "paper",
] as const;

export type LearningResourceKind = (typeof learningResourceKinds)[number];

/** Shared identity for a source, before it is cited on a concept. */
export type ResourceRef = {
  title: string;
  url: string;
  publisher: string;
  kind: LearningResourceKind;
};

/** A source cited on a concept — 1–10 per topic. */
export type LearningResource = ResourceRef & {
  /** Why this source belongs on this concept. */
  why: string;
  /** Terms from this concept the source actually covers. */
  covers: string[];
};

export const MIN_TOPIC_RESOURCES = 1;
export const MAX_TOPIC_RESOURCES = 10;

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

/** Extracts an 11-character YouTube video id from common watch/embed URLs. */
export function youtubeIdFromUrl(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (!YOUTUBE_HOSTS.has(host)) return undefined;

    if (host === "youtu.be" || host === "www.youtu.be") {
      return videoId(parsed.pathname.split("/").filter(Boolean)[0]);
    }

    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") {
      return videoId(parts[1]);
    }

    return videoId(parsed.searchParams.get("v") ?? undefined);
  } catch {
    return undefined;
  }
}

function videoId(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return /^[a-zA-Z0-9_-]{11}$/.test(value) ? value : undefined;
}
