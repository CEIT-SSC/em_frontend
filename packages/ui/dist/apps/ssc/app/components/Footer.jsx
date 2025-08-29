"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = __importDefault(require("next/image"));
var react_1 = __importDefault(require("react"));
var Footer = function () {
    return (<footer className="w-full border-t border-[#292F36] p-9 flex justify-between">
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
      <div className="footer-box justify-center items-center">
        <image_1.default width={100} height={120} src="/logo.png" alt="ssc logo" className="w-25 h-30"/>
      </div>
    </footer>);
};
exports.default = Footer;
