import { Alert, Button, Flex, Modal, Spin, Typography } from "antd";
import { clientApi } from "lib/api/client/clientApi";
import { eventId } from "lib/utils/constants";
import React, { useEffect, useMemo, useState } from "react";
import { TeamDetails } from "@ssc/core/lib/types/api/Teams/teams";
import { useTranslations } from "next-intl";
import { digitsToHindi } from "@ssc/utils";
import { useAuth } from "lib/hooks/useAuth";

interface Props {
  isRTL: boolean;
  competitionId: number;
}

const GroupModal = ({ isRTL, competitionId }: Props) => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const t = useTranslations();
  const { user } = useAuth();

  const [teams, setTeams] = useState<{
    loading: boolean;
    error?: string;
    data?: TeamDetails[];
  }>({ loading: true });

  useEffect(() => {
    if (!user) return;
    clientApi.teams
      .getTeamsList()
      .then((response) => {
        if (response.status === 200) {
          setTeams({
            loading: false,
            data: response.data.data.results,
          });
        } else {
          setTeams({ loading: false, error: "failed to fetch" });
        }
      })
      .catch((err) => {
        setTeams({ loading: false, error: "failed to fetch" });
      });
  }, [user]);

  const handleRegisterCompetition = (teamId: number) => {
    clientApi.teams
      .registerCompetition(teamId, competitionId)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log("Failed to register:", error));
  };

  const content = useMemo(() => {
    if (teams.loading) {
      return (
        <Flex justify="center" align="center" style={{ minHeight: "200px" }}>
          <Spin size="large" />
        </Flex>
      );
    } else if (teams.error) {
      return (
        <Alert
          message={t("workshop.error")}
          description={teams.error}
          type="error"
          showIcon
        />
      );
    } else {
      return teams.data.length === 0 ? (
        <Alert
          message={t("workshop.noWorkshops")}
          description={t("workshop.noOnlineWorkshops")}
          type="info"
          showIcon
        />
      ) : (
        teams.data.map((team) => (
          <Button
            key={team.id}
            onClick={() => handleRegisterCompetition(team.id)}
            type="dashed"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "1rem",
              minHeight: "fit-content",
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
            </Flex>

            <Typography.Paragraph
              style={{
                direction: isRTL ? "rtl" : "ltr",
                margin: 0,
              }}
            >
              تعداد اعضا: {digitsToHindi(team.memberships.length)}
            </Typography.Paragraph>
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
          borderRadius: "12px",
          height: "36px",
        }}
      >
        ثبت نام
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
          {user ? (
            content
          ) : (
            <Typography.Title
              level={4}
              style={{
                direction: isRTL ? "rtl" : "ltr",
                marginBottom: "24px",
              }}
            >
              ابتدا وارد شوید!
            </Typography.Title>
          )}
        </Flex>
      </Modal>
    </>
  );
};

export default GroupModal;
