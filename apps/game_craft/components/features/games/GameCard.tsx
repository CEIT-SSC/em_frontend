"use client";

import React from "react";
import { Button, Flex, theme, Typography } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";

const { useToken } = theme;

interface GameCardProps {
  gameName?: string;
  gameDescription?: string;
  gameImage?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  gameName = "Game Name",
  gameDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores dicta obcaecati quae! Ab aspernatur blanditiis dignissimos eum fugiat itaque maxime modi nisi non omnis ratione repellat sed suscipit, totam vero.",
  gameImage = "/images/logo/gameTestImage.jpg"
}) => {
  const { token } = useToken();
  const t = useTranslations("app.dashboard.games");

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: "100%",
        height: "450px",
        padding: token.paddingXS,
        borderRadius: token.borderRadius,
        backgroundColor: token.colorBgContainer,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <Flex
        vertical
        flex={1}
        align="center"
        justify="center"
        style={{
          width: "100%",
        }}
        gap="small"
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: token.borderRadius,
            overflow: "hidden",
          }}
        >
          <Image
            src={gameImage}
            width={100}
            height={100}
            style={{
              borderRadius: token.borderRadius,
              objectFit: "cover",
            }}
            alt="Game Image"
          />
        </div>

        <Typography.Title level={4} style={{ fontWeight: 900, margin: 0 }}>
          {gameName}
        </Typography.Title>
      </Flex>

      <Flex
        vertical
        flex={2}
        align="center"
        justify="space-between"
        style={{
          width: "100%",
          borderRadius: token.borderRadius,
          padding: token.paddingSM,
        }}
      >
        <Typography.Paragraph>{gameDescription}</Typography.Paragraph>

        <Flex
          align="center"
          justify="center"
          style={{
            width: "100%",
          }}
          gap="small"
        >
          <Button
            type="dashed"
            shape="circle"
            size="large"
            icon={<HeartOutlined />}
          />
          <Button type="dashed" size="large" block>
            {t("download")}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
