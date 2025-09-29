import React from "react";
import { Button, ButtonSize, TextField } from "@ssc/ui";
import { HiOutlineClipboardCopy, HiPlus } from "react-icons/hi";
import Team from "../components/teams/Team";
import { clientApi } from "~/core/api/client/clientApi";

const page = async () => {
  const userId = "sampleId";
  const buttonText = "آیدی شما: " + userId;

  await clientApi.teams.getMyTeamsList();

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
        <Team name="We are the best" memberCount={10} />
        <Team name="They are the best" memberCount={4} />
      </div>
    </>
  );
};

export default page;
