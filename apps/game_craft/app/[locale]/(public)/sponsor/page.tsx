"use client";

import { Empty, Flex, theme, Typography } from "antd";
import { useTranslations } from "next-intl";
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
        flex: 1,
        width: "100%",
        minHeight: "100%",
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
    </Flex>
  );
}
