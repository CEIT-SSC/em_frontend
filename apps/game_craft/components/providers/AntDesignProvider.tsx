"use client";

import { ConfigProvider, message, notification, theme } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface AntDesignProviderProps {
  children: ReactNode;
  locale: string;
  direction: "ltr" | "rtl";
}

const lightTheme = {
  token: {
    fontFamily: "Estedad, Vazirmatn, sans-serif",
    borderRadius: 16,
    colorPrimary: "#3c3a7d",
    colorInfo: "#3c3a7d",
    colorSuccess: "#01B582",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorBgBase: "#ffffff",
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorText: "#000000d9",
    colorTextSecondary: "#00000073",
  },
  components: {
    Timeline: {
      dotBg: "transparent",
      tailColor: "#01B582",
      tailWidth: 10,
    },
    Button: {
      colorPrimary: "#3c3a7d",
      colorPrimaryHover: "#4c4a8d",
      colorPrimaryActive: "#2c2a6d",
    },
    Layout: {
      colorBgHeader: "#3c3a7d",
      colorBgBody: "#f5f5f5",
    },
    Switch: {},
    Collapse: {},
    Message: {
      colorBgBase: "#ffffff",
    },
  },
};

const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    ...lightTheme.token,
    colorBgBase: "#1E1E1E",
    colorBgContainer: "#262626",
    colorBgElevated: "#2a2a2a",
    colorText: "#ffffffd9",
    colorTextSecondary: "#ffffff73",
  },
  components: {
    ...lightTheme.components,
    Layout: {
      colorBgHeader: "#3c3a7d",
      colorBgBody: "#1E1E1E",
    },
    Message: {
      colorBgBase: "#262626",
    },
  },
};

export default function AntDesignProvider({
  children,
  locale,
  direction,
}: AntDesignProviderProps) {
  const { theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for theme to be mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Configure global message and notification
  useEffect(() => {
    message.config({
      top: 100,
      duration: 2,
      maxCount: 3,
    });

    notification.config({
      placement: "topRight",
      duration: 4.5,
    });
  }, []);

  // Use resolvedTheme or fallback to currentTheme, defaulting to 'light'
  const effectiveTheme = mounted ? (resolvedTheme || currentTheme || 'light') : 'light';

  // Debug logging
  useEffect(() => {
    console.log('🎨 Theme Debug:', {
      currentTheme,
      resolvedTheme,
      effectiveTheme,
      mounted
    });
  }, [currentTheme, resolvedTheme, effectiveTheme, mounted]);

  return (
    <ConfigProvider
      theme={effectiveTheme === "dark" ? darkTheme : lightTheme}
      direction={direction}
    >
      {children}
    </ConfigProvider>
  );
}
