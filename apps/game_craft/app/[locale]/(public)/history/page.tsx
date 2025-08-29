import { useTranslations } from 'next-intl'
import { Flex, Typography, Card, Timeline, Space } from 'antd'
import { HistoryOutlined, TrophyOutlined, RocketOutlined } from '@ant-design/icons'
import { GameCraftTimeline } from '@/components/shared/Timeline'

export default function HistoryPage() {
  const t = useTranslations('app')

  const historyItems = [
    {
      color: '#1890ff',
      dot: <TrophyOutlined />,
      children: (
        <div>
          <Typography.Title level={4}>GameCraft 2023</Typography.Title>
          <Typography.Paragraph>
            Our most successful event with over 200 participants and amazing game submissions.
          </Typography.Paragraph>
        </div>
      )
    },
    {
      color: '#52c41a',
      dot: <RocketOutlined />,
      children: (
        <div>
          <Typography.Title level={4}>GameCraft 2022</Typography.Title>
          <Typography.Paragraph>
            The first hybrid event combining online workshops with in-person presentations.
          </Typography.Paragraph>
        </div>
      )
    },
    {
      color: '#faad14',
      dot: <HistoryOutlined />,
      children: (
        <div>
          <Typography.Title level={4}>GameCraft 2021</Typography.Title>
          <Typography.Paragraph>
            Virtual edition due to pandemic, but still delivered high-quality workshops and mentorship.
          </Typography.Paragraph>
        </div>
      )
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
            <HistoryOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '1rem' }} />
            <Typography.Title level={1}>
              {t('mainNavigation.history')}
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: '18px' }}>
              A journey through GameCraft's evolution and achievements
            </Typography.Paragraph>
          </div>

          <Timeline
            mode="left"
            items={historyItems}
            style={{ marginTop: '2rem' }}
          />
        </Space>
      </Card>

      {/* Include the current year timeline */}
      <GameCraftTimeline />
    </Flex>
  )
}
