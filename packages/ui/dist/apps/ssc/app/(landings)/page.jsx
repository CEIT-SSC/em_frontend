"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var FeatureCard_1 = __importDefault(require("../components/FeatureCard"));
var ui_1 = require("@ssc/ui");
var TeamMemberCard_1 = __importDefault(require("../components/TeamMemberCard"));
var image_1 = __importDefault(require("next/image"));
var gr_1 = require("react-icons/gr");
var md_1 = require("react-icons/md");
var gi_1 = require("react-icons/gi");
var EventList_1 = __importDefault(require("./components/Events/EventList"));
var portal_png_1 = __importDefault(require("~/assets/portal.png"));
var liara_svg_1 = __importDefault(require("~/assets/sponsors/liara.svg"));
var link_1 = __importDefault(require("next/link"));
var abbas_png_1 = __importDefault(require("~/assets/members/abbas.png"));
var ashkan_png_1 = __importDefault(require("~/assets/members/ashkan.png"));
var delaraam_png_1 = __importDefault(require("~/assets/members/delaraam.png"));
var javad_png_1 = __importDefault(require("~/assets/members/javad.png"));
var alireza_png_1 = __importDefault(require("~/assets/members/alireza.png"));
var behrad_jpg_1 = __importDefault(require("~/assets/members/behrad.jpg"));
var notfound_png_1 = __importDefault(require("~/assets/notfound.png"));
var ImagesCarousel_1 = __importDefault(require("./components/ImagesCarousel/ImagesCarousel"));
var imagesCarousel1 = [
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
var imagesCarousel2 = [
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
function Home() {
    return (<main>
      <div className="flex justify-center items-center gap-16 pl-12 pr-12 md:pr-0 py-12 2xl:gap-48">
        <div className="relative w-full max-w-[774px] hidden md:block">
          <image_1.default src={portal_png_1.default} alt="portal model picture"/>
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
          <link_1.default href="#events">
            <ui_1.Button className="min-h-12 min-w-20 w-fit h-fit rounded-lg overflow-hidden p-px px-3 py-2 cursor-pointer flex gap-2 justify-center items-center" variant={ui_1.ButtonVariant.PRIMARY} label="رویداد های پیش رو"/>
          </link_1.default>
        </div>
      </div>
      <div className="flex-col justify-center gap-4 hidden md:flex">
        <ImagesCarousel_1.default direction="rtl" animationDuration={180} images={imagesCarousel1.map(function (image) { return ({
            src: image,
            width: 400,
            height: 200,
        }); })}/>
        <ImagesCarousel_1.default animationDuration={180} images={imagesCarousel2.map(function (image) { return ({
            src: image,
            width: 400,
            height: 200,
        }); })}/>
      </div>
      <div className="flex justify-center py-12 px-6">
        <h3 className="text-4xl/[150%] font-bold w-200 text-center">
          کنار هم یاد می‌گیریم، می‌سازیم و اثر می‌گذاریم؛ از رویدادهای تخصصی و
          کارگاه‌های مهارتی تا پروژه‌های مشترک دانشجویی و صنعتی.
        </h3>
      </div>
      <div className="flex flex-col justify-between items-center gap-8 py-8 px-12 lg:flex-row">
        <FeatureCard_1.default icon={md_1.MdEmojiEvents} title="رویدادها و کارگاه‌ها" description="هر ترم مجموعه‌ای از رویدادهای آموزشی و فنی برگزار می‌کنیم: از مقدماتی تا پیشرفته، با تمرکز بر مهارت‌های کاربردی مثل توسعه وب، علم داده، امنیت، سیستم‌ها و مصاحبه‌های فنی. خروجی هر رویداد، یادگیری عمیق و شبکه‌سازی واقعی است."/>
        <FeatureCard_1.default icon={gr_1.GrWorkshop} title="کارگروه‌ها و پروژه‌ها" description="در کارگروه‌های تخصصی موضوع‌محور (AI، Backend، Frontend، سیستم‌های توزیع‌شده و …) روی پروژه‌های عملی کار می‌کنیم. منتورینگ، بازبینی کد و مستندسازی جزو اصول ماست تا اعضا نمونه‌کار حرفه‌ای بسازند."/>
        <FeatureCard_1.default icon={gi_1.GiMeshNetwork} title="فرصت‌های مشارکت و عضویت" description="می‌خواهی برگزارکننده باشی یا مدرس؟ دنبال تیم برای مسابقه یا ایده‌ای برای اجرا هستی؟ با عضویت در انجمن به شبکه‌ای از دانشجوهای فعال و استادان و صنعت متصل می‌شوی و می‌توانی در برنامه‌ها نقش‌آفرینی کنی."/>
      </div>
      <div className="px-12 py-6 flex flex-col gap-8" id="events">
        <h2 className="text-5xl font-bold text-center">رویداد ها</h2>
        <EventList_1.default />
      </div>
      <div className="py-6">
        <h2 className="text-5xl/[150%] font-bold text-center">تیم ما</h2>
        <p className="text-[18px]/[150%] font-bold text-(--TextWhite) text-center">
          منتخب انتخابات دور 19ام انجمن علمی مهندسی کامپیوتر امیرکبیر
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 py-8 px-4">
          <TeamMemberCard_1.default name="محمدجواد اکبری" position="دبیر انجمن" photoUrl={javad_png_1.default.src} githubUrl="https://github.com/Javad-Ak" linkedinUrl="https://www.linkedin.com/in/mo-ja-akbari/"/>
          <TeamMemberCard_1.default name="صبا سیدطبایی" position="مسئول مالی" photoUrl={notfound_png_1.default.src} linkedinUrl="https://www.linkedin.com/in/saba-seyed-tabaei"/>
          <TeamMemberCard_1.default name="امیرعباس انتظاری" position="مسئول ارتباط با صنعت" photoUrl={abbas_png_1.default.src} githubUrl="https://github.com/AmirabbasEntezari"/>
          <TeamMemberCard_1.default name="دلارام روحانی" position="مسئول آموزشی" photoUrl={delaraam_png_1.default.src} linkedinUrl="https://www.linkedin.com/in/delaraamroohani"/>
          <TeamMemberCard_1.default name="اشکان چاجی" position="مسئول مسابقات" photoUrl={ashkan_png_1.default.src} githubUrl="https://github.com/ashkanchaji" linkedinUrl="https://www.linkedin.com/in/ashkan-chaji-71493434b/"/>
          <TeamMemberCard_1.default name="علیرضا صفری" position="مسئول انفورماتیک" photoUrl={alireza_png_1.default.src} githubUrl="https://github.com/Alireza12ss" linkedinUrl="https://www.linkedin.com/in/alireza-safari-3ba3942b8/"/>
          <TeamMemberCard_1.default name="بهراد حضوری" position="مسئول روابط عمومی" photoUrl={behrad_jpg_1.default.src} githubUrl="https://github.com/BehradHZ"/>
        </div>
      </div>
      <div className="flex flex-col gap-8 px-12 py-6">
        <h2 className="text-5xl font-bold text-center">حامیان ما</h2>
        <div className="flex justify-center gap-9 py-8 sm:px-24">
          <link_1.default href="https://liara.ir" target="_blank">
            <image_1.default width={150} height={150} className="w-auto h-auto" src={liara_svg_1.default.src} alt="tapsi"/>
          </link_1.default>
        </div>
      </div>
    </main>);
}
