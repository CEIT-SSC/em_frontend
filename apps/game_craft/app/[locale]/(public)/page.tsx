'use client'

import { Flex, Grid, theme } from 'antd';
import { GameCraftTimeline } from '@/components/shared/Timeline';
import { GameCraftIntro } from '@/components/shared/GameCraftIntro';
import { Prizes } from '@/components/shared/Prizes';
import { AboutUs } from '@/components/shared/AboutUs';
import { OfflineWorkshop } from '@/components/shared/OfflineWorkshop';
import { OnlineWorkshop } from '@/components/shared/OnlineWorkshop';
import { Sponsors } from '@/components/shared/Sponsors';
import Wave from '@/components/shared/Wave';

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function HomePage() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const homeViewPadding = screens.lg ? '3rem 5rem' : '3rem 2rem';

  return (
    <Flex
      align="center"
      justify="center"
      vertical
      style={{
        width: '100%',
        backgroundColor: token.colorBgBase,
      }}
    >
      {/* GameCraft Introduction Section */}
      <GameCraftIntro padding={homeViewPadding} backgroundColor={token.colorPrimary} />
      <Wave width="100%" height="auto" fill={token.colorPrimary} />

      {/* Timeline and Prizes Section */}
      <GameCraftTimeline padding={homeViewPadding} backgroundColor={token.colorBgBase} />
      <Prizes padding={homeViewPadding} backgroundColor={token.colorBgBase} />

      {/* Workshop Sections - Matching React order exactly */}
      <Wave
        width="100%"
        height="auto"
        fill="#4F7B79"
        style={{ transform: 'scaleY(-1) translateY(-2px)' }}
      />
      <OfflineWorkshop padding={homeViewPadding} backgroundColor="#4F7B79" />
      <OnlineWorkshop padding={homeViewPadding} backgroundColor={token.colorAction} />

      {/* Sponsors Section */}
      <Sponsors padding={homeViewPadding} backgroundColor={token.colorPrimary} />
      <Wave width="100%" height="auto" fill={token.colorPrimary} />

      {/* About Us Section */}
      <AboutUs padding={homeViewPadding} backgroundColor={token.colorBgBase} />
    </Flex>
  );
}
