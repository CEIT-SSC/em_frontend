'use client'

import { Avatar, Col, Flex, Grid, Row, theme, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { UserOutlined } from '@ant-design/icons'
import Wave from '@/components/shared/Wave'

const { useToken } = theme
const { useBreakpoint } = Grid

export default function StaffsPage() {
  const { token } = useToken()
  const screens = useBreakpoint()
  const t = useTranslations('app')
  const staffViewPadding = screens.lg ? '3rem 5rem' : '3rem 2rem'

  // Sample staff data matching React project structure
  const staffs = [
    {
      teamTitle: t('staffs.organizingTeam.title'),
      teamMembers: [
        {
          name: 'Mahdi Haeri',
          role: 'Project Manager',
          imageUrl: '/images/2024/staffs/mahdiHaeri.jpg'
        },
        {
          name: 'Team Lead',
          role: 'Technical Lead',
          imageUrl: null
        }
      ]
    },
    {
      teamTitle: t('staffs.technicalTeam.title'),
      teamMembers: [
        {
          name: 'Developer 1',
          role: 'Frontend Developer',
          imageUrl: null
        },
        {
          name: 'Developer 2',
          role: 'Backend Developer',
          imageUrl: null
        }
      ]
    }
  ]

  const StaffCard = ({ staff }: { staff: any }) => (
    <Flex
      align="center"
      justify="center"
      vertical
      style={{
        width: '100%',
        height: '300px',
        backgroundColor: token.colorBgContainer,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '2rem',
        padding: token.padding,
        position: 'relative',
      }}
      gap="small"
    >
      <Flex
        vertical
        align="center"
        justify="center"
        gap="middle"
      >
        <Avatar
          size={140}
          icon={<UserOutlined />}
          src={staff.imageUrl}
        />
        <Flex vertical align="center" justify="center" style={{ width: '100%' }}>
          <Typography.Title level={4} style={{ margin: 0, fontWeight: 700 }}>
            {staff.name}
          </Typography.Title>
          <Typography.Text type="secondary">
            {staff.role}
          </Typography.Text>
        </Flex>
      </Flex>
    </Flex>
  )

  const StaffContainer = () => (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: '100%',
        backgroundColor: token.colorBgBase,
        borderRadius: token.borderRadius,
        padding: '3rem 1rem',
      }}
    >
      <Typography.Title
        level={1}
        style={{
          fontWeight: 900,
          color: token.colorPrimary
        }}
      >
        {t('staffs.title')}
      </Typography.Title>
      <Flex vertical align="center" justify="center" style={{ width: '100%' }} gap={50}>
        {staffs.map((team, index) => (
          <Flex
            key={index}
            vertical
            align="center"
            justify="center"
            style={{ width: '100%' }}
            gap="small"
          >
            <Typography.Title
              level={2}
              style={{
                color: token.colorPrimary,
                fontWeight: 800,
              }}
            >
              {team.teamTitle}
            </Typography.Title>
            <Row
              align="middle"
              justify="center"
              gutter={[16, 16]}
              style={{
                width: '100%',
              }}
            >
              {team.teamMembers.map((staff, index) => (
                <Col key={index} span={24} sm={12} md={8} lg={6} xxl={4}>
                  <StaffCard staff={staff} />
                </Col>
              ))}
            </Row>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: '100%',
        backgroundColor: token.colorPrimary,
        backgroundImage: "url('/images/pattern.svg')",
        padding: staffViewPadding
      }}
    >
      <StaffContainer />
    </Flex>
  )
}
