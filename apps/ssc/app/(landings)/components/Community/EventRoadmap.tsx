import { HiArrowUpLeft, HiCalendarDays } from "react-icons/hi2";
import RoadmapMotion from "./RoadmapMotion";
import EventArtwork from "./EventArtwork";
import "./roadmap.css";
import { getEvents } from "../Events/getEvents";
import { homepageContent, type PlannedEvent } from "./homepage-content";

export default async function EventRoadmap() {
  const config = homepageContent.roadmap;
  const { events, unavailable } = config.source === "backend"
    ? await getEvents()
    : { events: [], unavailable: false };
  const plannedEvents: PlannedEvent[] = config.source === "custom"
    ? config.events
    : events.map((event) => ({ title: event.title }));
  return (
    <section id="roadmap" className="ssc-roadmap" aria-labelledby="roadmap-heading">
      <div className="ssc-container ssc-section ssc-roadmap-layout">
        <div className="ssc-roadmap-intro">
          <h2 id="roadmap-heading">در ادامهٔ راه</h2>
          <p>{config.source === "backend" ? "ترتیب پیشنهادی برنامه‌ها؛ زمان برگزاری هنوز مشخص نیست و این ترتیب ممکن است تغییر کند." : "برنامه‌های پیش رو؛ بعضی با تاریخ مشخص، بعضی هنوز در مرحلهٔ برنامه‌ریزی. ترتیب برنامه‌های بدون تاریخ ممکن است تغییر کند."}</p>
          <a className="ssc-roadmap-follow" href="https://t.me/ceit_ssc">خبرها در کانال انجمن<HiArrowUpLeft aria-hidden="true" /></a>
        </div>
        {plannedEvents.length > 0 ? (
          <RoadmapMotion>
          <ol className="ssc-roadmap-list" aria-label="ترتیب برنامه‌های پیش رو">
            {plannedEvents.map((event, index) => {
              return (
              <li key={`${index}-${event.title}`} className="ssc-roadmap-event" data-scheduled={Boolean(event.date)}>
                <span className="ssc-roadmap-marker" aria-hidden="true">{(index + 1).toLocaleString("fa-IR")}</span>
                <div className="ssc-roadmap-stop">
                <EventArtwork title={event.title} visual={event.visual} />
                <h3>{event.title}</h3>
                {event.description && <p>{event.description}</p>}
                {event.date ? <time dateTime={event.date.dateTime}><HiCalendarDays aria-hidden="true" />{event.date.label}</time> : <span className="ssc-roadmap-date">زمان برگزاری اعلام می‌شود</span>}
                </div>
              </li>
            );})}
          </ol>
          </RoadmapMotion>
        ) : (
          <div className="ssc-roadmap-pending"><h3>{unavailable ? "دریافت برنامه‌ها ممکن نشد" : "برنامه‌های بعدی اینجا اعلام می‌شوند"}</h3><p>{unavailable ? "لطفاً کمی بعد دوباره به این بخش سر بزنید یا خبرها را در کانال انجمن دنبال کنید." : "نام رویدادها و زمان برگزاری، پس از اعلام انجمن به این مسیر اضافه می‌شوند."}</p></div>
        )}
      </div>
    </section>
  );
}
