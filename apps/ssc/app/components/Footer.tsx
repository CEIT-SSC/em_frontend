import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#292F36] p-9 flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between">
      {/* <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold">زبان</h3>
        <div className="flex flex-col gap-2">
          <p>فارسی</p>
          <p>English</p>
          <p>Arabic</p>
        </div>
      </div> */}
      <div className="w-full flex-col gap-4 flex">
        <h3 className="text-3xl font-bold">ارتباط با ما</h3>
        <div className="flex flex-col gap-2">
          <a href="https://t.me/ceit_ssc">تلگرام</a>
          {/* <a href="">یوتیوب</a> */}
          <a href="https://www.linkedin.com/school/students-scientific-chapter/">
            لینکدین
          </a>
          <a href="https://instagram.com/ceit_ssc">اینستاگرام</a>
          <a href="mailto:ssc.ce.aut@gmail.com">ssc.ce.aut@gmail.com</a>
        </div>
      </div>
      <div className="w-full flex-col gap-4 flex">
        <h3 className="text-3xl font-bold">رویداد ها</h3>
        <div className="flex flex-col gap-2">
          <p>مسابقات ACPC</p>
          <p>گیم کرفت (Game Craft)</p>
          <p>دوره های AAISS</p>
          <p>امیت (EMIT)</p>
          <p>لینوکس فست (Linux Fest)</p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-8">
        <Image
          width={100}
          height={120}
          src="/logo.png"
          alt="ssc logo"
          className="w-25 h-30"
        />
        <a
          referrerPolicy="origin"
          target="_blank"
          href="https://trustseal.enamad.ir/?id=646452&Code=uXSQCvKAnSeeLLUoP1E49sAEwGKLDzq4"
        >
          <img
            referrerPolicy="origin"
            src="https://trustseal.enamad.ir/logo.aspx?id=646452&Code=uXSQCvKAnSeeLLUoP1E49sAEwGKLDzq4"
            alt=""
            className="cursor-pointer"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
