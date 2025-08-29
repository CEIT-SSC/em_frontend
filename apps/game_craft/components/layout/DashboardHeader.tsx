'use client'

import { Button, Flex, Grid, Layout, theme } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/lib/navigation'

const { Header } = Layout
const { useToken } = theme
const { useBreakpoint } = Grid

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { token } = useToken()
  const screens = useBreakpoint()
  const [shadow, setShadow] = useState(false)

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

  // Only show on mobile screens
  if (screens.lg) {
    return null
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
    >
      <Flex align="center" justify="space-between" style={{ height: '100%', width: '100%' }}>
        <Button
          shape="circle"
          type="primary"
          size="large"
          icon={<MenuOutlined />}
          onClick={onMenuClick}
        />
        <Link href="/dashboard">
          <Image
            src="/svg/dark-3d.svg"
            alt="GameCraft Logo"
            width={60}
            height={60}
            style={{ height: '60%', width: 'auto', maxHeight: '60px' }}
          />
        </Link>
      </Flex>
    </Header>
  )
}
