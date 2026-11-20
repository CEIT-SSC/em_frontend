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
        <h2 id="partners-heading">همراهِ تجربه‌های<br /><span>بعدی ما باشید.</span></h2>
        <p>برای برگزاری رویدادهای دانشجویی، همراهی شما ارزشمند است. اگر دوست دارید حامی برنامه‌های انجمن باشید، دربارهٔ رویدادها و شکل همکاری با هم گفت‌وگو کنیم.</p>
        {sponsorshipTelegram ? <a href={sponsorshipTelegram} className="ssc-action ssc-action-primary">گفت‌وگو دربارهٔ حمایت در تلگرام<HiArrowUpLeft aria-hidden="true" /></a> : <p className="ssc-sponsor-contact-pending">راه ارتباطی حمایت از رویدادها به‌زودی اعلام می‌شود.</p>}
      </div>
      <div className="ssc-current-partners">
        <h3>حامیان انجمن</h3>
        <a className="ssc-partner-logo" href="https://liara.ir" target="_blank" rel="noopener noreferrer" aria-label="وب‌سایت لیارا (در زبانهٔ جدید)">
          <Image src={liara} alt="" width={180} height={100} />
          <span>لیارا<HiArrowUpLeft aria-hidden="true" /></span>
        </a>
        <p>با سپاس از همراهی حامیان در برگزاری برنامه‌های انجمن.</p>
      </div>
    </section>
  );
}
