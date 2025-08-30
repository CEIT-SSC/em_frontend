'use client'

import { ConfigProvider, message, notification, theme } from 'antd'
import { ReactNode } from 'react'
import { useTheme } from './ThemeProvider'

interface AntDesignProviderProps {
  children: ReactNode
  locale: string
  direction: 'ltr' | 'rtl'
}

const defaultTheme = {
  token: {
    fontFamily: "Estedad, Vazirmatn, sans-serif",
    borderRadius: 16,
    colorPrimary: "#3c3a7d",
    colorInfo: "#3c3a7d",
    colorAction: "#01B582",
  },
  components: {
    Timeline: {
      dotBg: 'transparent',
      tailColor: '#01B582',
      tailWidth: 10,
    },
    Switch: {},
    Collapse: {},
    Message: {
      contentBg: 'red',
      colorBgBase: 'red'
    }
  },
}

const darkTheme = {
  ...defaultTheme,
  algorithm: theme.darkAlgorithm,
  token: {
    ...defaultTheme.token,
    colorBgBase: "#1E1E1E",
  }
}

export default function AntDesignProvider({
  children,
  locale,
  direction
}: AntDesignProviderProps) {
  const { darkMode, mounted } = useTheme()

  // Configure global message and notification
  message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
  })

  notification.config({
    placement: 'topRight',
    duration: 4.5,
  })

  // Don't render theme-dependent content until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <ConfigProvider theme={defaultTheme} direction={direction}>
        {children}
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider
      theme={darkMode ? darkTheme : defaultTheme}
      direction={direction}
    >
      {children}
    </ConfigProvider>
  )
}
