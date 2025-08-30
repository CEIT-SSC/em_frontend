'use client'

import { Divider, Flex, Grid, theme, Typography } from 'antd'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useDashboardNavigations } from '@/lib/config/dashboard-navigation'
import DashboardHeader from './DashboardHeader'
import DashboardNavigationCard from './DashboardNavigationCard'
import LogoWithText from '@/components/shared/LogoWithText'
import MainDrawer from './MainDrawer'

const { useToken } = theme
const { useBreakpoint } = Grid

interface DashboardLayoutProps {
  children: React.ReactNode
  locale: string
}

export function DashboardLayout({ children, locale }: DashboardLayoutProps) {
  const screens = useBreakpoint()
  const { token } = useToken()
  const dashboardNavigations = useDashboardNavigations()
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen)
  }

  const currentPage = dashboardNavigations.find(item => pathname.includes(item.route))

  return (
    <Flex
      vertical
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <DashboardHeader onMenuClick={toggleDrawerOpen} />

      <Flex
        vertical
        align="center"
        justify="start"
        flex={1}
        style={{
          width: '100%',
          backgroundColor: token.colorPrimary,
          backgroundImage: 'url(/images/pattern.svg)',
          padding: '1rem',
        }}
        gap="large"
      >
        {screens.lg ? (
          <Flex align="center" justify="center" style={{ width: '100%' }}>
            <LogoWithText />
          </Flex>
        ) : null}

        <Flex
          align="start"
          justify="center"
          style={{
            width: '100%',
          }}
          gap="large"
        >
          <Flex
            vertical
            style={{
              backgroundColor: token.colorBgBase,
              borderRadius: token.borderRadius,
              width: '100%',
              maxWidth: 1200,
              minHeight: 600,
            }}
          >
            <Flex
              vertical={!screens.lg}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              {screens.lg ? (
                <Flex
                  vertical
                  style={{
                    width: '300px',
                    minWidth: '300px',
                    padding: token.padding,
                  }}
                >
                  <DashboardNavigationCard />
                </Flex>
              ) : null}

              <Divider
                type={screens.lg ? 'vertical' : 'horizontal'}
                style={{
                  height: screens.lg ? '100%' : 'auto',
                  margin: 0
                }}
              />

              <Flex
                vertical
                flex={1}
                style={{
                  padding: token.padding,
                  minHeight: '500px',
                }}
              >
                {currentPage && (
                  <Typography.Title
                    level={3}
                    style={{
                      margin: 0,
                      marginBottom: token.margin,
                      fontWeight: 800,
                      color: token.colorPrimary
                    }}
                  >
                    {currentPage.name}
                  </Typography.Title>
                )}
                {children}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <MainDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        locale={locale}
      />
    </Flex>
  )
}
