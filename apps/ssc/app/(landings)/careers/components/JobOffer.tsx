import React from "react";
import { Button, ButtonVariant } from "@ssc/ui";
import { HiCash, HiClock, HiLocationMarker } from "react-icons/hi";

interface Offer {
  id: number;
  title: string;
  excerpt: string;
  description: string;
  company_image: string;
  company_url: string;
  resume_url: string;
  created_at: string;
  tags: [
    {
      id: number;
      name: string;
      color: string;
    }
  ];
}

const tagColors = {
  team: "text-[#798900] bg-[#d6dab5]",
  boot_camp: "text-[#00775F] bg-[#b5d8d1]",
  job: "text-[#7400C2] bg-[#cab5d8]",
};

interface Props {
  type: "team" | "boot_camp" | "job";
}

const JobOffer = ({ type }: Props) => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-3xl border border-(--TextWhite)/50 shadow-[0_0_8px_0_white]">
      <span
        className={"w-fit font-bold py-2 px-4 rounded-full " + tagColors[type]}
      >
        {type}
      </span>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl/[150%] font-bold">job title</h4>
        <p className="text-2xl text-whiteText">description</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between sm:pl-6">
        <div className="flex flex-col sm:flex-row gap-2.5 p-2.5 text-2xl *:flex *:items-center *:gap-2 *:px-2.5">
          <div>
            <HiClock />
            full-time
          </div>
          <div>
            <HiLocationMarker />
            remote
          </div>
          <div>
            <HiCash />
            tavafoghi
          </div>
        </div>
        <Button variant={ButtonVariant.PRIMARY} label="send resume" />
      </div>
    </div>
  );
};

export default JobOffer;
