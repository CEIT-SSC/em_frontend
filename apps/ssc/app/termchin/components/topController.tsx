import React from "react";

const TopController = () => {
  return (
    <div className="w-full bg-secondary-background rounded-lg p-4 mb-4 border border-gray-700">
      <div className="flex justify-between items-center">
        <div className="w-full flex gap-4 justify-between items-center">
          <h2 className="text-whiteText font-bold text-lg outline-none">
            برنامه بدون نام
          </h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-mainRed text-white rounded text-sm hover:bg-red-600 transition ">
              ذخیره برنامه
            </button>
            <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition">
              لیست برنامه ها
            </button>
            <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition">
              تنظیمات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopController;
