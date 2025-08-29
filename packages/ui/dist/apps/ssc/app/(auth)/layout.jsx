"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
var md_1 = require("react-icons/md");
var ui_1 = require("@ssc/ui");
var link_1 = __importDefault(require("next/link"));
function RootLayout(_a) {
    var children = _a.children;
    return (<div className="h-[100vh] px-9 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-9/16 h-full py-4 px-6">
        <video className="h-full object-cover object-center rounded-2xl" autoPlay muted loop>
          <source src="/events/acpc.mp4"/>
        </video>
      </div>
      <div className="absolute max-w-[600px] h-max bg-secondary-background rounded-3xl p-6 flex flex-col gap-4">
        <link_1.default href={"/"} className="flex justify-end">
          <ui_1.Button className="flex justify-end border rounded-full" size={ui_1.ButtonSize.SMALL} label="بازگشت" suffixIcon={md_1.MdArrowBack}/>
        </link_1.default>
        {children}
      </div>
    </div>);
}
