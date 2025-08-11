import React from "react";
import { HiOutlineExclamation } from "react-icons/hi";

interface Props {
  label: string;
  id: string;
  name: string;
  guidance?: string;
  placeholder?: string;
}

const TextField = ({
  label,
  id,
  name,
  guidance = "",
  placeholder = "",
}: Props) => {
  return (
    <div>
      <fieldset className="relative rounded-xl p-px bg-[#4F5154] focus-within:bg-red-500">
        <legend className="absolute top-0 start-4 -translate-y-1/2 bg-black mx-2">
          {label}
        </legend>
        <input
          className="w-full h-12 px-3 rounded-xl bg-black caret-[#CB48B7] focus-visible:outline-none"
          id={id}
          name={name}
          type="text"
          placeholder={placeholder}
        />
      </fieldset>
      {guidance && (
        <p className="flex items-center gap-1 text-[#676A6E]">
          <HiOutlineExclamation size={20} />
          {guidance}
        </p>
      )}
    </div>
  );
};

export default TextField;
