import { HiArrowLeft } from "react-icons/hi";
import FeatureCard from "./components/FeatureCard";
import Navbar from "./components/Navbar";
import Button, { Variant } from "@ui/components/button/Button";
import MiniEvent from "./components/MiniEvent";

export default function Home() {
  return (
    <div>
      <main>
        <Navbar />
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
      </main>
    </div>
  );
}
