"use client";

import { Flex, Grid, theme } from "antd";
import { StaffContainer } from "./StaffContainer";
import { useResponsive } from "@/lib/hooks/useResponsive";

const { useToken } = theme;

export function StaffView() {
  const { token } = useToken();
  const screens = useResponsive();
  const staffViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: "100%",
        backgroundColor: token.colorPrimary,
        backgroundImage: `url(/images/pattern.svg)`,
        padding: staffViewPadding,
      }}
    >
      <StaffContainer />
    </Flex>
  );
}
