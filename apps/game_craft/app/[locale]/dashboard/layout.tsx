"use client";

import { Divider, Flex, Grid, theme, Typography } from "antd";
import { usePathname } from "next/navigation";
import { useDashboardNavigations } from "@/lib/config/dashboard-navigation";
import { DashboardHeader } from "@/components/layout/dashboard/DashboardHeader";
import { DashboardNavigationCard } from "@/components/layout/dashboard/DashboardNavigationCard";
import LogoWithText from "@/components/shared/LogoWithText";

const { useToken } = theme;
const { useBreakpoint } = Grid;

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const screens = useBreakpoint();
  const { token } = useToken();
  const dashboardNavigations = useDashboardNavigations();
  const pathname = usePathname();

  return (
    <Flex
      vertical
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <DashboardHeader />
      <Flex
        vertical
        align="center"
        justify="start"
        flex={1}
        style={{
          width: "100%",
          backgroundColor: token.colorPrimary,
          backgroundImage: `url(/svg/pattern.svg)`,
          padding: "1rem",
        }}
        gap="large"
      >
        {screens.lg ? (
          <Flex align="center" justify="center" style={{ width: "100%" }}>
            <LogoWithText variant="light" />
          </Flex>
        ) : (
          <></>
        )}
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
          ) : (
            <></>
          )}
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
                <Typography.Title level={3} style={{ margin: 0, fontWeight: 950 }}>
                  {dashboardNavigations.find((item) => item.route === pathname)?.name}
                </Typography.Title>
                <Divider type="horizontal" variant="dashed" style={{borderColor: token.colorBorder}} />
              </Flex>
              <Flex
                vertical
                flex={1}
                style={{
                  width: "100%",
                }}
              >
                {children}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
