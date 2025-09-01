import React from "react";
import { Button, ButtonSize, TextField } from "@ssc/ui";
import { HiOutlineClipboardCopy, HiPlus } from "react-icons/hi";

const page = () => {
  const userId = "sampleId";
  const buttonText = "آیدی شما: " + userId;

  return (
    <>
      <div className="flex justify-between">
        <Button
          className="bg-[#4A4A4A]"
          size={ButtonSize.SMALL}
          label="تیم جدید"
          prefixIcon={HiPlus}
        />
        <Button
          size={ButtonSize.SMALL}
          label={buttonText}
          suffixIcon={HiOutlineClipboardCopy}
        />
      </div>
      <div className="flex flex-col gap-2.5 p-2.5">teams list</div>
    </>
  );
};

export default page;
