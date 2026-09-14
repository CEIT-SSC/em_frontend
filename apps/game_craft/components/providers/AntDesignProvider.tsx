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
    borderRadius: 14,
    colorPrimary: "#162725",
    // colorInfo: customColors.colorPrimary,
    colorSuccess: "#4d8d82",
    colorWarning: "#c28c39",
    colorError: "#b44d48",
    colorBgBase: "#f4f0e4",
    colorBgContainer: "#fffdf6",
    colorBgElevated: "#fffdf6",
    colorText: "#101817",
    colorTextSecondary: "#53645e",
  },
  components: {
    Timeline: {
      dotBg: "transparent",
      tailColor: customColors.colorAction,
      tailWidth: 10,
    },
    Button: {
      colorPrimary: "#162725",
      colorPrimaryHover: "#25433f",
      colorPrimaryActive: "#0c1716",
    },
    Layout: {
      headerBg: "#0c1716",
      bodyBg: "#f4f0e4",
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
    colorBgBase: "#0c1716",
    colorBgContainer: "#162725",
    colorBgElevated: "#203430",
    colorText: "#fffdf6",
    colorTextSecondary: "#d5ddd5",
  },
  components: {
    ...lightTheme.components,
    Layout: {
      headerBg: "#0c1716",
      bodyBg: "#0c1716",
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
