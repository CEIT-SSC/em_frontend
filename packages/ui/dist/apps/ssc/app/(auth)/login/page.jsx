"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = require("@ssc/ui");
var link_1 = __importDefault(require("next/link"));
var page = function () {
    return (<>
      <h3 className="text-4xl font-bold">ورود</h3>
      <p className="text-[20px]/[150%] font-bold">
        حساب کاربری ندارید؟{" "}
        <link_1.default className="default-gradient text-transparent bg-clip-text" href="/register">
          ثبت نام{" "}
        </link_1.default>
        کنید
      </p>
      <ui_1.TextField name="alaki" id="a" label="نام کاربری" placeholder="نام کاربری خود را وارد کنید"/>
      <ui_1.TextField name="alaki" id="b" label="رمز عبور" guidance="رمز عبور باید شامل حروف بزرگ، حروف کوچک و عدد باشد" placeholder="رمز عبور خود را وارد کنید"/>
      <div className="flex flex-col items-center py-6 px-9 gap-2.5">
        <p className="text-whiteText">
          رمز عبور خود را فراموش کرده اید؟{" "}
          <a className="default-gradient text-transparent bg-clip-text" href="">
            بازیابی رمز عبور
          </a>
        </p>
        <div className="w-100.5 flex flex-col items-center gap-2.5">
          <ui_1.Button className="w-100" variant={ui_1.ButtonVariant.PRIMARY} label="ورود"/>
          <div className="flex gap-3.5">
            <ui_1.Button className="w-48" variant={ui_1.ButtonVariant.OUTLINE} label="ورود با گیتهاب"/>
            <ui_1.Button className="w-48" variant={ui_1.ButtonVariant.OUTLINE} label="ورود با گوگل"/>
          </div>
        </div>
      </div>
    </>);
};
exports.default = page;
