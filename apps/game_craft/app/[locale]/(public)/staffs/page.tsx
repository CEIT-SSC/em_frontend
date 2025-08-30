'use client'

import { useTranslations } from 'next-intl'
import { Flex, Typography, Card, Row, Col, Avatar, Space } from 'antd'
import { TeamOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons'

export default function StaffsPage() {
  const t = useTranslations('app')

  const staffMembers = [
    {
      id: 1,
      name: 'Mahdi Haeri',
      role: 'Project Manager',
      avatar: '/images/2024/staffs/mahdiHaeri.jpg',
      description: 'Leading the GameCraft 2024 organization and coordinating all activities.'
    },
    {
      id: 2,
      name: 'Technical Team Lead',
      role: 'Development Lead',
      avatar: '/svg/avatar-1.svg',
      description: 'Overseeing technical aspects and platform development.'
    },
    {
      id: 3,
      name: 'Workshop Coordinator',
      role: 'Education Lead',
      avatar: '/svg/avatar-2.svg',
      description: 'Managing workshop schedules and educational content.'
    }
  ]

  return (
    <Flex
      vertical
      style={{
        width: '100%',
        minHeight: '80vh',
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
      gap="large"
    >
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <TeamOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '1rem' }} />
            <Typography.Title level={1}>
              {t('mainNavigation.staffs')}
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: '18px' }}>
              Meet the dedicated team behind GameCraft 2024
            </Typography.Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {staffMembers.map((member) => (
              <Col xs={24} md={8} key={member.id}>
                <Card hoverable>
                  <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'center' }}>
                    <Avatar
                      src={member.avatar}
                      size={120}
                      icon={<TeamOutlined />}
                    />
                    <div>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        {member.name}
                      </Typography.Title>
                      <Typography.Text type="secondary">
                        {member.role}
                      </Typography.Text>
                    </div>
                    <Typography.Paragraph>
                      {member.description}
                    </Typography.Paragraph>
                    <Space>
                      <GithubOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                      <LinkedinOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                    </Space>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Space>
      </Card>
    </Flex>
  )
}
