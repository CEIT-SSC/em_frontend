import React from "react";

export const TailwindTest = () => {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold text-blue-600">Tailwind Test</h2>
      <div className="bg-red-500 text-white p-4 rounded-lg">
        Red background with white text
      </div>
      <div className="bg-green-500 text-white p-4 rounded-lg">
        Green background with white text
      </div>
      <div className="bg-blue-500 text-white p-4 rounded-lg">
        Blue background with white text
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-purple-300 h-16 rounded"></div>
        <div className="bg-pink-300 h-16 rounded"></div>
        <div className="bg-yellow-300 h-16 rounded"></div>
      </div>
    </div>
  );
};
