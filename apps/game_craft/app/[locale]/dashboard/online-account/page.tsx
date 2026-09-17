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
  const tc = useTranslations("common");
  const { isAuthenticated } = usePurchases();
  const session = useSession();

  const handleCopyCode = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info(t("dashboard.onlineAccount.copied", { label }));
    } catch (err) {
      toast.error(t("dashboard.onlineAccount.copyFailed"));
    }
  };

  const CredentialRow = ({ label, value }: { label: string; value?: string }) => (
    <Flex className="gc-dashboard-credential" align="center" justify="space-between" gap="middle" style={{ width: "100%", padding: "1rem 1.25rem" }}>
      <Flex vertical gap={2} style={{ minWidth: 0 }}>
        <Typography.Text type="secondary">{label}</Typography.Text>
        <Typography.Text strong ellipsis>{value || "-"}</Typography.Text>
      </Flex>
      <Button type="primary" aria-label={t("dashboard.onlineAccount.copy", { label })} icon={<LuCopy />} onClick={() => handleCopyCode(value || "", label)} disabled={!value} />
    </Flex>
  );

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
          message={tc("accessDenied")}
          description={t("dashboard.events.unauthorized")}
          type="warning"
          showIcon
        />
      </Flex>
    );
  }

  return (
    <Flex
      className="gc-dashboard-account"
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
      <Flex className="gc-dashboard-account-panel"
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

        <CredentialRow label={t("dashboard.onlineAccount.username")} value={session.data?.skyUsername} />
        <CredentialRow label={t("dashboard.onlineAccount.password")} value={session.data?.skyPassword} />
      </Flex>
    </Flex>
  );
}
