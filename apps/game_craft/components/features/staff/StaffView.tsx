"use client";

import { Flex } from "antd";
import { StaffContainer } from "./StaffContainer";
import {useResponsive} from "../../../lib/hooks/useResponsive";

export function StaffView() {
  const screens = useResponsive();
  const staffViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";

  return (
    <Flex className="gc-page gc-public-page gc-public-staff"
      align="center"
      justify="center"
      style={{
        flex: 1,
        width: "100%",
        padding: 0,
      }}
    >
      <StaffContainer />
    </Flex>
  );
}
