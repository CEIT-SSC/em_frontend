import React from "react";
import { HiOutlineExclamation } from "react-icons/hi";

interface Props {
  label: string;
  id: string;
  name: string;
  guidance?: string;
}

const TextField = ({ label, id, name, guidance = "" }: Props) => {
  return (
    <div>
      <fieldset className="relative rounded-xl p-px bg-[#4F5154] focus-within:bg-linear-45 from-[#FF715B] from-40% to-[#CB48B7] to-80%">
        <legend className="absolute top-0 start-4 -translate-y-1/2 bg-black mx-2">
          {label}
        </legend>
        <input
          className="w-full h-10 px-3 rounded-xl bg-black caret-[#CB48B7] focus-visible:outline-none"
          id={id}
          name={name}
          type="text"
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
