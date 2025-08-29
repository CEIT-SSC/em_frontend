"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clsx_1 = __importDefault(require("clsx"));
var link_1 = __importDefault(require("next/link"));
var navigation_1 = require("next/navigation");
var react_1 = __importDefault(require("react"));
var ActiveLink = function (_a) {
    var _b;
    var href = _a.href, children = _a.children;
    var path = (0, navigation_1.usePathname)();
    return (<div className="relative pb-px">
      <link_1.default href={href} className={(0, clsx_1.default)((_b = {}, _b["text-gradient"] = path === href, _b))}>
        {children}
      </link_1.default>
      {path === href && (<div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient"></div>)}
    </div>);
};
exports.default = ActiveLink;
