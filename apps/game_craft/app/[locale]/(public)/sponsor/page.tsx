"use client";

import { Empty, Flex, theme, Typography } from "antd";
import { useTranslations } from "next-intl";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { sponsors } from "@/config/sponsors";
import SponsorCard from "@/components/common/SponsorCard";

const { useToken } = theme;

export default function SponsorsPage() {
  const { token } = useToken();
  const screens = useResponsive();
  const t = useTranslations("app");
  const tSponsors = useTranslations("app.sponsors");

  // Responsive padding configuration
  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;

  const getResponsivePadding = () => {
    if (isMobile) return "2rem 1rem";
    if (isTablet) return "2.5rem 2rem";
    return "3rem 5rem";
  };

  const getContainerPadding = () => {
    if (isMobile) return token.padding;
    if (isTablet) return token.paddingLG;
    return token.padding;
  };

  const getMaxWidth = () => {
    if (isMobile) return "100%";
    if (isTablet) return "800px";
    return "1200px";
  };

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        flex: 1,
        width: "100%",
        minHeight: "100%",
      }}
    >
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          width: "100%",
          padding: getResponsivePadding(),
        }}
      >
        <Typography.Title
          level={isMobile ? 2 : 1}
          style={{
            color: "white",
            fontSize: isMobile ? token.fontSizeHeading2 : token.fontSizeHeading1,
            textAlign: "center",
            marginBottom: isMobile ? token.marginLG : token.marginXL,
          }}
        >
          {t("mainNavigation.sponsors")}
        </Typography.Title>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            width: "100%",
            maxWidth: getMaxWidth(),
            minHeight: isMobile ? "150px" : "200px",
            backgroundColor: token.colorBgBase,
            borderRadius: token.borderRadius,
            padding: getContainerPadding(),
            margin: isMobile ? "0 0.5rem" : "0",
          }}
        >
          {sponsors.length > 0 ? (
            <Flex
              vertical
              gap={isMobile ? 16 : 24}
              style={{
                width: "100%",
                padding: isMobile ? "0.5rem 0" : "0",
              }}
            >
              {sponsors.map((sponsor, index) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
              ))}
            </Flex>
          ) : (
            <Empty
              description={tSponsors('noSponsors')}
              style={{
                color: token.colorTextSecondary,
              }}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
