"use client";

import { Flex } from "antd";
import { GameCraftTimeline } from "../../../components/features/Timeline";
import { GameCraftIntro } from "../../../components/features/home/GameCraftIntro";
import { Prizes } from "../../../components/features/home/Prizes";
import { AboutUs } from "../../../components/features/home/AboutUs";
import { OfflineWorkshop } from "../../../components/features/workshops/OfflineWorkshop";
import { OnlineWorkshop } from "../../../components/features/workshops/OnlineWorkshop";
import { Sponsors } from "../../../components/features/home/Sponsors";
import { useResponsive } from "../../../lib/hooks/useResponsive";
import { CompetitionsList } from "components/features/competitions/CompetitonsList";
import {
  HomeArtworkSlot,
  HomeVaultSeparator,
} from "components/features/home/HomeArtworkSlot";

export default function HomePage() {
  const screens = useResponsive();
  const homeViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";

  return (
    <>
      <Flex className="gc-home"
        align="center"
        justify="center"
        vertical
        style={{
          width: "100%",
        }}
      >
        {/* GameCraft Introduction Section */}
        <GameCraftIntro padding={homeViewPadding} backgroundColor="#070a12" />
        <HomeVaultSeparator />

        {/* Timeline and Prizes Section */}
        <HomeArtworkSlot assetId="GC-ART-02" variant="map" />
        <GameCraftTimeline
          padding={homeViewPadding}
          backgroundColor="#0e1628"
        />
        <Prizes padding={homeViewPadding} backgroundColor="#111c31" />

        <HomeArtworkSlot assetId="GC-ART-03" variant="gateway" />
        <div id="game-jam" style={{ width: "100%" }}>
        <CompetitionsList
          padding={homeViewPadding}
          backgroundColor="#101a30"
        />
        </div>
        <HomeArtworkSlot assetId="GC-ART-04" variant="study" />
        <div id="workshops" />
        <OfflineWorkshop
          padding={homeViewPadding}
          backgroundColor="#172640"
        />
        <OnlineWorkshop
          padding={homeViewPadding}
          backgroundColor="#0d1527"
        />

        {/* Sponsors Section */}
        <Sponsors
          padding={homeViewPadding}
          backgroundColor="#101a30"
        />
        <HomeVaultSeparator flip />

        {/* About Us Section */}
        <AboutUs padding={homeViewPadding} backgroundColor="#070a12" />
      </Flex>
    </>
  );
}
