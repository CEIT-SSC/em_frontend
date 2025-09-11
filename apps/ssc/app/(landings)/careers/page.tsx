import React from "react";
import JobList from "./components/JobList";
import Image from "next/image";
import circle from "~/assets/abstracts/circle.svg";
import shape1 from "~/assets/abstracts/shape1.svg";
import shape2 from "~/assets/abstracts/shape2.svg";
import ashkan from "~/assets/members/ashkan2.png";
import {
  HiClipboardList,
  HiLightBulb,
  HiPresentationChartLine,
} from "react-icons/hi";

const page = () => {
  const featureStyle =
    "absolute z-10 flex items-center font-bold gap-2.5 rounded-[12px] p-2.5 bg-[#171717]";

  return (
    <main>
      <div className="flex overflow-hidden min-h-129 flex-col bg-(--MainGray) sm:flex-row sm:gap-6 pt-8 sm:px-12">
        <div className="w-full flex items-center justify-center relative min-h-100 sm:min-h-auto">
          <Image
            className="absolute z-1 -mb-20"
            width={400}
            height={400}
            src={circle}
            alt="circle behind"
          />
          <Image
            className="absolute z-2 scale-125 -mb-60 -mr-20 sm:scale-100 sm:-mb-55 sm:-mr-30"
            width={506}
            height={576}
            src={ashkan}
            alt="ashkan"
          />
          <div
            className={
              featureStyle + " top-15 left-2 sm:left-[unset] sm:right-5"
            }
          >
            تیم یابی برای انجام پروژه
            <HiLightBulb size={32} />
          </div>
          <div
            className={
              featureStyle +
              " top-58 right-3 sm:right-[unset] sm:top-40 sm:left-20"
            }
          >
            استخدام در شرکت ها
            <HiClipboardList size={32} />
          </div>
          <div
            className={
              featureStyle +
              " -bottom-6 left-6 sm:left-[unset] sm:bottom-20 sm:right-10"
            }
          >
            یافتن فضای رشد
            <HiPresentationChartLine size={32} />
          </div>
        </div>
        <div className="w-full relative hidden sm:flex items-center min-h-100 sm:min-h-auto">
          <Image
            className="absolute top-0 left-0 sm:-mt-8 sm:-ml-12"
            width={0}
            height={0}
            src={shape1}
            alt="corner shape"
          />
          <div className="absolute z-10 flex-col gap-2.5 text-center justify-center">
            <h2 className="text-5xl/[150%] font-bold">
              اینجا جاییه که رشد می کنی!
            </h2>
            <p className="text-4xl/[150%] font-bold text-whiteText">
              تیم سازی - استخدام - بوتکمپ
            </p>
          </div>
          <Image
            className="absolute bottom-0"
            width={0}
            height={0}
            src={shape2}
            alt="bottom shape"
          />
        </div>
      </div>
      <JobList />
    </main>
  );
};

export default page;
