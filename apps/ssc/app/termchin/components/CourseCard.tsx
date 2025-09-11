import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import React from "react";

interface CourseCardProps {
  id: number;
  title: string;
  instructor: string;
  group: string;
  status: "active" | "inactive" | "conflict";
}

const CourseCard = (course: CourseCardProps) => {
  return (
    <div
      dir="rtl"
      className="group relative bg-gradient-to-br from-[#ffffff15] to-[#ffffff08] backdrop-blur-sm p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1"
      key={course.id}
    >
      {/* Course Status Indicator */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full shadow-sm shadow-green-400/50"></div>

      <div className="mb-4">
        <h4 className="text-white font-semibold mb-3 leading-relaxed group-hover:text-gray-100 transition-colors">
          {course.title}
        </h4>
        <div className="flex items-center gap-3 text-sm text-whiteText/80">
          <span className="flex items-center gap-1">
            <span className="text-blue-400">👤</span>
            {course.instructor}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-green-400">📚</span>
            {course.group}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          label="جزئیات"
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          className="flex-1 !bg-gray-700/80 !text-gray-300 hover:!bg-gray-600/80 !border-gray-600/50 hover:!border-gray-500/70 transition-all duration-200 backdrop-blur-sm"
        />
        <Button
          label="انتخاب"
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.SMALL}
          className="flex-1 !bg-gradient-to-r !from-[#ff715b] !to-[#cb48b7] hover:!from-[#ff8a75] hover:!to-[#d563c7] !text-white !border-0 transition-all duration-200 shadow-sm hover:shadow-md"
        />
      </div>
    </div>
  );
};

export default CourseCard;
