"use client";

import { Button, Flex, Result, Skeleton, Typography } from "antd";
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
import LogoWithText from "components/common/LogoWithText";
import styles from "./page.module.css";

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
    <Flex className={styles.summary} vertical gap="small" align="center">
      <Typography.Text className={styles.summarySecondary}>
        {t("topUpAmount", {
          amount: formatNumberToMoney(data.topUp.amount),
        })}
      </Typography.Text>
      <Typography.Text strong className={styles.summaryBalance}>
        {t("currentBalance", {
          balance: formatNumberToMoney(data.balance.balance),
        })}
      </Typography.Text>
      {data.orderLookupFailed && (
        <Typography.Text type="warning" className={styles.summaryWarning}>
          {t("orderVerificationUnavailable")}
        </Typography.Text>
      )}
    </Flex>
  ) : undefined;

  return (
    <Flex
      className={`gc-dashboard-world ${styles.page}`}
      align="center"
      justify="center"
    >
      <Flex vertical align="center" gap="large" className={styles.frame}>
        <LogoWithText variant="light" size={64} className={styles.brand} />
        <Flex vertical align="center" className={styles.panel}>
          {loading ? (
            <Skeleton
              active
              paragraph={{ rows: 4 }}
              className={styles.skeleton}
            />
          ) : error ? (
            <Result
              className={styles.result}
              status="error"
              title={t(`${error}.title`)}
              subTitle={t(`${error}.description`)}
              extra={actions()}
            />
          ) : view ? (
            <Result
              className={styles.result}
              status={resultStatus}
              title={t(`${view}.title`)}
              subTitle={
                <Flex
                  className={styles.resultDescription}
                  vertical
                  gap="middle"
                  align="center"
                >
                  <Typography.Text>{t(`${view}.description`)}</Typography.Text>
                  {description}
                </Flex>
              }
              extra={actions()}
            />
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
}
