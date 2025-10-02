import React, { useState, useEffect, useCallback } from "react";
import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import {
  HiX,
  HiUser,
  HiCalendar,
  HiOfficeBuilding,
  HiDocumentText,
  HiThumbUp,
  HiChatAlt,
  HiPlus,
} from "react-icons/hi";
import Modal from "~/components/Modal";
import { RootState, useAppDispatch, useAppSelector } from "~/core/store/store";
import { fetchTeamDetailsThunk } from "~/core/store/teams/teams.thunk";
import { toast } from "react-toastify";
import AddMemberModal from "./addMemberModal";
import DeleteTeamModal from "./deleteTeamModal";
import { teamDetailsSelector } from "~/core/store/teams/teams.selector";

interface TeamDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: number;
  teamName: string;
  onTeamUpdated: () => void;
}

const TeamDetailsModal: React.FC<TeamDetailsModalProps> = ({
  isOpen,
  onClose,
  teamId,
  teamName: _teamName,
  onTeamUpdated,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const teamDetails = useAppSelector(teamDetailsSelector(teamId));
  const isLoading = useAppSelector(
    (state: RootState) => state.teams.teamDetailsLoading
  );
  const currentUser = useAppSelector((state: RootState) => state.user);
  const isUserLeader = currentUser.email === teamDetails?.leader_details.email;

  const fetchTeamDetails = useCallback(async () => {
    try {
      await dispatch(fetchTeamDetailsThunk(teamId));
    } catch (_error) {
      toast.error("خطا در دریافت جزئیات تیم");
      onClose();
    }
  }, [dispatch, teamId]);

  useEffect(() => {
    if (isOpen && teamId) {
      fetchTeamDetails();
    }
  }, [isOpen, teamId, fetchTeamDetails]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "forming":
        return "text-yellow-400 bg-yellow-500/10";
      case "active":
        return "text-green-400 bg-green-500/10";
      case "completed":
        return "text-blue-400 bg-blue-500/10";
      case "cancelled":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  const getMembershipStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-400";
      case "accepted":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  if (!isOpen) return null;

  return (
    <Modal className="sm:!max-w-3/4">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-whiteText">جزئیات تیم</h3>
          <Button
            variant={ButtonVariant.TEXT}
            className="text-whiteText p-1"
            onClick={onClose}
            suffixIcon={HiX}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff715b]"></div>
            <span className="mr-3 text-whiteText">در حال بارگذاری...</span>
          </div>
        ) : teamDetails ? (
          <div className="space-y-6">
            {/* Team Header */}
            <div className="bg-[#43434340] p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff715b] to-[#cb48b7] flex items-center justify-center shadow-lg">
                  <HiUser className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl text-center sm:text-start font-bold text-white">
                    {teamDetails.name}
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        teamDetails.status
                      )}`}
                    >
                      {teamDetails.status === "forming"
                        ? "در حال تشکیل"
                        : teamDetails.status === "active"
                        ? "فعال"
                        : teamDetails.status === "completed"
                        ? "تکمیل شده"
                        : teamDetails.status === "cancelled"
                        ? "لغو شده"
                        : teamDetails.status}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ایجاد شده در {formatDate(teamDetails.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Leader Info */}
              <div className="border-t border-gray-600 pt-4">
                <h5 className="text-lg font-semibold text-whiteText mb-3">
                  رهبر تیم
                </h5>
                <div className="flex items-center gap-3">
                  {teamDetails.leader_details.profile_picture && (
                    <img
                      src={teamDetails.leader_details.profile_picture}
                      alt={teamDetails.leader_details.first_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-whiteText font-medium">
                      {teamDetails.leader_details.first_name}{" "}
                      {teamDetails.leader_details.last_name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {teamDetails.leader_details.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Competition Details */}
            {teamDetails.group_competition_details && (
              <div className="bg-[#43434340] p-6 rounded-2xl">
                <h5 className="text-lg font-semibold text-whiteText mb-4 flex items-center gap-2">
                  <HiOfficeBuilding className="w-5 h-5" />
                  جزئیات مسابقه
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">عنوان مسابقه</p>
                    <p className="text-whiteText">
                      {teamDetails.group_competition_details.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">رویداد</p>
                    <p className="text-whiteText">
                      {teamDetails.group_competition_details.event_title}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">تاریخ شروع</p>
                    <p className="text-whiteText">
                      {formatDate(
                        teamDetails.group_competition_details.start_datetime
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">تاریخ پایان</p>
                    <p className="text-whiteText">
                      {formatDate(
                        teamDetails.group_competition_details.end_datetime
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">اندازه تیم</p>
                    <p className="text-whiteText">
                      {teamDetails.group_competition_details.min_group_size} -{" "}
                      {teamDetails.group_competition_details.max_group_size} نفر
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">هزینه عضویت</p>
                    <p className="text-whiteText">
                      {teamDetails.group_competition_details.is_paid
                        ? `${teamDetails.group_competition_details.price_per_member} تومان`
                        : "رایگان"}
                    </p>
                  </div>
                </div>
                {teamDetails.group_competition_details.description && (
                  <div className="mt-4">
                    <p className="text-gray-400 text-sm mb-2">توضیحات</p>
                    <p className="text-whiteText text-sm leading-relaxed">
                      {teamDetails.group_competition_details.description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Team Members */}
            <div className="bg-[#43434340] p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-semibold text-whiteText flex items-center gap-2">
                  <HiUser className="w-5 h-5" />
                  اعضا ({teamDetails.memberships.length})
                </h5>
                {currentUser.email === teamDetails.leader_details.email && (
                  <Button
                    variant={ButtonVariant.PRIMARY}
                    size={ButtonSize.SMALL}
                    label="اضافه کردن عضو"
                    prefixIcon={HiPlus}
                    onClick={() => setIsAddMemberModalOpen(true)}
                    className="text-sm"
                  />
                )}
              </div>
              <div className="space-y-3">
                {teamDetails.memberships.map((membership) => (
                  <div
                    key={membership.id}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-[#2a2a2a] rounded-lg"
                  >
                    <div className="flex items-center self-baseline gap-3">
                      {membership.user_details.profile_picture && (
                        <img
                          src={membership.user_details.profile_picture}
                          alt={membership.user_details.first_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="text-whiteText font-medium">
                          {membership.user_details.first_name}{" "}
                          {membership.user_details.last_name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {membership.user_details.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <span
                        className={`text-sm font-medium ${getMembershipStatusColor(
                          membership.status
                        )}`}
                      >
                        {membership.status === "pending"
                          ? "در انتظار"
                          : membership.status === "accepted"
                          ? "تایید شده"
                          : membership.status === "rejected"
                          ? "رد شده"
                          : membership.status}
                      </span>
                      <p className="text-gray-400 text-xs mt-1">
                        {formatDate(membership.joined_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Submission */}
            {teamDetails.content_submission &&
              teamDetails.content_submission.id && (
                <div className="bg-[#43434340] p-6 rounded-2xl">
                  <h5 className="text-lg font-semibold text-whiteText mb-4 flex items-center gap-2">
                    <HiDocumentText className="w-5 h-5" />
                    محتوای ارسالی
                  </h5>
                  <div className="space-y-4">
                    {teamDetails.content_submission.description && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">توضیحات</p>
                        <p className="text-whiteText leading-relaxed">
                          {teamDetails.content_submission.description}
                        </p>
                      </div>
                    )}

                    {teamDetails.content_submission.file_link && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">فایل</p>
                        <a
                          href={teamDetails.content_submission.file_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#ff715b] hover:text-[#cb48b7] transition-colors"
                        >
                          مشاهده فایل
                        </a>
                      </div>
                    )}

                    {teamDetails.content_submission.images &&
                      teamDetails.content_submission.images.length > 0 && (
                        <div>
                          <p className="text-gray-400 text-sm mb-3">تصاویر</p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {teamDetails.content_submission.images.map(
                              (image) => (
                                <div key={image.id} className="relative group">
                                  <img
                                    src={image.image}
                                    alt={image.caption || "تصویر محتوا"}
                                    className="w-full h-24 object-cover rounded-lg"
                                  />
                                  {image.caption && (
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                      <p className="text-white text-xs text-center px-2">
                                        {image.caption}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    <div className="flex items-center gap-6 pt-4 border-t border-gray-600">
                      <div className="flex items-center gap-2">
                        <HiThumbUp className="w-4 h-4 text-green-400" />
                        <span className="text-whiteText text-sm">
                          {teamDetails.content_submission.likes_count} لایک
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiChatAlt className="w-4 h-4 text-blue-400" />
                        <span className="text-whiteText text-sm">
                          {teamDetails.content_submission.comments_count} کامنت
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <HiCalendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">
                          {formatDate(
                            teamDetails.content_submission.created_at
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* Admin Remarks */}
            {teamDetails.admin_remarks && (
              <div className="bg-[#43434340] p-6 rounded-2xl">
                <h5 className="text-lg font-semibold text-whiteText mb-3">
                  توضیحات ادمین
                </h5>
                <p className="text-whiteText leading-relaxed">
                  {teamDetails.admin_remarks}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">خطا در دریافت اطلاعات تیم</p>
          </div>
        )}

        <div className="flex justify-end mt-6 gap-4">
          {isUserLeader && (
            <Button
              className="!text-red-400 hover:!bg-red-500 hover:!text-white"
              size={ButtonSize.SMALL}
              label="حذف تیم"
              onClick={() => setIsDeleteModalOpen(true)}
            />
          )}
          <Button
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.SMALL}
            label="بستن"
            onClick={onClose}
            className="text-white hover:!bg-mainRed"
          />
        </div>
      </div>

      {/* Delete Team Modal */}
      <DeleteTeamModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onTeamDeleted={onTeamUpdated}
        teamId={teamId}
        teamName={teamDetails?.name}
      />

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onMemberAdded={() => {
          // Refresh team details after adding member
          fetchTeamDetails();
        }}
        teamId={teamId}
        teamName={teamDetails?.name || ""}
      />
    </Modal>
  );
};

export default TeamDetailsModal;
