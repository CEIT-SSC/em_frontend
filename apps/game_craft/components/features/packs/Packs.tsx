"use client";

import { Alert, Flex, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { Pack, PacksList } from "@ssc/core";
import { clientApi } from "lib/api/client/clientApi";
import { eventId } from "lib/utils/constants";
import { useResponsive } from "lib/hooks/useResponsive";
import { useTranslations } from "next-intl";
import { PackGrid } from "./PackGrid";

interface PacksProps {
  padding?: string;
  backgroundColor?: string;
}

export function Packs({ padding = "3rem 2rem", backgroundColor }: PacksProps) {
  const screens = useResponsive();
  const t = useTranslations();
  const [state, setState] = useState<{ loading: boolean; data?: PacksList; error?: string }>({ loading: true });

  useEffect(() => {
    clientApi.packs
      .getPacksList(eventId)
      .then((response) => {
        if (response.status === 200) setState({ loading: false, data: response.data.data });
        else setState({ loading: false, error: "failed to fetch" });
      })
      .catch(() => setState({ loading: false, error: "failed to fetch" }));
  }, []);

  let content;
  if (state.loading) {
    content = <Flex justify="center" align="center" style={{ minHeight: 200 }}><Spin size="large" /></Flex>;
  } else if (state.error) {
    content = <Alert message={t("packs.error")} description={state.error} type="error" showIcon />;
  } else if (!state.data?.results.length) {
    content = <Alert message={t("packs.emptyTitle")} description={t("packs.emptyDescription")} type="info" showIcon />;
  } else {
    content = <PackGrid packs={state.data.results} />;
  }

  return (
    <Flex vertical align="center" justify="center" className="gc-home-packs" style={{ width: "100%", padding, backgroundColor }} gap="large">
      <Flex vertical align="center" gap="small">
        <Typography.Title level={screens.md ? 1 : 2} style={{ margin: 0, fontWeight: 900, color: "white", textAlign: "center" }}>
          {t("packs.title")}
        </Typography.Title>
        <Typography.Text className="gc-home-packs__description">{t("packs.description")}</Typography.Text>
      </Flex>
      {content}
    </Flex>
  );
}
