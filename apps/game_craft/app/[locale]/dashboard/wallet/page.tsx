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
import styles from "./page.module.css";

const PAGE_SIZE = 20;

const normalizeDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[٬,\s]/g, "")
    .replace("٫", ".");

export default function WalletPage() {
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
    [locale],
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
        PAGE_SIZE,
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
      <List.Item className={styles.transaction}>
        <Flex align="center" gap="middle" className={styles.transactionInfo}>
          <Flex
            className={`${styles.transactionIcon} ${
              isCredit ? styles.credit : styles.debit
            }`}
            align="center"
            justify="center"
            aria-hidden="true"
          >
            {isCredit ? <PlusOutlined /> : <MinusOutlined />}
          </Flex>
          <Flex vertical className={styles.transactionCopy}>
            <Typography.Text strong>
              {t(`transactionType.${transaction.entry_type}`)}
            </Typography.Text>
            <Typography.Text type="secondary">
              {dateFormatter.format(new Date(transaction.created_at))}
            </Typography.Text>
          </Flex>
        </Flex>

        <Flex vertical align="end" gap={4} className={styles.transactionAmount}>
          <Typography.Text
            strong
            aria-label={`${directionLabel}: ${formatNumberToMoney(
              transaction.amount,
            )} ${t("currency")}`}
            className={isCredit ? styles.creditText : styles.debitText}
          >
            {isCredit ? "+" : "−"}
            {formatNumberToMoney(transaction.amount)} {t("currency")}
          </Typography.Text>
          <Tag
            className={isCredit ? styles.creditTag : styles.debitTag}
            bordered={false}
          >
            {directionLabel}
          </Tag>
        </Flex>
      </List.Item>
    );
  };

  return (
    <Flex className={styles.wallet} vertical gap="large">
      <Row gutter={[20, 20]} align="stretch">
        <Col xs={24} md={10}>
          <Flex className={styles.balanceCard} vertical justify="space-between">
            <Flex gap="small" align="center" className={styles.balanceHeader}>
              <WalletOutlined
                aria-hidden="true"
                className={styles.balanceWatermark}
              />
              <Typography.Text className={styles.balanceLabel}>
                {t("availableBalance")}
              </Typography.Text>
            </Flex>
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
              <div className={styles.balanceAmount} aria-live="polite">
                <span>{formatNumberToMoney(balance?.balance ?? "0")}</span>
                <Typography.Text strong className={styles.balanceCurrency}>
                  {t("currency")}
                </Typography.Text>
              </div>
            )}
            <Typography.Text className={styles.balanceHint}>
              {t("balanceHint")}
            </Typography.Text>
          </Flex>
        </Col>

        <Col xs={24} md={14}>
          <Flex
            className={styles.topUpPanel}
            vertical
            justify="center"
            gap="middle"
          >
            <div>
              <Typography.Title level={4} className={styles.panelTitle}>
                {t("topUpTitle")}
              </Typography.Title>
              <Typography.Paragraph
                type="secondary"
                className={styles.panelDescription}
              >
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

            <Form
              className={styles.topUpForm}
              form={form}
              layout="vertical"
              onFinish={startTopUp}
            >
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
                className={styles.topUpButton}
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

      <section
        className={styles.ledger}
        aria-labelledby="wallet-transactions-title"
      >
        <Flex
          className={styles.ledgerHeader}
          align="center"
          justify="space-between"
          gap="middle"
        >
          <div>
            <Typography.Title
              id="wallet-transactions-title"
              level={4}
              className={styles.ledgerTitle}
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
              className={styles.transactionList}
              dataSource={transactions.results}
              renderItem={renderTransaction}
              split
            />
            {transactions.count > PAGE_SIZE && (
              <Flex justify="center" className={styles.pagination}>
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
