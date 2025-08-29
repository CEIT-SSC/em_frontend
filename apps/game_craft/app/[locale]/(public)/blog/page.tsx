import { useTranslations } from 'next-intl'
import { Flex, Typography, Card, Row, Col, Space, Tag, Button } from 'antd'
import { ReadOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons'

export default function BlogPage() {
  const t = useTranslations('app')

  const blogPosts = [
    {
      id: 1,
      title: 'GameCraft 2024: Registration Now Open!',
      excerpt: 'Join us for the most exciting game development competition of the year. Learn about registration process and timeline.',
      date: '2024-10-01',
      author: 'GameCraft Team',
      tags: ['announcement', 'registration']
    },
    {
      id: 2,
      title: 'Unity Workshop Series Announced',
      excerpt: 'Comprehensive Unity workshops covering everything from basics to advanced techniques for game development.',
      date: '2024-09-28',
      author: 'Workshop Team',
      tags: ['workshop', 'unity', 'education']
    },
    {
      id: 3,
      title: 'Meet Our 2024 Mentors',
      excerpt: 'Get to know the industry professionals who will guide you through your game development journey.',
      date: '2024-09-25',
      author: 'Organizing Committee',
      tags: ['mentors', 'team']
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
            <ReadOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '1rem' }} />
            <Typography.Title level={1}>
              {t('mainNavigation.news')}
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: '18px' }}>
              Stay updated with the latest GameCraft news and announcements
            </Typography.Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {blogPosts.map((post) => (
              <Col xs={24} lg={8} key={post.id}>
                <Card
                  hoverable
                  actions={[
                    <Button key="read" type="link">
                      Read More →
                    </Button>
                  ]}
                  style={{ height: '100%' }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      {post.title}
                    </Typography.Title>

                    <Space size="small">
                      <CalendarOutlined />
                      <Typography.Text type="secondary">
                        {new Date(post.date).toLocaleDateString()}
                      </Typography.Text>
                      <UserOutlined />
                      <Typography.Text type="secondary">
                        {post.author}
                      </Typography.Text>
                    </Space>

                    <Typography.Paragraph ellipsis={{ rows: 3 }}>
                      {post.excerpt}
                    </Typography.Paragraph>

                    <Space wrap>
                      {post.tags.map(tag => (
                        <Tag key={tag} color="blue">
                          {tag}
                        </Tag>
                      ))}
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
