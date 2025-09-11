/* eslint-disable react/display-name */
import React, { ChangeEventHandler, forwardRef } from "react";
import { HiOutlineExclamation } from "react-icons/hi";
import { IoMdHelpCircleOutline } from "react-icons/io";

export interface TextFieldProps {
  id?: string;
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "tel" | "number";
  errorText?: string;
  guidance?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  onBlur?: ChangeEventHandler;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      id,
      name,
      type = "text",
      errorText,
      guidance,
      placeholder = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col gap-1">
        <fieldset className="relative rounded-xl p-px border-gray-400 border-1 group focus-within:border-white">
          <legend className="mr-4 px-1 group-focus-within:px-2 transition-all transition-1s">
            {label}
          </legend>
          <input
            className="w-full h-full pt-1 pb-3 px-4 rounded-xl caret-[#CB48B7] focus-visible:outline-none"
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
        </fieldset>
        {errorText && (
          <p className="flex items-center gap-1 text-[#B42D43] mt-2 leading-5">
            <HiOutlineExclamation size={20} />
            {errorText}
          </p>
        )}
        {guidance && (
          <p className="flex items-start gap-1 text-[#7d8186] mt-2 leading-5">
            <IoMdHelpCircleOutline size={20} />
            {guidance}
          </p>
        )}
      </div>
    );
  }
);
