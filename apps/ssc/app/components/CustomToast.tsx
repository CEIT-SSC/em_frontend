import React from "react";

type Props = {
  title: string;
  message: string;
};

const CustomToast = ({ title, message }: Props) => {
  return (
    <div className="flex flex-col pl-4 gap-1">
      <h4 className="text-[20px]/[28px] text-white font-bold">{title}</h4>
      <p className="text-[16px]/[28px] text-whiteText">{message}</p>
    </div>
  );
};

export default CustomToast;
