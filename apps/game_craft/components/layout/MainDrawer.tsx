'use client'

import { Button, Drawer, Flex, Switch, theme } from 'antd'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import { useRouter } from '@/lib/navigation'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import { useMainNavigations } from '@/lib/config/navigation'

const { useToken } = theme

interface MainDrawerProps {
  open: boolean
  toggleDrawerOpen: () => void
}

export default function MainDrawer({ open, toggleDrawerOpen }: MainDrawerProps) {
  const t = useTranslations('app')
  const locale = useLocale()
  const mainNavigations = useMainNavigations()
  const pathname = usePathname()
  const { token } = useToken()
  const { darkMode, toggleTheme } = useTheme()
  const { isAuthenticated, user, logout } = useAuth()
  const router = useRouter()

  const isActive = (path: string) => pathname === path

  const handleLanguageSwitch = () => {
    const newLocale = locale === 'fa' ? 'en' : 'fa'
    router.replace(pathname, { locale: newLocale })
  }

  const handleNavigation = (route: string) => {
    toggleDrawerOpen()
    router.push(route)
  }

  const handleLogout = async () => {
    try {
      await logout()
      toggleDrawerOpen()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <Drawer
      placement={locale === 'fa' ? 'right' : 'left'}
      open={open}
      width={300}
      closable={true}
      title={t('name')}
      mask={true}
      maskClosable={true}
      onClose={toggleDrawerOpen}
      zIndex={100000000}
      style={{
        backgroundColor: token.colorBgBase,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Flex
        vertical
        align="center"
        justify="start"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Flex
          vertical
          align="center"
          justify="center"
          gap="small"
          style={{
            width: '100%',
          }}
        >
          <Flex
            align="center"
            justify="space-around"
            gap="small"
            style={{
              width: '100%'
            }}
          >
            <Button
              type="text"
              shape="circle"
              onClick={toggleTheme}
              size="large"
              icon={darkMode ? <MoonFilled /> : <SunFilled />}
            />
            <Switch
              checkedChildren="En"
              unCheckedChildren="Fa"
              checked={locale !== 'fa'}
              onClick={handleLanguageSwitch}
            />
          </Flex>

          {mainNavigations.map(item => (
            <Button
              key={item.route}
              type="dashed"
              size="large"
              onClick={() => handleNavigation(item.route)}
              style={{
                width: '100%',
                fontWeight: 'bolder',
                ...(isActive(item.route) ? { color: token.colorPrimary } : {})
              }}
            >
              {item.name}
            </Button>
          ))}

          <Flex
            align="center"
            justify="center"
            gap="small"
            style={{
              width: '100%'
            }}
          >
            {isAuthenticated && user ? (
              <>
                <Button
                  style={{ flex: 1 }}
                  size="large"
                  type="dashed"
                  onClick={() => handleNavigation('/dashboard')}
                >
                  {t('mainNavigation.dashboard')}
                </Button>
                <Button
                  style={{ flex: 1 }}
                  type="primary"
                  size="large"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  style={{ flex: 1 }}
                  size="large"
                  type="dashed"
                  onClick={() => handleNavigation('/auth/login')}
                >
                  {t('auth.login')}
                </Button>
                <Button
                  style={{ flex: 1 }}
                  type="primary"
                  size="large"
                  onClick={() => handleNavigation('/auth/signup')}
                >
                  {t('auth.signUp')}
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Drawer>
  )
}
