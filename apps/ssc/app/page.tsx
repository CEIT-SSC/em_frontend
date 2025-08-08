import { HiArrowLeft } from "react-icons/hi";
import FeatureCard from "./components/FeatureCard";
import Navbar from "./components/Navbar";
import Button, { Variant } from "@ui/components/button/Button";
import MiniEvent from "./components/MiniEvent";
import TeamMemberCard from "./components/TeamMemberCard";

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex gap-10">
          <img
            src="portal.png"
            alt="portal model picture"
            className="w-[747px] h-[445px] -ms-[180px] bg-linear-to-t from-black to-transparent"
          />
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl/[125%] font-bold">
              اینجا جای اثبات توانایی هاته!
            </h1>
            <p className="text-[20px]/[150%] font-bold opacity-60 pe-4 mb-6">
              به جامعه‌ای پرشور از علاقه‌مندان به فناوری بپیوندید و در رقابت‌ها
              و رویدادهای هیجان‌انگیز شرکت کنید. مهارت‌های خود را ارتقا دهید و
              با افراد هم‌فکر ارتباط برقرار کنید!
            </p>
            <Button
              className="min-h-12 min-w-20 w-fit h-fit rounded-lg overflow-hidden p-px px-3 py-2 cursor-pointer flex gap-2 justify-center items-center"
              variant={Variant.primary}
              label="رویداد های پیش رو"
              suffixIcon={HiArrowLeft}
            />
          </div>
        </div>
        <div className="flex justify-center">image placeholders</div>
        <div className="flex justify-center py-12 px-6">
          <h3 className="text-4xl/[150%] font-bold w-200 text-center">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است
          </h3>
        </div>
        <div className="flex justify-evenly">
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
        </div>
        <div className="px-12 py-6 flex flex-col gap-8">
          <h2 className="text-5xl font-bold text-center">رویداد ها</h2>
          <div className="flex justify-evenly">
            <MiniEvent />
            <MiniEvent />
            <MiniEvent />
          </div>
        </div>
        <div className="py-6">
          <h2 className="text-5xl/[150%] font-bold text-center">تیم ما</h2>
          <p className="text-[18px]/[150%] font-bold text-(--TextWhite) text-center">
            منتخب انتخابات دور 19ام انجمن علمی مهندسی کامپیوتر امیرکبیر
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 py-8 px-4">
            <TeamMemberCard />
            <TeamMemberCard />
            <TeamMemberCard />
            <TeamMemberCard />
            <TeamMemberCard />
          </div>
        </div>
        <div className="flex flex-col gap-8 px-12 py-6">
          <h2 className="text-5xl/[150%] font-bold text-center">حامیان ما</h2>
          <div className="flex justify-center gap-9">
            <img src="tapsi.svg" alt="tapsi" />
            <img src="digi.svg" alt="digikala" />
            <img src="bazar.svg" alt="bazar" />
            <img src="snapp.svg" alt="snapp" />
          </div>
        </div>
      </main>
    </div>
  );
}
