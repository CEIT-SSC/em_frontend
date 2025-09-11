"use client";

import { Button, ButtonSize, ButtonVariant, TextField } from "@ssc/ui";
import Image from "next/image";
import React from "react";
import CourseCard from "./components/CourseCard";

const courses = [
  {
    id: 1,
    title: "میان کامپیوتر و برنامه نویسی",
    instructor: "دکتر رضا",
    group: "گروه ۲",
    status: "active",
  },
  {
    id: 2,
    title: "میان کامپیوتر و برنامه نویسی",
    instructor: "دکتر رضا",
    group: "گروه ۲",
    status: "active",
  },
  {
    id: 3,
    title: "میان کامپیوتر و برنامه نویسی",
    instructor: "دکتر رضا",
    group: "گروه ۲",
    status: "active",
  },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[100vh] w-full max-w-[100vw] overflow-hidden">
      <div className="min-w-100 w-1/4 h-full bg-gradient-to-b from-secondary-background to-mainGray shadow-xl border-r border-gray-700/50 flex flex-col">
        <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-gray-700/30">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#ff715b] to-[#cb48b7] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
            <Image
              src="/termchin.png"
              alt=""
              width={80}
              height={80}
              className="relative rounded-full border-2 border-gray-600/50 group-hover:border-gray-500/70 transition-all duration-300"
            />
          </div>
          <h1 className="text-3xl font-bold mt-3 text-gradient bg-gradient-to-r from-[#ff715b] to-[#cb48b7] bg-clip-text text-transparent">
            ترمچین
          </h1>
          <p className="text-sm text-whiteText/70 mt-1">
            برنامه‌ریز هوشمند دروس
          </p>
        </div>

        <div className="px-6 py-6 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-[#ff715b] to-[#cb48b7] rounded-full"></span>
            اطلاعات دانشگاه
          </h3>
          <div className="space-y-3">
            <TextField label="نام دانشگاه" name="uni" placeholder="امیرکبیر" />
            <TextField
              label="نام دانشکده"
              name="industry"
              placeholder="مهندسی کامپیوتر"
            />
          </div>
        </div>

        <div className="flex-1 px-6 pb-6 overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-[#ff715b] to-[#cb48b7] rounded-full"></span>
            دروس ارائه شده
          </h3>
          <div
            dir="ltr"
            className="h-full overflow-y-auto space-y-3 pr-2 pt-2 pb-8 custom-scrollbar"
          >
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                group={course.group}
                id={course.id}
                instructor={course.instructor}
                status={course.status as "active" | "inactive" | "conflict"}
                title={course.title}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-[100vh]">{children}</div>
    </div>
  );
}
