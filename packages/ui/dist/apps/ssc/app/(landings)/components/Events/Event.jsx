"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = __importDefault(require("next/image"));
var link_1 = __importDefault(require("next/link"));
var react_1 = __importDefault(require("react"));
var Event = function (_a) {
    var event = _a.event;
    var isOver = new Date(event.end_date).getTime() - new Date().getTime() <= 0;
    var localDate = new Date(event.start_date).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
    var _b = localDate.split(" "), weekday = _b[0], date = _b[1], month = _b[2];
    return (<div className="w-100 min-h-110 flex flex-col border rounded-3xl justify-between overflow-hidden">
      <image_1.default width={400} height={160} src={event.poster} alt="event photo" className="h-40 object-cover"/>
      <div className="h-full flex flex-col gap-4 justify-between p-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-4">
            <h4 className="text-2xl font-bold">{event.title}</h4>
            {isOver && (<span className="rounded-full bg-mainRed h-fit py-1 px-2 text-mainWhite text-md font-semibold">
                اتمام یافت
              </span>)}
          </div></></></>);
    <p className="text-[14px]">{event.manager}</p>;
};
div >
    <p className="text-(--TextWhite)">{event.description}</p>
        ,
            <div className="w-full flex justify-between items-center">
          <link_1.default className="border rounded-full px-3 py-2" href={event.landing_url} target="_blank">
            اطلاعات بیشتر
          </link_1.default>
          <div className="flex items-center gap-1.5">
            <p>{weekday}</p>
            <h3 className="text-[32px] font-bold">{date}</h3>
            <p>{month}</p>
          </div>
        </div>;
div >
;
div >
;
;
;
exports.default = Event;
