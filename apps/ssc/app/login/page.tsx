import Image from "next/image";
import React from "react";
import FormCard from "../components/FormCard";

const page = () => {
  return (
    <div className="h-[100vh] px-9 flex-1 relative">
      <div
        className="relative rounded-xl p-px bg-[#4F5154] default-gradient
      absolute top-0 start-4 -translate-y-1/2 bg-black mx-2
      w-full h-12 px-3 rounded-xl bg-black caret-[#CB48B7] outline-none bg-red-500
      text-[#676A6E]"
      ></div>
      <div className="flex justify-end">
        <div className="w-[50%] h-full p-4 rounded-3xl absolute inset-0 bg-cover bg-center bg-amber-300">
          {/* <Image
            width={100}
            height={100}
            className="rounded-3xl w-full h-full"
            src="/event.png"
            alt="background"
          /> */}
        </div>
      </div>
      <div className="relative flex justify-center items-center">
        <FormCard />
      </div>
    </div>
  );
};

export default page;
