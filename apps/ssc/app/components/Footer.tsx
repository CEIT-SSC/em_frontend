import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="ssc-footer border-t border-border bg-surface">
      <div className="ssc-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-4 text-sm leading-7">
        <h3 className="text-base font-semibold">ارتباط با ما</h3>
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
      <div className="flex flex-col gap-4 text-sm leading-7">
        <h3 className="text-base font-semibold">رویداد ها</h3>
        <div className="flex flex-col gap-2">
          <p>مسابقات ACPC</p>
          <p>گیم کرفت (Game Craft)</p>
          <p>دوره های AAISS</p>
          <p>امیت (EMIT)</p>
          <p>لینوکس فست (Linux Fest)</p>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <Image
          width={100}
          height={120}
          src="/logo.png"
          alt="ssc logo"
          className="h-24 w-20"
        />
        <a
          referrerPolicy="origin"
          target="_blank"
          rel="noopener noreferrer"
          href="https://trustseal.enamad.ir/?id=646452&Code=uXSQCvKAnSeeLLUoP1E49sAEwGKLDzq4"
        >
          <img
            referrerPolicy="origin"
            src="https://trustseal.enamad.ir/logo.aspx?id=646452&Code=uXSQCvKAnSeeLLUoP1E49sAEwGKLDzq4"
            alt="نماد اعتماد الکترونیکی"
            className="cursor-pointer"
          />
        </a>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
