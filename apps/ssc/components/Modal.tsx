import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ className, children }: Props) => {
  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="absolute top-0 left-0 bottom-0 right-0 backdrop-blur-sm"></div>
      <div
        className={clsx(
          "bg-mainGray rounded-xl p-6 w-full max-w-md mx-4 overflow-y-auto z-99 max-h-[90vh]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
