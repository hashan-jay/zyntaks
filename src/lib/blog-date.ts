/** Format blog `created` values like `2026-07` as `July 2026` (month + year only). */
export function formatBlogCreated(created: string): string {
  const [year, month] = created.split("-").map(Number);
  if (!year || !month || month < 1 || month > 12) return created;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

/** Newest first — `created` is `YYYY-MM` so string compare is chronological. */
export function sortBlogByCreatedDesc<T extends { created: string }>(
  entries: readonly T[]
): T[] {
  return [...entries].sort((a, b) => b.created.localeCompare(a.created));
}
