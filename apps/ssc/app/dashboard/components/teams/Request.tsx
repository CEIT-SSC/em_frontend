"use client";

import React from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { Button, ButtonVariant } from "@ssc/ui";
import { toast } from "react-toastify";
import { useAppDispatch } from "~/core/store/store";
import {
  acceptMembershipThunk,
  rejectMembershipThunk,
} from "~/core/store/teams/teams.thunk";
import { TeamDetails } from "@ssc/core/lib/types/api/Teams/teams";

interface Props {
  request: TeamDetails;
  onRequestHandled?: () => void;
}

const Request = ({ request, onRequestHandled }: Props) => {
  const dispatch = useAppDispatch();

  const handleAccept = async () => {
    try {
      await dispatch(acceptMembershipThunk(request.id));
      toast.success("درخواست عضویت تایید شد");
      onRequestHandled?.();
    } catch (_error) {
      toast.error("خطا در تایید درخواست عضویت");
    }
  };

  const handleReject = async () => {
    try {
      await dispatch(rejectMembershipThunk(request.id));
      toast.success("درخواست عضویت رد شد");
      onRequestHandled?.();
    } catch (_error) {
      toast.error("خطا در رد درخواست عضویت");
    }
  };

  return (
    <div className="flex justify-between items-center p-4 md:p-6 rounded-2xl bg-[#43434340]">
      <div className="flex flex-col gap-2.5 sm:px-2.5">
        <h4 className="text-2xl/[150%] font-bold">{request.name}</h4>
        <div className="flex flex-col gap-1">
          <p className="text-whiteText font-bold">
            درخواست دهنده: {request.leader_details.first_name}{" "}
            {request.leader_details.last_name}
          </p>
          <p className="text-gray-400 text-sm">
            ایمیل: {request.leader_details.email}
          </p>
          <p className="text-gray-400 text-sm">
            تاریخ درخواست:{" "}
            {new Date(request.created_at).toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>
      <div className="flex md:p-2.5 gap-2.5 text-4xl">
        <Button
          variant={ButtonVariant.TEXT}
          className="text-[#C81E1ECC] hover:text-[#C81E1E]"
          prefixIcon={HiXCircle}
          onClick={handleReject}
        />
        <Button
          variant={ButtonVariant.TEXT}
          className="text-[#1F825A] hover:text-[#1F825A]/80"
          prefixIcon={HiCheckCircle}
          onClick={handleAccept}
        />
      </div>
    </div>
  );
};

export default Request;
