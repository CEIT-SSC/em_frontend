"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = exports.ButtonVariant = exports.ButtonSize = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
var ButtonSize;
(function (ButtonSize) {
    ButtonSize[ButtonSize["SMALL"] = 0] = "SMALL";
    ButtonSize[ButtonSize["MEDIUM"] = 1] = "MEDIUM";
    ButtonSize[ButtonSize["LARGE"] = 2] = "LARGE";
})(ButtonSize || (exports.ButtonSize = ButtonSize = {}));
const sizeClasses = {
    [ButtonSize.SMALL]: "h-9 min-w-16 leading-[1.5rem]",
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
const Button = ({ variant = ButtonVariant.SECONDARY, size = ButtonSize.MEDIUM, label = "", className = "", prefixIcon: PrefixIcon, suffixIcon: SuffixIcon, onClick, }) => {
    const isSecondary = variant === ButtonVariant.SECONDARY;
    const isText = variant === ButtonVariant.TEXT;
    const isOutline = variant === ButtonVariant.OUTLINE;
    const radiusClass = className.match(/\brounded(?:-[^\s]+)?\b/) || "rounded-lg";
    return (<div className={(0, clsx_1.default)("overflow-hidden p-px", sizeClasses[size], {
            "default-gradient": !isSecondary && !isText,
            "bg-transparent": isSecondary,
        }, className, radiusClass)}>
      <div className={(0, clsx_1.default)({
            "bg-black rounded-lg": variant === ButtonVariant.OUTLINE,
        })}>
        <button className={(0, clsx_1.default)("w-full h-full px-3 py-2 cursor-pointer", "flex gap-2 justify-center items-center", "text-lg text-bold", className, variantClasses[variant], {
            "rounded-lg": !isSecondary,
        })} onClick={onClick}>
          {PrefixIcon && <PrefixIcon />}
          {label}
          {SuffixIcon && <SuffixIcon />}
        </button>
      </div>
    </div>);
};
exports.Button = Button;
