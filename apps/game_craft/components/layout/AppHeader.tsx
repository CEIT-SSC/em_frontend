"use client";

import {
  Button,
  Divider,
  Flex,
  Layout,
  Space,
  Splitter,
  Switch,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "@/lib/navigation";
import { useTranslations, useLocale } from "next-intl";
import { MenuOutlined, MoonFilled, SunFilled } from "@ant-design/icons";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useResponsive } from "@/lib/hooks/useResponsive";
import AppDrawer from "@/components/layout/AppDrawer";
import { customColors } from "@/config/colors";
import { useSound } from "@/components/providers/SoundProvider";
import { useMainNavigations } from "@/lib/config/navigation";

const { useToken } = theme;
const { Header } = Layout;

export function AppHeader() {
  const [shadow, setShadow] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { token } = useToken();
  const t = useTranslations("app");
  const screens = useResponsive();
  const { theme, setTheme } = useTheme();
  const { playSound } = useSound();

  const mainNavigations = useMainNavigations();

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLanguageSwitch = () => {
    const newLocale = locale === "fa" ? "en" : "fa";
    const currentPath = pathname.replace(`/${locale}`, "") || "/";
    router.replace(currentPath, { locale: newLocale });
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fix active route detection by removing locale from pathname
  const isActive = (path: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    return pathWithoutLocale === path;
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        right: 0,
        zIndex: 10000,
        width: "100%",
        height: "10vh",
        minHeight: "60px",
        maxHeight: "100px",
        background: token.colorPrimary,
        transition: "box-shadow 0.3s",
        boxShadow: shadow ? "0 10px 20px rgba(0, 0, 0, 0.5)" : "none",
        padding: "0.5rem 2rem",
      }}
    >
      {screens.lg ? (
        <Flex
          align="center"
          justify="space-between"
          style={{ width: "100%", height: "100%" }}
        >
          <Flex
            align="center"
            justify="center"
            style={{ height: "100%" }}
            gap="large"
          >
            <Image
              src="/images/dark-3d.svg"
              alt="gamecraft-logo"
              width={60}
              height={60}
              style={{ height: "80%", width: "auto", maxHeight: "60px" }}
            />

            <Space size="small">
              {mainNavigations.map((item) => (
                <Button
                  key={item.route}
                  type="primary"
                  onClick={() => router.push(item.route)}
                  onMouseEnter={() => playSound("jump")}
                  style={{
                    fontWeight: "bolder",
                    ...(isActive(item.route)
                      ? { color: customColors.colorAction }
                      : {}),
                  }}
                >
                  {item.name}
                </Button>
              ))}
              <Button
                type="primary"
                onClick={() => router.push("/dashboard")}
                onMouseEnter={() => playSound("jump")}
                style={{ fontWeight: "bolder" }}
              >
                {t("mainNavigation.dashboard")}
              </Button>
            </Space>
          </Flex>

          <Flex
            align="center"
            justify="center"
            style={{ height: "100%" }}
            gap="small"
          >
            <Button
              type="text"
              shape="circle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              size="large"
              icon={
                theme === "dark" ? (
                  <MoonFilled style={{ color: "white" }} />
                ) : (
                  <SunFilled style={{ color: "white" }} />
                )
              }
            />
            <Switch
              checkedChildren="En"
              unCheckedChildren="Fa"
              checked={locale !== "fa"}
              onClick={handleLanguageSwitch}
            />
            <Divider
              type="vertical"
              style={{
                height: "50%",
                borderWidth: "4px",
                borderRadius: "8px",
                margin: 0,
              }}
            />
            <Space size="small">
              <Button
                type="primary"
                style={{ fontWeight: "bolder" }}
                onClick={() => router.push("/auth/signup")}
                onMouseEnter={() => playSound("coin")}
              >
                {t("auth.signUp")}
              </Button>
              <Button
                type="primary"
                style={{ fontWeight: "bolder" }}
                onClick={() => router.push("/auth/login")}
                onMouseEnter={() => playSound("coin")}
              >
                {t("auth.login")}
              </Button>
            </Space>
          </Flex>
        </Flex>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          style={{ height: "100%", width: "100%" }}
        >
          <Button
            shape="circle"
            type="primary"
            size="large"
            icon={<MenuOutlined />}
            onClick={() => toggleDrawerOpen()}
          />
          <Image
            src="/svg/dark-3d.svg"
            alt="gamecraft-logo"
            width={60}
            height={40}
            style={{ height: "60%", width: "auto", maxHeight: "60px" }}
          />
          <AppDrawer open={drawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
        </Flex>
      )}
    </Header>
  );
}
