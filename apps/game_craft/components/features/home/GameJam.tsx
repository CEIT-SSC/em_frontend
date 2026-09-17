"use client";

import { Flex, Typography } from "antd";
import { useTranslations } from "next-intl";

interface GameJamProps {
  padding?: string;
  backgroundColor?: string;
}

export function GameJam({
  padding = "3rem 2rem",
  backgroundColor,
}: GameJamProps) {
  const t = useTranslations("app");

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
      className="gc-home-GameJam"
    >
      <Typography.Title
        level={2}
        style={{
          fontWeight: 900,
          position: "relative",
          zIndex: 1,
        }}
      >
        {t("GameJam.title")}
      </Typography.Title>
      <Typography.Paragraph
        style={{
          fontSize: "1.2rem",
          opacity: 0.8,
          fontWeight: 900,
          position: "relative",
          zIndex: 1,
        }}
      >
        {t("GameJam.description")}
      </Typography.Paragraph>
    </Flex>
  );
}
