"use client";

import { Button, Flex, Grid, Layout, theme } from "antd";
import { MenuOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { DashboardDrawer } from "./DashboardDrawer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const { Header } = Layout;
const { useToken } = theme;
const { useBreakpoint } = Grid;

export function DashboardHeader() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const router = useRouter();
  const [shadow, setShadow] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const t = useTranslations("common");

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

  function toggleDrawerOpen() {
    setDrawerOpen(!drawerOpen);
  }

  const handleBackToHome = () => {
    router.push("/");
  };

  return screens.lg ? (
    <></>
  ) : (
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
        padding: "0.5rem 1rem",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{ height: "100%", width: "100%" }}
      >
        {/* Menu Button - moved to left */}
        <Button
          shape="circle"
          type="primary"
          size="large"
          icon={<MenuOutlined />}
          onClick={() => toggleDrawerOpen()}
        />

        {/* Logo in center */}
        <Image
          src="/images/logo/ssc_white.png"
          alt="ssc-logo"
          width={60}
          height={40}
          style={{ height: "60%", width: "auto", maxHeight: "60px" }}
        />

        {/* Back Button - moved to right */}
        <Button
          shape="circle"
          type="primary"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={handleBackToHome}
        />

        <DashboardDrawer
          open={drawerOpen}
          toggleDrawerOpen={toggleDrawerOpen}
        />
      </Flex>
    </Header>
  );
}
