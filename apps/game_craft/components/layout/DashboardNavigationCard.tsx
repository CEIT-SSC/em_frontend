'use client'

import { Button, Flex, Grid, Image, theme, Typography, Avatar, Divider } from 'antd'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/lib/navigation'
import { useDashboardNavigations } from '@/lib/config/dashboard-navigation'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'

const { useToken } = theme
const { useBreakpoint } = Grid

interface DashboardNavigationCardProps {
  onNavigate?: () => void
}

export default function DashboardNavigationCard({ onNavigate }: DashboardNavigationCardProps) {
  const t = useTranslations('app')
  const { token } = useToken()
  const router = useRouter()
  const pathname = usePathname()
  const dashboardNavigations = useDashboardNavigations()
  const screens = useBreakpoint()

  const handleNavigation = (route: string) => {
    router.push(route)
    if (onNavigate) {
      onNavigate()
    }
  }

  const handleLogout = () => {
    router.push('/')
  }

  const isActive = (route: string) => pathname.includes(route)

  // Sample user data - in a real app, this would come from auth context
  const userData = {
    name: 'کاربر گرامی',
    email: 'user@example.com',
    avatar: '/images/2024/staffs/mahdiHaeri.jpg' // Using one of the staff images as sample
  }

  return (
    <Flex
      vertical
      align="center"
      justify="start"
      style={{
        backgroundColor: token.colorBgBase,
        width: '100%',
        borderRadius: token.borderRadius,
        padding: screens.lg ? token.padding : 0
      }}
    >
      {/* User Profile Section */}
      <Flex
        vertical
        align="center"
        justify="center"
        style={{ width: '100%' }}
        gap="small"
      >
        <Flex
          vertical
          align="center"
          justify="center"
          style={{ width: '100%' }}
          gap="small"
        >
          <Flex
            style={{
              width: '30%',
              borderRadius: '50%',
              overflow: "hidden",
              aspectRatio: '1/1',
            }}
          >
            <Image
              src={userData.avatar}
              width="100%"
              height="auto"
              preview={false}
              fallback="/images/avatar-placeholder.png"
              placeholder={
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  style={{ backgroundColor: token.colorPrimary }}
                />
              }
            />
          </Flex>

          <Typography.Title level={4} style={{ fontWeight: 800, margin: 0, textAlign: 'center' }}>
            {userData.name}
          </Typography.Title>

          <Typography.Text type="secondary" style={{ fontSize: 12, textAlign: 'center' }}>
            {userData.email}
          </Typography.Text>
        </Flex>

        <Divider style={{ margin: '12px 0' }} />

        {/* Navigation Buttons */}
        <Flex vertical style={{ width: '100%' }} gap="small">
          {dashboardNavigations.map(item => (
            <Button
              key={item.route}
              type={isActive(item.route) ? 'primary' : 'text'}
              size="large"
              style={{
                width: '100%',
                textAlign: 'start',
                justifyContent: 'flex-start',
                height: 'auto',
                padding: '12px 16px',
                fontWeight: isActive(item.route) ? 600 : 400,
              }}
              onClick={() => handleNavigation(item.route)}
              icon={item.icon}
            >
              {item.name}
            </Button>
          ))}
        </Flex>

        <Divider style={{ margin: '12px 0' }} />

        {/* Logout Button */}
        <Button
          type="text"
          danger
          size="large"
          style={{
            width: '100%',
            textAlign: 'start',
            justifyContent: 'flex-start',
            height: 'auto',
            padding: '12px 16px',
          }}
          onClick={handleLogout}
          icon={<LogoutOutlined />}
        >
          {t('auth.logout')}
        </Button>
      </Flex>
    </Flex>
  )
}
