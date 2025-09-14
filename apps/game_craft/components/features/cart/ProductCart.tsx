import { digitsToHindi, moneyFormat } from "@ssc/utils";
import Image from "next/image";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
  title: string;
  price: string;
  imageUrl: string;
  onRemove: () => void;
}

const ProductCart = (props: Props) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:px-6 sm:py-4 bg-antd-bg-container dark:bg-antd-dark-bg-container border border-antd-border-secondary dark:border-antd-dark-border-secondary rounded-lg hover:bg-antd-bg-elevated dark:hover:bg-antd-dark-bg-elevated transition-colors duration-200 shadow-sm">
      {/* Left section - Image and Title */}
      <div className="w-full sm:w-auto flex items-center gap-3 sm:gap-4 mb-3 sm:mb-0">
        <Image
          src={props.imageUrl}
          alt={props.title}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0 border border-antd-border-tertiary dark:border-antd-dark-border-tertiary"
          width={64}
          height={64}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-antd-text dark:text-antd-dark-text line-clamp-2 leading-tight">
            {props.title}
          </h3>
        </div>
      </div>

      {/* Right section - Price and Delete */}
      <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
        <div className="text-lg sm:text-xl font-bold text-antd-primary">
          {digitsToHindi(moneyFormat(props.price))} تومان
        </div>
        <button
          className="bg-transparent border-0 cursor-pointer"
          aria-label="حذف محصول"
        >
          <IoTrashOutline
            className=" hover:text-red-500"
            size={20}
            onClick={props.onRemove}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
