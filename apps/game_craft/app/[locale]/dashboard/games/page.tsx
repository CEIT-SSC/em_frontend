'use client'

import { useTranslations } from 'next-intl'
import { Flex, Typography, Card, Row, Col, Button, Tag } from 'antd'
import { PlayCircleOutlined, TrophyOutlined, CalendarOutlined } from '@ant-design/icons'

export default function GamesPage() {
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
          {t('games')}
        </Typography.Title>
        <Typography.Paragraph>
          Track your game development progress, submit your projects, and view competition details.
        </Typography.Paragraph>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              type="inner"
              hoverable
              actions={[
                <Button key="view" type="text" icon={<PlayCircleOutlined />}>
                  View Details
                </Button>
              ]}
            >
              <Card.Meta
                avatar={<TrophyOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                title="GameCraft 2024"
                description={
                  <div>
                    <Typography.Text type="secondary">
                      Main competition for game development
                    </Typography.Text>
                    <br />
                    <Tag color="blue" icon={<CalendarOutlined />}>
                      November 2024
                    </Tag>
                  </div>
                }
              />
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              type="inner"
              hoverable
              actions={[
                <Button key="submit" type="primary">
                  Submit Project
                </Button>
              ]}
            >
              <Card.Meta
                avatar={<PlayCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />}
                title="My Game Project"
                description={
                  <div>
                    <Typography.Text type="secondary">
                      Your current game development project
                    </Typography.Text>
                    <br />
                    <Tag color="green">In Progress</Tag>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </Flex>
  )
}
