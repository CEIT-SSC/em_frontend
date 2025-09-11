"use client";

import { Divider, Flex, Grid, theme, Typography } from "antd";
import { GameCard } from "../../../../components/features/games/GameCard";
import { UploadGameForm } from "../../../../components/features/games/UploadGameForm";
import { useTranslations } from "next-intl";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function GamesPage() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const t = useTranslations("app.dashboard.games");

  return (
    <Flex
      vertical={!screens.lg}
      flex={1}
      style={{
        width: "100%",
        padding: token.padding,
        paddingTop: 0,
      }}
      gap="small"
    >
      <Flex align="start" justify="center" flex={2}>
        <UploadGameForm />
      </Flex>

      {screens.lg ? (
        <Divider
          variant={"dashed"}
          type={"vertical"}
          style={{ height: "100%", borderColor: token.colorBorder }}
        />
      ) : (
        <Divider
          variant="dashed"
          type={"horizontal"}
          style={{ height: "100%", borderColor: token.colorBorder }}
        >
          <Typography.Text type="secondary">{t("preview")}</Typography.Text>
        </Divider>
      )}

      <Flex
        flex={1}
        align="start"
        justify="center"
        style={{
          height: "100%",
        }}
      >
        <GameCard />
      </Flex>
    </Flex>
  );
}
