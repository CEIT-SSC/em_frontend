'use client'

import { useTranslations } from 'next-intl'
import { Flex, Typography, Card, Button, Space, Badge } from 'antd'
import { TeamOutlined, UserAddOutlined } from '@ant-design/icons'

export default function TeamStatusPage() {
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
          {t('teamStatus.label')}
        </Typography.Title>
        <Typography.Paragraph>
          Manage your team status, invite members, and track your team's progress in the GameCraft competition.
        </Typography.Paragraph>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card type="inner">
            <Flex justify="space-between" align="center">
              <div>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  <TeamOutlined /> Team Formation
                </Typography.Title>
                <Typography.Text type="secondary">
                  Create or join a team to participate in GameCraft
                </Typography.Text>
              </div>
              <Badge status="warning" text="Pending" />
            </Flex>
          </Card>

          <Space>
            <Button type="primary" icon={<TeamOutlined />}>
              Create Team
            </Button>
            <Button icon={<UserAddOutlined />}>
              Join Team
            </Button>
          </Space>
        </Space>
      </Card>
    </Flex>
  )
}
