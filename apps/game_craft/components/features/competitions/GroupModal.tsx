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
import { fetchTeams, payTeam, registerTeam } from "lib/store/teams/teams.slice";

interface Props {
  isRTL: boolean;
  competitionId: number;
  registered?: (isRegistered: boolean) => void;
}

const GroupModal = ({ isRTL, competitionId, registered }: Props) => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const t = useTranslations();
  const { isAuthenticated } = useAuth();
  const { useToken } = theme;
  const { token } = useToken();
  const [filteredTeams, setFilteredTeams] = useState<TeamDetails[]>([]);

  const dispatch = useAppDispatch();
  const { data: teams, loading, error } = useAppSelector((s) => s.teams);

  const isRegistered = !!teams.find(
    (team) =>
      team.group_competition_details?.id == competitionId &&
      team.status === "active"
  );

  registered(isRegistered);

  const buttonText = isAuthenticated
    ? isRegistered
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
          <Button type="primary" disabled icon={<HiCash />}>
            در حال پرداخت
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

  // const [teams, setTeams] = useState<{
  //   loading: boolean;
  //   error?: string;
  //   data?: TeamDetails[];
  // }>({ loading: true });

  useEffect(() => {
    if (isAuthenticated)
      dispatch(fetchTeams())
        .unwrap()
        .catch((err) => {
          toast.error(err.message);
        });

    setFilteredTeams(
      teams.filter(
        (team) =>
          !team.group_competition_details ||
          team.group_competition_details.id == competitionId
      )
    );

    // clientApi.teams
    //   .getTeamsList()
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setTeams({
    //         loading: false,
    //         data: response.data.data.results,
    //       });
    //     } else {
    //       setTeams({ loading: false, error: "failed to fetch" });
    //     }
    //   })
    //   .catch((err) => {
    //     setTeams({ loading: false, error: "failed to fetch" });
    //   });
  }, [isAuthenticated, showGroupModal]);

  const handlePayment = (teamId: number) => {
    dispatch(payTeam(teamId))
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

    // clientApi.teams
    //   .teamPayment(teamId)
    //   .then((response) =>
    //     window.open(response.data.data.data.payment_url, "_blank")
    //   )
    //   .catch((error) => console.log("Failed to pay:", error));
  };

  const handleRegisterCompetition = (teamId: number) => {
    dispatch(registerTeam({ teamId, competitionId }))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });

    // clientApi.teams
    //   .registerCompetition(teamId, competitionId)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("Failed to register:", error);
    //     if (error.status === 403)
    //       toast.error("تنها سرگروه مجاز به ثبت تیم می باشد");
    //     if (error.status === 400)
    //       toast.error("شما قبلا در این مسابقه ثبت نام کرده اید");
    //   });
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
          message={"هنوز تیمی ندارید!"}
          description={
            "میتوانید با مراجعه به داشبورد سایت انجمن تیم خود را بسازید"
          }
          type="info"
          showIcon
        />
      ) : (
        filteredTeams.map((team) => (
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
                onClick={() => handleRegisterCompetition(team.id)}
                disabled={!!team.group_competition_details}
                icon={<HiPlus />}
              >
                ثبت تیم
              </Button>
            )}
          </Button>
        ))
      );
    }
  }, [teams, t]);

  return (
    <>
      <Button
        onClick={() => setShowGroupModal(true)}
        type="primary"
        size="middle"
        style={{
          borderRadius: token.borderRadius,
          height: "36px",
        }}
        disabled={!isAuthenticated || isRegistered}
        icon={isRegistered ? <HiCheck /> : <HiPlus />}
      >
        {buttonText}
      </Button>
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
