"use client";

import { Empty, Flex, Grid, theme, Typography } from "antd";
import { useTranslations } from "next-intl";
import Wave from "@/components/shared/Wave";
import { useResponsive } from "@/lib/hooks/useResponsive";

const { useToken } = theme;

export default function SponsorsPage() {
  const { token } = useToken();
  const screens = useResponsive();
  const t = useTranslations("app");
  const sponsorsViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: "100%",
        minHeight: "100%",
        backgroundColor: token.colorPrimary,
        backgroundImage: "url('/images/pattern.svg')",
      }}
    >
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          width: "100%",
          padding: sponsorsViewPadding,
        }}
      >
        <Typography.Title style={{ color: "white" }}>
          {t("mainNavigation.sponsors")}
        </Typography.Title>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            width: "100%",
            minHeight: "200px",
            backgroundColor: token.colorBgBase,
            borderRadius: token.borderRadius,
            padding: token.padding,
          }}
        >
          <Empty description="No sponsors yet" />
        </Flex>
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
