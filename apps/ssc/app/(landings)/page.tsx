import FeatureCard from "../components/FeatureCard";
import { Button, ButtonVariant } from "@ssc/ui";
import TeamMemberCard from "../components/TeamMemberCard";
import Image from "next/image";
import { GrWorkshop } from "react-icons/gr";
import { MdEmojiEvents } from "react-icons/md";
import { GiMeshNetwork } from "react-icons/gi";
import EventList from "./components/Events/EventList";
import portal from "~/assets/portal.png";
import liara from "~/assets/sponsors/liara.svg";
import Link from "next/link";
// import notfound from "~/assets/notfound.png";
import ImagesCarousel from "./components/ImagesCarousel/ImagesCarousel";
import { HiArrowLeft } from "react-icons/hi";

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
      <div className="flex justify-center items-center gap-16 pl-12 pr-12 md:pr-0 py-12 2xl:gap-48">
        <div className="relative w-full max-w-[774px] hidden md:block">
          <Image src={portal} alt="portal model picture" />
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-linear-0 from-background to-transparent from-15% to-25%"></div>
        </div>
        <div className="w-full flex flex-col items-center md:items-start gap-5">
          <h1 className="text-5xl/[125%] font-bold text-center md:text-right">
            جایی برای رشد، همکاری و یادگیری
          </h1>
          <p className="text-[20px]/[150%] font-bold opacity-60 pe-4 mb-6 text-center md:text-right">
            انجمن علمی مهندسی کامپیوتر دانشگاه صنعتی امیرکبیر فضایی پویا برای
            یادگیری عملی، هم‌افزایی تیمی و پیوند با صنعت فراهم کرده است. با حضور
            در برنامه‌ها و پروژه‌های ما می‌توانید مهارت‌های فنی و نرم‌افزاری خود
            را تقویت کنید و شبکه‌ای از هم‌فکران بسازید.
          </p>
          <Link href="#events">
            <Button
              className="h-8 min-w-20 w-fit rounded-lg overflow-hidden p-px px-3 py-2 cursor-pointer flex gap-2 justify-center items-center"
              variant={ButtonVariant.PRIMARY}
              label="رویداد های پیش رو"
              suffixIcon={HiArrowLeft}
            />
          </Link>
        </div>
      </div>
      <div className="flex-col justify-center gap-4 hidden md:flex">
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
      <div className="flex justify-center py-12 px-6">
        <h3 className="text-4xl/[150%] font-bold w-200 text-center">
          کنار هم یاد می‌گیریم، می‌سازیم و اثر می‌گذاریم؛ از رویدادهای تخصصی و
          کارگاه‌های مهارتی تا پروژه‌های مشترک دانشجویی و صنعتی.
        </h3>
      </div>
      <div className="px-12 py-6 flex flex-col gap-8" id="events">
        <h2 className="text-5xl font-bold text-center">رویداد ها</h2>
        <EventList />
      </div>
      <div className="flex flex-col justify-between items-baseline gap-8 py-8 px-12 lg:flex-row">
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
      <div className="flex flex-col gap-8 px-12 py-6">
        <h2 className="text-5xl font-bold text-center">حامیان ما</h2>
        <div className="flex justify-center gap-9 py-8 sm:px-24">
          <Link href="https://liara.ir" target="_blank">
            <Image
              width={150}
              height={150}
              className="w-auto h-auto"
              src={liara.src}
              alt="tapsi"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
