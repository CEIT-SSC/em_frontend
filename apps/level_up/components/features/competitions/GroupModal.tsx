"use client";

import { Alert, Button, Flex, Modal, Popconfirm, Spin, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { TeamDetails } from "@ssc/core";
import { digitsToHindi } from "@ssc/utils";
import { useAuth } from "lib/hooks/useAuth";
import { HiCash, HiCheck, HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import { MdOutlineWatch } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import { cancelTeamRegistrationThunk, fetchTeamsThunk, payTeamThunk, registerTeamThunk } from "lib/store/teams/teams.thunk";

interface Props {
  isRTL: boolean;
  competitionId: number;
  minTeamSize: number;
  maxTeamSize: number;
  disable: boolean;
  registered?: (isRegistered: boolean) => void;
}

const GroupModal = ({ isRTL, competitionId, registered, minTeamSize, maxTeamSize, disable }: Props) => {
  const [open, setOpen] = useState(false);
  const [cancellingTeamId, setCancellingTeamId] = useState<number | null>(null);
  const { isAuthenticated, user } = useAuth();
  const dispatch = useAppDispatch();
  const { data: teams, loading, error } = useAppSelector((state) => state.teams);
  const registrationFor = (team: TeamDetails) => team.registrations.find(
    (registration) => registration.competition_details.id === competitionId
  );
  const acceptedSize = (team: TeamDetails) => team.memberships.filter((member) => member.status === "accepted").length;
  const isLeader = (team: TeamDetails) => team.leader_details.email.toLowerCase() === user?.email?.toLowerCase();
  const isRegistered = teams.some((team) => registrationFor(team)?.status === "active");
  const hasRegistration = teams.some((team) => registrationFor(team));
  const inPaymentProgress = teams.some((team) => registrationFor(team)?.status === "pending_payment");
  const filteredTeams = useMemo(() => teams.filter((team) =>
    team.registrations.some((registration) => registration.competition_details.id === competitionId) ||
    (acceptedSize(team) >= minTeamSize && acceptedSize(team) <= maxTeamSize)
  ), [teams, competitionId, minTeamSize, maxTeamSize]);

  useEffect(() => {
    registered?.(isRegistered);
  }, [registered, isRegistered]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTeamsThunk()).unwrap().catch((error) => toast.error(error.message));
    }
  }, [isAuthenticated, open, dispatch]);

  const handlePayment = async (teamId: number) => {
    try {
      const result = await dispatch(payTeamThunk({ teamId, competitionId })).unwrap();
      if (result.paymentUrl) window.location.assign(result.paymentUrl);
      else toast.success("پرداخت با موفقیت انجام شد");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRegister = async (team: TeamDetails) => {
    try {
      await dispatch(registerTeamThunk({ teamId: team.id, competitionId })).unwrap();
      toast.success("وضعیت ثبت نام تیم به‌روزرسانی شد");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancel = async (teamId: number) => {
    setCancellingTeamId(teamId);
    try {
      await dispatch(cancelTeamRegistrationThunk({ teamId, competitionId })).unwrap();
      toast.success("ثبت‌نام تیم لغو شد");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCancellingTeamId(null);
    }
  };

  const cancelAction = (team: TeamDetails) => <Popconfirm
    title="لغو ثبت‌نام تیم"
    description="آیا از لغو ثبت‌نام این تیم مطمئن هستید؟"
    okText="بله، لغو شود"
    cancelText="انصراف"
    onConfirm={() => handleCancel(team.id)}
    disabled={!isLeader(team) || cancellingTeamId !== null}
  >
    <Button danger disabled={!isLeader(team) || cancellingTeamId !== null}
      loading={cancellingTeamId === team.id}>لغو ثبت‌نام</Button>
  </Popconfirm>;

  const actionFor = (team: TeamDetails) => {
    const registration = registrationFor(team);
    switch (registration?.status) {
      case "pending_approval":
        return <Flex gap="small" wrap>
          <Button disabled icon={<MdOutlineWatch />}>در انتظار تایید</Button>
          {cancelAction(team)}
        </Flex>;
      case "pending_payment":
        return <Flex gap="small" wrap>
          <Button type="primary" disabled={!isLeader(team) || cancellingTeamId !== null}
            icon={<HiCash />} onClick={() => handlePayment(team.id)}>پرداخت</Button>
          {cancelAction(team)}
        </Flex>;
      case "active":
        return <Button disabled icon={<HiCheck />}>ثبت نام شده</Button>;
      case "rejected":
        return <Typography.Text type="danger">رد شده: {registration.admin_remarks}</Typography.Text>;
      case "cancelled":
      default:
        return <Button type="primary" disabled={!isLeader(team) || disable} icon={<HiPlus />} onClick={() => handleRegister(team)}>ثبت تیم</Button>;
    }
  };

  return <>
    <Button type="primary" onClick={() => setOpen(true)}
      disabled={!isAuthenticated || (disable && !hasRegistration)}
      icon={isRegistered ? <HiCheck /> : <HiPlus />}>
      {!isAuthenticated ? "ابتدا وارد شوید" : isRegistered ? "ثبت نام شده" : inPaymentProgress ? "در انتظار پرداخت" : "ثبت نام"}
    </Button>
    <Modal open={open} onCancel={() => setOpen(false)} footer={null} width={700}
      styles={{ body: { maxHeight: "70vh", overflowY: "auto", direction: isRTL ? "rtl" : "ltr" } }}>
      <Typography.Title level={2}>انتخاب تیم برای ثبت نام</Typography.Title>
      {loading ? <Flex justify="center"><Spin /></Flex> : error ? <Alert type="error" message={error} showIcon /> :
        filteredTeams.length === 0 ? <Alert type="info" showIcon
          message="تیمی با تعداد اعضای پذیرفته‌شده مناسب ندارید."
          description={<>یک تیم می‌تواند در چند مسابقه ثبت نام کند. برای مدیریت اعضا به <a href="https://ceit-ssc.ir/dashboard/teams" target="_blank" rel="noreferrer">داشبورد تیم‌ها</a> مراجعه کنید.</>} /> :
        <Flex vertical gap="middle">
          {filteredTeams.map((team) => <Flex key={team.id} justify="space-between" align="center" gap="small">
            <div>
              <Typography.Title level={4}>{team.name}</Typography.Title>
              <Typography.Text>تعداد اعضا: {digitsToHindi(registrationFor(team)?.member_ids.length ?? acceptedSize(team))}</Typography.Text>
              {!isLeader(team) && <Typography.Paragraph>ثبت نام و پرداخت توسط سرگروه انجام می‌شود.</Typography.Paragraph>}
            </div>
            {actionFor(team)}
          </Flex>)}
        </Flex>}
    </Modal>
  </>;
};

export default GroupModal;
