import React from "react";
import JobOffer, { Offer } from "./JobOffer";

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
    <div className="flex flex-col gap-2.5 py-4 px-4 sm:px-12">
      <div className="flex flex-col gap-9 py-6 sm:px-8">
        <JobOffer offer={sampleOffer} type="job" />
        <JobOffer offer={sampleOffer} type="boot_camp" />
        <JobOffer offer={sampleOffer} type="team" />
      </div>
    </div>
  );
};

export default JobList;
