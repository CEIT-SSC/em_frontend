import React from "react";
import Request from "../../components/teams/Request";

const page = () => {
  return (
    <div className="flex flex-col gap-2.5 md:p-2.5">
      <Request name="We the best" memberCount={10} />
      <Request name="They the best" memberCount={4} />
    </div>
  );
};

export default page;
