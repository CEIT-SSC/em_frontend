'use client'

import { Button, Divider, Flex, Grid, Layout, Space, Switch, theme } from 'antd'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { MenuOutlined, MoonFilled, SunFilled } from '@ant-design/icons'
import Image from 'next/image'
import { Link, useRouter } from '@/lib/navigation'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import { useMainNavigations } from '@/lib/config/navigation'
import MainDrawer from './MainDrawer'

const { useToken } = theme
const { Header } = Layout
const { useBreakpoint } = Grid

interface AppHeaderProps {
  className?: string
}

export default function AppHeader({ className = '' }: AppHeaderProps) {
  const mainNavigations = useMainNavigations()
  const [shadow, setShadow] = useState(false)
  const pathname = usePathname()
  const { token } = useToken()
  const t = useTranslations('app')
  const locale = useLocale()
  const { darkMode, toggleTheme } = useTheme()
  const { isAuthenticated, logout, user } = useAuth()
  const screens = useBreakpoint()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShadow(true)
    } else {
      setShadow(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isActive = (path: string) => pathname === path

  const handleLanguageSwitch = () => {
    const newLocale = locale === 'fa' ? 'en' : 'fa'
    router.replace(pathname, { locale: newLocale })
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        right: 0,
        zIndex: 10000,
        width: '100%',
        height: '10vh',
        minHeight: '60px',
        maxHeight: '100px',
        background: token.colorPrimary,
        transition: 'box-shadow 0.3s',
        boxShadow: shadow ? '0 10px 20px rgba(0, 0, 0, 0.5)' : 'none',
        padding: '0.5rem 2rem',
      }}
      className={className}
    >
      {screens.lg ? (
        <Flex align="center" justify="space-between" style={{ width: '100%', height: '100%' }}>
          <Flex align="center" justify="center" style={{ height: '100%' }} gap="large">
            <Link href="/">
              <Image
                src="/svg/dark-3d.svg"
                alt="GameCraft Logo"
                width={60}
                height={60}
                style={{ height: '80%', width: 'auto', maxHeight: '60px' }}
              />
            </Link>

            <Space size="small">
              {mainNavigations.map(item => (
                <Link key={item.route} href={item.route}>
                  <Button
                    type="primary"
                    style={{
                      fontWeight: 'bolder',
                      ...(isActive(item.route) ? { color: token.colorPrimary } : {})
                    }}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </Space>
          </Flex>

          <Flex align="center" justify="center" style={{ height: '100%' }} gap="small">
            <Button
              type="text"
              shape="circle"
              onClick={toggleTheme}
              size="large"
              icon={darkMode ?
                <MoonFilled style={{ color: 'white' }} /> :
                <SunFilled style={{ color: 'white' }} />
              }
            />
            <Switch
              checkedChildren="En"
              unCheckedChildren="Fa"
              checked={locale !== 'fa'}
              onClick={handleLanguageSwitch}
            />
            <Divider
              type="vertical"
              style={{ height: '50%', borderWidth: '4px', borderRadius: '8px', margin: 0 }}
            />
            <Space size="small">
              {isAuthenticated && user ? (
                <>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>
                    {user.username}
                  </span>
                  <Link href="/dashboard">
                    <Button type="primary" style={{ fontWeight: 'bolder' }}>
                      {t('mainNavigation.dashboard')}
                    </Button>
                  </Link>
                  <Button
                    type="primary"
                    style={{ fontWeight: 'bolder' }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/signup">
                    <Button type="primary" style={{ fontWeight: 'bolder' }}>
                      {t('auth.signUp')}
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button type="primary" style={{ fontWeight: 'bolder' }}>
                      {t('auth.login')}
                    </Button>
                  </Link>
                </>
              )}
            </Space>
          </Flex>
        </Flex>
      ) : (
        <Flex align="center" justify="space-between" style={{ height: '100%', width: '100%' }}>
          <Button
            shape="circle"
            type="primary"
            size="large"
            icon={<MenuOutlined />}
            onClick={toggleDrawerOpen}
          />
          <Link href="/">
            <Image
              src="/svg/dark-3d.svg"
              alt="GameCraft Logo"
              width={60}
              height={60}
              style={{ height: '60%', width: 'auto', maxHeight: '60px' }}
            />
          </Link>
          <MainDrawer open={drawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
        </Flex>
      )}
    </Header>
  )
}
