"use client";

import { Flex, theme, Typography, Spin, Alert } from "antd";
import { Flex, theme, Typography, Spin, Alert } from "antd";
import Wave from "../../common/Wave";
import { WorkshopGrid } from "./WorkshopGrid";
import { useTranslations } from "next-intl";
import { useResponsive } from "../../../lib/hooks/useResponsive";

const { useToken } = theme;
const { useToken } = theme;

interface OnlineWorkshopProps {
  padding?: string;
  backgroundColor?: string;
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
