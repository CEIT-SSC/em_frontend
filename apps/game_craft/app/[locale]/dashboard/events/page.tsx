'use client'

import { useTranslations } from 'next-intl'
import { Flex, Typography, Card } from 'antd'

export default function EventsPage() {
  const t = useTranslations('app.dashboard')

  return (
    <Flex
      vertical
      style={{
        width: '100%',
        height: '100%',
        padding: '1rem',
      }}
      gap="large"
    >
      <Card>
        <Typography.Title level={2}>
          {t('event')}
        </Typography.Title>
        <Typography.Paragraph>
          Welcome to the Events dashboard. Here you can view and manage upcoming GameCraft events, workshops, and competitions.
        </Typography.Paragraph>
      </Card>
    </Flex>
  )
}
