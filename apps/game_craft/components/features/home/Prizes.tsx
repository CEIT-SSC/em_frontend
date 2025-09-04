'use client'

import { Col, Flex, Row, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface PrizeCardProps {
  teamImage: string;
  teamTitle: string;
  teamPrize: string;
}

function PrizeCard({ teamImage, teamTitle, teamPrize }: PrizeCardProps) {
  return (
    <Flex vertical align="center" justify="center" style={{ width: '100%' }} gap="small">
      <Image
        src={teamImage}
        alt="team-image"
        width={200}
        height={150}
        style={{ width: '40%', height: 'auto' }}
      />
      <Typography.Title
        level={2}
        style={{
          margin: 0,
          fontWeight: 800
        }}
      >
        {teamTitle}
      </Typography.Title>
      <Typography.Title
        level={3}
        type="secondary"
        style={{
          margin: 0,
          fontFamily: 'Vazirmatn',
          fontWeight: 400
        }}
      >
        {teamPrize}
      </Typography.Title>
    </Flex>
  );
}

interface PrizesProps {
  padding?: string;
  backgroundColor?: string;
}

export function Prizes({ padding = '3rem 2rem', backgroundColor }: PrizesProps) {
  const t = useTranslations('app');

  // Using the exact same prize data structure as React project
  const prizes = [
    {
      teamImage: '/assets/svg/prize-1.svg',
      teamTitle: t('prizes.firstTeam.title'),
      teamPrize: t('prizes.firstTeam.prize')
    },
    {
      teamImage: '/assets/svg/prize-2.svg',
      teamTitle: t('prizes.secondTeam.title'),
      teamPrize: t('prizes.secondTeam.prize')
    },
    {
      teamImage: '/assets/svg/prize-3.svg',
      teamTitle: t('prizes.thirdTeam.title'),
      teamPrize: t('prizes.thirdTeam.prize')
    }
  ];

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: '100%',
        padding: padding,
        backgroundColor: backgroundColor,
      }}
    >
      {/* Background bubble effect - matching React project exactly */}
      <Flex
        align="center"
        justify="start"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          padding: padding,
        }}
      >
        <Image
          src="/assets/svg/bubble-light-purple.svg"
          alt="bubble-image"
          width={800}
          height={600}
          style={{
            height: '100%',
            width: '100%',
            transform: 'scaleX(-1)',
            opacity: 0.5,
          }}
        />
      </Flex>

      <Typography.Title
        level={1}
        style={{
          fontWeight: 900,
          position: 'relative',
          zIndex: 1
        }}
      >
        {t('prizes.title')}
      </Typography.Title>

      <Row
        align="middle"
        justify="center"
        style={{ width: '100%', position: 'relative', zIndex: 1 }}
        gutter={[16, 16]}
      >
        {prizes.map((prize, index) => (
          <Col span={24} lg={12} key={index}>
            <PrizeCard
              teamImage={prize.teamImage}
              teamTitle={prize.teamTitle}
              teamPrize={prize.teamPrize}
            />
          </Col>
        ))}
      </Row>
    </Flex>
  );
}
