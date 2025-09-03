"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = exports.ButtonVariant = exports.ButtonSize = void 0;
const react_1 = __importDefault(require("react"));
const ai_1 = require("react-icons/ai");
const clsx_1 = __importDefault(require("clsx"));
var ButtonSize;
(function (ButtonSize) {
    ButtonSize[ButtonSize["SMALL"] = 0] = "SMALL";
    ButtonSize[ButtonSize["MEDIUM"] = 1] = "MEDIUM";
    ButtonSize[ButtonSize["LARGE"] = 2] = "LARGE";
})(ButtonSize || (exports.ButtonSize = ButtonSize = {}));
const sizeClasses = {
    [ButtonSize.SMALL]: "h-fit min-w-16 leading-[1.5rem]",
    [ButtonSize.MEDIUM]: "h-12 min-w-20",
    [ButtonSize.LARGE]: "h-15 min-w-24",
};
var ButtonVariant;
(function (ButtonVariant) {
    ButtonVariant[ButtonVariant["PRIMARY"] = 0] = "PRIMARY";
    ButtonVariant[ButtonVariant["SECONDARY"] = 1] = "SECONDARY";
    ButtonVariant[ButtonVariant["OUTLINE"] = 2] = "OUTLINE";
    ButtonVariant[ButtonVariant["TEXT"] = 3] = "TEXT";
})(ButtonVariant || (exports.ButtonVariant = ButtonVariant = {}));
const variantClasses = {
    [ButtonVariant.PRIMARY]: "default-gradient",
    [ButtonVariant.SECONDARY]: "",
    [ButtonVariant.OUTLINE]: "text-transparent bg-clip-text default-gradient",
};
const Button = ({ label = "", variant = ButtonVariant.SECONDARY, size = ButtonSize.MEDIUM, loading = false, className = "", prefixIcon: PrefixIcon, suffixIcon: SuffixIcon, onClick, }) => {
    const isSecondary = variant === ButtonVariant.SECONDARY;
    const isText = variant === ButtonVariant.TEXT;
    const isOutline = variant === ButtonVariant.OUTLINE;
    const radiusClass = className.match(/\brounded(?:-[^\s]+)?\b/) || "rounded-lg";
    return (<div className={(0, clsx_1.default)("overflow-hidden p-px", {
            "default-gradient": !isSecondary && !isText,
            "bg-transparent": isSecondary,
            "bg-black border-1 border-whiteText": isOutline,
        }, sizeClasses[size], variantClasses[variant], className)}>
      <button className={(0, clsx_1.default)("relative w-full h-full px-3 py-2 cursor-pointer", "text-lg text-bold")} onClick={onClick}>
        {loading && (<ai_1.AiOutlineLoading className=" absolute top-1/2 left-1/2 -translate-1/2 animate-spin"/>)}
        <div className={(0, clsx_1.default)("flex gap-2 justify-center items-center", {
            ["opacity-0"]: loading,
        })}>
            "bg-black border-1 border-whiteText": isOutline,
            [sizeClasses[size]]: !isText,
        }, variantClasses[variant], className, radiusClass)}>
      <button className={(0, clsx_1.default)("relative w-full h-full cursor-pointer", "text-bold", {
            "px-3 py-2": !isText,
            "p-1": isText,
        })} onClick={onClick}>
        {loading && (<ai_1.AiOutlineLoading className=" absolute top-1/2 left-1/2 -translate-1/2 animate-spin"/>)}
        <div className={(0, clsx_1.default)("flex gap-2 justify-center items-center", {
            ["opacity-0"]: loading,
        })}>
          {PrefixIcon && <PrefixIcon />}
          {label}
          {SuffixIcon && <SuffixIcon />}
        </div>
      </button>
    </div>);
};
exports.Button = Button;
