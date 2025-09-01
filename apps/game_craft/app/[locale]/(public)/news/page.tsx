"use client";

import { Empty, Flex, Grid, theme, Typography } from "antd";
import { useTranslations } from "next-intl";
import Wave from "@/components/shared/Wave";
import { useResponsive } from "@/lib/hooks/useResponsive";

const { useToken } = theme;

export default function NewsPage() {
  const { token } = useToken();
  const screens = useResponsive();
  const t = useTranslations("app");
  const newsViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: "100%",
        minHeight: "100%",
        // backgroundColor: token.colorPrimary,
          backgroundColor: 'red',
        backgroundImage: "url('/images/pattern.svg')",
      }}
    >
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          width: "100%",
          padding: newsViewPadding,
        }}
      >
        <Typography.Title style={{ color: "white" }}>
          {t("mainNavigation.news")}
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
          <Empty description="No news yet" />
        </Flex>
      </Flex>
       {/*Wave component commented out in React project but keeping structure */}
       {/*<Wave width="100%" height="auto" fill={token.colorPrimary} style={{ transform: 'scaleY(-1) translateY(-2px)' }} />*/}
    </Flex>
  );
}
