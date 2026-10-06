"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Alert, Col, Flex, Row, Spin, theme, Typography } from "antd";
import { useTranslations } from "next-intl";
import { TeamMemberCard } from "./TeamMemberCard";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import { fetchTeamsThunk } from "lib/store/teams/teams.thunk";
import { TeamDetails } from "@ssc/core";
import { clientApi } from "lib/api/client/clientApi";
import { eventId } from "lib/utils/constants";
import { GroupCompetitionsList } from "@ssc/core";

const { useToken } = theme;

export const TeamMemberContainer: React.FC = () => {
  const { token } = useToken();
  const t = useTranslations("app.dashboard.teamStatus");

  const dispatch = useAppDispatch();
  const {
    data: teams,
    loading: teamsLoading,
    error: teamsError,
  } = useAppSelector((s) => s.teams);
  const [competitions, setCompetitions] = useState<{
    loading: boolean;
    error?: string;
    data?: GroupCompetitionsList;
  }>({ loading: true });

  useEffect(() => {
    dispatch(fetchTeamsThunk());
  }, [dispatch]);

  const registeredTeams = useMemo(
    () => teams.flatMap((team) =>
      team.registrations
        .filter((registration) =>
          registration.status === "active" &&
          competitions.data?.results.some(
            (competition) => competition.id === registration.competition_details.id
          )
        )
        .map((registration) => ({ team, registration }))
    ),
    [competitions.data, teams]
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
      .catch(() => {
        setCompetitions({ loading: false, error: t("workshop.error") });
      });
  }, [t]);

  const mapTeamMembers = (team: TeamDetails, memberIds: number[]) =>
    team.memberships
      .filter((member) => memberIds.includes(member.user_details.id))
      .sort(
        (a, b) =>
          Number(b.user_details.id === team.leader_details.id) -
          Number(a.user_details.id === team.leader_details.id)
      )
      .map((member) => (
        <Col key={member.id} span={24} sm={12} lg={8}>
          <TeamMemberCard
            isHead={member.user_details.id === team.leader_details.id}
            name={
              member.user_details.first_name +
              " " +
              member.user_details.last_name
            }
            avatar={member.user_details.profile_picture}
          />
        </Col>
      ));

  const mapTeams = () =>
    registeredTeams.map(({ team, registration }) => (
      <React.Fragment key={registration.id}>
        <Col className="gc-dashboard-team-name" span={24}>
          <Typography.Title level={4} style={{ marginBottom: "1.5rem" }}>
            {registration.competition_details.title}:
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
        {mapTeamMembers(team, registration.member_ids)}
      </React.Fragment>
    ));

  const content = useMemo(() => {
    if (competitions.loading || teamsLoading) {
      return (
        <Flex justify="center" align="center" style={{ minHeight: "200px" }}>
          <Spin size="large" />
        </Flex>
      );
    } else if (competitions.error || teamsError) {
      return (
        <Alert
          message={t("workshop.error")}
          description={competitions.error ?? teamsError}
          type="error"
          showIcon
        />
      );
    } else {
      return registeredTeams.length === 0 ? (
        <Alert
          message={t("noTeams")}
          description={t("noTeamsDescription")}
          type="info"
          showIcon
        />
      ) : (
        mapTeams()
      );
    }
  }, [competitions, registeredTeams, t, teamsLoading, teamsError]);

  return (
    <Flex
      className="gc-dashboard-team-members"
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
        justify="start"
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
