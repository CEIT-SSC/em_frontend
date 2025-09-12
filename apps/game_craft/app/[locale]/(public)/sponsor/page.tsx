"use client";

import { theme } from "antd";
import { useTranslations } from "next-intl";
import { useResponsive } from "../../../../lib/hooks/useResponsive";
import { sponsors } from "../../../../config/sponsors";
import SponsorCard from "../../../../components/common/SponsorCard";

const { useToken } = theme;

export default function SponsorsPage() {
  const { token } = useToken();
  const screens = useResponsive();
  const t = useTranslations("app");
  const tSponsors = useTranslations("app.sponsors");
  const sponsorsViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";
  const isMobile = !screens.lg;

  // Custom Empty component to replace Ant Design Empty
  const EmptyState = ({ description }: { description: string }) => (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-6xl mb-4 opacity-25">📋</div>
      <p style={{ color: token.colorTextSecondary }} className="text-center">
        {description}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full min-h-full">
      <div
        className="flex flex-col items-center justify-center w-full"
        style={{ padding: sponsorsViewPadding }}
      >
        <h1
          className="text-center mb-8"
          style={{
            color: "white",
            fontSize: isMobile
              ? token.fontSizeHeading2
              : token.fontSizeHeading1,
            marginBottom: isMobile ? token.marginLG : token.marginXL,
          }}
        >
          {t("mainNavigation.sponsors")}
        </h1>

        <div
          className="flex flex-col items-center justify-center w-full min-h-[200px]"
          style={{
            backgroundColor: token.colorBgBase,
            borderRadius: token.borderRadius,
            margin: isMobile ? "0 0.5rem" : "0",
          }}
        >
          {sponsors.length > 0 ? (
            <div
              className="flex flex-col w-full"
              style={{
                gap: isMobile ? 16 : 24,
                padding: isMobile ? "0.5rem 0" : "0",
              }}
            >
              {sponsors.map((sponsor, index) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState description={tSponsors("noSponsors")} />
          )}
        </div>
      </div>
    </div>
  );
}
