import React from "react";

const BottomController = () => {
  return (
    <div className="w-full bg-secondary-background rounded-lg p-4 mt-4 border border-gray-700">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center text-sm text-gray-400">
          <span>راهنما:</span>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <span>کلاس انتخاب شده</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-600 rounded"></div>
              <span>زمان آزاد</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>تداخل زمانی</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>تداخل امتحان</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-500 transition">
            ذخیره تغییرات
          </button>
          <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition">
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomController;
