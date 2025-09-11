import React from "react";
import { Button, ButtonVariant } from "@ssc/ui";
import { HiCash, HiClock, HiLocationMarker } from "react-icons/hi";
import Link from "next/link";

export interface Offer {
  id: number;
  title: string;
  excerpt: string;
  description: string;
  company_image: string;
  company_url: string;
  resume_url: string;
  created_at: string;
  tags: {
    id: number;
    name: string;
    color: string;
  }[];
}

const tagColors = {
  team: "text-[#798900] bg-[#d6dab5]",
  boot_camp: "text-[#00775F] bg-[#b5d8d1]",
  job: "text-[#7400C2] bg-[#cab5d8]",
};

interface Props {
  type: "team" | "boot_camp" | "job";
  offer: Offer;
}

const JobOffer = ({ offer, type }: Props) => {
  let time, location, income;

  for (const item of offer.tags) {
    time = item.name === "time" ? item.color : time;
    location = item.name === "location" ? item.color : location;
    income = item.name === "income" ? item.color : income;
  }

  const realTags = offer.tags.filter(
    (item) =>
      item.name !== "time" && item.name !== "location" && item.name !== "income"
  );

  return (
    <div className="flex flex-col gap-4 p-4 rounded-3xl border border-(--TextWhite)/50 shadow-[0_0_8px_0_white]">
      <div className="flex flex-wrap gap-2.5">
        {realTags.map((tag) => (
          <span
            key={tag.id}
            className={
              "w-fit font-bold py-2 px-4 rounded-full " + tagColors[tag.name]
            }
          >
            {tag.name}
          </span>
        ))}
        <span
          className={
            "w-fit font-bold py-2 px-4 rounded-full " + tagColors[type]
          }
        >
          {type}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl/[150%] font-bold">{offer.title}</h4>
        <p className="text-2xl text-whiteText">{offer.description}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between sm:pl-6">
        <div className="flex flex-col sm:flex-row gap-2.5 p-2.5 text-2xl *:flex *:items-center *:gap-2 *:px-2.5">
          <div>
            <HiClock size={36} />
            {time}
          </div>
          <div>
            <HiLocationMarker size={36} />
            {location}
          </div>
          <div>
            <HiCash size={36} />
            {income}
          </div>
        </div>
        <Link href={offer.resume_url}>
          <Button variant={ButtonVariant.PRIMARY} label="send resume" />
        </Link>
      </div>
    </div>
  );
};

export default JobOffer;
