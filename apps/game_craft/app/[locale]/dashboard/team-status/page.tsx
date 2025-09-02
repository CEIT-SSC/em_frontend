'use client'

import { Flex, theme, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { TeamMemberContainer } from '@/components/features/team/TeamMemberContainer'

const { useToken } = theme

export default function TeamStatusPage() {
  const t = useTranslations('app.dashboard.teamStatus')
  const { token } = useToken()

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: '100%',
        padding: token.padding,
      }}
    >
      <Typography.Title level={3} style={{ margin: 0, fontWeight: 900, color: token.colorPrimary }}>
        {t('teamName')}
      </Typography.Title>
      <TeamMemberContainer />
    </Flex>
  )
}
