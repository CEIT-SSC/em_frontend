import FeatureCard from "../components/FeatureCard";
import Image from "next/image";
import { GrWorkshop } from "react-icons/gr";
import { MdEmojiEvents } from "react-icons/md";
import { GiMeshNetwork } from "react-icons/gi";
import EventList from "./components/Events/EventList";
import liara from "~/assets/sponsors/liara.svg";
import Link from "next/link";
// import notfound from "~/assets/notfound.png";
import ImagesCarousel from "./components/ImagesCarousel/ImagesCarousel";
import HeroSection from "./components/Hero/HeroSection";
import TeamMemberCard from "~/app/components/TeamMemberCard";
import abbas from "~/assets/members/abbas.jpg";
import ashkan from "~/assets/members/ashkan.jpg";
import delaraam from "~/assets/members/delaraam.png";
import javad from "~/assets/members/javad.jpg";
import alireza from "~/assets/members/alireza.png";
import behrad from "~/assets/members/behrad.jpg";
import saba from "~/assets/members/saba.jpg";

const imagesCarousel1: string[] = [
  "/events/acpc/2.JPG",
  "/events/linuxfest/4.png",
  "/events/acpc/6.JPG",
  "/events/gamecraft/1.png",
  "/events/emit/1.png",
  "/events/gamecraft/2.png",
  "/events/linuxfest/1.png",
  "/events/acpc/1.JPG",
  "/events/linuxfest/5.png",
  "/events/gamecraft/4.png",
];

const imagesCarousel2: string[] = [
  "/events/gamecraft/3.png",
  "/events/linuxfest/3.png",
  "/events/gamecraft/6.png",
  "/events/acpc/3.JPG",
  "/events/gamecraft/5.png",
  "/events/acpc/4.JPG",
  "/events/linuxfest/2.png",
  "/events/emit/2.png",
  "/events/acpc/5.JPG",
  "/events/linuxfest/6.png",
];

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="flex flex-col gap-3 overflow-hidden py-4" role="region" aria-label="تصاویری از رویدادهای انجمن">
        <ImagesCarousel
          direction="rtl"
          animationDuration={180}
          images={imagesCarousel1.map((image) => ({
            src: image,
            width: 400,
            height: 200,
          }))}
        />
        <ImagesCarousel
          animationDuration={180}
          images={imagesCarousel2.map((image) => ({
            src: image,
            width: 400,
            height: 200,
          }))}
        />
      </div>
      <div className="ssc-container py-12 md:py-16">
        <p className="mx-auto max-w-3xl text-center text-xl font-medium leading-9 text-muted md:text-2xl md:leading-10">
          کنار هم یاد می‌گیریم، می‌سازیم و اثر می‌گذاریم؛ از رویدادهای تخصصی و
          کارگاه‌های مهارتی تا پروژه‌های مشترک دانشجویی و صنعتی.
        </p>
      </div>
      <section className="ssc-container ssc-section" id="events" aria-labelledby="events-heading">
        <h2 id="events-heading" className="ssc-section-heading">رویداد ها</h2>
        <EventList />
      </section>
      <div className="ssc-container ssc-section grid gap-10 border-t border-border lg:grid-cols-3 lg:gap-8">
        <FeatureCard
          icon={MdEmojiEvents}
          title="رویدادهای پیش‌رو"
          description="رویدادهای انجمن هم یادگیری عمیق و هم تجربه‌ی عملی را به همراه دارد — از نشست‌های تخصصی و چالش‌های برنامه‌نویسی تا کارگاه‌های کاربردی و همکاری‌های صنعتی. هر رویداد با هدف تبدیل نظریه به عمل و ایجاد خروجی ملموس برگزار می‌شود."
        />
        <FeatureCard
          icon={GrWorkshop}
          title="سخنرانی ها و کارگاه‌ها"
          description="در هر نیم‌سال مجموعه‌ای از کارگاه‌ها و دوره‌ها ارائه می‌شود: از سطح مبتدی تا پیشرفته. محوریت موضوعات شامل توسعه وب، علم داده، امنیت، هوش مصنوعی، آماده‌سازی برای مصاحبه‌های فنی و مهارت‌های مهندسی نرم‌افزار است. پس از هر برنامه، انتظار می‌رود شرکت‌کنندگان دانش کاربردی کسب کنند و ارتباطات حرفه‌ای قابل‌اعتمادی شکل بگیرد."
        />
        <FeatureCard
          icon={GiMeshNetwork}
          title="فرصت‌های مشارکت و عضویت"
          description="چه بخواهید برگزارکننده یا مدرس باشید، چه دنبال تیمی برای شرکت در مسابقه یا همراهی با یک ایده باشید، انجمن بستری برای ایفای نقش فعال شماست. این بستر دسترسی به شبکه‌ای از دانشجویان، اساتید و نیروهای صنعتی ایجاد می‌کند و شما را در مسیر اجرا و اثرگذاری همراهی می‌کند."
        />
      </div>

      <section className="ssc-container ssc-section border-t border-border" aria-labelledby="team-heading">
        <h2 id="team-heading" className="ssc-section-heading">تیم ما</h2>
        <p className="ssc-section-description">
          منتخب انتخابات دور 19ام انجمن علمی مهندسی کامپیوتر امیرکبیر
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <TeamMemberCard
            name="محمدجواد اکبری"
            position="دبیر انجمن"
            photoUrl={javad.src}
            githubUrl="https://github.com/Javad-Ak"
            linkedinUrl="https://www.linkedin.com/in/mo-ja-akbari/"
          />
          <TeamMemberCard
            name="صبا سیدطبایی"
            position="مسئول مالی"
            photoUrl={saba.src}
            linkedinUrl="https://www.linkedin.com/in/saba-seyed-tabaei"
          />
          <TeamMemberCard
            name="امیرعباس انتظاری"
            position="مسئول ارتباط با صنعت"
            photoUrl={abbas.src}
            githubUrl="https://github.com/AmirabbasEntezari"
          />
          <TeamMemberCard
            name="دلارام روحانی"
            position="مسئول آموزشی"
            photoUrl={delaraam.src}
            linkedinUrl="https://www.linkedin.com/in/delaraamroohani"
          />
          <TeamMemberCard
            name="اشکان چاجی"
            position="مسئول مسابقات"
            photoUrl={ashkan.src}
            githubUrl="https://github.com/ashkanchaji"
            linkedinUrl="https://www.linkedin.com/in/ashkan-chaji-71493434b/"
          />
          <TeamMemberCard
            name="علیرضا صفری"
            position="مسئول انفورماتیک"
            photoUrl={alireza.src}
            githubUrl="https://github.com/Alireza12ss"
            linkedinUrl="https://www.linkedin.com/in/alireza-safari-3ba3942b8/"
          />
          <TeamMemberCard
            name="بهراد حضوری"
            position="مسئول روابط عمومی"
            photoUrl={behrad.src}
            githubUrl="https://github.com/BehradHZ"
          />
        </div>
      </section>
      <section className="ssc-container ssc-section border-t border-border" aria-labelledby="sponsors-heading">
        <h2 id="sponsors-heading" className="ssc-section-heading">حامیان ما</h2>
        <div className="flex items-center gap-9 py-6">
          <Link href="https://liara.ir" target="_blank">
            <Image
              width={150}
              height={150}
              className="h-auto w-32"
              src={liara.src}
              alt="لیارا"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
