"use client";

import {
  ConfigProvider,
  message,
  notification,
  theme as antdTheme,
} from "antd";
import { ReactNode, useEffect } from "react";
import { useTheme } from "next-themes";
import { customColors } from "../../config/colors";

interface AntDesignProviderProps {
  children: ReactNode;
  direction: "ltr" | "rtl";
}

const lightTheme = {
  token: {
    fontFamily: "var(--font-estedad), var(--font-vazirmatn), sans-serif",
    borderRadius: 16,
    colorPrimary: customColors.colorPrimary,
    colorAction: customColors.colorAction,
    colorOfflineWorkshop: customColors.colorOfflineWorkshop,
    colorInfo: customColors.colorPrimary,
    colorSuccess: customColors.colorAction,
    colorWarning: "#F59E0B",
    colorError: "#EF4444",
    colorBgBase: "#FFFFFF",
    colorBgContainer: "#FFFFFF",
    colorBgElevated: "#FFFFFF",
    colorText: "#000000d9",
    colorTextSecondary: "#00000073",
  },
  components: {
    Timeline: {
      dotBg: "transparent",
      tailColor: customColors.colorAction,
      tailWidth: 10,
    },
    Button: {
      colorPrimary: customColors.colorPrimary,
      colorPrimaryHover: "#2A2A68",
      colorPrimaryActive: "#15153A",
    },
    Layout: {
      headerBg: customColors.colorPrimary,
      bodyBg: "#F3F4F6",
    },
    Switch: {},
    Collapse: {},
    Message: {
      colorBgBase: "#FFFFFF",
    },
  },
};

export const darkTheme = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    ...lightTheme.token,
    colorBgBase: "#1E1E1E",
    colorBgContainer: "#262626",
    colorBgElevated: "#2A2A2A",
    colorText: "#ffffffd9",
    colorTextSecondary: "#ffffff73",
  },
  components: {
    ...lightTheme.components,
    Layout: {
      headerBg: customColors.colorPrimary,
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
