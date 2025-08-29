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

const lightTheme = {
  ...defaultTheme,
  algorithm: theme.defaultAlgorithm,
  token: {
    ...defaultTheme.token,
    colorBgBase: "#f5f5f5",
  }
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
  const { darkMode } = useTheme()
  const selectedTheme = darkMode ? darkTheme : lightTheme

  // Configure global message and notification
  message.config({
    top: 0,
    duration: 3,
    maxCount: 3,
    rtl: direction === 'rtl',
    prefixCls: 'my-message',
  })

  notification.config({
    placement: 'bottomLeft',
    duration: 3,
    rtl: direction === 'rtl',
    prefixCls: 'my-notification',
  })

  return (
    <ConfigProvider
      theme={selectedTheme}
      direction={direction}
    >
      {children}
    </ConfigProvider>
  )
}
