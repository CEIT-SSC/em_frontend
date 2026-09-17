"use client";

import { Grid, Flex, Typography, Divider, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDashboardNavigations } from "../../../lib/config/dashboard-navigation";
import { DashboardHeader } from "../../../components/layout/dashboard";
import { DashboardNavigationCard } from "../../../components/layout/dashboard";
import LogoWithText from "../../../components/common/LogoWithText";
import { usePathname } from "lib/navigation";
import { useAuth } from "lib/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import styles from "./layout.module.css";

const { useBreakpoint } = Grid;

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const screens = useBreakpoint();
  const dashboardNavigations = useDashboardNavigations();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <Flex
      className={`gc-dashboard gc-dashboard-world ${styles.workspace}`}
      vertical
      align="center"
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <DashboardHeader />

      <Flex
        className={`gc-dashboard-shell ${styles.shell}`}
        vertical
        align="center"
        justify="start"
        flex={1}
        style={{
          width: "100%",
          padding: "1rem",
        }}
        gap="large"
      >
        {screens.lg ? (
          <Flex
            className={`gc-dashboard-masthead ${styles.masthead}`}
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            {/* Back button aligned with logo */}
            <Button
              type="dashed"
              icon={<ArrowLeftOutlined />}
              onClick={handleBackToHome}
              size="large"
            >
              {t("button.backToHome")}
            </Button>

            {/* Logo in center */}
            <LogoWithText variant="light" />

            {/* Empty div for spacing balance */}
            <div style={{ width: "140px" }} />
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
            <Flex
              className={`gc-dashboard-navigation-wrap ${styles.navigationWrap}`}
              flex={1}
              style={{ position: "sticky", top: "1rem" }}
            >
              <DashboardNavigationCard />
            </Flex>
          ) : (
            <></>
          )}
          <Flex
            className={`gc-dashboard-content ${styles.content}`}
            flex={3}
            vertical
            align="center"
            justify="start"
            style={{
              height: "100%",
            }}
          >
            <Flex
              vertical
              align="center"
              justify="start"
              style={{
                width: "100%",
                height: "100%",
                padding: "1rem",
              }}
            >
              <Flex
                className={`gc-dashboard-content-heading ${styles.contentHeading}`}
                vertical
                align="center"
                justify="center"
                style={{
                  width: "100%",
                  padding: 0,
                }}
              >
                <Typography.Title level={3} className={styles.pageTitle}>
                  {
                    dashboardNavigations.find((item) => item.route === pathname)
                      ?.name
                  }
                </Typography.Title>
                <Divider type="horizontal" style={{ display: "none" }} />
              </Flex>
              <Flex
                className={`gc-dashboard-content-body ${styles.contentBody}`}
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
