"use client";

import { Empty, Flex, theme, Typography } from "antd";
import { useTranslations } from "next-intl";
import {useResponsive} from "../../../../lib/hooks/useResponsive";

const { useToken } = theme;

export default function HistoryPage() {
  const { token } = useToken();
  const screens = useResponsive();
  const t = useTranslations("app");
  const historyViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";

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
      <Flex className="gc-page gc-public-page gc-public-empty"
        vertical
        align="center"
        justify="center"
        style={{
          width: "100%",
          padding: 0,
        }}
      >
        <Typography.Title className="gc-public-title">
          {t("mainNavigation.history")}
        </Typography.Title>
        <Flex
          vertical
          align="center"
          justify="center"
          className="gc-empty-route"
          style={{
            width: "100%",
            minHeight: "200px",
            backgroundColor: token.colorBgBase,
            borderRadius: token.borderRadius,
            padding: token.padding,
          }}
        >
          <Empty description="No history yet" />
        </Flex>
      </Flex>
    </Flex>
  );
}
