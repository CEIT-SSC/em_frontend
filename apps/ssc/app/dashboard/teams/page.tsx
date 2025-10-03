"use client";

import { useEffect, useState, useCallback } from "react";
import { Button, ButtonSize } from "@ssc/ui";
import { HiPlus } from "react-icons/hi";
import Team from "../components/teams/Team";
import CreateTeamModal from "./components/createTeamModal";
import { useAppDispatch, useAppSelector } from "~/core/store/store";
import {
  teamsListSelector,
  teamsLoadingSelector,
} from "~/core/store/teams/teams.selector";
import { fetchTeamsThunk } from "~/core/store/teams/teams.thunk";

const Page = () => {
  const dispatch = useAppDispatch();
  const teamsList = useAppSelector(teamsListSelector);
  const isLoading = useAppSelector(teamsLoadingSelector);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchTeams = useCallback(async () => {
    await dispatch(fetchTeamsThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <>
      <div className="flex justify-between">
        <Button
          className="bg-[#4A4A4A]"
          size={ButtonSize.SMALL}
          label="تیم جدید"
          prefixIcon={HiPlus}
          onClick={() => setIsCreateModalOpen(true)}
        />
      </div>
      <div className="flex flex-col gap-2.5 py-2.5 md:px-2.5">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-3 p-4 md:p-6 rounded-2xl bg-[#43434340] animate-pulse"
            >
              <div className="flex flex-col gap-2.5 px-2.5">
                <div className="h-6 bg-gray-600 rounded w-48"></div>
                <div className="h-4 bg-gray-600 rounded w-32"></div>
              </div>
              <div className="flex justify-center md:p-2.5 gap-2.5">
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
              </div>
            </div>
          ))
        ) : teamsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-whiteText mb-2">
              هیچ تیمی یافت نشد
            </h3>
            <p className="text-gray-400 mb-6">اولین تیم خود را ایجاد کنید</p>
            <Button
              className="bg-[#4A4A4A]"
              size={ButtonSize.SMALL}
              label="ایجاد تیم جدید"
              prefixIcon={HiPlus}
              onClick={() => setIsCreateModalOpen(true)}
            />
          </div>
        ) : (
          teamsList.map((team) => (
            <Team
              key={team.id}
              name={team.name}
              memberCount={team.memberships.length}
              teamId={team.id}
            />
          ))
        )}
      </div>
      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTeamCreated={fetchTeams}
        teamNames={teamsList.map((team) => team.name)}
      />
    </>
  );
};

export default Page;
