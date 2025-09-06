"use client";

import { Typography, Button, Flex, theme, Space } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Sponsor } from "@/config/sponsors";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { useTranslations } from "next-intl";

const { Text, Title } = Typography;
const { useToken } = theme;

interface SponsorCardProps {
  sponsor: Sponsor;
  index: number;
}

export default function SponsorCard({ sponsor, index }: SponsorCardProps) {
  const { token } = useToken();
  const screens = useResponsive();
  const t = useTranslations("app.sponsors");

  // Responsive configuration
  const isMobile = !screens.md;
  const logoSize = isMobile ? 80 : 120;
  const cardPadding = isMobile ? token.padding : token.paddingLG;
  const gapSize = isMobile ? token.size : token.sizeXL;
  const titleLevel = isMobile ? 4 : 3;

  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return {
          label: t('tiers.platinum'),
          color: token.colorPrimary,
          bgColor: token.colorPrimary,
        };
      case 'gold':
        return {
          label: t('tiers.gold'),
          color: token.colorWarning,
          bgColor: token.colorWarning,
        };
      case 'silver':
        return {
          label: t('tiers.silver'),
          color: token.colorTextSecondary,
          bgColor: token.colorTextSecondary,
        };
      default:
        return {
          label: t('tiers.sponsor'),
          color: token.colorTextSecondary,
          bgColor: token.colorTextSecondary,
        };
    }
  };

  const tierConfig = getTierConfig(sponsor.tier);

  const handleVisitWebsite = () => {
    window.open(sponsor.link, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        width: "100%",
        padding: `${cardPadding}px 0`,
        transition: 'all 0.3s ease',
      }}
    >
      <Flex
        vertical={isMobile}
        style={{
          alignItems: isMobile ? 'center' : 'center',
          gap: gapSize,
          padding: `${cardPadding}px 0`,
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        {/* Logo Section */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          {/* Tier Badge */}
          <div
            style={{
              position: 'absolute',
              top: isMobile ? -6 : -8,
              left: isMobile ? -6 : -8,
              padding: `${token.paddingXS}px ${isMobile ? token.paddingXS : token.paddingSM}px`,
              backgroundColor: tierConfig.bgColor,
              color: token.colorTextLightSolid,
              borderRadius: token.borderRadiusSM,
              fontSize: isMobile ? token.fontSizeXS : token.fontSizeSM,
              fontWeight: token.fontWeightStrong,
              boxShadow: token.boxShadowSecondary,
              transform: 'rotate(-12deg)',
              zIndex: 10,
              lineHeight: 1,
            }}
          >
            {tierConfig.label}
          </div>

          {/* Logo Container */}
          <div
            style={{
              width: `${logoSize}px`,
              height: `${logoSize}px`,
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: token.colorBgElevated,
              boxShadow: token.boxShadowSecondary,
            }}
          >
            <Image
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              fill
              style={{
                objectFit: 'contain',
                padding: isMobile ? token.paddingXS : token.paddingSM,
              }}
              sizes={`${logoSize}px`}
            />
          </div>
        </div>

        {/* Content Section */}
        <Flex
          vertical
          style={{
            flex: 1,
            textAlign: isMobile ? 'center' : 'left',
            alignItems: isMobile ? 'center' : 'flex-start',
            width: '100%'
          }}
        >
          <Space direction="vertical" size={isMobile ? "small" : "middle"} style={{ width: '100%' }}>
            <Title
              level={titleLevel}
              style={{
                margin: 0,
                color: token.colorText,
                fontSize: isMobile ? token.fontSizeHeading4 : token.fontSizeHeading3,
                fontWeight: token.fontWeightStrong,
              }}
            >
              {sponsor.name}
            </Title>

            <Text
              style={{
                color: token.colorTextSecondary,
                fontSize: isMobile ? token.fontSizeSM : token.fontSize,
                lineHeight: token.lineHeight,
                display: 'block',
                maxWidth: isMobile ? '100%' : '80%',
              }}
            >
              {sponsor.description}
            </Text>

            <Button
              type="primary"
              icon={<LinkOutlined />}
              onClick={handleVisitWebsite}
              size={isMobile ? "middle" : "large"}
              style={{
                backgroundColor: tierConfig.color,
                borderColor: tierConfig.color,
                borderRadius: token.borderRadius,
                fontWeight: token.fontWeightStrong,
                fontSize: isMobile ? token.fontSizeSM : token.fontSize,
                minWidth: isMobile ? '140px' : 'auto',
              }}
            >
              {t('visitWebsite')}
            </Button>
          </Space>
        </Flex>
      </Flex>

      {/* Coin gif divider at the bottom except for the last item */}
      {index < 4 && (
        <Flex
          justify="center"
          align="center"
          gap={isMobile ? "middle" : "large"}
          style={{
            margin: `${token.marginLG}px 0 0 0`,
            padding: `${cardPadding}px 0`,
          }}
        >
          <Image
            src="/mario/giphy-coin.gif"
            alt="Coin animation"
            width={isMobile ? 30 : 40}
            height={isMobile ? 30 : 40}
            unoptimized
          />
          <Image
            src="/mario/giphy-coin.gif"
            alt="Coin animation"
            width={isMobile ? 30 : 40}
            height={isMobile ? 30 : 40}
            unoptimized
          />
          <Image
            src="/mario/giphy-coin.gif"
            alt="Coin animation"
            width={isMobile ? 30 : 40}
            height={isMobile ? 30 : 40}
            unoptimized
          />
        </Flex>
      )}
    </div>
  );
}
