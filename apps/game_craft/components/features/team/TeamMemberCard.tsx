"use client";

import React from "react";
import { Flex, theme, Typography } from "antd";
import Image from "next/image";
import CrownBadge from "../../common/CrownBadge";

const { useToken } = theme;

interface TeamMemberCardProps {
  isHead?: boolean;
  name?: string;
  avatar?: string;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  isHead = false,
  name = "Mahdi Haeri",
  avatar = "/svg/avatar-1.svg"
}) => {
  const { token } = useToken();

  const memberCard = (
    <Flex
      align="center"
      justify="start"
      style={{
        width: "100%",
        height: "80px",
        backgroundColor: isHead ? "rgba(255,215,0, 0.5)" : token.colorBgContainer,
        boxShadow: token.boxShadowCard,
        borderRadius: token.borderRadius,
        padding: token.padding,
        position: "relative",
      }}
      gap="small"
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image
          src={avatar}
          alt="user-image"
          width={60}
          height={60}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div>
      <Typography.Text>{name}</Typography.Text>
    </Flex>
  );

  return isHead ? <CrownBadge>{memberCard}</CrownBadge> : memberCard;
};
