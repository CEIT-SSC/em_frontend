"use client";

import { Button, Card, Flex, Grid, Image, theme, Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useDashboardNavigations } from "../../../lib/config/dashboard-navigation";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter as nextIntlNavigation } from "lib/navigation";
import { useRouter } from "@bprogress/next";
import styles from "./DashboardNavigationCard.module.css";
// import fireworks from "../../../public/lottie/Fireworks.lottie";

const { useToken } = theme;
const { useBreakpoint } = Grid;

interface DashboardNavigationCardProps {
  toggleDrawerOpen?: () => void;
}

export function DashboardNavigationCard({
  toggleDrawerOpen,
}: DashboardNavigationCardProps) {
  const t = useTranslations();
  const { token } = useToken();
  const router = useRouter({ customRouter: nextIntlNavigation });
  const pathname = usePathname();
  const dashboardNavigations = useDashboardNavigations();
  const screens = useBreakpoint();
  const locale = useLocale();
  const session = useSession();

  const handleLogout = () => {
    signOut();
  };

  // Function to check if a route is active
  const isActiveRoute = (route: string) => {
    return pathname === route;
  };

  return (
    <Flex
      className={`gc-dashboard-navigation ${styles.navigation}`}
      vertical
      align="center"
      justify="start"
      style={{
        width: "100%",
        padding: screens.lg ? token.padding : 0,
      }}
    >
      <Flex
        vertical
        align="center"
        justify="center"
        style={{ width: "100%" }}
        gap="small"
      >
        <Flex
          vertical
          align="center"
          justify="center"
          style={{ width: "100%" }}
          gap="small"
        >
          <div
            className={`gc-dashboard-avatar ${styles.avatar}`}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: 'white',
              width: "30%",
              aspectRatio: "1/1",
            }}
          >
            <Flex
              align={"center"}
              justify={"center"}
              style={{
                width: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                aspectRatio: "1/1",
                zIndex: 1,
              }}
            >
              <Image
                src="/images/logo/default_prof.jpg"
                width="100%"
                height="auto"
                alt="user-avatar"
                fallback="/images/logo/default_prof.jpg"
              />
            </Flex>
          </div>
          <Typography.Title level={4} className={styles.userName}>
            {session?.data?.user?.name}
          </Typography.Title>
        </Flex>

        <Flex
          vertical
          align="center"
          justify="center"
          style={{ width: "100%" }}
          gap="small"
        >
          {dashboardNavigations.map((item) => (
            <Button
              className={`gc-dashboard-nav-item ${styles.navItem} ${isActiveRoute(item.route) ? "gc-dashboard-nav-item--active" : ""}`}
              key={item.route}
              type={isActiveRoute(item.route) ? "primary" : "dashed"}
              size="large"
              style={{ width: "100%" }}
              onClick={() => {
                router.replace(item.route);
                if (toggleDrawerOpen) {
                  toggleDrawerOpen();
                }
              }}
              icon={item.icon ? item.icon : null}
            >
              {item.name}
            </Button>
          ))}
          <Button
            className={`gc-dashboard-nav-item gc-dashboard-nav-item--logout ${styles.navItem} ${styles.logout}`}
            danger
            type="dashed"
            size="large"
            style={{ width: "100%" }}
            onClick={handleLogout}
          >
            {t("app.auth.logout")}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
