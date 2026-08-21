export function YouTubeEmbed({
  videoId,
  title,
  autoPlay = true,
}: {
  videoId: string;
  title: string;
  autoPlay?: boolean;
}) {
  const params = new URLSearchParams({ rel: "0" });
  if (autoPlay) params.set("autoplay", "1");

  return (
    <div className="aspect-video overflow-hidden rounded-md bg-ink">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
