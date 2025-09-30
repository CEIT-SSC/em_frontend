import { Button, ButtonSize } from "@ssc/ui";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import Team from "../../components/teams/Team";
import CreateTeamModal from "./createTeamModal";
import { clientApi } from "~/core/api/client/clientApi";
import { TeamDetails } from "@ssc/core/lib/types/api/Teams/teams";

const MyTeams = () => {
  const [teams, setTeams] = useState<TeamDetails[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchTeams = async () => {
    await clientApi.teams
      .getTeamsList()
      .then((res) => setTeams(res.data.data.results));
  };

  useEffect(() => {
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
          onClick={() => setIsCreateModalOpen(true)}
        />
      </div>
      <div className="flex flex-col gap-2.5 py-2.5 md:px-2.5">
        {teams.map((team) => (
          <Team
            key={team.id}
            name={team.name}
            memberCount={team.memberships.length}
            teamId={team.id}
          />
        ))}
      </div>
      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTeamCreated={fetchTeams}
      />
    </>
  );
};

export default MyTeams;
