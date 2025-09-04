"use client";

import { Flex, theme, Typography, Spin, Alert } from "antd";
import Wave from "../../common/Wave";
import { WorkshopGrid } from "./WorkshopGrid";
import { useTranslations } from "next-intl";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { usePresentations } from "@/api";
import type { Presentation } from "@/api";

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

  // Fetch online workshops (presentations) from API
  const { presentations, loading, error, refresh } = usePresentations({
    event: 202501, // GameCraft 2025 event ID
    is_online: true, // Only online presentations
    type: "workshop", // Only workshop type presentations
  });

  const renderContent = () => {
    if (loading) {
      return (
        <Flex justify="center" align="center" style={{ minHeight: "200px" }}>
          <Spin size="large" />
        </Flex>
      );
    }

    if (error) {
      return (
        <Alert
          message={t("workshop.error")}
          description={error}
          type="error"
          showIcon
          action={<button onClick={refresh}>{t("common.retry")}</button>}
        />
      );
    }

    if (presentations.length === 0) {
      return (
        <Alert
          message={t("workshop.noWorkshops")}
          description={t("workshop.noOnlineWorkshops")}
          type="info"
          showIcon
        />
      );
    }

    return (
      <WorkshopGrid
        presentations={presentations}
        workshopImage="/images/Luigi.jpg" // Pass Luigi image for online workshops
      />
    );
  };

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
          {t("workshop.onlineWorkshops")}
        </Typography.Title>

        {renderContent()}
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
