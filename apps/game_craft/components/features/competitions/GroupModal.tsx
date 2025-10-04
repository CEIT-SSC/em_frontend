import { Alert, Button, Flex, Modal, Spin, theme, Typography } from "antd";
import { clientApi } from "lib/api/client/clientApi";
import { eventId } from "lib/utils/constants";
import React, { useEffect, useMemo, useState } from "react";
import { TeamDetails } from "@ssc/core/lib/types/api/Teams/teams";
import { useTranslations } from "next-intl";
import { digitsToHindi } from "@ssc/utils";
import { useAuth } from "lib/hooks/useAuth";
import { HiCash, HiCheck, HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import { MdOutlineWatch } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import {
  fetchTeamsThunk,
  payTeamThunk,
  registerTeamThunk,
} from "lib/store/teams/teams.thunk";

interface Props {
  isRTL: boolean;
  competitionId: number;
  minTeamSize: number;
  maxTeamSize: number;
  disable: boolean;
  registered?: (isRegistered: boolean) => void;
}

const GroupModal = ({
  isRTL,
  competitionId,
  registered,
  minTeamSize,
  maxTeamSize,
  disable,
}: Props) => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const t = useTranslations();
  const { isAuthenticated } = useAuth();
  const { useToken } = theme;
  const { token } = useToken();
  const [filteredTeams, setFilteredTeams] = useState<TeamDetails[]>([]);

  const dispatch = useAppDispatch();
  const { data: teams, loading, error } = useAppSelector((s) => s.teams);

  const isTeamSizeValid = (teamSize: number) => {
    if (teamSize < minTeamSize || teamSize > maxTeamSize) return false;
    return true;
  };

  const isRegistered = !!teams.find(
    (team) =>
      team.group_competition_details?.id == competitionId &&
      team.status === "active"
  );

  const inPaymentProgress = !!teams.find(
    (team) =>
      team.group_competition_details?.id == competitionId &&
      (team.status === "approved_awaiting_payment" ||
        team.status === "awaiting_payment_confirmation")
  );

  if (registered) registered(isRegistered);

  const buttonText = () =>
    isAuthenticated
      ? inPaymentProgress
        ? "در انتظار پرداخت"
        : isRegistered
        ? "ثبت نام شده"
        : "ثبت نام"
      : "ابتدا وارد شوید";

  // const buttonText = useMemo(() => {
  //   if (!isAuthenticated) return t("workshop.loginToContinue");
  //   if (isSelected) {
  //     return t("workshop.removeFromCart");
  //   } else {
  //     return presentation.is_paid
  //       ? t("workshop.addToCart")
  //       : t("workshop.enroll");
  //   }
  // }, [isSelected, presentation, t, isAuthenticated]);

  const statusButton = (status: string, teamId: number) => {
    switch (status) {
      case "pending_admin_verification":
        return (
          <Button type="primary" disabled icon={<MdOutlineWatch />}>
            در انتظار تایید
          </Button>
        );
      case "approved_awaiting_payment":
        return (
          <Button
            type="primary"
            icon={<HiCash />}
            onClick={() => handlePayment(teamId)}
          >
            پرداخت
          </Button>
        );
      case "awaiting_payment_confirmation":
        return (
          <Button
            type="primary"
            icon={<HiCash />}
            onClick={() => handlePayment(teamId)}
          >
            پرداخت
          </Button>
        );
      case "active":
        return (
          <Button type="primary" disabled icon={<HiCheck />}>
            ثبت نام شده
          </Button>
        );
      default:
        break;
    }
  };

  useEffect(() => {
    if (isAuthenticated)
      dispatch(fetchTeamsThunk())
        .unwrap()
        .catch((err) => {
          toast.error(err.message);
        });

    setFilteredTeams(
      teams.filter(
        (team) =>
          isTeamSizeValid(team.memberships.length) &&
          (!team.group_competition_details ||
            team.group_competition_details.id == competitionId)
      )
    );
  }, [isAuthenticated, showGroupModal]);

  const handlePayment = (teamId: number) => {
    dispatch(payTeamThunk(teamId))
      .unwrap()
      .then((res) => {
        if (res.paymentUrl) {
          window.open(res.paymentUrl, "_blank");
        } else {
          // free
          toast.success("پرداخت با موفقیت انجام شد");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleRegisterCompetition = (team: TeamDetails) => {
    const pending = team.memberships.some(
      (member) => member.status === "pending"
    );
    if (pending) {
      toast.error("تمامی اعضای تیم باید درخواست عضویت خود را تایید کنند");
      return;
    }

    dispatch(registerTeamThunk({ teamId: team.id, competitionId }))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
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
          message={
            "هنوز تیم واجد شرایطی که در مسابقه ای شرکت نکرده باشد ندارید!"
          }
          description={
            <span>
              با هر تیمی تنها در یک مسابقه میتوان شرکت نمود، با مراجعه به
              داشبورد{" "}
              <a href="https://ceit-ssc.ir/dashboard/teams" target="_blank">
                سایت انجمن (ceit-ssc.ir)
              </a>{" "}
              میتوانید تیم جدیدی بسازید
            </span>
          }
          type="info"
          showIcon
        />
      ) : (
        filteredTeams.map((team) => {
          return (
            <Button
              key={team.id}
              type="dashed"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "1rem",
                height: "fit-content",
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
                  سرگروه:{" "}
                  {team.leader_details.first_name +
                    " " +
                    team.leader_details.last_name}
                </Typography.Paragraph>
                <Typography.Paragraph
                  style={{
                    direction: isRTL ? "rtl" : "ltr",
                    margin: 0,
                  }}
                >
                  تعداد اعضا: {digitsToHindi(team.memberships.length)}
                </Typography.Paragraph>
              </Flex>

              {team.group_competition_details ? (
                statusButton(team.status, team.id)
              ) : (
                <Button
                  type="primary"
                  onClick={() => handleRegisterCompetition(team)}
                  icon={<HiPlus />}
                >
                  ثبت تیم
                </Button>
              )}
            </Button>
          );
        })
      );
    }
  }, [teams, filteredTeams, t, loading]);

  const cardButton = () => (
    <Button
      onClick={() => setShowGroupModal(true)}
      type="primary"
      size="middle"
      style={{
        borderRadius: token.borderRadius,
        height: "36px",
      }}
      disabled={!isAuthenticated || isRegistered || disable}
      icon={isRegistered ? <HiCheck /> : <HiPlus />}
    >
      {buttonText()}
    </Button>
  );

  return (
    <>
      {cardButton()}
      <Modal
        open={showGroupModal}
        onCancel={() => setShowGroupModal(false)}
        footer={
          [
            // Only show action button if not purchased
            //   ...(!isPurchased
            //     ? [
            //         <AntButton
            //           key="action"
            //           type={isSelected ? "default" : "primary"}
            //           danger={isSelected}
            //           icon={
            //             isSelected ? <DeleteOutlined /> : <ShoppingCartOutlined />
            //           }
            //           onClick={() => {
            //             if (isSelected) {
            //               removeFromCart();
            //             } else {
            //               handleAddToCart();
            //             }
            //             setShowModal(false);
            //           }}
            //           disabled={
            //             !competition.is_active ||
            //             buttonShouldBeDisabled ||
            //             competition.capacity <= 0 ||
            //             !isAuthenticated
            //           }
            //           loading={buttonLoading}
            //         >
            //           {buttonText}
            //         </AntButton>,
            //       ]
            //     : []),
          ]
        }
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
          انتخاب تیم برای ثبت نام
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
