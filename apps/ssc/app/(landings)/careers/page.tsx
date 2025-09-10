import React from "react";
import JobList from "./components/JobList";

const page = () => {
  return (
    <main>
      <div className="flex flex-col sm:flex-row gap-6 pt-8 px-12">image</div>
      <JobList />
    </main>
  );
};

export default page;
