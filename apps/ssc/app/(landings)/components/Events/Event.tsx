import Image from "next/image";
import Link from "next/link";
import { HiArrowUpLeft } from "react-icons/hi2";

export interface EventProps {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  poster: string;
  is_active: boolean;
  landing_url: string;
  description: string;
  manager: string;
}

export default function Event({ event }: { event: EventProps }) {
  const isOver = new Date(event.end_date).getTime() <= Date.now();
  const date = new Date(event.start_date).toLocaleDateString("fa-IR", { day: "numeric", month: "long", year: "numeric" });
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <Image width={600} height={600} src={event.poster} alt={`پوستر ${event.title}`} className="aspect-square w-full object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="min-w-0 break-words text-xl font-semibold" dir="auto">{event.title}</h3>
          {isOver && <span className="shrink-0 rounded-full border border-border bg-surface-raised px-2.5 py-1 text-xs text-muted">برگزار شده</span>}
        </div>
        <p className="text-sm text-muted">{event.manager}</p>
        <p className="line-clamp-3 text-sm leading-7 text-muted">{event.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          {event.is_active && event.landing_url ? <Link className="ssc-action ssc-action-secondary" href={event.landing_url} target="_blank" rel="noopener noreferrer" aria-label={`اطلاعات بیشتر درباره ${event.title}`}>اطلاعات بیشتر<HiArrowUpLeft aria-hidden="true" /></Link> : <span className="text-sm text-muted">ثبت‌نام بسته است</span>}
          <time dateTime={event.start_date} className="text-xs text-muted">{date}</time>
        </div>
      </div>
    </article>
  );
}
