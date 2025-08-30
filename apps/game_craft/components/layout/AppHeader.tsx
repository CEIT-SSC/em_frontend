'use client'

import { Button, Divider, Flex, Grid, Layout, Space, Switch, theme } from 'antd';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter, Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { MenuOutlined, MoonFilled, SunFilled } from '@ant-design/icons';
import Image from 'next/image';

const { useToken } = theme;
const { Header } = Layout;
const { useBreakpoint } = Grid;

interface NavigationItem {
  name: string;
  route: string;
}

export function AppHeader() {
  const [shadow, setShadow] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useToken();
  const t = useTranslations('app');
  const screens = useBreakpoint();

  // Main navigation items matching the React project
  const mainNavigations: NavigationItem[] = [
    { name: t('mainNavigation.home'), route: '/' },
    { name: t('mainNavigation.news'), route: '/news' },
    { name: t('mainNavigation.faq'), route: '/faq' },
    { name: t('mainNavigation.staffs'), route: '/staffs' },
    { name: t('mainNavigation.history'), route: '/history' },
    { name: t('mainNavigation.sponsors'), route: '/sponsors' },
    { name: t('mainNavigation.dashboard'), route: '/dashboard' },
  ];

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => pathname === path;

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
    >
      {screens.lg ? (
        <Flex align="center" justify="space-between" style={{ width: '100%', height: '100%' }}>
          <Flex align="center" justify="center" style={{ height: '100%' }} gap="large">
            <Image
              src="/assets/svg/dark-3d.svg"
              alt="gamecraft-logo"
              width={60}
              height={60}
              style={{ height: '80%', width: 'auto', maxHeight: '60px' }}
            />

            <Space size="small">
              {mainNavigations.map((item) => (
                <Button
                  key={item.route}
                  type="primary"
                  onClick={() => router.push(item.route)}
                  style={{
                    fontWeight: 'bolder',
                    ...(isActive(item.route) ? { color: '#01B582' } : {}),
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Space>
          </Flex>

          <Flex align="center" justify="center" style={{ height: '100%' }} gap="small">
            <Button
              type="text"
              shape="circle"
              onClick={toggleTheme}
              size="large"
              icon={
                darkMode ? (
                  <MoonFilled style={{ color: 'white' }} />
                ) : (
                  <SunFilled style={{ color: 'white' }} />
                )
              }
            />
            <Switch
              checkedChildren="En"
              unCheckedChildren="Fa"
              checked={true} // Default to English for now
              defaultChecked
            />
            <Divider
              type="vertical"
              style={{ height: '50%', borderWidth: '4px', borderRadius: '8px', margin: 0 }}
            />
            <Space size="small">
              <Button
                type="primary"
                style={{ fontWeight: 'bolder' }}
                onClick={() => router.push('/auth/signup')}
              >
                {t('auth.signUp')}
              </Button>
              <Button
                type="primary"
                style={{ fontWeight: 'bolder' }}
                onClick={() => router.push('/auth/login')}
              >
                {t('auth.login')}
              </Button>
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
          <Image
            src="/assets/svg/dark-3d.svg"
            alt="gamecraft-logo"
            width={60}
            height={60}
            style={{ height: '60%', width: 'auto', maxHeight: '60px' }}
          />
          {/* Mobile drawer would go here */}
        </Flex>
      )}
    </Header>
  );
}
