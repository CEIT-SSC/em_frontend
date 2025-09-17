"use client";

import { Flex, Typography, Spin, Alert } from "antd";
import { WorkshopGrid } from "./WorkshopGrid";
import { useTranslations } from "next-intl";
import { useResponsive } from "../../../lib/hooks/useResponsive";
import { useEffect, useMemo, useState } from "react";
import { PresentationsList, PresentationType } from "@ssc/core";
import { clientApi } from "lib/api/client/clientApi";
import { eventId } from "lib/utils/constants";

interface OfflineWorkshopProps {
  padding?: string;
  backgroundColor?: string;
}

export function OfflineWorkshop({
  padding = "3rem 2rem",
  backgroundColor,
}: OfflineWorkshopProps) {
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
        PresentationType.WORKSHOP
      )
      .then((response) => {
        if (response.status === 200) {
          setPresentations({
            loading: false,
            data: response.data.data,
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
          description={t("workshop.noOfflineWorkshops")}
          type="info"
          showIcon
        />
      ) : (
        <WorkshopGrid
          presentations={presentations.data.results}
          workshopImage="/images/SuperMario.jpg" // Pass SuperMario image for offline workshops
        />
      );
    }
  }, [presentations]);

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: "100%",
        padding: padding,
        backgroundColor: backgroundColor,
      }}
      gap="large"
    >
      <Typography.Title
        level={screens.md ? 1 : 2}
        style={{
          margin: "0",
          fontWeight: 900,
          textAlign: "center",
          color: "white",
        }}
      >
        {t("workshop.workshops")}
      </Typography.Title>

      {content}
    </Flex>
  );
}
