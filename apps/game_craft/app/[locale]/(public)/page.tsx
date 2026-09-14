"use client";

import { Flex } from "antd";
import Image from "next/image";
import { GameCraftTimeline } from "../../../components/features/Timeline";
import { GameCraftIntro } from "../../../components/features/home/GameCraftIntro";
import { Prizes } from "../../../components/features/home/Prizes";
import { AboutUs } from "../../../components/features/home/AboutUs";
import { OfflineWorkshop } from "../../../components/features/workshops/OfflineWorkshop";
import { OnlineWorkshop } from "../../../components/features/workshops/OnlineWorkshop";
import { Packs } from "../../../components/features/packs/Packs";
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
      <Flex
        className="gc-home"
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
        <figure className="w-full relative m-0 overflow-hidden flex justify-center">
          <div
            className="w-full h-full top-0 pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgb(14,22,40)_0%,transparent_10%,transparent_90%,rgb(14,22,40)_100%)]"
            aria-hidden="true"
          />
          <Image
            src="/assets/images/hollwo-knight/knight-and-hornet-playing-game.png"
            alt="Knight and Hornet playing a game together"
            width={512}
            height={225}
            sizes="(max-width: 768px) calc(100vw - 2rem), min(1200px, 100vw)"
            className="h-auto w-auto object-contain"
            priority
          />
        </figure>
        <GameCraftTimeline
          padding={homeViewPadding}
          backgroundColor="#0e1628"
        />
        <Prizes padding={homeViewPadding} backgroundColor="#111c31" />

        {/* <HomeArtworkSlot assetId="GC-ART-03" variant="gateway" /> */}
        <div id="game-jam" style={{ width: "100%" }}>
          <CompetitionsList
            padding={homeViewPadding}
            backgroundColor="#101a30"
          />
        </div>
        <div id="workshops" />
        <OfflineWorkshop padding={homeViewPadding} backgroundColor="#172640" />
        <OnlineWorkshop padding={homeViewPadding} backgroundColor="#0d1527" />
        <Packs padding={homeViewPadding} backgroundColor="#111c31" />

        {/* Sponsors Section */}
        <Sponsors padding={homeViewPadding} backgroundColor="#101a30" />
        <HomeVaultSeparator flip />

        {/* About Us Section */}
        <AboutUs padding={homeViewPadding} backgroundColor="#070a12" />
      </Flex>
    </>
  );
}
