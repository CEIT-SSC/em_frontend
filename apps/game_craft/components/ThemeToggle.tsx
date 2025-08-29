'use client'

import { Button } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function ThemeToggle() {
  const { darkMode, toggleTheme, mounted } = useTheme()

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        type="text"
        className="fixed top-4 right-4"
        disabled
      >
        Theme
      </Button>
    )
  }

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
