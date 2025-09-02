import React from "react";
import { HiEye, HiPencil, HiTrash, HiUserAdd } from "react-icons/hi";
import { Button, ButtonVariant } from "@ssc/ui";

interface Props {
  name: string;
  memberCount: number;
}

const Team = ({ name, memberCount }: Props) => {
  const isAdmin = true;

  const showOptions = () => {
    if (isAdmin)
      return (
        <>
          <Button
            variant={ButtonVariant.TEXT}
            className="text-[#C81E1ECC]"
            prefixIcon={HiTrash}
          />
          <Button
            variant={ButtonVariant.TEXT}
            className="text-whiteText"
            prefixIcon={HiPencil}
          />

          <Button
            variant={ButtonVariant.TEXT}
            className="text-[#1F825A]"
            prefixIcon={HiUserAdd}
          />
        </>
      );
    else
      return (
        <Button
          variant={ButtonVariant.TEXT}
          className="text-whiteText"
          prefixIcon={HiEye}
        />
      );
  };

  return (
    <div className="flex justify-between items-center p-6 rounded-2xl bg-[#43434340]">
      <div className="flex flex-col gap-2.5 px-2.5">
        <h4 className="text-2xl/[150%] font-bold">{name}</h4>
        <p className="text-whiteText font-bold">
          {"تعداد اعضا: " + memberCount}
        </p>
      </div>
      <div className="flex p-2.5 gap-2.5 text-2xl">{showOptions()}</div>
    </div>
  );
};

export default Team;
