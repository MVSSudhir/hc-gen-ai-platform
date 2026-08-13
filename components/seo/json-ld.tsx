/**
 * Emits JSON-LD without breaking out of the surrounding <script> if a
 * string contains `</script>` or HTML-sensitive characters.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
