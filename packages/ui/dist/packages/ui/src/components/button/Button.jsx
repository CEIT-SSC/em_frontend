"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = exports.ButtonVariant = exports.ButtonSize = void 0;
var react_1 = __importDefault(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var ButtonSize;
(function (ButtonSize) {
    ButtonSize[ButtonSize["SMALL"] = 0] = "SMALL";
    ButtonSize[ButtonSize["MEDIUM"] = 1] = "MEDIUM";
    ButtonSize[ButtonSize["LARGE"] = 2] = "LARGE";
})(ButtonSize || (exports.ButtonSize = ButtonSize = {}));
var sizeClasses = (_a = {},
    _a[Size.small] = "h-9 min-w-16",
    _a[Size.medium] = "h-12 min-w-20",
    _a[Size.large] = "h-15 min-w-24",
    _a);
var ButtonVariant;
(function (ButtonVariant) {
    ButtonVariant[ButtonVariant["PRIMARY"] = 0] = "PRIMARY";
    ButtonVariant[ButtonVariant["SECONDARY"] = 1] = "SECONDARY";
    ButtonVariant[ButtonVariant["OUTLINE"] = 2] = "OUTLINE";
    ButtonVariant[ButtonVariant["TEXT"] = 3] = "TEXT";
})(ButtonVariant || (exports.ButtonVariant = ButtonVariant = {}));
var variantClasses = (_b = {},
    _b[ButtonVariant.PRIMARY] = "default-gradient",
    _b[ButtonVariant.SECONDARY] = "",
    _b[ButtonVariant.OUTLINE] = "text-transparent bg-clip-text default-gradient",
    _b);
var Button = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? ButtonVariant.SECONDARY : _b, _c = _a.size, size = _c === void 0 ? ButtonSize.MEDIUM : _c, _d = _a.label, label = _d === void 0 ? "" : _d, _e = _a.className, className = _e === void 0 ? "" : _e, PrefixIcon = _a.prefixIcon, SuffixIcon = _a.suffixIcon, onClick = _a.onClick;
    var isSecondary = variant === Variant.secondary;
    var isOutline = variant === Variant.outline;
    var radiusClass = className.match(/\brounded(?:-[^\s]+)?\b/) || "rounded-lg";
    return (<div className={(0, clsx_1.default)("overflow-hidden p-px", sizeClasses[size], {
            "default-gradient": !isSecondary,
            "bg-transparent": isSecondary,
        }, className, radiusClass)}>
      <div className={(0, clsx_1.default)("w-full h-full", { "bg-black": isOutline }, radiusClass)}>
        <button className={(0, clsx_1.default)("w-full h-full px-3 py-2 cursor-pointer", "flex gap-2 justify-center items-center", variantClasses[variant])} onClick={onClick}>
          {PrefixIcon && <PrefixIcon />}
          {label}
          {SuffixIcon && <SuffixIcon />}
        </button>
      </div>
    </div>);
};
exports.Button = Button;
