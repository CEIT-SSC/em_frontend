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
          <h2 id="roadmap-heading">بعدش چه خبر؟</h2>
          <p>{config.source === "backend" ? "فعلاً برنامه‌مون اینه که به این ترتیب پیش بریم. تاریخ‌ها هنوز قطعی نیست و ممکنه ترتیب رویدادها هم عوض بشه." : "این‌ها برنامه‌های بعدی‌مونن. تاریخ بعضی‌ها مشخصه، برای بقیه هنوز داریم برنامه می‌ریزیم. ترتیب رویدادهای بدون تاریخ هم ممکنه عوض بشه."}</p>
          <a className="ssc-roadmap-follow" href="https://t.me/ceit_ssc">خبرها رو در تلگرام دنبال کنید<HiArrowUpLeft aria-hidden="true" /></a>
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
                {event.date ? <time dateTime={event.date.dateTime}><HiCalendarDays aria-hidden="true" />{event.date.label}</time> : <span className="ssc-roadmap-date">تاریخش رو اعلام می‌کنیم</span>}
                </div>
              </li>
            );})}
          </ol>
          </RoadmapMotion>
        ) : (
          <div className="ssc-roadmap-pending"><h3>{unavailable ? "برنامه‌ها بارگذاری نشد" : "برنامه‌های بعدی رو اینجا می‌گذاریم"}</h3><p>{unavailable ? "کمی بعد دوباره سر بزنید. خبرها رو توی کانال تلگرام هم می‌گذاریم." : "هنوز برنامه‌ای اینجا نداریم. وقتی مشخص بشه، اسم و تاریخش رو همین‌جا می‌گذاریم."}</p></div>
        )}
      </div>
    </section>
  );
}
