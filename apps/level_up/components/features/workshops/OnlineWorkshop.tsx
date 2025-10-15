"use client";

import { Flex, theme, Typography, Spin, Alert } from "antd";
import Wave from "../../common/Wave";
import { WorkshopGrid } from "./WorkshopGrid";
import { useTranslations } from "next-intl";
import { useResponsive } from "../../../lib/hooks/useResponsive";
import { useEffect, useMemo, useState } from "react";
import { PresentationsList, PresentationType } from "@ssc/core";
import { clientApi } from "lib/api/client/clientApi";
import { eventId } from "lib/utils/constants";

const { useToken } = theme;

interface OnlineWorkshopProps {
  padding?: string;
  backgroundColor?: string;
}

export function OnlineWorkshop({
  padding = "3rem 2rem",
  backgroundColor,
}: OnlineWorkshopProps) {
  const { token } = useToken();
  const screens = useResponsive();
  const t = useTranslations();
  const [presentations, setPresentations] = useState<{
    loading: boolean;
    error?: string;
    data?: PresentationsList;
  }>({ loading: true });

  useEffect(() => {
    clientApi.presentations
      .getPresentationsList(
        eventId,
        undefined,
        undefined,
        PresentationType.TALK
      )
      .then((response) => {
        if (response.status === 200) {
          const filteredData = response.data.data;
          filteredData.results = filteredData.results.filter(
            (presentation) => presentation.is_active
          );

          setPresentations({
            loading: false,
            data: filteredData,
          });
        } else {
          setPresentations({ loading: false, error: "failed to fetch" });
        }
      })
      .catch((err) => {
        setPresentations({ loading: false, error: "failed to fetch" });
      });
  }, []);

  const content = useMemo(() => {
    if (presentations.loading) {
      return (
        <Flex justify="center" align="center" style={{ minHeight: "200px" }}>
          <Spin size="large" />
        </Flex>
      );
    } else if (presentations.error) {
      return (
        <Alert
          message={t("workshop.error")}
          description={presentations.error}
          type="error"
          showIcon
        />
      );
    } else {
      return presentations.data.results.length === 0 ? (
        <Alert
          message={t("workshop.noWorkshops")}
          description={t("workshop.noOnlineWorkshops")}
          type="info"
          showIcon
        />
      ) : (
        <WorkshopGrid
          presentations={presentations.data.results}
          workshopImage="/images/course.png" // Pass SuperMario image for online workshops
        />
      );
    }
  }, [presentations, t]);

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
      <Wave width="100%" height="auto" fill="#4F7B79" />
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
          {t("workshop.presentations")}
        </Typography.Title>

        {content}
      </Flex>
      <Wave
        width="100%"
        height="auto"
        fill={token.colorPrimary}
        style={{ transform: "scaleY(-1) translateY(-2px)" }}
      />
    </Flex>
  );
}
