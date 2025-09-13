import React from "react";
import JobOffer, { Offer } from "./JobOffer";
import { HiFilter, HiSearch } from "react-icons/hi";

const JobList = () => {
  const sampleOffer: Offer = {
    id: 123,
    title: "Tech Lead",
    excerpt: "excerpt",
    description: "We need a very good tech lead that knows what to do",
    company_image: "idk",
    company_url: "idk",
    resume_url: "https://ceit-ssc.ir",
    created_at: new Date().toISOString(),
    tags: [
      {
        id: 1,
        name: "job",
        color: "idk",
      },
      {
        id: 2,
        name: "time",
        color: "full-time",
      },
      {
        id: 3,
        name: "location",
        color: "on-site",
      },
      {
        id: 4,
        name: "income",
        color: "$200",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center gap-2.5 py-4 px-4 sm:px-12">
      <div
        className="flex gap-2.5 items-center p-4 min-h-20 w-full max-w-250 
      text-[#A6A6A6] text-[18px]/[150%] sm:text-2xl font-bold border border-white/20 rounded-3xl"
      >
        <HiFilter size={36} />
        <div className="flex items-center w-full gap-1 py-2 px-4 rounded-full bg-[#252525]">
          <HiSearch />
          <input
            className="w-full outline-none"
            id="job-filter"
            type="text"
            placeholder="جستجو بر اساس تگ، عنوان، دسته بندی..."
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-9 py-6 sm:px-8">
        <h4 className="text-2xl font-bold text-center text-gray-100 opacity-60">
          فعلا آگهی شغلی نداریم!
        </h4>
        {/* <JobOffer offer={sampleOffer} type="job" /> */}
      </div>
    </div>
  );
};

export default JobList;
