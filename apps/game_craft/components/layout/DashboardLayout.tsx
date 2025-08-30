"use client";

import { Divider, Flex, Grid, theme, Typography } from "antd";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDashboardNavigations } from "@/lib/config/dashboard-navigation";
import DashboardHeader from "./DashboardHeader";
import DashboardNavigationCard from "./DashboardNavigationCard";
import LogoWithText from "@/components/shared/LogoWithText";
import MainDrawer from "./MainDrawer";
import { useResponsive } from "@/lib/hooks/useResponsive";

const { useToken } = theme;

interface DashboardLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export function DashboardLayout({ children, locale }: DashboardLayoutProps) {
  const screens = useResponsive();
  const { token } = useToken();
  const dashboardNavigations = useDashboardNavigations();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const currentPage = dashboardNavigations.find((item) =>
    pathname.includes(item.route)
  );

  return (
    <Flex
      vertical
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <DashboardHeader onMenuClick={toggleDrawerOpen} />

      <Flex
        vertical
        align="center"
        justify="start"
        flex={1}
        style={{
          width: "100%",
          backgroundColor: token.colorPrimary,
          backgroundImage: "url(/images/pattern.svg)",
          padding: "1rem",
        }}
        gap="large"
      >
        {screens.lg ? (
          <Flex align="center" justify="center" style={{ width: "100%" }}>
            <LogoWithText />
          </Flex>
        ) : null}

        <Flex
          align="start"
          justify="center"
          style={{
            width: "100%",
          }}
          gap="small"
        >
          {screens.lg ? (
            <Flex flex={1} style={{ position: "sticky", top: ".5rem" }}>
              <DashboardNavigationCard />
            </Flex>
          ) : null}

          <Flex
            flex={3}
            vertical
            align="center"
            justify="start"
            style={{
              backgroundColor: token.colorBgBase,
              height: "100%",
              borderRadius: token.borderRadius,
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
                vertical
                align="center"
                justify="center"
                style={{
                  width: "100%",
                  padding: token.padding,
                  paddingBottom: 0,
                }}
              >
                <Typography.Title
                  level={3}
                  style={{ margin: 0, fontWeight: 950 }}
                >
                  {currentPage?.name}
                </Typography.Title>
                <Divider type="horizontal" variant="dashed" />
              </Flex>

              <Flex
                vertical
                align="center"
                justify="start"
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                }}
              >
                {children}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <MainDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        locale={locale}
      />
    </Flex>
  );
}
