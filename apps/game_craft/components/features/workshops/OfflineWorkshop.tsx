"use client";

import { Flex, Typography, Spin, Alert } from "antd";
import { WorkshopGrid } from "./WorkshopGrid";
import { useTranslations } from "next-intl";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { usePresentations } from "@/api";
import type { Presentation } from "@/api";

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

  // Fetch offline workshops (presentations) from API
  const { presentations, loading, error, refresh } = usePresentations({
    event: 202501, // GameCraft 2025 event ID
    is_online: false, // Only offline presentations
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
          description={t("workshop.noOfflineWorkshops")}
          type="info"
          showIcon
        />
      );
    }

    return (
      <WorkshopGrid
        presentations={presentations}
        workshopImage="/images/SuperMario.jpg" // Pass SuperMario image for offline workshops
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
        {t("workshop.offlineWorkshops")}
      </Typography.Title>

      {renderContent()}
    </Flex>
  );
}
