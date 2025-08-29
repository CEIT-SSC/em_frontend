'use client'

import { Button } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <Button
      type="text"
      icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      className="fixed top-4 right-4"
    >
      {darkMode ? 'Light' : 'Dark'}
    </Button>
  )
}
