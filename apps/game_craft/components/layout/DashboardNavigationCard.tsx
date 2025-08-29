'use client'

import { Button, Flex, Grid, Image, theme, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useDashboardNavigations } from '@/lib/config/dashboard-navigation'
import { useAuth } from '@/components/providers/AuthProvider'

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
  const { user, logout } = useAuth()

  const handleNavigation = (route: string) => {
    router.push(route)
    if (onNavigate) {
      onNavigate()
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const isActive = (route: string) => pathname === route

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
      <Flex vertical align="center" justify="center" style={{ width: '100%' }} gap="small">
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
              overflow: 'hidden',
              aspectRatio: '1/1',
            }}
          >
            <Image
              src={user?.avatar || '/svg/avatar-1.svg'}
              width="100%"
              height="auto"
              placeholder={
                <img src="/svg/avatar-1.svg" alt="user-image" width="100%" height="auto" />
              }
            />
          </Flex>
          <Typography.Title level={4} style={{ fontWeight: 800 }}>
            {user?.username || 'User'}
          </Typography.Title>
        </Flex>

        <Flex
          vertical
          align="center"
          justify="center"
          style={{ width: '100%' }}
          gap="small"
        >
          {dashboardNavigations.map(item => (
            <Button
              key={item.route}
              type={isActive(item.route) ? 'primary' : 'dashed'}
              size="large"
              style={{
                width: '100%',
                ...(isActive(item.route) ? { backgroundColor: token.colorPrimary } : {})
              }}
              onClick={() => handleNavigation(item.route)}
            >
              {item.name}
            </Button>
          ))}
          <Button
            danger
            type="dashed"
            size="large"
            style={{ width: '100%' }}
            onClick={handleLogout}
          >
            {t('auth.logout')}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
