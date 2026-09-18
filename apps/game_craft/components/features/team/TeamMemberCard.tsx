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
  name = "",
  avatar = "/images/logo/default_prof_2026.jpg",
}) => {
  const { token } = useToken();

  const memberCard = (
    <Flex
      className={isHead ? "gc-dashboard-member-card gc-dashboard-member-card--lead" : "gc-dashboard-member-card"}
      align="center"
      justify="start"
      style={{
        width: "100%",
        height: "80px",
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
          src={avatar || "/images/logo/default_prof_2026.jpg"}
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
