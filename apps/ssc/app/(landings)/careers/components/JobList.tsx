import React from "react";
import JobOffer from "./JobOffer";

const JobList = () => {
  return (
    <div className="flex flex-col gap-2.5 py-4 px-4 sm:px-12">
      <div className="flex flex-col gap-9 py-6 sm:px-8">
        <JobOffer />
        <JobOffer />
        <JobOffer />
      </div>
    </div>
  );
};

export default JobList;
