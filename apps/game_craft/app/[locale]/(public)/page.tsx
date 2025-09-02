"use client";

import { Flex, theme } from "antd";
import { GameCraftTimeline } from "@/components/features/Timeline";
import { GameCraftIntro } from "@/components/features/home/GameCraftIntro";
import { Prizes } from "@/components/features/home/Prizes";
import { AboutUs } from "@/components/features/home/AboutUs";
import { OfflineWorkshop } from "@/components/features/workshops/OfflineWorkshop";
import { OnlineWorkshop } from "@/components/features/workshops/OnlineWorkshop";
import { Sponsors } from "@/components/features/home/Sponsors";
import Wave from "@/components/common/Wave";
import { useResponsive } from "@/lib/hooks/useResponsive";

const { useToken } = theme;

export default function HomePage() {
  const { token } = useToken();
  const screens = useResponsive();
  const homeViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";

  return (
    <Flex
      align="center"
      justify="center"
      vertical
      style={{
        width: "100%",
      }}
    >
      {/* GameCraft Introduction Section */}
      <GameCraftIntro
        padding={homeViewPadding}
        backgroundColor={token.colorPrimary}
      />
      <Wave width="100%" height="auto" fill={token.colorPrimary} />

      {/* Timeline and Prizes Section */}
      <GameCraftTimeline
        padding={homeViewPadding}
        backgroundColor={token.colorBgBase}
      />
      <Prizes padding={homeViewPadding} backgroundColor={token.colorBgBase} />

      {/* Workshop Sections - Matching React order exactly */}
      <Wave
        width="100%"
        height="auto"
        fill="#4F7B79"
        style={{ transform: "scaleY(-1) translateY(-2px)" }}
      />
      <OfflineWorkshop padding={homeViewPadding} backgroundColor="#4F7B79" />
      <OnlineWorkshop
        padding={homeViewPadding}
        backgroundColor={token.colorAction}
      />

      {/* Sponsors Section */}
      <Sponsors
        padding={homeViewPadding}
        backgroundColor={token.colorPrimary}
      />
      <Wave width="100%" height="auto" fill={token.colorPrimary} />

      {/* About Us Section */}
      <AboutUs padding={homeViewPadding} backgroundColor={"transparent"} />
    </Flex>
  );
}
