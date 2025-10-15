"use client";

import {Button, Col, ConfigProvider, Flex, Row, Typography} from "antd";
import {InstagramOutlined, XOutlined, YoutubeFilled} from "@ant-design/icons";
import {useTranslations} from "next-intl";
import Image from "next/image";
import {useResponsive} from "../../../lib/hooks/useResponsive";
import {darkTheme} from "../../../components/providers/AntDesignProvider";
import {customColors} from "../../../config/colors";
import {gameCraftSocialLinks, sscSocialLinks} from "../../../config/socialLinks";
import {TelegramIcon} from "../../../components/common/TelegramIcon";

interface GameCraftIntroProps {
    padding?: string;
    backgroundColor?: string;
}

export function GameCraftIntro({
                                   padding = "3rem 2rem",
                                   backgroundColor,
                               }: GameCraftIntroProps) {
    const t = useTranslations("app");
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
            >
                <Row
                    align="middle"
                    justify="space-around"
                    gutter={[16, 16]}
                    style={{width: "100%"}}
                >
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
                            {/* Bubble Background - using the actual SVG from React project */}
                            <Flex
                                align="center"
                                justify="center"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    zIndex: -1,
                                }}
                            >
                                <Image
                                    src="/assets/svg/bubble-purple.svg"
                                    alt="bubble-image"
                                    width={500}
                                    height={500}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        transform: "scaleX(-1)",
                                    }}
                                />
                            </Flex>

                            <Typography.Title
                                level={1}
                                style={{
                                    color: customColors.colorAction,
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
                                    href={sscSocialLinks.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                                <Button
                                    type="text"
                                    shape="circle"
                                    icon={<InstagramOutlined style={{fontSize: "2rem"}}/>}
                                    style={{padding: "2rem"}}
                                    href={sscSocialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                                <Button
                                    type="text"
                                    shape="circle"
                                    icon={<XOutlined style={{fontSize: "2rem"}}/>}
                                    style={{padding: "2rem"}}
                                    href={sscSocialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                            </Flex>
                        </Flex>
                </Row>
            </Flex>
        </ConfigProvider>
    );
}
