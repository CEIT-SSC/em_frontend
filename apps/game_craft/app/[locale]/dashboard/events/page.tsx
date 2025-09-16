"use client";

import {Flex, theme, Typography} from "antd";

const { useToken } = theme;

export default function EventsPage() {

    const { token } = useToken();

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{
                width: '100%',
                padding: token.padding
            }}
            gap="large"
        >
            <Flex
                vertical
                align="start"
                justify="center"
                style={{
                    width: '100%',
                }}
                gap="medium"
            >
                <Typography.Title level={4} style={{ fontWeight: 800, marginBottom: 0 }}>
                    کارگاه ها
                </Typography.Title>
            </Flex>

            <Flex
                vertical
                align="start"
                justify="center"
                style={{
                    width: '100%',
                }}
                gap="medium"
            >
                <Typography.Title level={4} style={{ fontWeight: 800, marginBottom: 0 }}>
                    ارائه ها
                </Typography.Title>
            </Flex>
        </Flex>

    );
}
