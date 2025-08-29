import React from "react";
import { HiOutlineExclamation } from "react-icons/hi";

export interface TextFieldProps {
  label: string;
  id: string;
  name: string;
  errorText?: string;
  guidance?: string;
  placeholder?: string;
}

export const TextField = ({
  label,
  id,
  name,
  errorText,
  guidance,
  placeholder = "",
}: TextFieldProps) => {
  return (
    <div>
      <fieldset className="relative rounded-xl p-px border-gray-400 border-1 group focus-within:border-white">
        <legend className="mr-4 px-1 group-focus-within:px-2 transition-all transition-1s">
          {label}
        </legend>
        <input
          className="w-full h-full pt-1 pb-3 px-4 rounded-xl caret-[#CB48B7] focus-visible:outline-none"
          id={id}
          name={name}
          type="text"
          placeholder={placeholder}
        />
      </fieldset>
      {errorText && (
        <p className="flex items-center gap-1 text-[#B42D43] mt-2">
          <HiOutlineExclamation size={20} />
          {errorText}
        </p>
      )}
      {guidance && (
        <p className="flex items-center gap-1 text-[#7d8186] mt-2">
          <HiOutlineExclamation size={20} />
          {guidance}
        </p>
      )}
    </div>
  );
};
