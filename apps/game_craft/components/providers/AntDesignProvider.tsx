"use client";

import {
  ConfigProvider,
  message,
  notification,
  theme as antdTheme,
} from "antd";
import { ReactNode, useEffect } from "react";
import { useTheme } from "next-themes";

interface AntDesignProviderProps {
  children: ReactNode;
  direction: "ltr" | "rtl";
}

const lightTheme = {
  token: {
    fontFamily: "var(--font-estedad), var(--font-vazirmatn), sans-serif",
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
    colorAction: "#01B582", // Custom brand color
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
      headerBg: "#3c3a7d",
      bodyBg: "#f5f5f5",
    },
    Switch: {},
    Collapse: {},
    Message: {
      colorBgBase: "#ffffff",
    },
  },
};

export const darkTheme = {
  algorithm: antdTheme.darkAlgorithm,
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
      headerBg: "#3c3a7d",
      bodyBg: "#1E1E1E",
    },
    Message: {
      colorBgBase: "#262626",
    },
  },
};

export default function AntDesignProvider({
  children,
  direction,
}: AntDesignProviderProps) {
  const { theme } = useTheme();

  const algorithm = theme === "dark" ? darkTheme : lightTheme;

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

  return (
    <ConfigProvider theme={algorithm} direction={direction}>
      {children}
    </ConfigProvider>
  );
}
