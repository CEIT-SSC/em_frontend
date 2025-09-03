"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = void 0;
const react_1 = __importStar(require("react"));
const hi_1 = require("react-icons/hi");
const io_1 = require("react-icons/io");
exports.TextField = (0, react_1.forwardRef)(({ label, id, name, type = "text", errorText, guidance, placeholder = "", ...props }, ref) => {
    return (<div>
        <fieldset className="relative rounded-xl p-px border-gray-400 border-1 group focus-within:border-white">
          <legend className="mr-4 px-1 group-focus-within:px-2 transition-all transition-1s">
            {label}
          </legend>
          <input className="w-full h-full pt-1 pb-3 px-4 rounded-xl caret-[#CB48B7] focus-visible:outline-none" id={id} name={name} type={type} placeholder={placeholder} ref={ref} {...props}/>
        </fieldset>
        {errorText && (<p className="flex items-center gap-1 text-[#B42D43] mt-2">
            <hi_1.HiOutlineExclamation size={20}/>
            {errorText}
          </p>)}
        {guidance && (<p className="flex items-center gap-1 text-[#7d8186] mt-2">
            <io_1.IoMdHelpCircleOutline size={20}/>
            {guidance}
          </p>)}
      </div>);
});
