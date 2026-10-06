"use client";

import { Alert, Button, Flex, Modal, Spin, theme, Typography } from "antd";
import React, { useMemo, useState } from "react";
import { TeamDetails } from "@ssc/core";
import { useTranslations } from "next-intl";
import { digitsToHindi } from "@ssc/utils";
import { useAuth } from "lib/hooks/useAuth";
import { HiCash, HiCheck, HiPlus } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { MdOutlineWatch } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import { payTeamThunk, registerTeamThunk } from "lib/store/teams/teams.thunk";

interface Props {
  isRTL: boolean;
  competitionId: number;
  minTeamSize: number;
  maxTeamSize: number;
  disable: boolean;
}

const GroupModal = ({
  isRTL,
  competitionId,
  minTeamSize,
  maxTeamSize,
  disable,
}: Props) => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [registeringTeamId, setRegisteringTeamId] = useState<number | null>(
    null
  );
  const [payingTeamId, setPayingTeamId] = useState<number | null>(null);
  const t = useTranslations();
  const { isAuthenticated, user } = useAuth();
  const { useToken } = theme;
  const { token } = useToken();

  const dispatch = useAppDispatch();
  const { data: teams, loading, error } = useAppSelector((s) => s.teams);
  const validTeams = teams.filter((team): team is TeamDetails =>
    Boolean(team && typeof team.id === "number")
  );

  const registrationFor = (team: TeamDetails) =>
    team.registrations.find(
      (registration) => registration.competition_details.id === competitionId
    );
  const acceptedSize = (team: TeamDetails) =>
    team.memberships.filter((member) => member.status === "accepted").length;
  const isLeader = (team: TeamDetails) =>
    team.leader_details.email.toLowerCase() === user?.email?.toLowerCase();
  const isRegistered = validTeams.some((team) => registrationFor(team)?.status === "active");
  const hasRegistration = validTeams.some((team) => registrationFor(team));
  const inPaymentProgress = validTeams.some((team) => registrationFor(team)?.status === "pending_payment");
  const registrationPending = validTeams.some((team) => registrationFor(team)?.status === "pending_approval");

  const buttonText = () => {
    if (!isAuthenticated) return t("workshop.loginToContinue");
    if (loading) return t("workshop.loadingTeams");
    if (error) return t("workshop.teamStatusUnavailable");
    if (isRegistered) return t("workshop.registered");
    if (registrationPending) return t("workshop.registrationPending");
    if (inPaymentProgress) return t("workshop.paymentPending");
    return t("workshop.register");
  };

  const statusButton = (status: string, team: TeamDetails) => {
    switch (status) {
      case "pending_approval":
        return (
          <Button type="primary" disabled icon={<MdOutlineWatch />}>
            {t("workshop.registrationPending")}
          </Button>
        );
      case "pending_payment":
        return (
          <Button
            type="primary"
            icon={<HiCash />}
            loading={payingTeamId === team.id}
            disabled={!isLeader(team) || payingTeamId !== null}
            onClick={() => handlePayment(team.id)}
          >
            {t("workshop.pay")}
          </Button>
        );
      case "active":
        return (
          <Button type="primary" disabled icon={<HiCheck />}>
            {t("workshop.registered")}
          </Button>
        );
      case "rejected":
        return (
          <Button type="primary" disabled icon={<RxCross2 />}>
            {t("workshop.rejected")}
          </Button>
        );
      case "cancelled":
        return (
          <Button disabled icon={<RxCross2 />}>
            {t("workshop.registrationCancelled")}
          </Button>
        );
      default:
        break;
    }
  };

  const filteredTeams = useMemo(
    () => validTeams.filter((team) =>
      registrationFor(team) ||
      (acceptedSize(team) >= minTeamSize && acceptedSize(team) <= maxTeamSize)
    ),
    [validTeams, minTeamSize, maxTeamSize, competitionId]
  );

  const handlePayment = (teamId: number) => {
    setPayingTeamId(teamId);
    dispatch(payTeamThunk({ teamId, competitionId }))
      .unwrap()
      .then((res) => {
        if (res.paymentUrl) {
          window.location.assign(res.paymentUrl);
        } else {
          // free
          toast.success(t("workshop.paymentSucceeded"));
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setPayingTeamId(null));
  };

  const handleRegisterCompetition = (team: TeamDetails) => {
    setRegisteringTeamId(team.id);
    dispatch(registerTeamThunk({ teamId: team.id, competitionId }))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setRegisteringTeamId(null));
  };

  const content = useMemo(() => {
    if (loading) {
      return (
        <Flex justify="center" align="center" style={{ minHeight: "200px" }}>
          <Spin size="large" />
        </Flex>
      );
    } else if (error) {
      return (
        <Alert
          message={t("workshop.error")}
          description={error}
          type="error"
          showIcon
        />
      );
    } else {
      return filteredTeams.length === 0 ? (
        <Alert
          message={t("workshop.noEligibleTeams")}
          description={
            <span>
              {t("workshop.noEligibleTeamsDescription")}{" "}
              <a
                href="https://ceit-ssc.ir/dashboard/teams"
                target="_blank"
                rel="noreferrer"
              >
                {t("workshop.teamDashboardLink")}
              </a>{" "}
              {t("workshop.createTeamInstructions")}
            </span>
          }
          type="info"
          showIcon
        />
      ) : (
        filteredTeams.map((team) => {
          return (
            <Flex
              key={team.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
                width: "100%",
                padding: "1rem",
                border: "1px solid rgba(157, 219, 245, 0.2)",
                borderRadius: token.borderRadius,
                background: "rgba(157, 219, 245, 0.04)",
              }}
            >
              <Flex
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  alignItems: "start",
                }}
              >
                <Typography.Title
                  level={3}
                  style={{
                    direction: isRTL ? "rtl" : "ltr",
                    margin: 0,
                  }}
                >
                  {team.name}
                </Typography.Title>
                <Typography.Paragraph
                  style={{
                    direction: isRTL ? "rtl" : "ltr",
                    margin: 0,
                  }}
                >
                  {t("workshop.teamLeader", {
                    name: `${team.leader_details.first_name} ${team.leader_details.last_name}`,
                  })}
                </Typography.Paragraph>
                <Typography.Paragraph
                  style={{
                    direction: isRTL ? "rtl" : "ltr",
                    margin: 0,
                  }}
                >
                  {t("workshop.memberCount", {
                    count: digitsToHindi(registrationFor(team)?.member_ids.length ?? acceptedSize(team)),
                  })}
                </Typography.Paragraph>
              </Flex>

              {registrationFor(team) ? (
                statusButton(registrationFor(team)!.status, team)
              ) : (
                <Button
                  type="primary"
                  loading={registeringTeamId === team.id}
                  disabled={!isLeader(team) || disable || registeringTeamId !== null}
                  onClick={() => handleRegisterCompetition(team)}
                  icon={<HiPlus />}
                >
                  {registeringTeamId === team.id
                    ? t("workshop.registeringTeam")
                    : t("workshop.registerTeam")}
                </Button>
              )}
            </Flex>
          );
        })
      );
    }
  }, [validTeams, filteredTeams, t, loading, error, isRTL, user, registeringTeamId, payingTeamId, disable]);

  const cardButton = () => (
    <Button
      onClick={() => setShowGroupModal(true)}
      type="primary"
      size="middle"
      style={{
        borderRadius: token.borderRadius,
        height: "36px",
      }}
      disabled={!isAuthenticated || loading || (disable && !hasRegistration)}
      loading={isAuthenticated && loading}
      icon={
        isRegistered ? (
          <HiCheck />
        ) : registrationPending ? (
          <MdOutlineWatch />
        ) : inPaymentProgress ? (
          <HiCash />
        ) : (
          <HiPlus />
        )
      }
    >
      {buttonText()}
    </Button>
  );

  return (
    <>
      {cardButton()}
      <Modal
        className="gc-workshop-modal"
        open={showGroupModal}
        onCancel={() => setShowGroupModal(false)}
        footer={null}
        width={700}
        style={{ top: 50, zIndex: 200 }}
        styles={{
          body: { maxHeight: "70vh", overflowY: "auto" },
        }}
      >
        <Typography.Title
          level={2}
          style={{
            direction: isRTL ? "rtl" : "ltr",
            marginBottom: "24px",
          }}
        >
          {t("workshop.selectTeamTitle")}
        </Typography.Title>
        <Flex
          style={{ flexDirection: "column", alignItems: "center", gap: "1rem" }}
        >
          {isAuthenticated && content}
        </Flex>
      </Modal>
    </>
  );
};

export default GroupModal;
