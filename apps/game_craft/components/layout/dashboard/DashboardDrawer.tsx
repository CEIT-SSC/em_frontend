"use client";

import { Button, Drawer, Flex, Switch, theme } from "antd";
import { useTranslations, useLocale } from "next-intl";
import { DashboardNavigationCard } from "./DashboardNavigationCard";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";

const { useToken } = theme;

interface DashboardDrawerProps {
  open: boolean;
  toggleDrawerOpen: () => void;
}

export function DashboardDrawer({ open, toggleDrawerOpen }: DashboardDrawerProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { token } = useToken();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    const newLocale = locale === "fa" ? "en" : "fa";
    const currentPath = pathname.replace(`/${locale}`, "");
    router.push(`/${newLocale}${currentPath}`);
  };

  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <Drawer
      placement={direction === "rtl" ? "right" : "left"}
      open={open}
      width={300}
      closable={true}
      title={t("app.name")}
      mask={true}
      maskClosable={true}
      onClose={() => toggleDrawerOpen()}
      zIndex={100000000}
      style={{
        backgroundColor: `${token.colorBgBase}`,
        backdropFilter: "blur(10px)",
      }}
    >
      <Flex
        vertical
        align="center"
        justify="start"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Flex
          align="center"
          justify="space-around"
          gap="small"
          style={{
            width: "100%",
          }}
        >
          <Button
            type="text"
            shape="circle"
            onClick={() => toggleTheme()}
            size="large"
            icon={theme === "dark" ? <MoonFilled /> : <SunFilled />}
          />
          <Switch
            checkedChildren="En"
            unCheckedChildren="Fa"
            checked={locale !== "fa"}
            defaultChecked
            onClick={toggleLanguage}
          />
        </Flex>
        <DashboardNavigationCard toggleDrawerOpen={toggleDrawerOpen} />
      </Flex>
    </Drawer>
  );
}
