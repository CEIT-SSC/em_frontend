import { useState } from "react";
import { HiEye, HiUsers } from "react-icons/hi";
import { Button, ButtonVariant } from "@ssc/ui";
import TeamDetailsModal from "../../teams/components/teamDetailsModal";
import { digitsToHindi } from "~/utils/digitsToHindi";

interface Props {
  name: string;
  memberCount: number;
  teamId: number;
  onTeamUpdated?: () => void;
}

const Team = ({ name, memberCount, teamId, onTeamUpdated }: Props) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const showOptions = () => {
    return (
      <Button
        variant={ButtonVariant.TEXT}
        className="text-whiteText hover:text-gray-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
        prefixIcon={HiEye}
      />
    );
  };

  return (
    <>
      <div
        className="group relative overflow-hidden"
        onClick={() => setIsDetailsModalOpen(true)}
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff715b]/5 to-[#cb48b7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Main card */}
        <div className="relative flex justify-between items-center gap-y-3 p-4 md:p-6 rounded-2xl bg-[#43434340] border border-transparent hover:border-[#ff715b]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#ff715b]/10">
          {/* Team info */}
          <div className="flex items-center gap-4 flex-1">
            {/* Team avatar/icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff715b] to-[#cb48b7] flex items-center justify-center shadow-lg">
              <HiUsers className="w-6 h-6 text-white" />
            </div>
            {/* Team details */}
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <h4 className="text-xl font-bold text-white truncate group-hover:text-[#ff715b] transition-colors duration-200">
                {name}
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <HiUsers className="w-4 h-4" />
                <span>{digitsToHindi(memberCount)} عضو</span>
              </div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex justify-center md:justify-end gap-1 md:p-2.5">
            <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
              {showOptions()}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TeamDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        teamId={teamId}
        teamName={name}
        onTeamUpdated={onTeamUpdated}
      />
    </>
  );
};

export default Team;
