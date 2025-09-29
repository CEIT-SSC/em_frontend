"use client";

import React, { useEffect, useState } from "react";
import { Button, ButtonSize, TextField } from "@ssc/ui";
import { HiOutlineClipboardCopy, HiPlus } from "react-icons/hi";
import Team from "../components/teams/Team";
import { clientApi } from "~/core/api/client/clientApi";
import { TeamDetails } from "@ssc/core/lib/types/api/Teams/teams";

const page = () => {
  const userId = "sampleId";
  const buttonText = "آیدی شما: " + userId;

  const [teams, setTeams] = useState<TeamDetails[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      await clientApi.teams
        .getTeamsList()
        .then((res) => setTeams(res.data.data.results));
    };

    fetchTeams();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <Button
          className="bg-[#4A4A4A]"
          size={ButtonSize.SMALL}
          label="تیم جدید"
          prefixIcon={HiPlus}
        />
        <Button
          className="text-[20px]"
          size={ButtonSize.SMALL}
          label={buttonText}
          suffixIcon={HiOutlineClipboardCopy}
        />
      </div>
      <div className="flex flex-col gap-2.5 py-2.5 md:px-2.5">
        {teams.map((team) => (
          <Team
            key={team.id}
            name={team.name}
            memberCount={team.memberships.length}
          />
        ))}
      </div>
    </>
  );
};

export default page;
