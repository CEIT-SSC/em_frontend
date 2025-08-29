"use client";
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = __importDefault(require("next/image"));
var framer_motion_1 = require("framer-motion");
var ImagesCarousel = function (_a) {
    var images = _a.images, direction = _a.direction, animationDuration = _a.animationDuration;
    var duplicatedImages = __spreadArray(__spreadArray([], images, true), images, true);
    var slideWidth = 416;
    var totalDistance = slideWidth * images.length;
    return (<div className="overflow-hidden select-none">
      <framer_motion_1.motion.div className="flex" dir={direction === "rtl" ? "ltr" : "rtl"} animate={{
            x: [-0, totalDistance * (direction === "rtl" ? -1 : 1)],
        }} transition={{
            duration: animationDuration !== null && animationDuration !== void 0 ? animationDuration : images.length * 15,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
        }}>
        {duplicatedImages.map(function (image, index) { return (<div key={index} className="flex-none w-[400px] h-64 mr-4 select-none">
            <image_1.default src={image.src} alt={image.alt || "Event Image"} width={image.width} height={image.height} className="min-w-0 rounded-2xl w-full h-full object-cover" draggable={false}/>
          </div>); })}
      </framer_motion_1.motion.div>
    </div>);
};
exports.default = ImagesCarousel;
