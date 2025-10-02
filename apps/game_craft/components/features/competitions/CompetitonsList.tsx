"use client";

import { Flex, theme, Typography, Spin, Alert } from "antd";
import Wave from "../../common/Wave";
import { CompetitionsGrid } from "./CompetitionsGrid";
import { useTranslations } from "next-intl";
import { useResponsive } from "../../../lib/hooks/useResponsive";
import { useEffect, useMemo, useState } from "react";
import { clientApi } from "lib/api/client/clientApi";
import { eventId } from "lib/utils/constants";
import { GroupCompetitionsList } from "@ssc/core/lib/types/api/competitions/competitions";

const { useToken } = theme;

interface Props {
  padding?: string;
  backgroundColor?: string;
  dashboardMode?: boolean;
}

export function CompetitionsList({
  padding = "3rem 2rem",
  backgroundColor,
  dashboardMode = false,
}: Props) {
  const { token } = useToken();
  const screens = useResponsive();
  const t = useTranslations();
  const [competitions, setCompetitions] = useState<{
    loading: boolean;
    error?: string;
    data?: GroupCompetitionsList;
  }>({ loading: true });

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
        setCompetitions({ loading: false, error: "failed to fetch" });
      });
  }, []);

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
        <CompetitionsGrid
          competitions={competitions.data.results}
          competitionImage="/images/Luigi.jpg"
          dashboardMode={dashboardMode}
        />
      );
    }
  }, [competitions, t]);

  if (dashboardMode) return content;

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: "100%",
        backgroundColor: backgroundColor,
      }}
    >
      {/* <Wave width="100%" height="auto" fill="#4F7B79" /> */}
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          width: "100%",
          padding: padding,
        }}
        gap="large"
      >
        <Typography.Title
          level={screens.md ? 1 : 2}
          style={{
            margin: 0,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
          }}
        >
          {t("workshop.competitions")}
        </Typography.Title>

        {content}
      </Flex>
    </Flex>
  );
}
