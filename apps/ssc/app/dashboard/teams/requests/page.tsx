"use client";

import React, { useEffect } from "react";
import Request from "../../components/teams/Request";
import { useAppDispatch, useAppSelector } from "~/core/store/store";
import { fetchMembershipRequestsThunk } from "~/core/store/teams/teams.thunk";

const RequestsPage = () => {
  const dispatch = useAppDispatch();
  const { membershipRequests, membershipRequestsLoading } = useAppSelector(
    (state) => state.teams
  );

  useEffect(() => {
    dispatch(fetchMembershipRequestsThunk());
  }, [dispatch]);

  const handleRequestHandled = () => {
    // Refetch requests after handling one
    dispatch(fetchMembershipRequestsThunk());
  };

  if (membershipRequestsLoading) {
    return (
      <div className="flex flex-col gap-2.5 md:p-2.5">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff715b]"></div>
          <span className="mr-3 text-whiteText">در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  if (membershipRequests.length === 0) {
    return (
      <div className="flex flex-col gap-2.5 md:p-2.5">
        <div className="text-center py-12">
          <p className="text-gray-400">درخواستی برای نمایش وجود ندارد</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 md:p-2.5">
      {membershipRequests.map((request) => (
        <Request
          key={request.id}
          request={request}
          onRequestHandled={handleRequestHandled}
        />
      ))}
    </div>
  );
};

export default RequestsPage;
