const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats a YYYY-MM-DD date the same way on every machine and timezone. */
export function formatPostDate(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}
