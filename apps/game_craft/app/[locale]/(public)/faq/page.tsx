import { useTranslations } from 'next-intl'
import { Flex, Typography, Card, Collapse, Space } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

export default function FAQPage() {
  const t = useTranslations('app')

  const faqItems = [
    {
      key: '1',
      label: 'What is GameCraft?',
      children: 'GameCraft is an annual game development competition organized by AUT Computer Engineering students. It provides workshops and mentorship for aspiring game developers.'
    },
    {
      key: '2',
      label: 'How can I participate?',
      children: 'You can register through our platform, attend workshops, form teams, and submit your game projects during the competition period.'
    },
    {
      key: '3',
      label: 'What are the prizes?',
      children: 'Winners receive cash prizes, certificates, and opportunities for internships with partner companies.'
    },
    {
      key: '4',
      label: 'Do I need prior experience?',
      children: 'No prior experience is required! Our workshops are designed for beginners and intermediate developers alike.'
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
            <QuestionCircleOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '1rem' }} />
            <Typography.Title level={1}>
              {t('mainNavigation.faq')}
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: '18px' }}>
              Find answers to commonly asked questions about GameCraft 2024
            </Typography.Paragraph>
          </div>

          <Collapse
            items={faqItems}
            size="large"
            ghost
            expandIconPosition="end"
          />
        </Space>
      </Card>
    </Flex>
  )
}
