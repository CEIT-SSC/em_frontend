import { DeleteFilled } from "@ant-design/icons";
import { digitsToHindi, moneyFormat } from "@ssc/utils";
import { theme } from "antd";
import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  price: number;
  imageUrl: string;
  onRemove: () => void;
}

const ProductCart = (props: Props) => {
  const { token } = theme.useToken();

  return (
    <div className="w-full flex flex-row items-center justify-between px-4 h-12 bg-slate-200 rounded-full dark:bg-slate-700 ">
      <Image
        src={props.imageUrl}
        alt={props.title}
        className="h-full py-2"
        width={100}
        height={100}
      />
      <div className="">{props.title}</div>
      <div className="flex flex-row gap-2">
        <div className="text-xl font-bold text-black dark:text-white">
          {digitsToHindi(moneyFormat(props.price))} تومان
        </div>
        <DeleteFilled
          size={24}
          className="!text-slate-500 hover:!text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProductCart;
