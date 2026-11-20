export type PlannedEvent = {
  title: string;
  description?: string;
  visual?: "terminal" | "game" | "ai" | "competition" | "levels" | "community";
  date?: { label: string; dateTime?: string };
};

/** Homepage editorial settings. Custom events replace the API sequence when present.
 * Dates are explicit: historical API dates must never become future commitments.
 * Example: { title: "نام رویداد", date: { label: "۱۵ آذر ۱۴۰۵", dateTime: "2026-12-06" } }
 */
export const homepageContent: {
  roadmap: { source: "backend" | "custom"; events: PlannedEvent[] };
  sponsorship: { telegramUsername: string | null };
} = {
  roadmap: { source: "backend", events: [] },
  sponsorship: { telegramUsername: "ceitssc" },
};
