'use client';

import React from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { Button, ButtonVariant } from "@ssc/ui";
import { toast } from "react-toastify";

interface Props {
  name: string;
  memberCount: number;
}

const Request = ({ name, memberCount }: Props) => {
  return (
    <div className="flex justify-between items-center p-6 rounded-2xl bg-[#43434340]">
      <div className="flex flex-col gap-2.5 px-2.5">
        <h4 className="text-2xl/[150%] font-bold">{name}</h4>
        <p className="text-whiteText font-bold">
          {"تعداد اعضا: " + memberCount}
        </p>
      </div>
      <div className="flex p-2.5 gap-2.5 text-4xl">
        <Button
          variant={ButtonVariant.TEXT}
          className="text-[#C81E1ECC]"
          prefixIcon={HiXCircle}
          onClick={() => toast.error("toast error!")}
        />
        <Button
          variant={ButtonVariant.TEXT}
          className="text-[#1F825A]"
          prefixIcon={HiCheckCircle}
          onClick={() => toast.success("toast success!")}
        />
      </div>
    </div>
  );
};

export default Request;
