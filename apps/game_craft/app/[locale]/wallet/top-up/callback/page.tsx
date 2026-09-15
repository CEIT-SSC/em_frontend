"use client";

import { Button, Flex, Result, Skeleton, theme, Typography } from "antd";
import type {
  CheckoutOrderSummary,
  WalletBalance,
  WalletTopUpResult,
} from "@ssc/core";
import { clientApi } from "lib/api/client/clientApi";
import { useFormatter } from "lib/hooks/useFormatter";
import { useRouter } from "lib/navigation";
import { eventId } from "lib/utils/constants";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

const { useToken } = theme;

interface CallbackData {
  topUp: WalletTopUpResult;
  balance: WalletBalance;
  order: CheckoutOrderSummary | null;
  orderLookupFailed: boolean;
}

type CallbackView =
  | "manualSuccess"
  | "orderSuccess"
  | "orderProcessing"
  | "orderIncomplete"
  | "paymentFailed"
  | "paymentProcessing";

export default function WalletTopUpCallbackPage() {
  const { token } = useToken();
  const t = useTranslations("app.dashboard.wallet.callback");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { formatNumberToMoney } = useFormatter();
  const topUpId = searchParams.get("topup_id");
  const orderId = searchParams.get("order_id");
  const [data, setData] = useState<CallbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"invalid" | "unavailable" | null>(null);

  const verifyPayment = useCallback(async () => {
    if (!topUpId) {
      setError("invalid");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [topUpResponse, balanceResponse] = await Promise.all([
        clientApi.wallet.getTopUp(topUpId),
        clientApi.wallet.getBalance(),
      ]);

      let order: CheckoutOrderSummary | null = null;
      let orderLookupFailed = false;
      if (orderId) {
        try {
          const orderResponse = await clientApi.order.getById(orderId, eventId);
          order = orderResponse.data.data;
        } catch {
          orderLookupFailed = true;
        }
      }

      setData({
        topUp: topUpResponse.data.data,
        balance: balanceResponse.data.data,
        order,
        orderLookupFailed,
      });
    } catch {
      setError("unavailable");
    } finally {
      setLoading(false);
    }
  }, [orderId, topUpId]);

  useEffect(() => {
    void verifyPayment();
  }, [verifyPayment]);

  const view = useMemo<CallbackView | null>(() => {
    if (!data) return null;

    if (["failed", "cancelled"].includes(data.topUp.status)) {
      return "paymentFailed";
    }
    if (data.topUp.status !== "credited") return "paymentProcessing";
    if (!orderId) return "manualSuccess";
    if (data.order?.status === "completed") return "orderSuccess";
    if (data.order?.status === "processing_enrollment") {
      return "orderProcessing";
    }
    return "orderIncomplete";
  }, [data, orderId]);

  const resultStatus =
    view === "manualSuccess" || view === "orderSuccess"
      ? "success"
      : view === "paymentFailed"
        ? "error"
        : view === "orderIncomplete"
          ? "warning"
          : "info";

  const actions = () => {
    if (error || view === "paymentProcessing" || view === "orderProcessing") {
      return [
        <Button key="retry" type="primary" onClick={() => void verifyPayment()}>
          {t("retry")}
        </Button>,
        <Button key="wallet" onClick={() => router.push("/dashboard/wallet")}>
          {t("goToWallet")}
        </Button>,
      ];
    }
    if (view === "orderSuccess") {
      return [
        <Button
          key="events"
          type="primary"
          onClick={() => router.push("/dashboard/events")}
        >
          {t("goToEvents")}
        </Button>,
        <Button key="wallet" onClick={() => router.push("/dashboard/wallet")}>
          {t("goToWallet")}
        </Button>,
      ];
    }
    if (view === "orderIncomplete") {
      return [
        <Button
          key="cart"
          type="primary"
          onClick={() => router.push("/dashboard/shopping-bag")}
        >
          {t("goToCart")}
        </Button>,
        <Button key="wallet" onClick={() => router.push("/dashboard/wallet")}>
          {t("goToWallet")}
        </Button>,
      ];
    }
    return [
      <Button
        key="wallet"
        type="primary"
        onClick={() => router.push("/dashboard/wallet")}
      >
        {t("goToWallet")}
      </Button>,
    ];
  };

  const description = data ? (
    <Flex vertical gap="small" align="center">
      <Typography.Text type="secondary">
        {t("topUpAmount", {
          amount: formatNumberToMoney(data.topUp.amount),
        })}
      </Typography.Text>
      <Typography.Text strong style={{ fontVariantNumeric: "tabular-nums" }}>
        {t("currentBalance", {
          balance: formatNumberToMoney(data.balance.balance),
        })}
      </Typography.Text>
      {data.orderLookupFailed && (
        <Typography.Text type="warning">
          {t("orderVerificationUnavailable")}
        </Typography.Text>
      )}
    </Flex>
  ) : undefined;

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        padding: token.padding,
        backgroundColor: token.colorPrimary,
        backgroundImage: "url(/svg/pattern.svg)",
      }}
    >
      <Flex
        vertical
        align="center"
        style={{
          width: "min(100%, 680px)",
          padding: token.paddingLG,
          borderRadius: token.borderRadiusLG,
          background: token.colorBgContainer,
          boxShadow: "0 18px 50px rgba(0,0,0,.22)",
        }}
      >
        {loading ? (
          <Skeleton active paragraph={{ rows: 4 }} style={{ width: "100%" }} />
        ) : error ? (
          <Result
            status="error"
            title={t(`${error}.title`)}
            subTitle={t(`${error}.description`)}
            extra={actions()}
          />
        ) : view ? (
          <Result
            status={resultStatus}
            title={t(`${view}.title`)}
            subTitle={
              <Flex vertical gap="middle" align="center">
                <Typography.Text type="secondary">
                  {t(`${view}.description`)}
                </Typography.Text>
                {description}
              </Flex>
            }
            extra={actions()}
          />
        ) : null}
      </Flex>
    </Flex>
  );
}
