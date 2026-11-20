import Image from "next/image";
import AssociationMotion from "./AssociationMotion";
import "./community.css";

export default function AssociationSection() {
  return (
    <section id="association" className="ssc-container ssc-section ssc-association" aria-labelledby="association-heading">
      <div className="ssc-association-intro">
        <h2 id="association-heading">پشتِ هر رویداد،<br /><span>یک جمع دانشجویی‌ست.</span></h2>
        <div>
          <p>انجمن علمی مهندسی کامپیوتر امیرکبیر را دانشجوها اداره می‌کنند؛ از پیشنهاد موضوع و برنامه‌ریزی تا روز برگزاری. علاقه‌های متفاوت ما، شکل رویدادها را می‌سازد.</p>
          <p>هدفمان این است که یادگیری به کلاس محدود نماند؛ فرصتی باشد برای امتحان کردن یک ایده، پیدا کردن هم‌تیمی و آشنا شدن با مسیرهای تازهٔ دنیای کامپیوتر.</p>
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
            <li><span aria-hidden="true">۱</span><div><h4>اول، یک دغدغه</h4><p>یک ابزار تازه، جای خالی یک کارگاه یا هیجان یک مسابقه؛ موضوع برنامه از علاقه‌ها و نیازهای دانشجوها می‌آید.</p></div></li>
            <li><span aria-hidden="true">۲</span><div><h4>بعد، دست‌به‌کار شدن</h4><p>ایده به برنامه تبدیل می‌شود؛ با تیم اجرایی، آماده‌کردن محتوا و هماهنگی با مدرس‌ها و همراهان رویداد.</p></div></li>
            <li><span aria-hidden="true">۳</span><div><h4>و بالاخره، روز رویداد</h4><p>وقتِ امتحان کردن، رقابت و گفت‌وگوست؛ جایی برای یاد گرفتن از تجربهٔ دیگران و پیدا کردن آشناهای تازه.</p></div></li>
          </ol>
        </div>
      </AssociationMotion>
    </section>
  );
}
