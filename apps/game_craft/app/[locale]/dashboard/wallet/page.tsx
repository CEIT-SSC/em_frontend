"use client";

import {
  Alert,
  Button,
  Col,
  Empty,
  Flex,
  Form,
  Input,
  List,
  Pagination,
  Row,
  Skeleton,
  Tag,
  theme,
  Typography,
} from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  ReloadOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import type {
  WalletBalance,
  WalletTransaction,
  WalletTransactionPage,
} from "@ssc/core";
import { clientApi } from "lib/api/client/clientApi";
import { useFormatter } from "lib/hooks/useFormatter";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

const { useToken } = theme;
const PAGE_SIZE = 20;

const normalizeDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[٬,\s]/g, "")
    .replace("٫", ".");

export default function WalletPage() {
  const { token } = useToken();
  const t = useTranslations("app.dashboard.wallet");
  const locale = useLocale();
  const { formatNumberToMoney } = useFormatter();
  const [form] = Form.useForm<{ amount: string }>();
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] =
    useState<WalletTransactionPage | null>(null);
  const [page, setPage] = useState(1);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [balanceError, setBalanceError] = useState(false);
  const [transactionsError, setTransactionsError] = useState(false);
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [topUpError, setTopUpError] = useState(false);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    [locale]
  );

  const loadBalance = useCallback(async () => {
    setBalanceLoading(true);
    setBalanceError(false);
    try {
      const response = await clientApi.wallet.getBalance();
      setBalance(response.data.data);
    } catch {
      setBalanceError(true);
    } finally {
      setBalanceLoading(false);
    }
  }, []);

  const loadTransactions = useCallback(async (nextPage: number) => {
    setTransactionsLoading(true);
    setTransactionsError(false);
    try {
      const response = await clientApi.wallet.getTransactions(
        nextPage,
        PAGE_SIZE
      );
      setTransactions(response.data.data);
    } catch {
      setTransactionsError(true);
    } finally {
      setTransactionsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBalance();
  }, [loadBalance]);

  useEffect(() => {
    void loadTransactions(page);
  }, [loadTransactions, page]);

  const startTopUp = async ({ amount }: { amount: string }) => {
    if (topUpLoading) return;

    setTopUpLoading(true);
    setTopUpError(false);
    try {
      const normalizedAmount = normalizeDigits(amount);
      const response = await clientApi.wallet.startTopUp(normalizedAmount);
      const paymentUrl = response.data.data.payment_url;
      if (!paymentUrl) throw new Error("Missing payment URL");
      window.location.assign(paymentUrl);
    } catch {
      setTopUpError(true);
      setTopUpLoading(false);
    }
  };

  const renderTransaction = (transaction: WalletTransaction) => {
    const isCredit = transaction.direction === "credit";
    const directionLabel = t(`direction.${transaction.direction}`);

    return (
      <List.Item
        style={{
          paddingInline: 0,
          alignItems: "center",
          gap: token.marginSM,
        }}
      >
        <Flex align="center" gap="middle" style={{ minWidth: 0 }}>
          <Flex
            align="center"
            justify="center"
            aria-hidden="true"
            style={{
              width: 40,
              height: 40,
              flex: "0 0 40px",
              borderRadius: token.borderRadius,
              color: isCredit ? token.colorSuccess : token.colorError,
              background: isCredit
                ? token.colorSuccessBg
                : token.colorErrorBg,
            }}
          >
            {isCredit ? <PlusOutlined /> : <MinusOutlined />}
          </Flex>
          <Flex vertical style={{ minWidth: 0 }}>
            <Typography.Text strong>
              {t(`transactionType.${transaction.entry_type}`)}
            </Typography.Text>
            <Typography.Text type="secondary">
              {dateFormatter.format(new Date(transaction.created_at))}
            </Typography.Text>
          </Flex>
        </Flex>

        <Flex vertical align="end" gap={4}>
          <Typography.Text
            strong
            aria-label={`${directionLabel}: ${formatNumberToMoney(
              transaction.amount
            )} ${t("currency")}`}
            style={{
              color: isCredit ? token.colorSuccess : token.colorError,
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
            }}
          >
            {isCredit ? "+" : "−"}
            {formatNumberToMoney(transaction.amount)} {t("currency")}
          </Typography.Text>
          <Tag color={isCredit ? "success" : "error"} bordered={false}>
            {directionLabel}
          </Tag>
        </Flex>
      </List.Item>
    );
  };

  return (
    <Flex
      vertical
      gap="large"
      style={{ width: "100%", padding: token.padding }}
    >
      <Row gutter={[token.marginLG, token.marginLG]} align="stretch">
        <Col xs={24} md={10}>
          <Flex
            vertical
            justify="space-between"
            style={{
              minHeight: 230,
              height: "100%",
              padding: token.paddingLG,
              borderRadius: token.borderRadiusLG,
              color: token.colorWhite,
              background: token.colorPrimary,
              boxShadow: `0 14px 34px ${token.colorPrimaryBgHover}`,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <WalletOutlined
              aria-hidden="true"
              style={{
                position: "absolute",
                insetInlineEnd: -12,
                bottom: -20,
                fontSize: 150,
                opacity: 0.1,
              }}
            />
            <Typography.Text style={{ color: "rgba(255,255,255,.78)" }}>
              {t("availableBalance")}
            </Typography.Text>
            {balanceLoading ? (
              <Skeleton active title paragraph={false} />
            ) : balanceError ? (
              <Alert
                type="error"
                showIcon
                message={t("balanceError")}
                action={
                  <Button size="small" onClick={() => void loadBalance()}>
                    {t("retry")}
                  </Button>
                }
              />
            ) : (
              <Flex align="baseline" gap="small" wrap="wrap" aria-live="polite">
                <Typography.Title
                  level={1}
                  style={{
                    color: token.colorWhite,
                    margin: 0,
                    fontWeight: 900,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {formatNumberToMoney(balance?.balance ?? "0")}
                </Typography.Title>
                <Typography.Text strong style={{ color: token.colorWhite }}>
                  {t("currency")}
                </Typography.Text>
              </Flex>
            )}
            <Typography.Text style={{ color: "rgba(255,255,255,.78)" }}>
              {t("balanceHint")}
            </Typography.Text>
          </Flex>
        </Col>

        <Col xs={24} md={14}>
          <Flex
            vertical
            justify="center"
            gap="middle"
            style={{
              minHeight: 230,
              height: "100%",
              padding: token.paddingLG,
              borderRadius: token.borderRadiusLG,
              background: token.colorFillQuaternary,
            }}
          >
            <div>
              <Typography.Title level={4} style={{ marginBottom: 4 }}>
                {t("topUpTitle")}
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
                {t("topUpDescription")}
              </Typography.Paragraph>
            </div>

            {topUpError && (
              <Alert
                type="error"
                showIcon
                closable
                message={t("topUpError")}
                onClose={() => setTopUpError(false)}
              />
            )}

            <Form form={form} layout="vertical" onFinish={startTopUp}>
              <Form.Item
                label={t("amountLabel")}
                name="amount"
                validateTrigger="onBlur"
                rules={[
                  { required: true, message: t("amountRequired") },
                  {
                    validator: async (_, value?: string) => {
                      if (!value) return;
                      const normalized = normalizeDigits(value);
                      if (
                        !/^\d{1,10}(\.\d{1,2})?$/.test(normalized) ||
                        Number(normalized) < 1
                      ) {
                        throw new Error(t("amountInvalid"));
                      }
                    },
                  },
                ]}
              >
                <Input
                  size="large"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder={t("amountPlaceholder")}
                  suffix={t("currency")}
                  disabled={topUpLoading}
                />
              </Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                block
                loading={topUpLoading}
                disabled={topUpLoading}
              >
                {topUpLoading ? t("redirecting") : t("topUpAction")}
              </Button>
            </Form>
          </Flex>
        </Col>
      </Row>

      <section aria-labelledby="wallet-transactions-title">
        <Flex
          align="center"
          justify="space-between"
          gap="middle"
          style={{ marginBottom: token.marginSM }}
        >
          <div>
            <Typography.Title
              id="wallet-transactions-title"
              level={4}
              style={{ marginBottom: 4 }}
            >
              {t("transactionsTitle")}
            </Typography.Title>
            <Typography.Text type="secondary">
              {t("transactionsDescription")}
            </Typography.Text>
          </div>
          {transactionsError && (
            <Button
              icon={<ReloadOutlined />}
              onClick={() => void loadTransactions(page)}
            >
              {t("retry")}
            </Button>
          )}
        </Flex>

        {transactionsLoading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : transactionsError ? (
          <Alert type="error" showIcon message={t("transactionsError")} />
        ) : transactions?.results.length ? (
          <>
            <List
              dataSource={transactions.results}
              renderItem={renderTransaction}
              split
            />
            {transactions.count > PAGE_SIZE && (
              <Flex justify="center" style={{ marginTop: token.marginLG }}>
                <Pagination
                  current={page}
                  pageSize={PAGE_SIZE}
                  total={transactions.count}
                  showSizeChanger={false}
                  onChange={setPage}
                  aria-label={t("paginationLabel")}
                />
              </Flex>
            )}
          </>
        ) : (
          <Empty description={t("transactionsEmpty")} />
        )}
      </section>
    </Flex>
  );
}
