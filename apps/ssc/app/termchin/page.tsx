"use client";

import React, { useEffect, useRef } from "react";
import BottomController from "./components/bottomController";
import TopController from "./components/topController";
import clsx from "clsx";

const days = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

// Generate 52 time slots for 7:00 to 20:00, each 15 minutes
const timeSlots = Array.from({ length: 52 }, (_, i) => {
  const hour = 7 + Math.floor(i / 4);
  const min = (i % 4) * 15;
  return { hour, min };
});

const Termchin = () => {
  const parentDiv = useRef<HTMLDivElement>(undefined);
  const [_cellWidth, setCellWidth] = React.useState(0);

  useEffect(() => {
    const updateCellWidth = () => {
      const screenWidth = parentDiv.current.clientWidth;
      const availableWidth = screenWidth - 80;
      const calculatedWidth = Math.floor(availableWidth / 52);
      console.log("!@!", screenWidth, calculatedWidth);
      setCellWidth(calculatedWidth);
    };

    updateCellWidth(); // Initial call
    window.addEventListener("resize", updateCellWidth);
    return () => window.removeEventListener("resize", updateCellWidth);
  }, [parentDiv]);

  return (
    <div
      className="flex flex-col h-full w-full p-6 bg-mainGray"
      ref={parentDiv}
    >
      <TopController />

      <div className="h-full flex items-center bg-secondary-background rounded-lg border border-gray-700">
        <table className="h-full w-full border-collapse border-spacing-0 rtl text-right">
          <thead>
            <tr>
              <th className="bg-secondary-background max-w-20 min-w-20 text-center font-bold text-lg text-whiteText z-20 border-gray-700" />

              {timeSlots.map((slot, slotIndex) => (
                <th
                  key={slotIndex}
                  className="h-2 w-full text-xs text-center text-whiteText font-normal px-0 border-0 border-gray-700 bg-secondary-background"
                  style={{ width: `${100 / timeSlots.length}%` }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {slot.min === 0 ? slot.hour.toString() : ""}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, dayIndex) => (
              <tr
                key={day}
                className={clsx({
                  "bg-gray-800/30": dayIndex % 2 === 0,
                  "bg-gray-900/30": dayIndex % 2 !== 0,
                })}
              >
                <td
                  className={clsx(
                    "sticky right-0 bg-secondary-background text-center py-3 font-semibold text-whiteText border border-gray-700 z-10 first-of-type:border-r-0",
                    {
                      "border-b-0": day === "جمعه",
                    }
                  )}
                >
                  {day}
                </td>
                {timeSlots.map((slot, _slotIndex) => (
                  <td
                    key={slot.hour + slot.min + day}
                    className={clsx(
                      "border border-gray-700 h-12 text-[10px] text-gray-400 hover:text-white transition duration-200 p-0 relative group last-of-type:border-l-0",
                      {
                        "border-b-0": day === "جمعه",
                      }
                    )}
                    title={`${day} - ${slot.hour}`}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BottomController />
    </div>
  );
};

export default Termchin;
