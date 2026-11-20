import Event, { EventProps } from "./Event";

export default async function EventList() {
  let events: EventProps[] = [];
  let unavailable = false;
  try {
    const response = await fetch("https://api.ceit-ssc.ir/api/events/", { cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`Events request failed: ${response.status}`);
    const results = await response.json();
    if (!Array.isArray(results?.data?.results)) throw new Error("Invalid events response");
    events = results.data.results;
  } catch {
    unavailable = true;
  }
  if (unavailable) return <div className="ssc-empty"><h3 className="text-lg font-semibold">دریافت رویدادها ممکن نشد</h3><p className="mt-2 text-sm text-muted">لطفاً کمی بعد دوباره تلاش کنید.</p><a href="/#events" className="ssc-action ssc-action-secondary mt-5">تلاش دوباره</a></div>;
  if (!events.length) return <div className="ssc-empty"><h3 className="text-lg font-semibold">فعلا رویدادی نداریم!</h3><p className="mt-2 text-sm text-muted">برای اطلاع از برنامه‌های بعدی، ما را در <a className="ssc-inline-link" href="https://t.me/ceit_ssc">تلگرام</a> دنبال کنید.</p></div>;
  return <div className="ssc-event-grid">{events.map(event => <Event key={event.id} event={event} />)}</div>;
}
