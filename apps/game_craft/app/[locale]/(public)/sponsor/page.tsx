import { useTranslations } from 'next-intl'
import { Flex, Typography, Card, Row, Col, Space } from 'antd'
import { HeartOutlined, GlobalOutlined } from '@ant-design/icons'
import Image from 'next/image'

export default function SponsorsPage() {
  const t = useTranslations('app')

  const sponsors = [
    {
      id: 1,
      name: 'AUT Computer Engineering',
      logo: '/images/logo/ssc_white.png',
      tier: 'Main Organizer',
      description: 'Amirkabir University of Technology Computer Engineering Department'
    },
    {
      id: 2,
      name: 'Tehran Art University',
      logo: '/images/logo/Asset 4.png',
      tier: 'Education Partner',
      description: 'Providing art and design expertise for game development'
    },
    {
      id: 3,
      name: 'Tech Sponsor',
      logo: '/svg/dark-3d.svg',
      tier: 'Technology Partner',
      description: 'Supporting with development tools and platforms'
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
            <HeartOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '1rem' }} />
            <Typography.Title level={1}>
              {t('mainNavigation.sponsors')}
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: '18px' }}>
              Our valued partners and sponsors who make GameCraft possible
            </Typography.Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {sponsors.map((sponsor) => (
              <Col xs={24} md={8} key={sponsor.id}>
                <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={100}
                        height={100}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        {sponsor.name}
                      </Typography.Title>
                      <Typography.Text type="secondary" strong>
                        {sponsor.tier}
                      </Typography.Text>
                    </div>
                    <Typography.Paragraph>
                      {sponsor.description}
                    </Typography.Paragraph>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>

          <Card type="inner" style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Space direction="vertical">
              <GlobalOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
              <Typography.Title level={3}>Become a Sponsor</Typography.Title>
              <Typography.Paragraph>
                Interested in partnering with GameCraft? Contact us to learn about sponsorship opportunities.
              </Typography.Paragraph>
            </Space>
          </Card>
        </Space>
      </Card>
    </Flex>
  )
}
