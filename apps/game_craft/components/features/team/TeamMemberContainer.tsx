"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Alert, Col, Flex, Row, Spin, theme, Typography } from "antd";
import { useTranslations } from "next-intl";
import { TeamMemberCard } from "./TeamMemberCard";
import { useAppSelector } from "lib/store/store";
import { TeamDetails } from "@ssc/core/lib/types/api/Teams/teams";
import { clientApi } from "lib/api/client/clientApi";
import { eventId } from "lib/utils/constants";
import { GroupCompetitionsList } from "@ssc/core/lib/types/api/competitions/competitions";

const { useToken } = theme;

export const TeamMemberContainer: React.FC = () => {
  const { token } = useToken();
  const t = useTranslations("app.dashboard.teamStatus");

  const { data: teams } = useAppSelector((s) => s.teams);
  const [filteredTeams, setFilteredTeams] = useState<TeamDetails[]>([]);
  const [competitions, setCompetitions] = useState<{
    loading: boolean;
    error?: string;
    data?: GroupCompetitionsList;
  }>({ loading: true });

  const isValidTeam = (competitionId: number) =>
    !!competitions.data?.results.find(
      (competition) => competition.id == competitionId
    );

  useEffect(() => {
    clientApi.competitions
      .getGroupCompetitionsList(eventId, undefined)
      .then((response) => {
        if (response.status === 200) {
          setCompetitions({
            loading: false,
            data: response.data.data,
          });
        } else {
          setCompetitions({ loading: false, error: "failed to fetch" });
        }
      })
      .catch((err) => {
        setCompetitions({ loading: false, error: err });
      });

    setFilteredTeams(
      teams.filter(
        (team) =>
          team.group_competition_details &&
          isValidTeam(team.group_competition_details.id) &&
          team.status === "active"
      )
    );
  }, [competitions, teams]);

  const mapTeamMembers = (team: TeamDetails) =>
    team.memberships.map((member) => (
      <Col key={member.id} span={24} sm={12} lg={8}>
        <TeamMemberCard
          isHead={member.user_details.email === team.leader_details.email}
          name={
            member.user_details.first_name + " " + member.user_details.last_name
          }
          avatar={member.user_details.profile_picture}
        />
      </Col>
    ));

  const mapTeams = () =>
    filteredTeams.map((team) => (
      <>
        <Col span={24}>
          <Typography.Title level={4} style={{ marginBottom: "1.5rem" }}>
            {team.group_competition_details.title}:
          </Typography.Title>
          <Typography.Title
            level={3}
            style={{
              margin: 0,
              fontWeight: 900,
              color: token.colorPrimary,
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {team.name}
          </Typography.Title>
        </Col>
        {mapTeamMembers(team)}
      </>
    ));

  const content = useMemo(() => {
    if (competitions.loading) {
      return (
        <Flex justify="center" align="center" style={{ minHeight: "200px" }}>
          <Spin size="large" />
        </Flex>
      );
    } else if (competitions.error) {
      return (
        <Alert
          message={t("workshop.error")}
          description={competitions.error}
          type="error"
          showIcon
        />
      );
    } else {
      return competitions.data.results.length === 0 ? (
        <Alert
          message={t("workshop.noWorkshops")}
          description={t("workshop.noOnlineWorkshops")}
          type="info"
          showIcon
        />
      ) : (
        mapTeams()
      );
    }
  }, [competitions, t]);

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: "100%",
      }}
      gap="small"
    >
      <Row
        align="middle"
        justify="center"
        style={{ width: "100%" }}
        gutter={[16, 16]}
      >
        {content}
        {/* <Col span={24}>
          <Typography.Title level={4} style={{ marginBottom: "1.5rem" }}>
            {t("teamMembers")}
          </Typography.Title>
        </Col>
        {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
          <Col key={item} span={24} sm={12} lg={8}>
            <TeamMemberCard isHead={index === 0} />
          </Col>
        ))} */}
        {/* <Col span={24} sm={12} lg={8}>
          <Button
            type="text"
            style={{
              width: "100%",
              height: "80px",
              borderRadius: token.borderRadius,
            }}
            icon={<UserAddOutlined style={{ fontSize: "xx-large" }} />}
          >
            {t("addTeammate")}
          </Button>
        </Col> */}
      </Row>
    </Flex>
  );
};
