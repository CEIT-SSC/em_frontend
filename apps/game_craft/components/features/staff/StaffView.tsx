"use client";

import {Flex, theme} from "antd";
import {StaffContainer} from "./StaffContainer";
import {useResponsive} from "@/lib/hooks/useResponsive";

export function StaffView() {
    const screens = useResponsive();
    const staffViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";

    return (
        <Flex
            align="center"
            justify="center"
            style={{
                flex: 1,
                width: "100%",
                padding: staffViewPadding,
            }}
        >
            <StaffContainer/>
        </Flex>
    );
}
