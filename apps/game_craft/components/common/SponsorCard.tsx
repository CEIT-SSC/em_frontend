"use client";

import {Typography, Button, Flex, theme, Tag} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import Image from "next/image";
import {Sponsor, sponsors} from "../../config/sponsors";
import {useResponsive} from "../../lib/hooks/useResponsive";
import {useTranslations} from "next-intl";
import {customColors} from "../../config/colors";

const {Text, Title} = Typography;
const {useToken} = theme;

interface SponsorCardProps {
    sponsor: Sponsor;
    index: number;
}

export default function SponsorCard({sponsor, index}: SponsorCardProps) {
    const {token} = useToken();
    const screens = useResponsive();
    const t = useTranslations("app.sponsors");

    const isMobile = !screens.md;

    const getTierConfig = (tier: string) => {
        switch (tier) {
            case "platinum":
                return {
                    label: t("tiers.platinum"),
                    color: "blue",
                };
            case "gold":
                return {
                    label: t("tiers.gold"),
                    color: "gold",
                };
            case "silver":
                return {
                    label: t("tiers.silver"),
                    color: "default",
                };
            default:
                return {
                    label: t("tiers.sponsor"),
                    color: "default",
                };
        }
    };

    const tierConfig = getTierConfig(sponsor.tier);

    const handleVisitWebsite = () => {
        window.open(sponsor.link, "_blank", "noopener,noreferrer");
    };

    return (
        <Flex vertical gap="large" style={{width: "100%"}}>
            {/* Sponsor Content */}
            <Flex
                vertical
                gap="large"
                style={{
                    width: "100%",
                    padding: token.paddingLG,
                }}
            >
                {/* Tier Badge */}
                <Flex justify="end">
                    <Tag
                        color={tierConfig.color}
                        style={{fontSize: token.fontSizeSM, fontWeight: 600}}
                    >
                        {tierConfig.label}
                    </Tag>
                </Flex>

                <Flex
                    vertical={isMobile}
                    gap="large"
                    align={isMobile ? "center" : "start"}
                >
                    {/* Logo Section */}
                    <Flex
                        justify="center"
                        align="center"
                        style={{
                            width: isMobile ? 100 : 120,
                            height: isMobile ? 100 : 120,
                            borderRadius: "50%",
                            backgroundColor: customColors.colorAction,
                            border: `1px solid ${token.colorBorderSecondary}`,
                            boxShadow: `0 2px 8px ${token.colorFillQuaternary}`,
                            flexShrink: 0,
                        }}
                    >
                        <Image
                            src={sponsor.logo}
                            alt={`${sponsor.id} logo`}
                            width={isMobile ? 70 : 90}
                            height={isMobile ? 70 : 90}
                            style={{
                                objectFit: "contain",
                            }}
                        />
                    </Flex>

                    {/* Content Section */}
                    <Flex
                        vertical
                        flex={1}
                        gap="middle"
                        style={{
                            textAlign: isMobile ? "center" : "start",
                        }}
                    >
                        <Title
                            level={isMobile ? 4 : 3}
                            style={{
                                margin: 0,
                                fontWeight: 700,
                            }}
                        >
                            {t(`${sponsor.id}.name`, {default: sponsor.id})}
                        </Title>

                        <Text
                            type="secondary"
                            style={{
                                fontSize: isMobile ? token.fontSizeSM : token.fontSize,
                                lineHeight: 1.6,
                            }}
                        >
                            {t(`${sponsor.id}.description`)}
                        </Text>

                        <Button
                            type="text"
                            icon={<LinkOutlined/>}
                            onClick={handleVisitWebsite}
                            size={isMobile ? "middle" : "large"}
                            style={{
                                alignSelf: isMobile ? "center" : "flex-start",
                                minWidth: 140,
                            }}
                        >
                            {t("visitWebsite")}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

            {/* Coin Divider */}
            {index < sponsors.length - 1 && (
                <Flex
                    justify="center"
                    align="center"
                    gap="middle"
                    style={{
                        paddingBlock: token.paddingLG,
                    }}
                >
                    {[1, 2, 3].map((coinIndex) => (
                        <Image
                            key={coinIndex}
                            src="/mario/giphy-coin.gif"
                            alt="Coin animation"
                            width={isMobile ? 30 : 40}
                            height={isMobile ? 30 : 40}
                            unoptimized
                        />
                    ))}
                </Flex>
            )}
        </Flex>
    );
}
