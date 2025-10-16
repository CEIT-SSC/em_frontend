"use client";

import { Flex, theme } from "antd";
import { GameCraftIntro } from "../../../components/features/home/GameCraftIntro";
import { AboutUs } from "../../../components/features/home/AboutUs";
import { OfflineWorkshop } from "../../../components/features/workshops/OfflineWorkshop";
import { OnlineWorkshop } from "../../../components/features/workshops/OnlineWorkshop";
import { Sponsors } from "../../../components/features/home/Sponsors";
import Wave from "../../../components/common/Wave";
import { useResponsive } from "../../../lib/hooks/useResponsive";
import { customColors } from "../../../config/colors";
import WelcomePopup from "../../../components/features/popup/WelcomePopup";
import { CompetitionsList } from "components/features/competitions/CompetitonsList";

const { useToken } = theme;

export default function HomePage() {
  const { token } = useToken();
  const screens = useResponsive();
  const homeViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";

  return (
    <>
      {/*<WelcomePopup />*/}
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
        {/*<Wave width="100%" height="auto" fill={token.colorPrimary} />*/}

         {/*Timeline and Prizes Section*/}
        {/*<GameCraftTimeline*/}
        {/*  padding={homeViewPadding}*/}
        {/*  backgroundColor={token.colorBgBase}*/}
        {/*/>*/}
        {/*<Prizes padding={homeViewPadding} backgroundColor={token.colorBgBase} />*/}

        {/* Workshop Sections - Matching React order exactly */}
        <Wave
          width="100%"
          height="auto"
          fill={customColors.colorOfflineWorkshop}
          style={{
            transform: "scaleY(-1) translateY(-2px)",
            marginTop: "-60px",
          }}
        />
        <OfflineWorkshop
          padding={homeViewPadding}
          backgroundColor={customColors.colorOfflineWorkshop}
        />
        <OnlineWorkshop
          padding={homeViewPadding}
          backgroundColor={customColors.colorAction}
        />
        <CompetitionsList
          padding={homeViewPadding}
          backgroundColor={token.colorPrimary}
        />

         {/*Sponsors Section*/}
        {/*<Sponsors*/}
        {/*  padding={homeViewPadding}*/}
        {/*  backgroundColor={customColors.colorOfflineWorkshop}*/}
        {/*/>*/}
        <Wave width="100%" height="auto" fill={token.colorPrimary} />

        {/* About Us Section */}
        <AboutUs padding={homeViewPadding} backgroundColor={"transparent"} />
      </Flex>
    </>
  );
}
