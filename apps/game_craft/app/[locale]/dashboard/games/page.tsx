"use client";

import { Divider, Flex, Grid, theme, Typography } from "antd";
import { UploadGameForm } from "@/components/shared/UploadGameForm";
import { GameCard } from "@/components/shared/GameCard";
import { useResponsive } from "@/lib/hooks/useResponsive";

const { useToken } = theme;

export default function GamesPage() {
  const { token } = useToken();
  const screens = useResponsive();

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

      <Divider
        variant="dashed"
        type={screens.lg ? "vertical" : "horizontal"}
        style={{ height: "100%" }}
      >
        <Typography.Text type="secondary">Preview</Typography.Text>
      </Divider>

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
