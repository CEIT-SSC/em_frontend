import { Flex, Timeline, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import TimelineDot from './TimelineDot'
import TimelineLabel from './TimelineLabel'
import TimelineChildren from './TimelineChildren'

interface GameCraftTimelineProps {
  padding?: string | number
  backgroundColor?: string
  className?: string
}

export default function GameCraftTimeline({
  padding = '2rem',
  backgroundColor = 'transparent',
  className = ''
}: GameCraftTimelineProps) {
  const t = useTranslations('app.timeline')

  const items = [
    {
      dot: <TimelineDot />,
      children: <TimelineChildren title={t('step1.title')} time={t('step1.schedule')} />,
      label: <TimelineLabel logo="/svg/timline-1.svg" alt="Registration" />
    },
    {
      dot: <TimelineDot />,
      children: <TimelineChildren title={t('step2.title')} time={t('step2.schedule')} />,
      label: <TimelineLabel logo="/svg/timline-2.svg" alt="Registration Deadline" />
    },
    {
      dot: <TimelineDot />,
      children: <TimelineChildren title={t('step3.title')} time={t('step3.schedule')} />,
      label: <TimelineLabel logo="/svg/timline-3.svg" alt="Workshops Begin" />
    },
    {
      dot: <TimelineDot />,
      children: <TimelineChildren title={t('step4.title')} time={t('step4.schedule')} />,
      label: <TimelineLabel logo="/svg/timline-4.svg" alt="Workshops End" />
    },
    {
      dot: <TimelineDot />,
      children: <TimelineChildren title={t('step5.title')} time={t('step5.schedule')} />,
      label: <TimelineLabel logo="/svg/timline-5.svg" alt="Game Development" />
    },
    {
      dot: <TimelineDot />,
      children: <TimelineChildren title={t('step6.title')} time={t('step6.schedule')} />,
      label: <TimelineLabel logo="/svg/timline-6.svg" alt="Judging" />
    },
  ]

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: '100%',
        padding: padding,
        backgroundColor: backgroundColor,
        position: 'relative',
        zIndex: 10
      }}
      gap="large"
      className={className}
    >
      <Flex
        align="center"
        justify="center"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          padding: padding
        }}
      >
        <Image
          src="/svg/bubble-light-purple.svg"
          alt="Background bubble"
          fill
          style={{
            opacity: 0.5,
            objectFit: 'contain'
          }}
        />
      </Flex>
      <Typography.Title
        style={{
          marginBottom: '2rem',
          fontWeight: 900
        }}
      >
        {t('title')}
      </Typography.Title>
      <Timeline items={items} mode="alternate" style={{ width: '100%' }} />
    </Flex>
  )
}
