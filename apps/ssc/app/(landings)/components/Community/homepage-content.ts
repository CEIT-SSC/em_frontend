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
  roadmap: {
    source: "custom",
    events: [
      { title: "ACM (ICPC)", visual: "competition", date: { label: "۲۰ آذر" } },
      { title: "رویداد کامپیوتر کوانتومی", visual: "ai" },
      { title: "AAISS", visual: "ai" },
      { title: "CTF", visual: "competition" },
      { title: "لینوکس‌فست", visual: "terminal" },
      { title: "EMIT", visual: "community" },
      { title: "رویداد نرم‌افزارهای ایجنتیک", visual: "levels" },
    ],
  },
  sponsorship: { telegramUsername: "ceitssc" },
};
