import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#292F36] p-9 flex justify-between">
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold">زبان</h3>
        <div className="flex flex-col gap-2">
          <p>فارسی</p>
          <p>English</p>
          <p>Arabic</p>
        </div>
      </div>
      <div className="flex-col gap-4 hidden md:flex">
        <h3 className="text-3xl font-bold">ارتباط با ما</h3>
        <div className="flex flex-col gap-2">
          <a href="">تلگرام</a>
          <a href="">یوتیوب</a>
          <a href="">لینکدین</a>
          <a href="">اینستاگرام</a>
          <a href="">contact.ssc@gmail.com</a>
        </div>
      </div>
      <div className="flex-col gap-4 hidden md:flex">
        <h3 className="text-3xl font-bold">رویداد ها</h3>
        <div className="flex flex-col gap-2">
          <a href="">مسابقات ACPC</a>
          <a href="">گیم کرفت (Game Craft)</a>
          <a href="">دوره های AAISS</a>
          <a href="">امیت (EMIT)</a>
          <a href="">لینوکس فست</a>
        </div>
      </div>
      <div className="flex justify-center items-center">
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
          href="https://trustseal.enamad.ir/?id=644313&Code=ylal4ugYFWrwrajQPMCMZf7xEeLS9EuE"
        >
          <img
            referrerPolicy="origin"
            src="https://trustseal.enamad.ir/logo.aspx?id=644313&Code=ylal4ugYFWrwrajQPMCMZf7xEeLS9EuE"
            alt=""
            className="cursor-pointer"
            code="ylal4ugYFWrwrajQPMCMZf7xEeLS9EuE"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
