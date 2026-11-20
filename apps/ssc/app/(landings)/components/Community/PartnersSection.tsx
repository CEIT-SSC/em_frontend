import Image from "next/image";
import { HiArrowUpLeft } from "react-icons/hi2";
import liara from "~/assets/sponsors/liara.svg";
import "./community.css";
import { homepageContent } from "./homepage-content";

export default function PartnersSection() {
  const username = homepageContent.sponsorship.telegramUsername?.replace(/^@/, "");
  const sponsorshipTelegram = username ? `https://t.me/${encodeURIComponent(username)}` : null;
  return (
    <section id="partners" className="ssc-container ssc-section ssc-partners" aria-labelledby="partners-heading">
      <div className="ssc-partner-invitation">
        <h2 id="partners-heading">کنار ما در<br /><span>رویدادهای بعدی باشید.</span></h2>
        <p>برای برگزاری این رویدادها، به همراهی حامی‌ها هم نیاز داریم. اگر دوست دارید از برنامه‌های انجمن حمایت کنید، توی تلگرام بهمون پیام بدید تا درباره همکاری گپ بزنیم.</p>
        {sponsorshipTelegram ? <a href={sponsorshipTelegram} className="ssc-action ssc-action-primary">برای همکاری پیام بدید<HiArrowUpLeft aria-hidden="true" /></a> : <p className="ssc-sponsor-contact-pending">راه ارتباطی برای همکاری رو به‌زودی همین‌جا می‌گذاریم.</p>}
      </div>
      <div className="ssc-current-partners">
        <h3>همراهان انجمن</h3>
        <a className="ssc-partner-logo" href="https://liara.ir" target="_blank" rel="noopener noreferrer" aria-label="وب‌سایت لیارا (در زبانه جدید)">
          <Image src={liara} alt="" width={180} height={100} />
          <span>لیارا<HiArrowUpLeft aria-hidden="true" /></span>
        </a>
        <p>ممنون که توی برگزاری برنامه‌ها کنارمون هستید.</p>
      </div>
    </section>
  );
}
