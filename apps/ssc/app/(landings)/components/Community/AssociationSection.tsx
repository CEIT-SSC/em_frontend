import Image from "next/image";
import AssociationMotion from "./AssociationMotion";
import "./community.css";

export default function AssociationSection() {
  return (
    <section id="association" className="ssc-container ssc-section ssc-association" aria-labelledby="association-heading">
      <div className="ssc-association-intro">
        <h2 id="association-heading">پشت هر رویداد،<br /><span>ما دانشجوهاییم.</span></h2>
        <div>
          <p>ما هم دانشجوهای کامپیوتر امیرکبیریم. انجمن رو خودمون می‌چرخونیم، از پیدا کردن موضوعی که برامون جالبه تا جمع کردن تیم و برگزاری رویداد.</p>
          <p>دلمون می‌خواد چیزهایی که دوست داریم رو بیرون از کلاس هم دنبال کنیم، ایده‌هامون رو امتحان کنیم، هم‌تیمی پیدا کنیم و از تجربه‌های هم یاد بگیریم.</p>
        </div>
      </div>
      <AssociationMotion>
        <figure className="ssc-association-photo">
          <Image src="/events/gamecraft/6.png" alt="دانشجوها در یکی از رویدادهای گیم‌کرفت انجمن" fill sizes="(min-width: 900px) 40vw, 100vw" />
          <figcaption>آدم‌ها و خاطره‌های گیم‌کرفت</figcaption>
        </figure>
        <div className="ssc-association-process">
          <h3>از اولین پیشنهاد تا روز رویداد</h3>
          <ol>
            <li><span aria-hidden="true">۱</span><div><h4>اول، یک ایده</h4><p>گاهی دلمون می‌خواد کار با یه ابزار رو یاد بگیریم، گاهی هم دنبال یه رقابت هیجان‌انگیزیم. ایده رویدادها از همین علاقه‌ها و پیشنهادهای بچه‌ها شروع می‌شه.</p></div></li>
            <li><span aria-hidden="true">۲</span><div><h4>بعد، دست‌به‌کار شدن</h4><p>تیم جمع می‌کنیم، محتوا رو آماده می‌کنیم و با مدرس‌ها و حامی‌ها هماهنگ می‌شیم. کم‌کم ایده‌ای که داشتیم، تبدیل به یه برنامه واقعی می‌شه.</p></div></li>
            <li><span aria-hidden="true">۳</span><div><h4>و بالاخره، روز رویداد</h4><p>بالاخره دور هم جمع می‌شیم؛ یاد می‌گیریم، رقابت می‌کنیم و با آدم‌های تازه آشنا می‌شیم. شاید هم هم‌تیمی بعدی‌مون رو همین‌جا پیدا کنیم.</p></div></li>
          </ol>
        </div>
      </AssociationMotion>
    </section>
  );
}
