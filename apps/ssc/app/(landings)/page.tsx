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
import abbas from "~/assets/members/abbas.png";
import ashkan from "~/assets/members/ashkan.png";
import delaraam from "~/assets/members/delaraam.png";
import javad from "~/assets/members/javad.png";
import alireza from "~/assets/members/alireza.png";
import behrad from "~/assets/members/behrad.jpg";
import notfound from "~/assets/notfound.png";
import ImagesCarousel from "./components/ImagesCarousel/ImagesCarousel";

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
            اینجا جای اثبات توانایی هاته!
          </h1>
          <p className="text-[20px]/[150%] font-bold opacity-60 pe-4 mb-6 text-center md:text-right">
            به جامعه‌ای پرشور از علاقه‌مندان به فناوری بپیوندید و در رقابت‌ها و
            رویدادهای هیجان‌انگیز شرکت کنید. مهارت‌های خود را ارتقا دهید و با
            افراد هم‌فکر ارتباط برقرار کنید!
          </p>
          <Link href="#events">
            <Button
              className="h-8 min-w-20 w-fit rounded-lg overflow-hidden p-px px-3 py-2 cursor-pointer flex gap-2 justify-center items-center"
              variant={ButtonVariant.PRIMARY}
              label="رویداد های پیش رو"
              // suffixIcon={HiArrowLeft}
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
      <div className="flex flex-col justify-between items-center gap-8 py-8 px-12 lg:flex-row">
        <FeatureCard
          icon={MdEmojiEvents}
          title="رویدادها و کارگاه‌ها"
          description="هر ترم مجموعه‌ای از رویدادهای آموزشی و فنی برگزار می‌کنیم: از مقدماتی تا پیشرفته، با تمرکز بر مهارت‌های کاربردی مثل توسعه وب، علم داده، امنیت، سیستم‌ها و مصاحبه‌های فنی. خروجی هر رویداد، یادگیری عمیق و شبکه‌سازی واقعی است."
        />
        <FeatureCard
          icon={GrWorkshop}
          title="کارگروه‌ها و پروژه‌ها"
          description="در کارگروه‌های تخصصی موضوع‌محور (AI، Backend، Frontend، سیستم‌های توزیع‌شده و …) روی پروژه‌های عملی کار می‌کنیم. منتورینگ، بازبینی کد و مستندسازی جزو اصول ماست تا اعضا نمونه‌کار حرفه‌ای بسازند."
        />
        <FeatureCard
          icon={GiMeshNetwork}
          title="فرصت‌های مشارکت و عضویت"
          description="می‌خواهی برگزارکننده باشی یا مدرس؟ دنبال تیم برای مسابقه یا ایده‌ای برای اجرا هستی؟ با عضویت در انجمن به شبکه‌ای از دانشجوهای فعال و استادان و صنعت متصل می‌شوی و می‌توانی در برنامه‌ها نقش‌آفرینی کنی."
        />
      </div>
      <div className="px-12 py-6 flex flex-col gap-8" id="events">
        <h2 className="text-5xl font-bold text-center">رویداد ها</h2>
        <EventList />
      </div>
      <div className="py-6">
        <h2 className="text-5xl/[150%] font-bold text-center">تیم ما</h2>
        <p className="text-[18px]/[150%] font-bold text-(--TextWhite) text-center">
          منتخب انتخابات دور 19ام انجمن علمی مهندسی کامپیوتر امیرکبیر
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 py-8 px-4">
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
            photoUrl={notfound.src}
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
