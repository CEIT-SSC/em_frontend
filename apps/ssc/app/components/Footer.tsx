import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-[#292F36] p-9 flex justify-between">
      <div className="footer-box">
        <h3>زبان</h3>
        <div>
          <p>فارسی</p>
          <p>English</p>
          <p>Arabic</p>
        </div>
      </div>
      <div className="footer-box">
        <h3>ارتباط با ما</h3>
        <div>
          <a href="">تلگرام</a>
          <a href="">یوتیوب</a>
          <a href="">لینکدین</a>
          <a href="">اینستاگرام</a>
          <a href="">contact.ssc@gmail.com</a>
        </div>
      </div>
      <div className="footer-box">
        <h3>رویداد ها</h3>
        <div>
          <a href="">مسابقات ACPC</a>
          <a href="">گیم کرفت (Game Craft)</a>
          <a href="">دوره های AAISS</a>
          <a href="">امیت (EMIT)</a>
          <a href="">لینوکس فست</a>
        </div>
      </div>
      <div className="footer-box justify-center items-center">
        <img src="logo.png" alt="ssc logo" className="w-25 h-30" />
      </div>
    </footer>
  );
};

export default Footer;
