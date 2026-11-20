import Event from "./Event";
import { getEvents } from "./getEvents";

export default async function EventList() {
  const { events, unavailable } = await getEvents();
  if (unavailable) return <div className="ssc-empty"><h3 className="text-lg font-semibold">دریافت رویدادها ممکن نشد</h3><p className="mt-2 text-sm text-muted">لطفاً کمی بعد دوباره تلاش کنید.</p><a href="/#events" className="ssc-action ssc-action-secondary mt-5">تلاش دوباره</a></div>;
  if (!events.length) return <div className="ssc-empty"><h3 className="text-lg font-semibold">فعلا رویدادی نداریم!</h3><p className="mt-2 text-sm text-muted">برای اطلاع از برنامه‌های بعدی، ما را در <a className="ssc-inline-link" href="https://t.me/ceit_ssc">تلگرام</a> دنبال کنید.</p></div>;
  return <div className="ssc-event-grid">{events.map(event => <Event key={event.id} event={event} />)}</div>;
}
