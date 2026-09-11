"use client";

import {Button, Col, ConfigProvider, Flex, Row, Typography} from "antd";
import {InstagramOutlined, XOutlined, YoutubeFilled} from "@ant-design/icons";
import {useTranslations} from "next-intl";
import {useResponsive} from "../../../lib/hooks/useResponsive";
import {darkTheme} from "../../../components/providers/AntDesignProvider";
import {gameCraftSocialLinks} from "../../../config/socialLinks";
import {TelegramIcon} from "../../../components/common/TelegramIcon";
import { HomeParallaxArtwork } from "./HomeParallaxArtwork";

interface GameCraftIntroProps {
    padding?: string;
    backgroundColor?: string;
}

export function GameCraftIntro({
                                   padding = "3rem 2rem",
                                   backgroundColor,
                               }: GameCraftIntroProps) {
    const t = useTranslations("app");
    const tWorkshop = useTranslations("workshop");
    const screens = useResponsive();

    return (
        <ConfigProvider theme={darkTheme}>
            <Flex
                vertical
                align="center"
                justify="center"
                style={{
                    width: "100%",
                    padding: padding,
                    backgroundColor: backgroundColor,
                }}
                className="gc-home-intro"
            >
                <Row
                    align="middle"
                    justify="space-around"
                    gutter={[16, 16]}
                    style={{width: "100%"}}
                >
                    <Col span={24} lg={12}>
                        <Flex
                            vertical
                            align="start"
                            justify="start"
                            style={{
                                width: "100%",
                                position: "relative",
                                zIndex: 10,
                            }}
                            gap="small"
                        >
                            <Typography.Title
                                level={1}
                                style={{
                                    fontWeight: 1000,
                                    fontSize: screens.lg ? "5rem" : screens.md ? "4rem" : "3rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                {t("intro.title")}
                            </Typography.Title>

                            <Typography.Title
                                level={3}
                                style={{
                                    fontWeight: 900,
                                    margin: 0,
                                    color: "white",
                                }}
                            >
                                {t("intro.subtitle")}
                            </Typography.Title>

                            <Typography.Paragraph
                                style={{color: "white", fontSize: "1rem"}}
                            >
                                {t("intro.description")}
                            </Typography.Paragraph>

                            <Flex gap="middle" wrap>
                                <Button type="primary" size="large" href="#workshops">
                                    {tWorkshop("workshops")}
                                </Button>
                                <Button size="large" href="#game-jam">
                                    {tWorkshop("competitions")}
                                </Button>
                            </Flex>

                            <Flex
                                align="center"
                                justify="start"
                                style={{width: "100%"}}
                                gap="small"
                                wrap
                            >
                                <Button
                                    type="text"
                                    shape="circle"
                                    icon={<TelegramIcon color={"currentColor"} size={"3rem"}/>}
                                    style={{padding: "2rem"}}
                                    href={gameCraftSocialLinks.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                                <Button
                                    type="text"
                                    shape="circle"
                                    icon={<InstagramOutlined style={{fontSize: "2rem"}}/>}
                                    style={{padding: "2rem"}}
                                    href={gameCraftSocialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                                <Button
                                    type="text"
                                    shape="circle"
                                    icon={<XOutlined style={{fontSize: "2rem"}}/>}
                                    style={{padding: "2rem"}}
                                    href={gameCraftSocialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                            </Flex>
                        </Flex>
                    </Col>

                    <Col span={24} lg={12}>
                        <Flex align="center" justify="center" style={{width: "100%"}}>
                            <HomeParallaxArtwork />
                        </Flex>
                    </Col>
                </Row>
            </Flex>
        </ConfigProvider>
    );
}
