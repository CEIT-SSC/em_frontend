"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = void 0;
const react_1 = __importDefault(require("react"));
const hi_1 = require("react-icons/hi");
const TextField = ({ label, id, name, errorText, guidance, placeholder = "", }) => {
    return (<div>
      <fieldset className="relative rounded-xl p-px border-gray-400 border-1 group focus-within:border-white">
        <legend className="mr-4 px-1 group-focus-within:px-2 transition-all transition-1s">
          {label}
        </legend>
        <input className="w-full h-full pt-1 pb-3 px-4 rounded-xl caret-[#CB48B7] focus-visible:outline-none" id={id} name={name} type="text" placeholder={placeholder}/>
      </fieldset>
      {errorText && (<p className="flex items-center gap-1 text-[#B42D43] mt-2">
          <hi_1.HiOutlineExclamation size={20}/>
          {errorText}
        </p>)}
      {guidance && (<p className="flex items-center gap-1 text-[#7d8186] mt-2">
          <hi_1.HiOutlineExclamation size={20}/>
          {guidance}
        </p>)}
    </div>);
};
exports.TextField = TextField;
