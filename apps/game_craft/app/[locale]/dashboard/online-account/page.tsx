"use client";

import { Alert, Button, Flex, theme, Typography } from "antd";
import { usePurchases } from "lib/hooks/usePurchases";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { LuCopy } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";

const { useToken } = theme;

export default function EventsPage() {
  const { token } = useToken();
  const t = useTranslations("app");
  const { isAuthenticated } = usePurchases();
  const session = useSession();

  const handleCopyCode = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info("با موفقیت کپی شد");
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // If not authenticated, show message to login
  if (!isAuthenticated) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{
          height: "400px",
          width: "100%",
        }}
      >
        <Alert
          message="دسترسی غیرمجاز"
          description="لطفا وارد حساب کاربری خود شوید."
          type="warning"
          showIcon
        />
      </Flex>
    );
  }

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: "100%",
        padding: token.padding,
      }}
      gap="large"
    >
      <ToastContainer />
      {/* Skyroom Account */}
      <Flex
        vertical
        align="start"
        justify="center"
        style={{
          width: "100%",
        }}
        gap="large"
      >
        <Typography.Title
          level={3}
          style={{ fontWeight: 800, marginBottom: 0 }}
        >
          {t("dashboard.onlineAccount.skyroom")}
        </Typography.Title>
        <Typography.Paragraph>
          {t("dashboard.onlineAccount.description")}
        </Typography.Paragraph>

        <Typography.Title
          level={4}
          style={{ fontWeight: 800, marginBottom: 0 }}
        >
          {t("dashboard.onlineAccount.username")}
        </Typography.Title>
        <Button
          type="dashed"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
            width: "100%",
            height: "fit-content",
          }}
        >
          <Button
            type="dashed"
            onClick={() => handleCopyCode(session.data.skyUsername)}
          >
            <LuCopy size={24} />
          </Button>
          {session.data.skyUsername}
        </Button>

        <Typography.Title
          level={4}
          style={{ fontWeight: 800, marginBottom: 0 }}
        >
          {t("dashboard.onlineAccount.password")}
        </Typography.Title>
        <Button
          type="dashed"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
            width: "100%",
            height: "fit-content",
          }}
        >
          <Button
            type="dashed"
            onClick={() => handleCopyCode(session.data.skyPassword)}
          >
            <LuCopy size={24} />
          </Button>
          {session.data.skyPassword}
        </Button>
      </Flex>
    </Flex>
  );
}
